import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store/auth.store";
import { sessionQuery } from "../../auth/queries/auth.queries";
import { useLogoutMutation } from "../../auth/mutations/auth.mutations";
import { ExampleForm } from "../../examples/components/ExampleForm";
import { ExampleList } from "../../examples/components/ExampleList";

export function DashboardView() {
  const session = useQuery(sessionQuery);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useLogoutMutation();
  const user = session.data?.user;

  useEffect(() => setUser(user ?? null), [setUser, user]);

  return (
    <main className="dashboard">
      <header className="topbar">
        <a className="brand" href="/">KC<span>.</span></a>
        <div className="user-menu">
          <span>{user?.name ?? user?.preferredUsername ?? user?.email}</span>
          <button className="secondary" disabled={logout.isPending} onClick={() => logout.mutate()}>
            Sair
          </button>
        </div>
      </header>
      <section className="welcome">
        <span className="eyebrow">PAINEL</span>
        <h1>Olá{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.</h1>
        <p>Você está autenticado com segurança pelo Keycloak.</p>
      </section>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Área protegida</h2>
            <p>Exemplo de recurso isolado por usuário e salvo no PostgreSQL.</p>
          </div>
        </div>
        <ExampleForm />
        <ExampleList />
      </section>
      {logout.isError && <p className="error">{logout.error.message}</p>}
    </main>
  );
}
