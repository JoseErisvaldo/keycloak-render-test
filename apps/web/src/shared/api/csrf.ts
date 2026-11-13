import { z } from "zod";
import { apiRequest } from "./client";

const csrfResponseSchema = z.object({ csrfToken: z.string() });

export async function getCsrfToken() {
  return apiRequest("/auth/csrf", csrfResponseSchema);
}
