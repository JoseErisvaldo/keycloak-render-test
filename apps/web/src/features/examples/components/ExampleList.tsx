import { useExamples } from "../hooks/useExamples";

export function ExampleList() {
  const query = useExamples();
  if (query.isPending) return <p className="muted">Carregando itens...</p>;
  if (query.isError) return <p className="error">{query.error.message}</p>;
  if (query.data.length === 0) {
    return <p className="muted">Nenhum item ainda. Crie o primeiro acima.</p>;
  }

  return (
    <ul className="example-list">
      {query.data.map((item) => (
        <li key={item.id}>
          <span>{item.title}</span>
          <time dateTime={item.createdAt}>
            {new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
              new Date(item.createdAt),
            )}
          </time>
        </li>
      ))}
    </ul>
  );
}
