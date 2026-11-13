import type { RequestHandler } from "express";
import { HttpError } from "../shared/http-error.js";

export const requireAuth: RequestHandler = (request, _response, next) => {
  if (!request.session.user) {
    next(new HttpError(401, "Authentication required"));
    return;
  }
  next();
};
