import type { Metadata } from "next";
import { EmptyState, ImageFrame, Section } from "@/components/ui";
import { getPartners } from "@/lib/data";

export const metadata: Metadata = { title: "Parceiros" };

export default async function Page() {
  const partners = await getPartners();
  return (
    <Section eyebrow="Parceiros" title="Organizações que fortalecem a atuação institucional do Instituto.">
      {partners.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <article className="overflow-hidden rounded-md bg-white shadow-sm" key={partner.id}>
              <ImageFrame alt={`Logo de ${partner.name}`} className="aspect-[16/7]" label="Parceiro institucional" src={partner.logo_url} />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-forest">{partner.name}</h2>
                <p className="mt-1 text-sm text-muted">{partner.category}</p>
                {partner.description ? <p className="mt-4 text-muted">{partner.description}</p> : null}
                {partner.website_url ? (
                  <a className="mt-5 inline-flex text-sm font-semibold text-forest underline" href={partner.website_url} rel="noreferrer" target="_blank">
                    Visitar site
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState>Novos parceiros serão apresentados em breve.</EmptyState>
      )}
    </Section>
  );
}
