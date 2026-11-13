import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExample } from "../service/example.service";
import { exampleKeys } from "../queries/example.queries";
import type { CreateExampleInput } from "../types/example.types";

export function useCreateExampleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateExampleInput) => addExample(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: exampleKeys.all }),
  });
}
