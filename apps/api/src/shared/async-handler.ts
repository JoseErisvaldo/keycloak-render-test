import type { Request, RequestHandler, Response } from "express";

type AsyncController = (
  request: Request,
  response: Response,
) => Promise<unknown>;

export const asyncHandler =
  (controller: AsyncController): RequestHandler =>
  (request, response, next) => {
    void controller(request, response).catch(next);
  };
