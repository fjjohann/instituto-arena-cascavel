import Link from "next/link";
import type { ReactNode } from "react";

export function AdminPageHeader({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-semibold uppercase text-lime">{eyebrow}</p>
        <h1 className="text-3xl font-semibold text-forest">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function AdminNotice({ searchParams }: { searchParams: { salvo?: string; excluido?: string; erro?: string } }) {
  if (searchParams.salvo) {
    return <p className="mt-6 rounded-md border border-lime/40 bg-lime/15 p-4 text-sm font-semibold text-forest">Registro salvo com sucesso.</p>;
  }

  if (searchParams.excluido) {
    return <p className="mt-6 rounded-md border border-lime/40 bg-lime/15 p-4 text-sm font-semibold text-forest">Registro excluído com sucesso.</p>;
  }

  if (searchParams.erro) {
    return <p className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">Não foi possível concluir a ação: {searchParams.erro}</p>;
  }

  return null;
}

export function Field({
  label,
  name,
  children,
  required = false
}: {
  label: string;
  name: string;
  children?: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-forest">
      {label}
      {children ?? <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" name={name} required={required} />}
    </label>
  );
}

export function AdminBackLink({ href = "/admin/painel" }: { href?: string }) {
  return (
    <Link className="rounded-md border border-forest/15 px-4 py-2 text-sm font-semibold text-forest" href={href}>
      Voltar
    </Link>
  );
}
