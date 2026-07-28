import type { Metadata } from "next";
import { EmptyState, ImageFrame, Section } from "@/components/ui";
import { getActions } from "@/lib/data";
import { date } from "@/lib/format";

export const metadata: Metadata = { title: "Ações do Instituto" };

export default async function Page() {
  const actions = await getActions();
  return (
    <Section eyebrow="Ações" title="Registros de ações, encontros e iniciativas do Instituto.">
      {actions.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {actions.map((action) => (
            <article className="overflow-hidden rounded-md bg-white shadow-sm" key={action.id}>
              <ImageFrame alt={`Imagem da ação ${action.title}`} label="Ação institucional" src={action.cover_image_url} />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase text-muted">{date(action.action_date)}</p>
                <h2 className="mt-2 text-2xl font-semibold text-forest">{action.title}</h2>
                {action.description ? <p className="mt-3 text-muted">{action.description}</p> : null}
                {action.video_url ? <a className="mt-5 inline-flex text-sm font-semibold text-forest underline" href={action.video_url} rel="noreferrer" target="_blank">Ver vídeo</a> : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState>As ações do Instituto serão registradas aqui.</EmptyState>
      )}
    </Section>
  );
}
