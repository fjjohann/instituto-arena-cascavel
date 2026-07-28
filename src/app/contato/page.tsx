import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Contato" };

export default async function Page({ searchParams }: { searchParams: Promise<{ enviado?: string }> }) {
  const params = await searchParams;

  return (
    <Section eyebrow="Contato" title="Converse com o Instituto Arena Cascavel.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-md bg-forest p-6 text-white">
          <h2 className="text-2xl font-semibold">Canais oficiais</h2>
          <a className="mt-5 block text-white/75 hover:text-lime" href="mailto:institutoarenacascavel@gmail.com">institutoarenacascavel@gmail.com</a>
          <a className="block text-white/75 hover:text-lime" href="https://wa.me/5541999260098" rel="noreferrer" target="_blank">(41) 99926-0098</a>
        </aside>
        <form className="grid gap-4 rounded-md bg-white p-6 shadow-sm" action="/api/contact" method="post">
          {params.enviado ? (
            <p className="rounded-md border border-lime/40 bg-lime/15 p-4 text-sm font-semibold text-forest">
              Mensagem enviada. O Instituto retornará pelo canal informado.
            </p>
          ) : null}
          {[
            ["Nome", "name", "text"],
            ["Empresa/órgão", "organization", "text"],
            ["E-mail", "email", "email"],
            ["WhatsApp", "whatsapp", "tel"]
          ].map(([label, name, type]) => (
            <label className="grid gap-2 text-sm font-semibold text-forest" key={name}>
              {label}
              <input className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" name={name} required={name !== "organization"} type={type} />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-forest">
            Tipo de interesse
            <select className="min-h-11 rounded-md border border-forest/15 px-3 text-ink" name="interest" required>
              {["Patrocínio", "Parceria", "Imprensa", "Projeto", "Outro"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-forest">
            Mensagem
            <textarea className="min-h-32 rounded-md border border-forest/15 p-3 text-ink" name="message" required />
          </label>
          <label className="flex gap-3 text-sm text-muted">
            <input className="mt-1" name="privacy" required type="checkbox" />
            <span>
              Declaro que li e concordo com a{" "}
              <Link className="font-semibold text-forest underline" href="/politica-de-privacidade">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>
          <button className="min-h-11 rounded-md bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-forest hover:text-white" type="submit">
            Enviar mensagem
          </button>
        </form>
      </div>
    </Section>
  );
}
