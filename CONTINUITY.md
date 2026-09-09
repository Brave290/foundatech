# CONTINUITY.md — living memory of this build
> Read FIRST in any new session, together with PROJECT-STATEMENT.md.
> Last updated: 2026-09-10 · Current wave: 1 (verify/repair) · Owner: Mus'ab

## 0. Update protocol (how this file stays alive)
1. Every wave ends with a small "continuity patch" paste block: sed ticks checkboxes + appends a Wave-log entry.
2. Never rewrite history; append only. Decisions that change get a dated note, not a deletion.
3. New AI session = paste PROJECT-STATEMENT.md + CONTINUITY.md first, then work.

## 1. Environment facts
- Android + Acode editor; terminal = Alpine Linux (proot), busybox ash shell, musl libc
- HOME = ~ ; projects: ~/foundatech (this), ~/founda, ~/bot-shield, ~/foundascrow, ~/premium-joy
- Acode terminal CAN GARBLED-TRUNCATE large pastes → RULE: paste blocks ≤ ~120 lines, one at a time, verify after each wave
- Pinned: Next 15.1.6 · Tailwind v3 · shadcn · Node via apk/proot
- Foundie CLI at ~/.local/bin/foundie — v2 installed; v2.1 PENDING (2-chunk paste next session)
- Aliases: Scan, Founda, Project, Audit, Health, Report, Fix

## 2. Locked decisions (see PROJECT-STATEMENT.md for full why)
Canonical domain foundatech.name.ng (301 from .online + vercel.app) · Direction A + dark toggle ·
Paystack one-time + intl · magic-link delivery room · signed URLs unlock · RBAC admin ·
all content admin-fed · Foundie AI = tsvector RAG + DeepSeek ($2 budget guarded) · BotShield on all forms ·
Resend all email · ₦/$ toggle + language infra · Sentry optional later, Vercel Analytics day one

## 3. Wave status
- [x] Steps 01–06 design roadmap (brief → questionnaire → moodboard A locked → homepage plan approved → site map → motion spec)
- [x] Wave 0: Foundie CLI v1 + v2 installed
- [ ] Wave 0.5: Foundie v2.1 (Scan=universal, foundie=default project, regex false-positive fix) — PENDING 2-chunk paste
- [?] Wave 1A: scaffold (create-next-app + deps + shadcn) — VERIFY via Block V
- [?] Wave 1B–E: tokens/config/providers/resilience/SEO files — VERIFY integrity via Block V
- [ ] Wave 2: real homepage (12 sections) + header/footer + logo traced as inline SVG
- [ ] Wave 3: Supabase schema + admin CMS + admin-fed feeds (projects/pricing/testimonials/settings)
- [ ] Wave 4: orders + Paystack webhook + delivery room + magic links + Resend emails
- [ ] Wave 5: Foundie AI bubble (RAG), BotShield form integration, cron jobs, legal pages, SEO polish
- [ ] Wave 6: Part B safety system (ai-review.yml, PR template, branch protection, canary docs) + final 13-layer audit

## 4. Open items (waiting on Mus'ab)
- Confirm: public email · WhatsApp number · city
- Real social handles (only existing ones)
- Google Business review link
- Logo webp file → I trace inline SVG
- Create/fill: Supabase keys · Paystack keys · Resend API + DNS (DKIM/SPF) · CRON_SECRET · BOTSHIELD_SECRET_KEY (into .env ONLY)
- Approve my drafted 3 pricing tiers (admin-editable later)

## 5. File integrity (fill after Block V output)
- tailwind.config.ts: ? · globals.css: ? · next.config.ts: ? · .env.example: ?
- site.ts: ? · middleware.ts: ? · layout.tsx: ? · page.tsx: ?
- error/not-found/loading/robots/sitemap: ? · providers + theme-toggle: ? · README: ?
- node_modules/next: ?

## 6. Wave log (append only)
- 2026-09-09 · W0 · Foundie v1 shipped; universal scan of ~ produced 560 false CRITICALs (regex-literal bug identified)
- 2026-09-09 · W0 · v2 shipped (multi-project) but `Project` alias missing from rc files → user hit "not installed"
- 2026-09-10 · W1 · Blocks B–E pasted; echoes garbled by Acode → integrity unverified; Block A status unknown
- 2026-09-10 · W1 · v2.1 prepared but NOT pasted (binary still v2, aliases still v1)
- 2026-09-10 · DOC · Continuity protocol born from Mus'ab's notebook: STATEMENT + CONTINUITY + README

## 7. Next actions (in order)
1. Paste Block V → send output here
2. Paste Block X (aliases + register)
3. Paste G1–G3 docs
4. Next session: Foundie v2.1 in 2 chunks → baseline `Founda` scan
5. Then Wave 2 homepage build
