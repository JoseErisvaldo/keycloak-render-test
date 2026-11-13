import { randomBytes, timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";
import { HttpError } from "../shared/http-error.js";

export const getCsrfToken: RequestHandler = (request, response) => {
  request.session.csrfToken ??= randomBytes(32).toString("hex");
  response.json({ csrfToken: request.session.csrfToken });
};

export const requireCsrf: RequestHandler = (request, _response, next) => {
  const expected = request.session.csrfToken;
  const received = request.get("x-csrf-token");
  if (
    !expected ||
    !received ||
    expected.length !== received.length ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(received))
  ) {
    next(new HttpError(403, "Invalid CSRF token"));
    return;
  }
  next();
};
