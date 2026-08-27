-- Run this once — fixes "permission denied for table bids" (42501).
-- RLS policies control WHICH rows a role can touch; these GRANTs
-- control WHETHER the role can touch the table at all. Both are
-- required. The original schema.sql was missing these.

grant usage on schema public to anon, authenticated;

grant select, insert on public.bids to anon;
grant select, insert, update on public.bids to authenticated;

-- Storage: same idea, for the logos bucket.
grant usage on schema storage to anon, authenticated;
grant select, insert on storage.objects to anon;
grant select on storage.buckets to anon;
