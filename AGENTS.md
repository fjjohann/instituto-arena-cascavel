# AGENTS.md — Instituto Arena Cascavel

## Project overview

This project is the official website for **Instituto Arena Cascavel**, a nonprofit institution created to promote the growth of sand sports in Paraná, especially beach tennis.

The website must serve three main purposes:

1. Provide an official institutional presence for regulatory and credibility purposes.
2. Present the Institute, its mission, projects, transparency documents and actions.
3. Support sponsorship and partnership conversations, especially for projects approved through Brazil’s Federal Sports Incentive Law.

The website must feel professional, institutional, clean, trustworthy and modern.

Do not make it look like a generic charity website, an abandoned blog or an overly emotional NGO landing page.

## Main positioning

The Institute is not only a social project. It works with:

* sports development;
* beach tennis;
* athlete development;
* high performance;
* human formation;
* social impact;
* transparency;
* institutional credibility;
* partnerships with companies, public sector and sports organizations.

The tone must balance social impact and professional sponsorship value.

## Language

All visible website copy must be in **Brazilian Portuguese**.

Use institutional, clear and professional language.

Avoid:

* childish tone;
* excessive emotional appeal;
* exaggerated promises;
* aggressive sales language;
* generic charity clichés;
* saying or implying that sponsors are “donating for free” without return;
* overusing the word “doação”.

Prefer terms such as:

* apoio;
* patrocínio;
* parceria;
* incentivo;
* projeto incentivado;
* impacto;
* visibilidade institucional;
* esporte como ferramenta de desenvolvimento.

## Design direction

The design must be:

* clean;
* institutional;
* modern;
* responsive;
* elegant;
* mobile-first;
* easy to read;
* visually aligned with the Instituto Arena Cascavel logo.

Use colors inspired by the logo:

* very dark green / almost black: `#000706`
* institutional dark green: `#014227`
* medium green: `#044024`
* lime green accent: `#ACE121`
* white: `#FFFFFF`
* light background: `#F7F9F7`
* secondary text: `#5F6B63`

Use the lime green only as an accent for buttons, details and highlights. Do not overuse it.

Avoid visual clutter, excessive gradients, excessive animations and overly colorful layouts.

## Technical stack

Prefer this stack unless the repository already has a different setup:

* Next.js with App Router
* TypeScript
* Tailwind CSS
* Supabase for database, authentication and storage
* Supabase Auth for the admin login
* Supabase Storage for PDFs and images
* Vercel-ready deployment

Use clean, reusable components.

Keep code organized and readable.

## Package manager

Use the package manager already present in the repository.

If none exists, prefer `pnpm`.

Do not introduce unnecessary dependencies.

Ask before adding large or unusual production dependencies.

## Public pages

The website should have these public pages:

1. Home
2. O Instituto
3. Projetos
4. Project detail page
5. Transparência
6. Seja um Patrocinador
7. Parceiros
8. Ações do Instituto
9. Contato
10. Política de Privacidade

Do not create a traditional “Notícias” page unless explicitly requested. Use “Ações do Instituto” instead, because it does not require frequent publishing.

## Navigation

Use a top navigation menu with:

* Início
* O Instituto
* Projetos
* Transparência
* Seja um Patrocinador
* Parceiros
* Ações do Instituto
* Contato

The admin access should be discreet. Do not place a large visible admin button in the main navigation.

Suggested admin route:

`/admin`

## Home page requirements

The home page should include:

* hero section with logo, strong institutional statement and short description;
* buttons for “Conheça os Projetos” and “Seja um Patrocinador”;
* short section about the Institute;
* projects preview from the database;
* purpose/impact pillars;
* short section about Federal Sports Incentive Law;
* sponsorship call-to-action;
* partners preview;
* footer with contact information.

Suggested main concept:

“Fomentando o esporte, formando pessoas e criando oportunidades através dos esportes de areia.”

## Projects

Projects must be managed by the admin panel.

Do not create fake real projects.

Use elegant empty states when no projects exist.

Project statuses:

* em captação;
* aprovado;
* em execução;
* concluído.

Project fields:

* official name;
* slug;
* status;
* short summary;
* full description;
* objective;
* target audience;
* approved amount;
* amount to raise;
* law/approval body;
* execution period;
* cover image;
* gallery images;
* sponsor information;
* active/inactive;
* created_at;
* updated_at.

Projects must have their own detail pages.

## Transparency

The Transparency page must display PDF documents uploaded by the admin.

Documents should be listed by publication date, newest first.

Document fields:

* title;
* category;
* publication date;
* optional description;
* PDF file;
* active/inactive;
* created_at;
* updated_at.

Categories:

* Estatuto
* CNPJ e documentos institucionais
* Projetos aprovados
* Relatórios
* Certidões
* Prestação de contas
* Outros documentos

Only PDF uploads should be allowed for transparency documents.

## Sponsors page

Create a page called “Seja um Patrocinador”.

The page must explain:

* why support Instituto Arena Cascavel;
* how companies can support through Federal Sports Incentive Law;
* what types of projects can be supported;
* institutional benefits for sponsors;
* social and sports impact;
* how to contact the Institute.

Do not publicly show sponsorship quotas at this stage.

Avoid aggressive sales language.

## Partners

Partners must be managed by the admin panel.

Partner fields:

* name;
* logo;
* category;
* optional website/link;
* optional description;
* active/inactive;
* display order.

## Ações do Instituto

This is a flexible gallery/action registry, not a blog.

Action fields:

* title;
* date;
* description;
* cover image;
* image gallery;
* optional video link;
* active/inactive.

Prefer video links from YouTube, Instagram or Vimeo instead of heavy video uploads.

## Contact

Contact information:

* Email: `institutoarenacascavel@gmail.com`
* WhatsApp: `(41) 99926-0098`

The contact form should include:

* Nome
* Empresa/órgão
* E-mail
* WhatsApp
* Tipo de interesse:

  * Patrocínio
  * Parceria
  * Imprensa
  * Projeto
  * Outro
* Mensagem
* Privacy policy consent checkbox

The form should send the message to `institutoarenacascavel@gmail.com`.

It does not need to save leads in the database for now.

Do not add a floating WhatsApp button unless explicitly requested.

## Privacy

Because the website collects name, email, WhatsApp and company/organization, create a simple LGPD-friendly Privacy Policy page.

The policy should explain that submitted data is used only for contact, institutional relationship and sponsorship/partnership communication.

## Admin panel

Create a secure admin panel.

Only one admin user is needed initially.

Do not allow public signup.

Use Supabase Auth.

Admin should be able to manage:

* projects;
* transparency documents;
* partners;
* institute actions/gallery;
* media uploads.

Admin UX should be simple, functional and responsive.

Use forms with validation, success messages, loading states and error handling.

## Supabase

Create database schema/migrations for:

* projects
* transparency_documents
* partners
* institute_actions

Use:

* UUID primary keys;
* created_at;
* updated_at;
* active/inactive flags where relevant;
* indexes where useful;
* Row Level Security.

Public users should only read active public content.

Only authenticated admin should create, update or delete content.

Never expose service role keys on the client side.

## Supabase Storage

Suggested buckets:

* transparency-documents
* project-images
* partner-logos
* action-images
* site-media

Rules:

* public read for files used on public pages;
* admin-only upload/update/delete;
* PDFs only for transparency documents;
* images for project, partner and action areas.

## Security

Important rules:

* never expose private environment variables in client components;
* never expose Supabase service role key in frontend code;
* validate forms;
* sanitize or safely render rich text;
* use RLS policies;
* protect admin routes;
* handle unauthenticated states properly;
* avoid relying on hidden admin URL as the only security layer.

## Responsiveness

The site must be mobile-first.

Test layout for:

* mobile;
* tablet;
* desktop.

Ensure:

* readable text sizes;
* no horizontal overflow;
* touch-friendly buttons;
* responsive menu;
* optimized images;
* accessible contrast;
* good spacing.

## Accessibility and SEO

Implement:

* semantic HTML;
* correct heading hierarchy;
* alt text for images;
* accessible form labels;
* visible focus states;
* SEO metadata for each page;
* Open Graph metadata;
* descriptive page titles;
* responsive images.

## Empty states

When no content has been registered yet, show professional empty states.

Examples:

* “Os projetos do Instituto serão disponibilizados em breve.”
* “Os documentos de transparência serão publicados nesta área.”
* “As ações do Instituto serão registradas aqui.”
* “Novos parceiros serão apresentados em breve.”

Do not invent real projects, sponsors or documents.

## Quality checklist before finishing work

Before completing any task, verify:

* the project builds successfully;
* TypeScript has no errors;
* lint passes;
* responsive layout works;
* forms validate correctly;
* admin routes are protected;
* Supabase queries are safe;
* no fake institutional data was created;
* no service keys are exposed;
* mobile navigation works;
* public pages load without logged-in user.

Run, when available:

```bash
pnpm lint
pnpm build
```

If the project uses npm or yarn, use the equivalent commands.

## Working style

When implementing features:

* make small, understandable changes;
* keep components reusable;
* prefer clear names;
* avoid overengineering;
* explain major decisions in the final response;
* mention any required environment variables;
* mention any manual setup needed in Supabase or Vercel;
* do not silently skip requested functionality.

If something is ambiguous, choose the simplest professional implementation and document the assumption.
