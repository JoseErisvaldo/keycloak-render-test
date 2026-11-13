import {
  allowInsecureRequests,
  authorizationCodeGrant,
  buildAuthorizationUrl,
  buildEndSessionUrl,
  calculatePKCECodeChallenge,
  discovery,
  randomPKCECodeVerifier,
  randomState,
  type Configuration,
} from "openid-client";
import { env } from "../../config/env.js";
import { HttpError } from "../../shared/http-error.js";
import type { Request } from "express";

let clientPromise: Promise<Configuration> | undefined;

const getClient = () => {
  const issuer = new URL(env.KEYCLOAK_ISSUER_URL);
  const isLoopbackHost = ["localhost", "127.0.0.1", "::1"].includes(
    issuer.hostname,
  );
  if (issuer.protocol !== "https:" && !(env.NODE_ENV !== "production" && isLoopbackHost)) {
    throw new Error(
      "Keycloak issuer must use HTTPS; HTTP is allowed only for a loopback issuer in development",
    );
  }
  clientPromise ??= discovery(
    issuer,
    env.KEYCLOAK_CLIENT_ID,
    env.KEYCLOAK_CLIENT_SECRET,
    undefined,
    issuer.protocol === "http:"
      ? { execute: [allowInsecureRequests] }
      : undefined,
  );
  return clientPromise;
};

export const createLoginUrl = async (request: Request): Promise<string> => {
  const verifier = randomPKCECodeVerifier();
  const [challenge, state] = await Promise.all([
    calculatePKCECodeChallenge(verifier),
    randomState(),
  ]);
  request.session.oidcVerifier = verifier;
  request.session.oidcState = state;
  return buildAuthorizationUrl(await getClient(), {
    redirect_uri: env.KEYCLOAK_REDIRECT_URI,
    scope: "openid profile email",
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  }).href;
};

export const completeLogin = async (request: Request) => {
  const verifier = request.session.oidcVerifier;
  const state = request.session.oidcState;
  if (!verifier || !state) {
    throw new HttpError(400, "Login session expired; please try again");
  }

  const currentUrl = new URL(request.originalUrl, env.KEYCLOAK_REDIRECT_URI);
  const tokenSet = await authorizationCodeGrant(await getClient(), currentUrl, {
    pkceCodeVerifier: verifier,
    expectedState: state,
  });
  const claims = tokenSet.claims();
  if (!claims?.sub) {
    throw new HttpError(401, "Identity provider returned no subject");
  }

  const user = {
    sub: claims.sub,
    email: typeof claims.email === "string" ? claims.email : undefined,
    name: typeof claims.name === "string" ? claims.name : undefined,
    preferredUsername:
      typeof claims.preferred_username === "string"
        ? claims.preferred_username
        : undefined,
  };
  const idTokenHint = tokenSet.id_token;
  await new Promise<void>((resolve, reject) => {
    request.session.regenerate((error) => (error ? reject(error) : resolve()));
  });
  request.session.user = user;
  request.session.idTokenHint = idTokenHint;
  delete request.session.oidcVerifier;
  delete request.session.oidcState;
};

export const createLogoutUrl = async (idTokenHint?: string) =>
  buildEndSessionUrl(await getClient(), {
    post_logout_redirect_uri: env.WEB_URL,
    ...(idTokenHint ? { id_token_hint: idTokenHint } : {}),
  }).href;
