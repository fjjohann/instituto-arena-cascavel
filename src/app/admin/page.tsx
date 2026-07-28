import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signIn } from "@/app/admin/actions";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Admin" };

export default async function Page({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (data.user) redirect("/admin/painel");

  return (
    <section className="bg-paper py-16">
      <div className="container max-w-md">
        <h1 className="text-3xl font-semibold text-forest">Acesso administrativo</h1>
        {!hasSupabaseEnv() ? (
          <p className="mt-4 rounded-md border border-forest/15 bg-white p-4 text-sm text-muted">
            Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar o login.
          </p>
        ) : null}
        {params.erro ? <p className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">Não foi possível acessar. Verifique as credenciais.</p> : null}
        <form action={signIn} className="mt-6 grid gap-4 rounded-md bg-white p-6 shadow-sm">
          <label className="grid gap-2 text-sm font-semibold text-forest">E-mail<input className="min-h-11 rounded-md border border-forest/15 px-3" name="email" required type="email" /></label>
          <label className="grid gap-2 text-sm font-semibold text-forest">Senha<input className="min-h-11 rounded-md border border-forest/15 px-3" name="password" required type="password" /></label>
          <button className="min-h-11 rounded-md bg-lime px-5 py-3 text-sm font-semibold text-ink" type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
}
