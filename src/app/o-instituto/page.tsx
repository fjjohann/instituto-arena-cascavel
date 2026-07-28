import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "O Instituto" };

export default function Page() {
  return (
    <>
      <Section eyebrow="O Instituto" title="Desenvolvimento esportivo com responsabilidade, governança e visão de futuro.">
        <div className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
          <p>O Instituto Arena Cascavel nasce para fortalecer os esportes de areia no Paraná, com atenção especial ao beach tennis, à formação de atletas e à criação de oportunidades por meio do esporte.</p>
          <p>A atuação combina projetos de base, desenvolvimento técnico, alto rendimento, impacto social e relacionamento institucional com empresas, poder público e organizações esportivas.</p>
        </div>
      </Section>
      <Section title="Pilares de atuação" tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {["Formação humana", "Desenvolvimento de atletas", "Projetos incentivados", "Transparência e prestação de contas"].map((item) => (
            <div className="rounded-md border border-forest/10 p-6" key={item}>
              <h2 className="text-xl font-semibold text-forest">{item}</h2>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
