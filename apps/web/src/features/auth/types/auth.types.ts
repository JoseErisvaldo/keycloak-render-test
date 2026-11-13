import { z } from "zod";

export const userSchema = z.object({
  sub: z.string(),
  email: z.string().optional(),
  name: z.string().optional(),
  preferredUsername: z.string().optional(),
});

export const sessionSchema = z.object({
  user: userSchema.nullable(),
});
export const logoutResponseSchema = z.object({ logoutUrl: z.string().url() });

export type User = z.infer<typeof userSchema>;
export type Session = z.infer<typeof sessionSchema>;
