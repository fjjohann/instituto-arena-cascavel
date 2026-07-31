import type { Metadata } from "next";
import { EmptyState, Section } from "@/components/ui";
import { getDocuments } from "@/lib/data";
import { date } from "@/lib/format";
import type { TransparencyDocument } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Transparência" };

const categoryOrder = [
  "Estatuto",
  "CNPJ e documentos institucionais",
  "Projetos aprovados",
  "Relatórios",
  "Certidões",
  "Prestação de contas",
  "Outros documentos"
];

export default async function Page() {
  const documents = await getDocuments();
  const groupedDocuments = groupDocumentsByCategory(documents);

  return (
    <Section eyebrow="Transparência" title="Documentos institucionais e registros públicos do Instituto.">
      {groupedDocuments.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {groupedDocuments.map(({ category, items }) => (
            <article className="rounded-md bg-white p-6 shadow-sm" key={category}>
              <p className="text-sm font-semibold uppercase text-lime">Categoria</p>
              <h2 className="mt-1 text-2xl font-semibold text-forest">{category}</h2>
              <div className="mt-5 grid gap-3">
                {items.map((document) => (
                  <div className="rounded-md border border-forest/10 p-4" key={document.id}>
                    <p className="text-xs font-semibold uppercase text-muted">{date(document.publication_date)}</p>
                    <h3 className="mt-1 text-lg font-semibold text-forest">{document.title}</h3>
                    {document.description ? <p className="mt-1 text-sm leading-6 text-muted">{document.description}</p> : null}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a className="inline-flex min-h-10 items-center rounded-md bg-lime px-4 py-2 text-sm font-semibold text-ink" href={document.pdf_url} rel="noreferrer" target="_blank">
                        Visualizar PDF
                      </a>
                      <a className="inline-flex min-h-10 items-center rounded-md border border-forest/15 px-4 py-2 text-sm font-semibold text-forest" download href={document.pdf_url}>
                        Baixar PDF
                      </a>
                    </div>
                  </div>
                ))}
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

function groupDocumentsByCategory(documents: TransparencyDocument[]) {
  const groups = documents.reduce<Record<string, TransparencyDocument[]>>((acc, document) => {
    const category = document.category || "Outros documentos";
    acc[category] = [...(acc[category] ?? []), document];
    return acc;
  }, {});

  return Object.entries(groups).sort(([categoryA], [categoryB]) => {
    const indexA = categoryOrder.indexOf(categoryA);
    const indexB = categoryOrder.indexOf(categoryB);

    if (indexA === -1 && indexB === -1) return categoryA.localeCompare(categoryB, "pt-BR");
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  }).map(([category, items]) => ({ category, items }));
}
