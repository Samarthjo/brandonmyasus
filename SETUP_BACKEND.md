# Backend setup — how you'll know about payments

Right now the site has a real backend: bids get saved to a database
(Supabase), you get an email the moment someone bids (Formspree), and
you confirm payments from a private admin page (`/admin.html#/admin`
locally, or `yoursite.com/#/admin` once deployed).

Takes about 15–20 minutes, no coding.

## 1. Create a Supabase project (free)

1. Go to [supabase.com](https://supabase.com) → sign up → **New project**.
2. Name it anything (`brandonmyasus`), pick a region close to India
   (Singapore), set a database password (save it somewhere).
3. Wait ~2 min for it to provision.

## 2. Run the schema

1. In your Supabase project, open **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open [`supabase/schema.sql`](supabase/schema.sql) from this repo,
   copy the whole thing, paste it in, click **Run**.
4. This creates the `bids` table, locks it down so only you can see
   pending bids, and sets up a public storage bucket for logo uploads.

## 3. Get your API keys

1. In Supabase: **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** key.
3. In this repo, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Paste your values into `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

## 4. Create your admin login

1. In Supabase: **Authentication → Users → Add user**.
2. Use your real email (`samarth.joshi2004@gmail.com`) and set a
   password you'll remember. Confirm the email if it asks (or toggle
   "Auto confirm user" so you don't need to click an email link).
3. This is what you'll log in with at `/admin`.

## 5. (Recommended) Set up the email ping

Without this, bids still land in Supabase — you'd just have to
remember to check `/admin` yourself instead of getting pinged.

1. Go to [formspree.io](https://formspree.io) → sign up free.
2. **New form** → name it "brandonmyasus bids" → set it to send to
   `samarth.joshi2004@gmail.com`.
3. Copy the form's endpoint URL (looks like
   `https://formspree.io/f/xxxxxxxx`).
4. Add it to `.env`:
   ```
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```

## 6. Restart the dev server

```bash
npm run dev
```

Env vars only load on startup — restart after editing `.env`.

## How it works day-to-day

1. Someone bids on a spot, uploads their logo, fills email — this
   writes a row to Supabase with `status = 'pending'` and (if you set
   up step 5) emails you instantly.
2. They pay you via UPI (QR shown in the modal, goes to
   `samarth.joshi2004@okhdfcbank`).
3. You check your UPI app for the payment.
4. You go to **`yoursite.com/#/admin`**, log in, find the pending bid,
   check the logo + amount + UTR, click **Confirm payment**.
5. The instant you confirm, their logo goes live on the actual lid on
   the site — no redeploy needed. If it never gets paid, click
   **Reject** instead and the slot stays open.

While a bid is pending (unconfirmed), the sticker on the site shows a
"VERIFYING" placeholder with no logo — so competitors know there's a
bid to beat, but nobody's brand shows up until you've actually been
paid.

## Deploying

This is a static Vite app — deploy to **Vercel** or **Netlify** (both
free, both take `.env` variables in their dashboard under
Environment Variables — same three keys as your local `.env`, do not
commit `.env` itself).

Because routing is hash-based (`#/admin`), no special server rewrite
rules are needed — it works on any static host out of the box.
