-- Founda Technologies initial schema
-- Tables: projects, founder, testimonials, reviews, settings, contact_submissions, subscribers, profiles

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text,
  summary text,
  tags text[] default '{}',
  year int,
  featured boolean default false,
  preview_url text,
  challenge text,
  approach text,
  outcome text,
  highlights text[] default '{}',
  live_url text,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.founder (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  tags text[] default '{}',
  updated_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  role text,
  source text check (source in ('google', 'whatsapp', 'email', 'linkedin')),
  verified boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  source_ip text,
  user_agent text,
  botshield_passed boolean default false,
  created_at timestamptz default now(),
  verified_at timestamptz
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text check (status in ('new', 'replied', 'closed')) default 'new',
  botshield_passed boolean default false,
  source_ip text,
  user_agent text,
  created_at timestamptz default now(),
  replied_at timestamptz
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text check (role in ('admin', 'editor')) default 'editor',
  created_at timestamptz default now()
);

-- RLS
alter table public.projects enable row level security;
alter table public.founder enable row level security;
alter table public.testimonials enable row level security;
alter table public.reviews enable row level security;
alter table public.settings enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.subscribers enable row level security;
alter table public.profiles enable row level security;

-- Public read
create policy "Public read published projects" on public.projects for select using (published = true);
create policy "Public read founder" on public.founder for select using (true);
create policy "Public read verified testimonials" on public.testimonials for select using (verified = true);
create policy "Public read settings" on public.settings for select using (true);

-- Public insert (forms)
create policy "Public insert reviews" on public.reviews for insert with check (true);
create policy "Public insert contact" on public.contact_submissions for insert with check (true);
create policy "Public insert subscribers" on public.subscribers for insert with check (true);

-- Admin write
create policy "Admin write projects" on public.projects for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));
create policy "Admin write founder" on public.founder for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));
create policy "Admin write testimonials" on public.testimonials for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));
create policy "Admin write reviews" on public.reviews for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));
create policy "Admin write settings" on public.settings for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Admin write contact" on public.contact_submissions for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));
create policy "Admin write subscribers" on public.subscribers for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admin manage profiles" on public.profiles for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
