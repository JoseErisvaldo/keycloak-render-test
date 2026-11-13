import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      sub: string;
      email?: string;
      name?: string;
      preferredUsername?: string;
    };
    oidcState?: string;
    oidcVerifier?: string;
    idTokenHint?: string;
    csrfToken?: string;
  }
}
