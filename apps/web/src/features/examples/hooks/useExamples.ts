import { useQuery } from "@tanstack/react-query";
import { examplesQuery } from "../queries/example.queries";

export const useExamples = () => useQuery(examplesQuery);
