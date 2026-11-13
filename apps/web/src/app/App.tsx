import { useQuery } from "@tanstack/react-query";
import { SignInView } from "../features/auth/components/SignInView";
import { sessionQuery } from "../features/auth/queries/auth.queries";
import { DashboardView } from "../features/dashboard/views/DashboardView";

export function App() {
  const session = useQuery(sessionQuery);

  if (session.isPending) {
    return <main className="loading">Conectando...</main>;
  }
  if (session.isError) {
    return <main className="loading error">{session.error.message}</main>;
  }
  return session.data.user ? <DashboardView /> : <SignInView />;
}
