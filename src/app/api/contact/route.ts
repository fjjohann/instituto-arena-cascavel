import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const required = ["name", "email", "whatsapp", "interest", "message", "privacy"];
  const missing = required.some((field) => !String(form.get(field) ?? "").trim());

  if (missing) {
    return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
  }

  const email = String(form.get("email"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  // Integrações de e-mail podem ser conectadas aqui no Vercel, por exemplo Resend ou SMTP transacional.
  return NextResponse.redirect(new URL("/contato?enviado=1", request.url), { status: 303 });
}
