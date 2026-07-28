import Link from "next/link";
import { AdminBackLink, AdminNotice, AdminPageHeader } from "@/components/admin-form";
import { AdminProjectForm } from "@/components/admin-project-form";
import { deleteProject } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";
import { currency } from "@/lib/format";
import type { Project } from "@/lib/supabase/types";

export default async function Page({ searchParams }: { searchParams: Promise<{ salvo?: string; excluido?: string; erro?: string }> }) {
  const params = await searchParams;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  return (
    <section className="bg-paper py-14">
      <div className="container">
        <AdminPageHeader eyebrow="Admin" title="Projetos">
          <AdminBackLink />
        </AdminPageHeader>
        <AdminNotice searchParams={params} />

        <AdminProjectForm />

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-forest">Projetos cadastrados</h2>
          <div className="mt-5 grid gap-4">
            {projects.length ? projects.map((project) => (
              <article className="rounded-md bg-white p-5 shadow-sm" key={project.id}>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase text-muted">{project.status} · {project.active ? "Publicado" : "Inativo"}</p>
                    <h3 className="mt-1 text-xl font-semibold text-forest">{project.official_name}</h3>
                    <p className="mt-2 text-sm text-muted">{project.short_summary || "Sem resumo cadastrado."}</p>
                    <p className="mt-3 text-sm text-muted">Aprovado: {currency(project.approved_amount)} · A captar: {currency(project.amount_to_raise)}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link className="rounded-md border border-forest/15 px-4 py-2 text-sm font-semibold text-forest" href={`/admin/painel/projetos/${project.id}`}>Editar</Link>
                    <form action={deleteProject}>
                      <input name="id" type="hidden" value={project.id} />
                      <button className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700" type="submit">Excluir</button>
                    </form>
                  </div>
                </div>
              </article>
            )) : (
              <p className="rounded-md border border-dashed border-forest/20 bg-white p-6 text-muted">Nenhum projeto cadastrado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
