-- Run this once in Supabase → SQL Editor → New query → Run.
-- Creates the bids table, locks it down with RLS, and sets up the
-- public logo storage bucket.

create table if not exists bids (
  id uuid primary key default gen_random_uuid(),
  slot_id int not null,
  brand_name text not null,
  email text not null,
  amount int not null,
  utr text,
  logo_url text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected')),
  created_at timestamptz not null default now()
);

alter table bids enable row level security;

-- RLS policies (below) control WHICH rows a role can touch; these
-- GRANTs control WHETHER the role can touch the table at all. Both
-- are required — a common gotcha when creating tables via SQL Editor
-- instead of the Table Editor UI.
grant usage on schema public to anon, authenticated;
grant select, insert on public.bids to anon;
grant select, insert, update on public.bids to authenticated;

-- Anyone (anonymous site visitors) can submit a bid.
create policy "public can insert bids"
  on bids for insert
  to anon
  with check (true);

-- Anyone can read CONFIRMED bids only — this is what powers the
-- public "who's live on the lid" + auction table data. Pending bids
-- (with unverified emails / unpaid amounts) stay private.
create policy "public can read confirmed bids"
  on bids for select
  to anon
  using (status = 'confirmed');

-- Only a logged-in (authenticated) user — i.e. you, via /admin — can
-- see every bid including pending ones, and can update their status.
create policy "authenticated can read all bids"
  on bids for select
  to authenticated
  using (true);

create policy "authenticated can update bids"
  on bids for update
  to authenticated
  using (true);

-- Storage bucket for sponsor logo uploads.
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

create policy "public can upload logos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'logos');

create policy "public can view logos"
  on storage.objects for select
  to anon
  using (bucket_id = 'logos');

grant usage on schema storage to anon, authenticated;
grant select, insert on storage.objects to anon;
grant select on storage.buckets to anon;
