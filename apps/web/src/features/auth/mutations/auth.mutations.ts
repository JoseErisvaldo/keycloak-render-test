import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCsrfToken } from "../../../shared/api/csrf";
import { authKeys } from "../queries/auth.queries";
import { logout } from "../service/auth.service";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { csrfToken } = await getCsrfToken();
      return logout(csrfToken);
    },
    onSuccess: ({ logoutUrl }) => {
      void queryClient.invalidateQueries({ queryKey: authKeys.session });
      window.location.assign(logoutUrl);
    },
  });
}
