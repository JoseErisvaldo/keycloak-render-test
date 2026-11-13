import { z } from "zod";
import { apiRequest } from "../../../shared/api/client";
import { getCsrfToken } from "../../../shared/api/csrf";
import {
  createExampleSchema,
  exampleSchema,
  examplesSchema,
} from "../types/example.types";

export const listExamples = () => apiRequest("/api/examples", examplesSchema);

export async function addExample(input: unknown) {
  const data = createExampleSchema.parse(input);
  const { csrfToken } = await getCsrfToken();
  return apiRequest(
    "/api/examples",
    exampleSchema,
    {
      method: "POST",
      headers: { "X-CSRF-Token": csrfToken },
      body: JSON.stringify(data),
    },
  );
}
