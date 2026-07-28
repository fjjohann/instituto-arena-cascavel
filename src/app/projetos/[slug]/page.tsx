import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, ImageFrame, Section, StatusBadge } from "@/components/ui";
import { getProject } from "@/lib/data";
import { currency } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return { title: project?.official_name ?? "Projeto" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <Section eyebrow="Projeto" title={project.official_name}>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <article className="space-y-8 text-lg leading-8 text-muted">
          <ImageFrame
            alt={`Imagem do projeto ${project.official_name}`}
            className="aspect-[16/8]"
            label="Projeto institucional"
            src={project.cover_image_url}
          />
          <StatusBadge>{project.status}</StatusBadge>
          <p>{project.full_description || project.short_summary}</p>
          {project.objective ? <p><strong className="text-forest">Objetivo:</strong> {project.objective}</p> : null}
          {project.target_audience ? <p><strong className="text-forest">Público-alvo:</strong> {project.target_audience}</p> : null}
          {project.sponsor_information ? <p><strong className="text-forest">Informações para patrocinadores:</strong> {project.sponsor_information}</p> : null}
          {project.gallery_image_urls?.length ? (
            <div>
              <h2 className="text-2xl font-semibold text-forest">Galeria</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.gallery_image_urls.map((imageUrl) => (
                  <ImageFrame alt={`Imagem da galeria do projeto ${project.official_name}`} key={imageUrl} label="Galeria do projeto" src={imageUrl} />
                ))}
              </div>
            </div>
          ) : null}
        </article>
        <aside className="rounded-md bg-white p-6 shadow-sm">
          <dl className="grid gap-4 text-sm">
            <div><dt className="font-semibold text-forest">Valor aprovado</dt><dd className="text-muted">{currency(project.approved_amount)}</dd></div>
            <div><dt className="font-semibold text-forest">Valor a captar</dt><dd className="text-muted">{currency(project.amount_to_raise)}</dd></div>
            <div><dt className="font-semibold text-forest">Lei/órgão</dt><dd className="text-muted">{project.law_approval_body || "A informar"}</dd></div>
            <div><dt className="font-semibold text-forest">Período</dt><dd className="text-muted">{project.execution_period || "A informar"}</dd></div>
          </dl>
          <div className="mt-6 rounded-md bg-forest p-5">
            <p className="text-sm leading-6 text-white/75">Empresas interessadas em apoiar projetos do Instituto podem conversar diretamente com a equipe institucional.</p>
            <div className="mt-4">
              <ButtonLink href="/contato">Fale com o Instituto</ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
