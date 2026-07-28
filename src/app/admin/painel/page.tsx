import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";

export default async function Page() {
  await requireAdmin();

  const modules = [
    ["Projetos", "Cadastro de projetos aprovados, em captação, execução ou concluídos.", "/admin/painel/projetos", "Gerenciar"],
    ["Transparência", "Publicação de documentos PDF institucionais.", "/admin/painel/transparencia", "Gerenciar"],
    ["Parceiros", "Gestão de parceiros e ordem de exibição.", "/admin/painel", "Próxima etapa"],
    ["Ações do Instituto", "Registro de ações, galerias e links de vídeo.", "/admin/painel", "Próxima etapa"],
    ["Mídia", "Uploads em buckets do Supabase Storage.", "/admin/painel", "Integrado aos formulários"]
  ];

  return (
    <section className="bg-paper py-14">
      <div className="container">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-lime">Admin</p>
            <h1 className="text-3xl font-semibold text-forest">Painel administrativo</h1>
          </div>
          <form action={signOut}><button className="rounded-md border border-forest/15 px-4 py-2 text-sm font-semibold text-forest">Sair</button></form>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {modules.map(([title, text, href, action]) => (
            <article className="rounded-md bg-white p-6 shadow-sm" key={title}>
              <h2 className="text-xl font-semibold text-forest">{title}</h2>
              <p className="mt-2 text-muted">{text}</p>
              <Link className="mt-5 inline-flex text-sm font-semibold text-forest underline" href={href}>{action}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
