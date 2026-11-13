import { useState, type FormEvent } from "react";
import { createExampleSchema } from "../types/example.types";
import { useCreateExampleMutation } from "../mutations/example.mutations";

export function ExampleForm() {
  const [title, setTitle] = useState("");
  const mutation = useCreateExampleMutation();
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = createExampleSchema.safeParse({ title });
    if (!parsed.success) return;
    mutation.mutate(parsed.data, { onSuccess: () => setTitle("") });
  };

  return (
    <form className="example-form" onSubmit={submit}>
      <label htmlFor="example-title">Novo item de exemplo</label>
      <div className="form-row">
        <input
          id="example-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={120}
          placeholder="Ex.: Projeto interno"
        />
        <button disabled={mutation.isPending || !title.trim()}>
          {mutation.isPending ? "Salvando..." : "Adicionar"}
        </button>
      </div>
      {mutation.isError && <p className="error">{mutation.error.message}</p>}
    </form>
  );
}
