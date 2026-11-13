import { apiRequest } from "../../../shared/api/client";
import { logoutResponseSchema, sessionSchema } from "../types/auth.types";

export const getSession = () => apiRequest("/auth/session", sessionSchema);
export const logout = (csrfToken: string) =>
  apiRequest("/auth/logout", logoutResponseSchema, {
    method: "POST",
    headers: { "X-CSRF-Token": csrfToken },
  });
export const login = () => window.location.assign("/auth/login");
