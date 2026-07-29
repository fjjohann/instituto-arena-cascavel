"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { fileFromForm, galleryValues, moneyValue, nullableText, requireAdmin, slugify } from "@/lib/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectStatus } from "@/lib/supabase/types";

export async function signIn(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin?erro=configuracao");

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) redirect("/admin?erro=login");
  redirect("/admin/painel");
}

export async function signInWithMagicLink(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin?erro=configuracao");

  const email = String(formData.get("email") ?? "").trim();
  if (!email || (process.env.ADMIN_EMAIL && email !== process.env.ADMIN_EMAIL)) {
    redirect("/admin?erro=permissao");
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/admin/painel`,
      shouldCreateUser: false
    }
  });

  if (error) redirect("/admin?erro=magic-link");
  redirect("/admin?link=1");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin");
}

async function uploadPublicFile(bucket: string, file: File, prefix: string) {
  const { supabase } = await requireAdmin();
  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "arquivo";
  const path = `${prefix}/${Date.now()}-${safeName}.${extension}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function saveProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = nullableText(formData.get("id"));
  const officialName = String(formData.get("official_name") ?? "").trim();
  const slug = nullableText(formData.get("slug")) || slugify(officialName);

  if (!officialName || !slug) redirect("/admin/painel/projetos?erro=campos");

  let coverImageUrl = nullableText(formData.get("existing_cover_image_url"));
  const coverFile = fileFromForm(formData.get("cover_image"));
  if (coverFile) {
    if (!coverFile.type.startsWith("image/")) redirect("/admin/painel/projetos?erro=imagem");
    coverImageUrl = await uploadPublicFile("project-images", coverFile, "covers");
  }

  const payload = {
    official_name: officialName,
    slug,
    status: String(formData.get("status") ?? "em captação") as ProjectStatus,
    short_summary: nullableText(formData.get("short_summary")),
    full_description: nullableText(formData.get("full_description")),
    objective: nullableText(formData.get("objective")),
    target_audience: nullableText(formData.get("target_audience")),
    approved_amount: moneyValue(formData.get("approved_amount")),
    amount_to_raise: moneyValue(formData.get("amount_to_raise")),
    law_approval_body: nullableText(formData.get("law_approval_body")),
    execution_period: nullableText(formData.get("execution_period")),
    cover_image_url: coverImageUrl,
    gallery_image_urls: galleryValues(formData.get("gallery_image_urls")),
    sponsor_information: nullableText(formData.get("sponsor_information")),
    active: formData.get("active") === "on"
  };

  const result = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);

  if (result.error) redirect(`/admin/painel/projetos?erro=${encodeURIComponent(result.error.message)}`);

  revalidatePath("/");
  revalidatePath("/projetos");
  revalidatePath("/admin/painel/projetos");
  redirect("/admin/painel/projetos?salvo=1");
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = nullableText(formData.get("id"));
  if (!id) redirect("/admin/painel/projetos?erro=id");

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) redirect(`/admin/painel/projetos?erro=${encodeURIComponent(error.message)}`);

  revalidatePath("/");
  revalidatePath("/projetos");
  revalidatePath("/admin/painel/projetos");
  redirect("/admin/painel/projetos?excluido=1");
}

export async function saveTransparencyDocument(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = nullableText(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  let pdfUrl = nullableText(formData.get("existing_pdf_url"));
  const pdfFile = fileFromForm(formData.get("pdf_file"));

  if (!title) redirect("/admin/painel/transparencia?erro=campos");

  if (pdfFile) {
    if (pdfFile.type !== "application/pdf") redirect("/admin/painel/transparencia?erro=pdf");
    pdfUrl = await uploadPublicFile("transparency-documents", pdfFile, "documentos");
  }

  if (!pdfUrl) redirect("/admin/painel/transparencia?erro=pdf");

  const payload = {
    title,
    category: String(formData.get("category") ?? "Outros documentos"),
    publication_date: String(formData.get("publication_date") ?? ""),
    description: nullableText(formData.get("description")),
    pdf_url: pdfUrl,
    active: formData.get("active") === "on"
  };

  const result = id
    ? await supabase.from("transparency_documents").update(payload).eq("id", id)
    : await supabase.from("transparency_documents").insert(payload);

  if (result.error) redirect(`/admin/painel/transparencia?erro=${encodeURIComponent(result.error.message)}`);

  revalidatePath("/transparencia");
  revalidatePath("/admin/painel/transparencia");
  redirect("/admin/painel/transparencia?salvo=1");
}

export async function deleteTransparencyDocument(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = nullableText(formData.get("id"));
  if (!id) redirect("/admin/painel/transparencia?erro=id");

  const { error } = await supabase.from("transparency_documents").delete().eq("id", id);
  if (error) redirect(`/admin/painel/transparencia?erro=${encodeURIComponent(error.message)}`);

  revalidatePath("/transparencia");
  revalidatePath("/admin/painel/transparencia");
  redirect("/admin/painel/transparencia?excluido=1");
}
