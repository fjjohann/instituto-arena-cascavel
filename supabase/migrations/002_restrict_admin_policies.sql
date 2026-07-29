create or replace function public.is_site_admin()
returns boolean
language sql
stable
as $$
  select auth.jwt() ->> 'email' = 'fjjohann@gmail.com';
$$;

drop policy if exists "Authenticated admins manage projects" on public.projects;
drop policy if exists "Authenticated admins manage documents" on public.transparency_documents;
drop policy if exists "Authenticated admins manage partners" on public.partners;
drop policy if exists "Authenticated admins manage actions" on public.institute_actions;
drop policy if exists "Authenticated admins manage storage files" on storage.objects;

create policy "Site admin manages projects"
on public.projects for all to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create policy "Site admin manages documents"
on public.transparency_documents for all to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create policy "Site admin manages partners"
on public.partners for all to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create policy "Site admin manages actions"
on public.institute_actions for all to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

create policy "Site admin manages storage files"
on storage.objects for all to authenticated
using (
  public.is_site_admin()
  and bucket_id in ('transparency-documents', 'project-images', 'partner-logos', 'action-images', 'site-media')
)
with check (
  public.is_site_admin()
  and bucket_id in ('transparency-documents', 'project-images', 'partner-logos', 'action-images', 'site-media')
);
