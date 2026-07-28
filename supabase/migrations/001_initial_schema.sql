create extension if not exists "pgcrypto";

create type project_status as enum ('em captação', 'aprovado', 'em execução', 'concluído');

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  official_name text not null,
  slug text not null unique,
  status project_status not null default 'em captação',
  short_summary text,
  full_description text,
  objective text,
  target_audience text,
  approved_amount numeric(14, 2),
  amount_to_raise numeric(14, 2),
  law_approval_body text,
  execution_period text,
  cover_image_url text,
  gallery_image_urls text[] default '{}',
  sponsor_information text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.transparency_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Estatuto', 'CNPJ e documentos institucionais', 'Projetos aprovados', 'Relatórios', 'Certidões', 'Prestação de contas', 'Outros documentos')),
  publication_date date not null,
  description text,
  pdf_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  category text,
  website_url text,
  description text,
  active boolean not null default true,
  display_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.institute_actions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  action_date date not null,
  description text,
  cover_image_url text,
  gallery_image_urls text[] default '{}',
  video_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_active_created_idx on public.projects (active, created_at desc);
create index documents_active_publication_idx on public.transparency_documents (active, publication_date desc);
create index partners_active_order_idx on public.partners (active, display_order asc);
create index actions_active_date_idx on public.institute_actions (active, action_date desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger documents_updated_at before update on public.transparency_documents for each row execute function public.set_updated_at();
create trigger partners_updated_at before update on public.partners for each row execute function public.set_updated_at();
create trigger actions_updated_at before update on public.institute_actions for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.transparency_documents enable row level security;
alter table public.partners enable row level security;
alter table public.institute_actions enable row level security;

create policy "Public can read active projects" on public.projects for select using (active = true);
create policy "Public can read active documents" on public.transparency_documents for select using (active = true);
create policy "Public can read active partners" on public.partners for select using (active = true);
create policy "Public can read active actions" on public.institute_actions for select using (active = true);

create policy "Authenticated admins manage projects" on public.projects for all to authenticated using (true) with check (true);
create policy "Authenticated admins manage documents" on public.transparency_documents for all to authenticated using (true) with check (true);
create policy "Authenticated admins manage partners" on public.partners for all to authenticated using (true) with check (true);
create policy "Authenticated admins manage actions" on public.institute_actions for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('transparency-documents', 'transparency-documents', true, 10485760, array['application/pdf']),
  ('project-images', 'project-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('partner-logos', 'partner-logos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('action-images', 'action-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('site-media', 'site-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
on conflict (id) do nothing;

create policy "Public can read public storage files"
on storage.objects for select
using (bucket_id in ('transparency-documents', 'project-images', 'partner-logos', 'action-images', 'site-media'));

create policy "Authenticated admins manage storage files"
on storage.objects for all to authenticated
using (bucket_id in ('transparency-documents', 'project-images', 'partner-logos', 'action-images', 'site-media'))
with check (bucket_id in ('transparency-documents', 'project-images', 'partner-logos', 'action-images', 'site-media'));
