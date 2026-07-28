import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children,
  tone = "light"
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tone?: "light" | "white" | "dark";
}) {
  const toneClass = tone === "dark" ? "bg-forest text-white" : tone === "white" ? "bg-white" : "bg-paper";
  return (
    <section className={`py-14 md:py-20 ${toneClass}`}>
      <div className="container">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-lime">{eyebrow}</p> : null}
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const className =
    variant === "primary"
      ? "bg-lime text-ink hover:bg-white"
      : "border border-white/40 text-white hover:border-lime hover:text-lime";

  return (
    <Link className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${className}`} href={href}>
      {children}
    </Link>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-md border border-dashed border-forest/20 bg-white p-8 text-muted">{children}</div>;
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold uppercase text-forest">{children}</span>;
}

export function ImageFrame({
  src,
  alt,
  label,
  className = "aspect-[16/10]"
}: {
  src?: string | null;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-forest ${className}`}>
      {src ? (
        <Image alt={alt} className="object-cover" fill sizes="(min-width: 768px) 33vw, 100vw" src={src} />
      ) : (
        <div className="flex h-full min-h-48 items-end bg-[linear-gradient(135deg,#000706,#014227)] p-5">
          <span className="max-w-52 text-lg font-semibold leading-tight text-white">{label}</span>
        </div>
      )}
    </div>
  );
}
