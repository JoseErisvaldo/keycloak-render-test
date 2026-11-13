import { z } from "zod";

export const exampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  ownerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const examplesSchema = z.array(exampleSchema);
export const createExampleSchema = z.object({
  title: z.string().trim().min(1, "Informe um título").max(120),
});

export type Example = z.infer<typeof exampleSchema>;
export type CreateExampleInput = z.infer<typeof createExampleSchema>;
