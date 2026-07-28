import { saveTransparencyDocument } from "@/app/admin/actions";
import { Field } from "@/components/admin-form";
import type { TransparencyDocument } from "@/lib/supabase/types";

const categories = [
  "Estatuto",
  "CNPJ e documentos institucionais",
  "Projetos aprovados",
  "Relatórios",
  "Certidões",
  "Prestação de contas",
  "Outros documentos"
];

export function AdminDocumentForm({ document }: { document?: TransparencyDocument }) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={saveTransparencyDocument} className="mt-8 grid gap-5 rounded-md bg-white p-6 shadow-sm">
      {document ? (
        <>
          <input name="id" type="hidden" value={document.id} />
          <input name="existing_pdf_url" type="hidden" value={document.pdf_url} />
        </>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Título" name="title" required>
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={document?.title ?? ""} name="title" required />
        </Field>
        <Field label="Categoria" name="category" required>
          <select className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={document?.category ?? "Outros documentos"} name="category" required>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Data de publicação" name="publication_date" required>
        <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={document?.publication_date ?? today} name="publication_date" required type="date" />
      </Field>

      <Field label="Descrição opcional" name="description">
        <textarea className="min-h-28 rounded-md border border-forest/15 p-3 text-ink" defaultValue={document?.description ?? ""} name="description" />
      </Field>

      <Field label="Arquivo PDF" name="pdf_file">
        <input accept="application/pdf" className="min-h-11 rounded-md border border-forest/15 bg-white px-3 py-2 text-ink" name="pdf_file" required={!document} type="file" />
      </Field>

      <label className="flex items-center gap-3 text-sm font-semibold text-forest">
        <input defaultChecked={document?.active ?? true} name="active" type="checkbox" />
        Publicar documento no portal de transparência
      </label>

      <button className="min-h-11 rounded-md bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-forest hover:text-white" type="submit">
        Salvar documento
      </button>
    </form>
  );
}
