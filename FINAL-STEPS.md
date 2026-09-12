# Final Steps — Founda Technologies Platform

> Repo: https://github.com/Brave290/foundatech
> Last updated: 2026-09-12

## What's Built

The full platform is complete and pushed to GitHub:

- **31 routes** — Homepage, 8 public pages, 7 admin pages, 7 API endpoints, delivery room, auth
- **Admin CMS** — Projects, founder, settings, reviews, testimonials, leads (all CRUD)
- **Payments** — Paystack one-time payment → webhook → delivery room with access tokens
- **Email** — Resend: contact confirmation, newsletter welcome, delivery access
- **AI Assistant** — Foundie chat bubble: RAG retrieval + DeepSeek generation
- **Security** — Rate limiting, input sanitization, HTML escaping, webhook verification, RLS hardening
- **SEO** — Dynamic sitemap, robots.txt, OpenGraph, canonical domain

---

## Step 1: Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New project
2. Note your **Project URL**, **Anon Key**, and **Service Role Key**
3. Go to **SQL Editor** → run each migration file in order:
   ```
   supabase/migrations/20260910_initial_schema.sql
   supabase/migrations/20260911_fix_rls_recursion.sql
   supabase/migrations/20260912000001_auth_default_editor.sql
   supabase/migrations/20260912000002_seed_content.sql
   supabase/migrations/20260912000003_storage_buckets.sql
   supabase/migrations/20260912000004_orders.sql
   supabase/migrations/20260913000001_page_views.sql
   ```
4. Go to **Storage** → create buckets if not auto-created:
   - `previews` (public: yes)
   - `team` (public: yes)
5. Go to **Authentication** → enable Email provider
6. Go to **Authentication** → URL Configuration:
   - Site URL: `https://foundatech.name.ng`
   - Redirect URLs: `https://foundatech.name.ng/auth/callback`

---

## Step 2: Paystack Setup

1. Go to [paystack.com](https://paystack.com) → Dashboard → Settings → API Keys
2. Copy **Test Key** and **Secret Key**
3. Go to **Settings** → **Webhooks**:
   - URL: `https://foundatech.name.ng/api/webhook/paystack`
   - Secret: create a strong random string (e.g., `openssl rand -hex 32`)
4. Save the webhook secret for your `.env`

---

## Step 3: Resend Setup (Email)

1. Go to [resend.com](https://resend.com) → create account
2. Add domain: `foundatech.name.ng`
3. Add the DNS records Resend gives you (DKIM, SPF) to your domain registrar
4. Verify the domain (takes 5-30 minutes)
5. Copy your **API Key**

---

## Step 4: DeepSeek (AI Assistant)

1. Go to [platform.deepseek.com](https://platform.deepseek.com)
2. Create account → API Keys → create key
3. Add $2-5 credit for the budget guard

---

## Step 5: Domain & DNS

1. Point `foundatech.name.ng` to Vercel:
   - Add domain in Vercel project settings
   - Update nameservers at your registrar
2. Add CNAME/A records as Vercel instructs

---

## Step 6: Vercel Deploy

1. Go to [vercel.com](https://vercel.com) → import `Brave290/foundatech`
2. Framework: Next.js (auto-detected)
3. Add environment variables (copy from `.env.example`, fill real values):

```env
NEXT_PUBLIC_SITE_URL=https://foundatech.name.ng
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx
PAYSTACK_WEBHOOK_SECRET=your_random_secret_here
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=Founda Technologies <hello@foundatech.name.ng>
DEEPSEEK_API_KEY=sk-xxxxx
CRON_SECRET=your_random_secret_here
NEXT_PUBLIC_SITE_PHONE=+234...
NEXT_PUBLIC_SITE_WHATSAPP=+234...
```

4. Deploy

---

## Step 7: Create Admin Account

After first deploy, you need to create your admin user:

1. Go to your deployed site → `/login`
2. Enter your email → sign in with magic link
3. **First user auto-gets admin role** (from the `handle_new_user` trigger)
4. You're now in the admin dashboard

Alternatively, manually in Supabase SQL Editor:
```sql
-- Insert into auth.users first (via Supabase dashboard), then:
INSERT INTO public.profiles (id, email, role)
VALUES ('your-user-uuid', 'your@email.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## Step 8: Configure Paystack Webhook

1. In Paystack dashboard → Settings → Webhooks
2. Set URL: `https://foundatech.name.ng/api/webhook/paystack`
3. Set the secret you used in `.env` as `PAYSTACK_WEBHOOK_SECRET`
4. Test with Paystack's test webhook feature

---

## Step 9: Seed Content

After admin login, populate the CMS:

1. **Projects** → `/admin/projects` → create your projects
2. **Founder** → `/admin/founder` → fill profile + upload photo
3. **Settings** → `/admin/settings` → set site_name, contact_email, phone, socials
4. **Testimonials** → add approved testimonials (or let reviews flow in)

---

## Step 10: Custom Domain in Supabase

For magic-link emails to work:
1. Go to Supabase → Authentication → URL Configuration
2. Set Site URL to `https://foundatech.name.ng`
3. Add redirect URL: `https://foundatech.name.ng/auth/callback`

---

## Step 11: Verify Everything

Run through this checklist:

- [ ] Homepage loads with all sections
- [ ] Dark mode toggle works
- [ ] Language switch works (EN/FR/AR)
- [ ] Contact form submits → shows in `/admin/leads`
- [ ] Newsletter subscribe → shows in admin
- [ ] Project pages render from DB
- [ ] Founder section shows DB content
- [ ] Testimonials show from DB
- [ ] Admin login works (magic link)
- [ ] Admin dashboard shows live stats
- [ ] Admin CRUD works (projects, founder, settings)
- [ ] Payment flow: checkout → Paystack → webhook → delivery room
- [ ] Foundie AI chat responds
- [ ] `/sitemap.xml` includes project pages
- [ ] `/robots.txt` blocks /admin, /api, /delivery
- [ ] Status dot pings `/api/health`

---

## Environment Variables Reference

| Variable | Where | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | Yes |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack → Settings | Yes |
| `PAYSTACK_SECRET_KEY` | Paystack → Settings | Yes |
| `PAYSTACK_WEBHOOK_SECRET` | Paystack → Webhooks | Yes |
| `RESEND_API_KEY` | Resend → API Keys | Yes |
| `DEEPSEEK_API_KEY` | DeepSeek → API Keys | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your domain | Yes |
| `NEXT_PUBLIC_SITE_PHONE` | Your phone | Optional |
| `NEXT_PUBLIC_SITE_WHATSAPP` | Your WhatsApp | Optional |
| `CRON_SECRET` | Generate random string | Optional |
| `NEXT_PUBLIC_BOTSHIELD_KEY` | Pre-set in .env.example | Optional |

---

## Troubleshooting

**Build fails with Supabase error:**
- Run migrations manually in Supabase SQL Editor
- Ensure all env vars are set in Vercel

**Payment webhook not firing:**
- Check Paystack webhook URL is exactly `https://foundatech.name.ng/api/webhook/paystack`
- Verify `PAYSTACK_WEBHOOK_SECRET` matches what you set in Paystack

**Emails not sending:**
- Verify Resend domain (DKIM/SPF records added and verified)
- Check `EMAIL_FROM` matches your verified domain

**Admin login loops:**
- Ensure `/auth/callback` is in Supabase redirect URLs
- Check `NEXT_PUBLIC_SITE_URL` matches your domain exactly

**AI chat returns error:**
- Check `DEEPSEEK_API_KEY` is valid
- Ensure DeepSeek account has credit

---

## What's Next (Optional)

- [ ] Sentry error monitoring (add `@sentry/nextjs`)
- [ ] Vercel Analytics (add in project settings)
- [ ] Cron jobs for Supabase pause protection
- [ ] Legal pages polish (hire a lawyer for real terms)
- [ ] Services/pricing/FAQ admin editing (add DB tables)
- [ ] Foundie v2.1 CLI scan
- [ ] 13-layer production audit
