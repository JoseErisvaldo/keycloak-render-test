import { z } from "zod";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";

export async function apiRequest<T>(
  path: string,
  schema: z.ZodType<T>,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      typeof body?.error === "string" ? body.error : `Request failed (${response.status})`,
    );
  }

  return schema.parse(await response.json());
}
