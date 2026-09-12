-- Fix infinite recursion in RLS (profiles self-reference + for-all admin policies)

-- Security-definer helpers: run as owner, bypass RLS inside => no recursion
create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','editor'));
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

-- Drop the recursive / over-broad policies
drop policy if exists "Admin write projects" on public.projects;
drop policy if exists "Admin write founder" on public.founder;
drop policy if exists "Admin write testimonials" on public.testimonials;
drop policy if exists "Admin write reviews" on public.reviews;
drop policy if exists "Admin write settings" on public.settings;
drop policy if exists "Admin write contact" on public.contact_submissions;
drop policy if exists "Admin write subscribers" on public.subscribers;
drop policy if exists "Admin manage profiles" on public.profiles;

-- Recreate using definer helpers (safe, no recursion)
create policy "Staff manage projects" on public.projects for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage founder" on public.founder for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage testimonials" on public.testimonials for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage reviews" on public.reviews for all using (public.is_staff()) with check (public.is_staff());
create policy "Admin manage settings" on public.settings for all using (public.is_admin()) with check (public.is_admin());
create policy "Staff manage contact" on public.contact_submissions for all using (public.is_staff()) with check (public.is_staff());
create policy "Staff manage subscribers" on public.subscribers for all using (public.is_staff()) with check (public.is_staff());
create policy "Admin manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
