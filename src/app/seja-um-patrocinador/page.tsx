import type { Metadata } from "next";
import { ButtonLink, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Seja um Patrocinador" };

export default function Page() {
  return (
    <>
      <Section eyebrow="Patrocínio" title="Apoie o desenvolvimento dos esportes de areia com impacto e visibilidade institucional.">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-lg leading-8 text-muted">
            <p>Empresas podem apoiar o Instituto Arena Cascavel em projetos de formação, desenvolvimento esportivo, alto rendimento e inclusão por meio do esporte.</p>
            <p>Quando o projeto é aprovado pela Lei Federal de Incentivo ao Esporte, o apoio pode ser direcionado com critérios formais, acompanhamento institucional e prestação de contas.</p>
          </div>
          <div className="rounded-md bg-forest p-6 text-white">
            <h2 className="text-2xl font-semibold">Por que apoiar?</h2>
            <ul className="mt-5 grid gap-3 text-white/75">
              <li>Fortalecimento da marca por meio de esporte e desenvolvimento humano.</li>
              <li>Relacionamento com iniciativa de credibilidade regional.</li>
              <li>Participação em projetos com transparência e governança.</li>
            </ul>
            <div className="mt-6"><ButtonLink href="/contato">Fale com o Instituto</ButtonLink></div>
          </div>
        </div>
      </Section>
      <Section title="Áreas que podem receber apoio" tone="white">
        <div className="grid gap-4 md:grid-cols-3">
          {["Formação esportiva", "Eventos e ações institucionais", "Desenvolvimento de atletas"].map((item) => (
            <div className="rounded-md border border-forest/10 p-6 font-semibold text-forest" key={item}>{item}</div>
          ))}
        </div>
      </Section>
    </>
  );
}
