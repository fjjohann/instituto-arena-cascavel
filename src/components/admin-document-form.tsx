"use client";

import { saveTransparencyDocument } from "@/app/admin/actions";
import { Field } from "@/components/admin-form";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { TransparencyDocument } from "@/lib/supabase/types";
import { useRef, useState, type FormEvent } from "react";

const categories = [
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

export function AdminDocumentForm({ document }: { document?: TransparencyDocument }) {
  const today = new Date().toISOString().slice(0, 10);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfUrlRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const fileInput = fileRef.current;
    const pdfUrlInput = pdfUrlRef.current;
    const file = fileInput?.files?.[0];

    if (!file || pdfUrlInput?.value) return;

    event.preventDefault();
    setUploadError(null);

    if (file.type !== "application/pdf") {
      setUploadError("Selecione um arquivo PDF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("O PDF deve ter no máximo 10 MB.");
      return;
    }

    setIsUploading(true);

    const supabase = createSupabaseBrowserClient();
    const extension = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "arquivo";
    const path = `documentos/${Date.now()}-${safeName}.${extension}`;
    const { error } = await supabase.storage.from("transparency-documents").upload(path, file, {
      contentType: file.type,
      upsert: false
    });

    if (error) {
      setIsUploading(false);
      setUploadError(error.message);
      return;
    }

    const { data } = supabase.storage.from("transparency-documents").getPublicUrl(path);
    if (pdfUrlInput) pdfUrlInput.value = data.publicUrl;
    if (fileInput) fileInput.disabled = true;
    formRef.current?.requestSubmit();
  }

  return (
    <form ref={formRef} action={saveTransparencyDocument} className="mt-8 grid gap-5 rounded-md bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      {document ? (
        <>
          <input name="id" type="hidden" value={document.id} />
        </>
      ) : null}
      <input ref={pdfUrlRef} name="existing_pdf_url" type="hidden" defaultValue={document?.pdf_url ?? ""} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Título" name="title" required>
          <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={document?.title ?? ""} name="title" required />
        </Field>
        <Field label="Categoria" name="category" required>
          <select className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={document?.category ?? "Outros documentos"} name="category" required>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Data de publicação" name="publication_date" required>
        <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" defaultValue={document?.publication_date ?? today} name="publication_date" required type="date" />
      </Field>

      <Field label="Descrição opcional" name="description">
        <textarea className="min-h-28 rounded-md border border-forest/15 p-3 text-ink" defaultValue={document?.description ?? ""} name="description" />
      </Field>

      <Field label="Arquivo PDF" name="pdf_file">
        <input ref={fileRef} accept="application/pdf" className="min-h-11 rounded-md border border-forest/15 bg-white px-3 py-2 text-ink" required={!document} type="file" />
      </Field>
      {uploadError ? <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{uploadError}</p> : null}

      <label className="flex items-center gap-3 text-sm font-semibold text-forest">
        <input defaultChecked={document?.active ?? true} name="active" type="checkbox" />
        Publicar documento no portal de transparência
      </label>

      <button className="min-h-11 rounded-md bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-60" disabled={isUploading} type="submit">
        {isUploading ? "Enviando PDF..." : "Salvar documento"}
      </button>
    </form>
  );
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
