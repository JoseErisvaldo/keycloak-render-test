import { Router } from "express";
import { requireAuth } from "../../middleware/require-auth.js";
import { requireCsrf } from "../../middleware/csrf.js";
import { validateBody } from "../../shared/validate.js";
import { getExamples, postExample } from "./example.controller.js";
import { createExampleSchema } from "./example.schema.js";

export const exampleRouter = Router();

exampleRouter.use(requireAuth);
exampleRouter.get("/", getExamples);
exampleRouter.post("/", requireCsrf, validateBody(createExampleSchema), postExample);
