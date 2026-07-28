import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, ImageFrame, Section, StatusBadge } from "@/components/ui";
import { getProjects } from "@/lib/data";
import { currency } from "@/lib/format";
import type { ProjectStatus } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Projetos" };

const statusFilters: Array<{ label: string; value?: ProjectStatus }> = [
  { label: "Todos" },
  { label: "Projetos em captação", value: "em captação" },
  { label: "Projetos aprovados", value: "aprovado" },
  { label: "Projetos em execução", value: "em execução" },
  { label: "Projetos concluídos", value: "concluído" }
];

export default async function Page({ searchParams }: { searchParams: Promise<{ status?: ProjectStatus }> }) {
  const params = await searchParams;
  const projects = await getProjects();
  const selectedStatus = statusFilters.some((filter) => filter.value === params.status) ? params.status : undefined;
  const filteredProjects = selectedStatus ? projects.filter((project) => project.status === selectedStatus) : projects;

  return (
    <Section eyebrow="Projetos" title="Projetos aprovados, em captação ou em execução pelo Instituto.">
      <div className="mb-8 flex flex-wrap gap-2">
        {statusFilters.map((filter) => {
          const active = filter.value === selectedStatus || (!filter.value && !selectedStatus);
          const href = filter.value ? `/projetos?status=${encodeURIComponent(filter.value)}` : "/projetos";

          return (
            <Link
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active ? "border-forest bg-forest text-white" : "border-forest/15 bg-white text-forest hover:border-forest"
              }`}
              href={href}
              key={filter.label}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>
      {filteredProjects.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <Link className="overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1" href={`/projetos/${project.slug}`} key={project.id}>
              <ImageFrame alt={`Imagem do projeto ${project.official_name}`} label="Projeto institucional" src={project.cover_image_url} />
              <div className="p-6">
                <StatusBadge>{project.status}</StatusBadge>
                <h2 className="mt-4 text-2xl font-semibold text-forest">{project.official_name}</h2>
                <p className="mt-3 text-muted">{project.short_summary}</p>
                <dl className="mt-5 grid gap-3 text-sm text-muted sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-forest">Valor aprovado</dt>
                    <dd>{currency(project.approved_amount)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-forest">Valor a captar</dt>
                    <dd>{currency(project.amount_to_raise)}</dd>
                  </div>
                </dl>
                <span className="mt-5 inline-flex text-sm font-semibold text-forest underline">Ver detalhes</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState>
          {projects.length ? "Não há projetos ativos neste status no momento." : "Os projetos do Instituto serão disponibilizados em breve."}
        </EmptyState>
      )}
    </Section>
  );
}
