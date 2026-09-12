insert into storage.buckets (id, name, public) values ('previews','previews', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('team','team', true) on conflict (id) do nothing;

create policy "Public read media" on storage.objects for select using (bucket_id in ('previews','team'));
create policy "Staff upload media" on storage.objects for insert to authenticated with check (bucket_id in ('previews','team') and public.is_staff());
create policy "Staff update media" on storage.objects for update to authenticated using (bucket_id in ('previews','team') and public.is_staff());
create policy "Staff delete media" on storage.objects for delete to authenticated using (bucket_id in ('previews','team') and public.is_staff());
