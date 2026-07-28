import { notFound } from "next/navigation";
import { AdminBackLink, AdminPageHeader } from "@/components/admin-form";
import { AdminProjectForm } from "@/components/admin-project-form";
import { requireAdmin } from "@/lib/admin";
import type { Project } from "@/lib/supabase/types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select("*").eq("id", id).single();
  if (!data) notFound();

  const project = data as Project;

  return (
    <section className="bg-paper py-14">
      <div className="container">
        <AdminPageHeader eyebrow="Admin" title={`Editar projeto: ${project.official_name}`}>
          <AdminBackLink href="/admin/painel/projetos" />
        </AdminPageHeader>
        <AdminProjectForm project={project} />
      </div>
    </section>
  );
}
