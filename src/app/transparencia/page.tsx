import type { Metadata } from "next";
import { EmptyState, Section } from "@/components/ui";
import { getDocuments } from "@/lib/data";
import { date } from "@/lib/format";
import type { TransparencyDocument } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Transparência" };

const categoryOrder = [
  "Estrutura Organizacional",
  "Estatuto",
  "CNPJ e documentos institucionais",
  "Projetos aprovados",
  "Relatórios",
  "Certidões",
  "Balanço Patrimonial",
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
              <h2 className="text-2xl font-semibold text-forest">{category}</h2>
              <p className="mt-2 text-sm text-muted">
                {items.length === 1 ? "1 documento publicado nesta categoria." : `${items.length} documentos publicados nesta categoria.`}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {items.map((document) => (
                  <a className="inline-flex min-h-10 items-center rounded-md bg-forest px-4 py-2 text-sm font-semibold text-white transition hover:bg-lime hover:text-ink" href={document.pdf_url} key={document.id} rel="noreferrer" target="_blank" title={`${document.title} · ${date(document.publication_date)}`}>
                    {document.title}
                  </a>
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
