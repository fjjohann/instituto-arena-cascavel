import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-paper py-20">
      <div className="container">
        <h1 className="text-4xl font-semibold text-forest">Página não encontrada</h1>
        <p className="mt-4 text-muted">O conteúdo solicitado não está disponível.</p>
        <Link className="mt-8 inline-flex rounded-md bg-lime px-5 py-3 text-sm font-semibold text-ink" href="/">Voltar ao início</Link>
      </div>
    </section>
  );
}
