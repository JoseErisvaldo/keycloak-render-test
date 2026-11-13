import { asyncHandler } from "../../shared/async-handler.js";
import { HttpError } from "../../shared/http-error.js";
import { createExample, listExamples } from "./example.service.js";

export const getExamples = asyncHandler(async (request, response) => {
  const user = request.session.user;
  if (!user) throw new HttpError(401, "Authentication required");
  response.json(await listExamples(user.sub));
});

export const postExample = asyncHandler(async (request, response) => {
  const user = request.session.user;
  if (!user) throw new HttpError(401, "Authentication required");
  const example = await createExample(user.sub, request.body.title);
  response.status(201).json(example);
});
