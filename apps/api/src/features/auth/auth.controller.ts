import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { asyncHandler } from "../../shared/async-handler.js";
import {
  completeLogin,
  createLoginUrl,
  createLogoutUrl,
} from "./auth.service.js";

export const login = asyncHandler(async (request, response) => {
  response.redirect(await createLoginUrl(request));
});

export const callback = asyncHandler(async (request, response) => {
  await completeLogin(request);
  request.session.save((error) => {
    if (error) {
      response.status(500).send("Could not save login session");
      return;
    }
    response.redirect(env.WEB_URL);
  });
});

export const logout = asyncHandler(async (request, response) => {
  const logoutUrl = await createLogoutUrl(request.session.idTokenHint);
  request.session.destroy((error) => {
    if (error) {
      response.status(500).json({ error: "Could not end session" });
      return;
    }
    response.json({ logoutUrl });
  });
});

export const session = (request: Request, response: Response) => {
  response.json({ user: request.session.user ?? null });
};
