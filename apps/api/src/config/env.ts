import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  WEB_ORIGIN: z.string().url(),
  WEB_URL: z.string().url(),
  KEYCLOAK_ISSUER_URL: z.string().url(),
  KEYCLOAK_CLIENT_ID: z.string().min(1),
  KEYCLOAK_CLIENT_SECRET: z.string().min(1),
  KEYCLOAK_REDIRECT_URI: z.string().url(),
  COOKIE_SECURE: z.string().optional().transform((value) => value === "true"),
});

export const env = envSchema.parse(process.env);
