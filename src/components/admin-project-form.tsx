import { saveProject } from "@/app/admin/actions";
import { Field } from "@/components/admin-form";
import type { Project } from "@/lib/supabase/types";

const statuses = ["em captação", "aprovado", "em execução", "concluído"];

export function AdminProjectForm({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="mt-8 grid gap-5 rounded-md bg-white p-6 shadow-sm">
      {project ? (
        <>
          <input name="id" type="hidden" value={project.id} />
          <input name="existing_cover_image_url" type="hidden" value={project.cover_image_url ?? ""} />
        </>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nome oficial" name="official_name" required>
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.official_name ?? ""} name="official_name" required />
        </Field>
        <Field label="Slug" name="slug">
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.slug ?? ""} name="slug" placeholder="gerado automaticamente se ficar vazio" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Status" name="status" required>
          <select className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.status ?? "em captação"} name="status" required>
            {statuses.map((status) => <option key={status}>{status}</option>)}
          </select>
        </Field>
        <Field label="Valor aprovado" name="approved_amount">
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.approved_amount ?? ""} inputMode="decimal" name="approved_amount" placeholder="0,00" />
        </Field>
        <Field label="Valor a captar" name="amount_to_raise">
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.amount_to_raise ?? ""} inputMode="decimal" name="amount_to_raise" placeholder="0,00" />
        </Field>
      </div>

      <Field label="Resumo curto" name="short_summary">
        <textarea className="min-h-24 rounded-md border border-forest/15 p-3 text-ink" defaultValue={project?.short_summary ?? ""} name="short_summary" />
      </Field>
      <Field label="Descrição completa" name="full_description">
        <textarea className="min-h-40 rounded-md border border-forest/15 p-3 text-ink" defaultValue={project?.full_description ?? ""} name="full_description" />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Objetivo" name="objective">
          <textarea className="min-h-28 rounded-md border border-forest/15 p-3 text-ink" defaultValue={project?.objective ?? ""} name="objective" />
        </Field>
        <Field label="Público beneficiado" name="target_audience">
          <textarea className="min-h-28 rounded-md border border-forest/15 p-3 text-ink" defaultValue={project?.target_audience ?? ""} name="target_audience" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Lei/órgão de aprovação" name="law_approval_body">
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.law_approval_body ?? ""} name="law_approval_body" />
        </Field>
        <Field label="Período de execução" name="execution_period">
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={project?.execution_period ?? ""} name="execution_period" />
        </Field>
      </div>

      <Field label="Imagem de capa" name="cover_image">
        <input accept="image/*" className="min-h-11 rounded-md border border-forest/15 bg-white px-3 py-2 text-ink" name="cover_image" type="file" />
      </Field>

      <Field label="Galeria de imagens" name="gallery_image_urls">
        <textarea
          className="min-h-24 rounded-md border border-forest/15 p-3 text-ink"
          defaultValue={project?.gallery_image_urls?.join("\n") ?? ""}
          name="gallery_image_urls"
          placeholder="Cole uma URL por linha"
        />
      </Field>

      <Field label="Informações para patrocinadores" name="sponsor_information">
        <textarea className="min-h-28 rounded-md border border-forest/15 p-3 text-ink" defaultValue={project?.sponsor_information ?? ""} name="sponsor_information" />
      </Field>

      <label className="flex items-center gap-3 text-sm font-semibold text-forest">
        <input defaultChecked={project?.active ?? true} name="active" type="checkbox" />
        Publicar projeto no site
      </label>

      <button className="min-h-11 rounded-md bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-forest hover:text-white" type="submit">
        Salvar projeto
      </button>
    </form>
  );
}
