import Link from "next/link";
import { deleteTransparencyDocument } from "@/app/admin/actions";
import { AdminBackLink, AdminNotice, AdminPageHeader } from "@/components/admin-form";
import { AdminDocumentForm } from "@/components/admin-document-form";
import { requireAdmin } from "@/lib/admin";
import { date } from "@/lib/format";
import type { TransparencyDocument } from "@/lib/supabase/types";

export default async function Page({ searchParams }: { searchParams: Promise<{ salvo?: string; excluido?: string; erro?: string }> }) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("transparency_documents").select("*").order("publication_date", { ascending: false });
  const documents = (data ?? []) as TransparencyDocument[];

  return (
    <section className="bg-paper py-14">
      <div className="container">
        <AdminPageHeader eyebrow="Admin" title="Transparência">
          <AdminBackLink />
        </AdminPageHeader>
        <AdminNotice searchParams={params} />

        <AdminDocumentForm />

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-forest">Documentos cadastrados</h2>
          <div className="mt-5 grid gap-4">
            {documents.length ? documents.map((document) => (
              <article className="rounded-md bg-white p-5 shadow-sm" key={document.id}>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase text-muted">{document.category} · {date(document.publication_date)} · {document.active ? "Publicado" : "Inativo"}</p>
                    <h3 className="mt-1 text-xl font-semibold text-forest">{document.title}</h3>
                    {document.description ? <p className="mt-2 text-sm text-muted">{document.description}</p> : null}
                    <a className="mt-3 inline-flex text-sm font-semibold text-forest underline" href={document.pdf_url} rel="noreferrer" target="_blank">Visualizar PDF</a>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link className="rounded-md border border-forest/15 px-4 py-2 text-sm font-semibold text-forest" href={`/admin/painel/transparencia/${document.id}`}>Editar</Link>
                    <form action={deleteTransparencyDocument}>
                      <input name="id" type="hidden" value={document.id} />
                      <button className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Excluir</button>
                    </form>
                  </div>
                </div>
              </article>
            )) : (
              <p className="rounded-md border border-dashed border-forest/20 bg-white p-6 text-muted">Nenhum documento cadastrado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
