import Link from "next/link";

const footerLinks = [
  ["Início", "/"],
  ["Sobre", "/o-instituto"],
  ["Projetos", "/projetos"],
  ["Transparência", "/transparencia"],
  ["Contato", "/contato"]
];

export function SiteFooter() {
  return (
    <footer className="bg-ink py-10 text-white">
      <div className="container grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">Instituto Arena Cascavel</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
            Fomentando o esporte, formando pessoas e criando oportunidades através dos esportes de areia.
          </p>
          <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Instituto Arena Cascavel. Todos os direitos reservados.</p>
        </div>
        <div className="text-sm text-white/70">
          <p className="font-semibold text-white">Contato</p>
          <a className="mt-3 block hover:text-lime" href="mailto:institutoarenacascavel@gmail.com">institutoarenacascavel@gmail.com</a>
          <a className="block hover:text-lime" href="https://wa.me/5541999260098" rel="noreferrer" target="_blank">(41) 99926-0098</a>
        </div>
        <div className="grid gap-2 text-sm text-white/70">
          {footerLinks.map(([label, href]) => (
            <Link className="hover:text-lime" href={href} key={href}>{label}</Link>
          ))}
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
          <Link className="text-white/45 hover:text-lime" href="/admin">Acesso administrativo</Link>
        </div>
      </div>
    </footer>
  );
}
