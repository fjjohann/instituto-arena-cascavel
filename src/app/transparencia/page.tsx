import type { Metadata } from "next";
import { EmptyState, Section } from "@/components/ui";
import { getDocuments } from "@/lib/data";
import { date } from "@/lib/format";

export const metadata: Metadata = { title: "Transparência" };

export default async function Page() {
  const documents = await getDocuments();
  return (
    <Section eyebrow="Transparência" title="Documentos institucionais e registros públicos do Instituto.">
      {documents.length ? (
        <div className="grid gap-4">
          {documents.map((document) => (
            <article className="rounded-md bg-white p-6 shadow-sm" key={document.id}>
              <p className="text-sm font-semibold uppercase text-muted">{document.category} · {date(document.publication_date)}</p>
              <h2 className="mt-2 text-xl font-semibold text-forest">{document.title}</h2>
              {document.description ? <p className="mt-2 text-muted">{document.description}</p> : null}
              <div className="mt-5 flex flex-wrap gap-3">
                <a className="inline-flex min-h-11 items-center rounded-md bg-lime px-4 py-2 text-sm font-semibold text-ink" href={document.pdf_url} rel="noreferrer" target="_blank">
                  Visualizar PDF
                </a>
                <a className="inline-flex min-h-11 items-center rounded-md border border-forest/15 px-4 py-2 text-sm font-semibold text-forest" download href={document.pdf_url}>
                  Baixar PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState>Os documentos de transparência serão publicados nesta área.</EmptyState>
      )}
    </Section>
  );
}
