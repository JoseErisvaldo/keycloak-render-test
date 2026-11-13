import { login } from "../service/auth.service";

export function SignInView() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">ACESSO SEGURO</span>
        <h1>Entre na sua conta</h1>
        <p>Use sua conta corporativa para acessar o painel.</p>
        <button className="primary full-width" onClick={login}>
          Continuar com Keycloak
        </button>
      </section>
    </main>
  );
}
