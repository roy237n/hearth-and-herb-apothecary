create type public.app_role as enum ('admin','user');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.user_roles where user_id=_user_id and role=_role) $$;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

-- first user becomes admin
create or replace function public.handle_new_user_role() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not exists (select 1 from public.user_roles where role='admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_role after insert on auth.users for each row execute function public.handle_new_user_role();

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'General',
  description text not null default '',
  price numeric(10,2) not null default 0,
  stock integer not null default 0,
  tag text,
  image_url text,
  requires_prescription boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "public read active" on public.products for select to anon, authenticated using (active or public.has_role(auth.uid(),'admin'));
create policy "admin write" on public.products for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  pharmacy_name text not null default 'Verdant Pharmacy',
  announcement text not null default 'Free delivery on orders over $40 · Pharmacist on call 8am–10pm',
  phone text not null default '+000 000 000',
  email text not null default 'hello@verdantpharmacy.com',
  address text not null default '123 Health Avenue, Your City',
  hours text not null default 'Mon–Sat · 8am–10pm',
  currency text not null default '$',
  free_delivery_over numeric(10,2) not null default 40,
  delivery_fee numeric(10,2) not null default 3
);
grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admin update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
insert into public.site_settings (id) values (1);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  notes text,
  items jsonb not null,
  total numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
grant insert on public.orders to anon, authenticated;
grant select, update, delete on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "anyone can order" on public.orders for insert to anon, authenticated with check (status = 'pending');
create policy "admin read orders" on public.orders for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin update orders" on public.orders for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete orders" on public.orders for delete to authenticated using (public.has_role(auth.uid(),'admin'));

insert into public.products (name, category, description, price, stock, tag) values
('Paracetamol 500mg','Pain Relief','Fast relief from headaches and fever. 20 tablets.',4.50,120,'Best seller'),
('Ibuprofen 200mg','Pain Relief','Anti-inflammatory pain relief. 24 tablets.',5.20,80,null),
('Vitamin D3 1000 IU','Vitamins','Supports bones and immunity. 90 softgels.',9.90,60,'New'),
('Multivitamin Daily','Vitamins','Complete daily nutrition. 60 tablets.',14.00,45,null),
('Cough Syrup 150ml','Cold & Flu','Soothes dry and chesty coughs.',7.80,50,null),
('Nasal Spray','Cold & Flu','Clears blocked noses fast.',6.40,40,null),
('SPF 50 Sunscreen','Skincare','Broad-spectrum daily protection.',12.50,35,'Derm pick'),
('Gentle Baby Lotion','Baby Care','Fragrance-free care for delicate skin.',8.30,30,null);

create policy "public read product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "admin upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));
create policy "admin delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.has_role(auth.uid(),'admin'));