# Instituto Arena Cascavel

Site institucional em Next.js para o Instituto Arena Cascavel, com páginas públicas, integração Supabase, admin por Supabase Auth e migração inicial de banco/storage.

## Como rodar

```bash
pnpm install
pnpm dev
```

Se `pnpm` não estiver disponível no ambiente local, use `npm install` e `npm run dev`.

Crie um `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_TO_EMAIL=institutoarenacascavel@gmail.com
```

## Supabase

Execute `supabase/migrations/001_initial_schema.sql` no SQL Editor do projeto Supabase. Depois crie manualmente o usuário admin em Authentication. O site não permite cadastro público.

Buckets previstos:

- `transparency-documents`
- `project-images`
- `partner-logos`
- `action-images`
- `site-media`

## Observações

O formulário de contato valida os campos e redireciona após envio. Para envio real de e-mail em produção, conecte uma integração transacional na rota `src/app/api/contact/route.ts`, como Resend, SMTP ou serviço equivalente.

O painel administrativo já possui login protegido por Supabase Auth e CRUD inicial para:

- Projetos, com upload de imagem de capa no bucket `project-images`.
- Documentos de transparência, com upload de PDF no bucket `transparency-documents`.

Parceiros e Ações do Instituto seguem como próximas etapas do painel.

## Publicação

Fluxo recomendado:

1. Criar ou conectar o repositório no GitHub.
2. Publicar na Vercel usando o repositório GitHub.
3. Configurar no Vercel as mesmas variáveis do `.env.local`.
4. Executar a migration no Supabase e criar o usuário admin.
5. Quando o domínio estiver registrado no Registro.br, apontar os DNS para a Vercel.

Para produção, ajuste:

```bash
NEXT_PUBLIC_SITE_URL=https://seudominio.org.br
```
