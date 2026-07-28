import Image from "next/image";
import Link from "next/link";
import { EmptyState, ImageFrame, Section, StatusBadge, ButtonLink } from "@/components/ui";
import { getPartners, getProjects } from "@/lib/data";

export default async function Home() {
  const [projects, partners] = await Promise.all([getProjects(3), getPartners(6)]);

  return (
    <>
      <section className="bg-forest text-white">
        <div className="container grid min-h-[calc(100svh-80px)] items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative mb-8 h-24 w-80 max-w-full">
              <Image
                alt="Logomarca do Instituto Arena Cascavel"
                className="object-contain object-left"
                fill
                priority
                sizes="320px"
                src="/images/logo-verde-claro.png"
              />
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              Fomentando o esporte, formando pessoas e criando oportunidades através dos esportes de areia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              O Instituto Arena Cascavel atua no desenvolvimento esportivo, na formação humana e na construção de projetos com impacto social, transparência e valor institucional.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projetos">Conheça os Projetos</ButtonLink>
              <ButtonLink href="/seja-um-patrocinador" variant="secondary">Seja um Patrocinador</ButtonLink>
            </div>
          </div>
          <div className="rounded-md border border-white/10 bg-ink/40 p-6 shadow-2xl shadow-ink/30">
            <div className="relative mx-auto aspect-[1110/452] w-full max-w-md">
              <Image
                alt="Identidade visual do Instituto Arena Cascavel"
                className="object-contain"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                src="/images/logo-verde-claro.png"
              />
            </div>
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-6">
              {["Desenvolvimento esportivo", "Beach tennis e esportes de areia", "Projetos incentivados", "Transparência institucional"].map((item) => (
                <div className="border-l-4 border-lime py-2 pl-4 text-base font-medium" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Instituto" title="Uma plataforma institucional para esporte, formação e impacto.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Esporte", "Incentivo à prática, ao treinamento e ao desenvolvimento técnico nos esportes de areia."],
            ["Formação", "Projetos orientados por disciplina, convivência, saúde e construção de oportunidades."],
            ["Credibilidade", "Governança, transparência documental e diálogo claro com patrocinadores e parceiros."]
          ].map(([title, text]) => (
            <article className="rounded-md bg-white p-6 shadow-sm" key={title}>
              <h3 className="text-xl font-semibold text-forest">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Projetos" title="Projetos institucionais">
        {projects.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Link className="overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1" href={`/projetos/${project.slug}`} key={project.id}>
                <ImageFrame alt={`Imagem do projeto ${project.official_name}`} label="Projeto institucional" src={project.cover_image_url} />
                <div className="p-6">
                  <StatusBadge>{project.status}</StatusBadge>
                  <h3 className="mt-4 text-xl font-semibold text-forest">{project.official_name}</h3>
                  <p className="mt-3 line-clamp-3 text-muted">{project.short_summary}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState>Os projetos do Instituto serão disponibilizados em breve.</EmptyState>
        )}
      </Section>

      <Section eyebrow="Lei de Incentivo" title="Empresas podem apoiar projetos esportivos aprovados com segurança institucional." tone="dark">
        <div className="max-w-3xl text-lg leading-8 text-white/75">
          Por meio da Lei Federal de Incentivo ao Esporte, empresas podem direcionar apoio a projetos aprovados, fortalecendo iniciativas de formação, desenvolvimento esportivo e impacto social com transparência e prestação de contas.
        </div>
      </Section>

      <Section eyebrow="Parceiros" title="Rede de apoio institucional">
        {partners.length ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {partners.map((partner) => (
              <article className="rounded-md bg-white p-5 shadow-sm" key={partner.id}>
                <p className="font-semibold text-forest">{partner.name}</p>
                <p className="mt-1 text-sm text-muted">{partner.category}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState>Novos parceiros serão apresentados em breve.</EmptyState>
        )}
      </Section>
    </>
  );
}
