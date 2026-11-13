import { queryOptions } from "@tanstack/react-query";
import { listExamples } from "../service/example.service";

export const exampleKeys = { all: ["examples"] as const };

export const examplesQuery = queryOptions({
  queryKey: exampleKeys.all,
  queryFn: listExamples,
});
