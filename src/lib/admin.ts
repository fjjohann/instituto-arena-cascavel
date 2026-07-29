import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin?erro=configuracao");

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/admin");
  if (process.env.ADMIN_EMAIL && data.user.email !== process.env.ADMIN_EMAIL) {
    await supabase.auth.signOut();
    redirect("/admin?erro=permissao");
  }

  return { supabase, user: data.user };
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nullableText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text || null;
}

export function moneyValue(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return null;

  const normalized = text.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function galleryValues(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  if (!text) return [];

  return text
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function fileFromForm(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return null;
  return value;
}
