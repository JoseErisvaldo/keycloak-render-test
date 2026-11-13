import { useQuery } from "@tanstack/react-query";
import { sessionQuery } from "../queries/auth.queries";

export const useSession = () => useQuery(sessionQuery);
