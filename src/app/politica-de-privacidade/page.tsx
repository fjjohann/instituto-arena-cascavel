import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function Page() {
  return (
    <Section eyebrow="Privacidade" title="Política de Privacidade">
      <div className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
        <p>Os dados enviados pelos formulários do site são utilizados exclusivamente para contato institucional, relacionamento com parceiros, comunicação sobre patrocínio e acompanhamento de solicitações.</p>
        <p>Podem ser coletados nome, empresa ou órgão, e-mail, WhatsApp, tipo de interesse e mensagem. As informações não são comercializadas nem compartilhadas para finalidades incompatíveis com o contato solicitado.</p>
        <p>O titular pode solicitar atualização, esclarecimento ou exclusão de seus dados pelo e-mail institutoarenacascavel@gmail.com.</p>
      </div>
    </Section>
  );
}
