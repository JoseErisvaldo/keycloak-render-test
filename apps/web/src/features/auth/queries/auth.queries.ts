import { queryOptions } from "@tanstack/react-query";
import { getSession } from "../service/auth.service";

export const authKeys = {
  session: ["auth", "session"] as const,
};

export const sessionQuery = queryOptions({
  queryKey: authKeys.session,
  queryFn: getSession,
  staleTime: 30_000,
});
