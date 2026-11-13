import { Router } from "express";
import { callback, login, logout, session } from "./auth.controller.js";
import { getCsrfToken, requireCsrf } from "../../middleware/csrf.js";

export const authRouter = Router();

authRouter.get("/login", login);
authRouter.get("/callback", callback);
authRouter.get("/session", session);
authRouter.get("/csrf", getCsrfToken);
authRouter.post("/logout", requireCsrf, logout);
