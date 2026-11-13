import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { HttpError } from "./http-error.js";

export const validateBody =
  (schema: ZodType): RequestHandler =>
  (request, _response, next) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      next(new HttpError(400, "Invalid request body"));
      return;
    }
    request.body = result.data;
    next();
  };
