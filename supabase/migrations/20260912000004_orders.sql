-- Orders table for Paystack payments + delivery room access

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  project_slug text not null,
  customer_name text not null,
  customer_email text not null,
  amount_kobo int not null,
  currency text default 'NGN',
  status text check (status in ('pending', 'paid', 'failed', 'refunded')) default 'pending',
  access_token text unique default encode(gen_random_bytes(32), 'hex'),
  paid_at timestamptz,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

-- Public insert (payment init — via server action, not direct client)
create policy "Public insert orders" on public.orders for insert with check (true);

-- Read only paid orders (for delivery room)
create policy "Read paid orders" on public.orders for select using (status = 'paid');

-- Admin manage all
create policy "Admin manage orders" on public.orders for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'editor'))
);
