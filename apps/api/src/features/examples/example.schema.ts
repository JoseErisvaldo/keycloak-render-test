import { z } from "zod";

export const createExampleSchema = z.object({
  title: z.string().trim().min(1).max(120),
});
