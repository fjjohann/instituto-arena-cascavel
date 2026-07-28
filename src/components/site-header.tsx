import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Início", "/"],
  ["Sobre", "/o-instituto"],
  ["Projetos", "/projetos"],
  ["Transparência", "/transparencia"],
  ["Contato", "/contato"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-forest/10 bg-white/95 backdrop-blur">
      <div className="container flex min-h-20 items-center justify-between gap-6">
        <Link className="flex items-center" href="/">
          <span className="relative block h-12 w-40 sm:w-48">
            <Image
              alt="Logomarca do Instituto Arena Cascavel"
              className="object-contain object-left"
              fill
              priority
              sizes="(min-width: 640px) 192px, 160px"
              src="/images/logo-verde-escuro.png"
            />
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-muted lg:flex">
          {nav.map(([label, href]) => (
            <Link className="transition hover:text-forest" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <details className="relative lg:hidden">
          <summary className="cursor-pointer rounded-md border border-forest/15 px-3 py-2 text-sm font-semibold text-forest">Menu</summary>
          <nav className="absolute right-0 mt-3 grid w-72 gap-1 rounded-md border border-forest/10 bg-white p-3 text-sm shadow-xl">
            {nav.map(([label, href]) => (
              <Link className="rounded-md px-3 py-2 text-muted hover:bg-paper hover:text-forest" href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
