import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { InstituteAction, Partner, Project, TransparencyDocument } from "@/lib/supabase/types";

export async function getProjects(limit?: number) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as Project[];

  let query = supabase
    .from("projects")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data ?? []) as Project[];
}

export async function getProject(slug: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase.from("projects").select("*").eq("active", true).eq("slug", slug).single();
  return data as Project | null;
}

export async function getDocuments() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as TransparencyDocument[];

  const { data } = await supabase
    .from("transparency_documents")
    .select("*")
    .eq("active", true)
    .order("publication_date", { ascending: false });

  return (data ?? []) as TransparencyDocument[];
}

export async function getPartners(limit?: number) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as Partner[];

  let query = supabase
    .from("partners")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data ?? []) as Partner[];
}

export async function getActions() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as InstituteAction[];

  const { data } = await supabase
    .from("institute_actions")
    .select("*")
    .eq("active", true)
    .order("action_date", { ascending: false });

  return (data ?? []) as InstituteAction[];
}
