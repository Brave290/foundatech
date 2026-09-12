create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  device text default 'desktop',
  session_id text,
  ua text,
  created_at timestamptz default now()
);
create index if not exists page_views_created_idx on public.page_views (created_at desc);
create index if not exists page_views_session_idx on public.page_views (session_id);
alter table public.page_views enable row level security;
-- No public policies: only service-role (server) reads/writes. Bots can't inflate via anon key.
