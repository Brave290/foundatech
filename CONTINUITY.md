# CONTINUITY.md — living memory of this build
> Read FIRST in any new session, together with PROJECT-STATEMENT.md.
> Last updated: 2026-09-12 · Current wave: 5 (complete) · Owner: Mus'ab

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
- [x] Wave 1A: scaffold (create-next-app + deps + shadcn)
- [x] Wave 1B–E: tokens/config/providers/resilience/SEO files
- [x] Wave 2A–2R: Header + Footer + Logo + Homepage sections + Public pages + Polish
- [x] Wave 3 Part 1: Supabase schema + admin foundation + project CRUD
- [x] Wave 3 Part 2: Admin pages (founder/settings/reviews/leads) + forms wired to DB
- [x] Wave 4: Paystack payments + webhook + delivery room + signed URL access
- [x] Wave 5: Foundie AI (RAG + DeepSeek) + Resend emails + BotShield lib + SEO dynamic sitemap
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
1. Deploy to Vercel + run Supabase migrations in production
2. Configure Paystack webhook URL → /api/webhook/paystack
3. Set up Resend DNS (DKIM/SPF for foundatech.name.ng)
4. Fill .env with real keys: Supabase, Paystack, Resend, DeepSeek
5. Wave 6: Part B safety system (ai-review.yml, PR template, branch protection, canary docs) + final 13-layer audit
6. Foundie v2.1 in 2 chunks → baseline `Founda` scan

- 2026-09-10 · W1A · create-next-app succeeded; npm install of extra deps ETIMEDOUT (network, proot/Alpine); resuming in 2 batches
- 2026-09-10 · W1B-E · All 17 files verified intact via Block V (correct line counts, clean last lines)
- 2026-09-10 · DOC · G1/G2/G3 trio written; project registered in Foundie config at /public/foundatech

- 2026-09-10 · W1A · Batches 1-4 DONE: deps installed (date-fns tar warnings = harmless proot noise), shadcn init + 16 ui components
- 2026-09-10 · W1 FIX · shadcn init OVERWROTE globals.css + tailwind.config.ts → tokens re-applied AFTER init. RULE: never run shadcn init again, only shadcn add
- 2026-09-10 · W1 FIX · layout.tsx now wraps TooltipProvider (shadcn tooltip requirement)

- 2026-09-10 · FOUNDIE v2.2 · First scan (v2) produced 14 FALSE criticals: bracket checker had line-comment amnesia + template-literal black hole; gitignore glob blind; layer audit path-blind. All 4 fixed in v2.2. Lesson logged: auditors need auditing too
- 2026-09-10 · Aliases: Scan = universal scoreboard · Founda = default project (foundatech)

- 2026-09-10 · W1 HOTFIX · dev build red: @tanstack/react-query, next-themes, tailwindcss-animate missing from node_modules (proot npm extraction dropped dirs; same family as date-fns tar storm). Fixed via idempotent reinstall + ls -d disk verification. RULE: after any npm install on this device, verify with ls -d before trusting success text
- 2026-09-10 · W1 HOTFIX · next@15.1.6 carried CVE-2025-66478 → upgraded to latest patched 15.x. Next 16 migration deferred to planned Wave 2.5 (proot Node version unconfirmed; no reward for mid-build major jump)

- 2026-09-10 · W2A · Header + Footer + Logo shipped. FoundaLogo as inline SVG (amber gradient, light/dark adaptive). Header: sticky, condensing on scroll, mobile sheet with 44px+ targets. Footer: 4-column, Brave Hx credit, sticky-bottom layout. Layout updated to wrap children.

- 2026-09-10 · TAILWIND WAR RESOLVED · Root cause: shadcn@latest init silently migrated project to Tailwind v4 (v4-only --spacing() syntax in compiled CSS broke Turbopack parse). Fix: globals.css rewritten as v4 bridge (@import + @config keeps tailwind.config.ts tokens alive + @custom-variant dark + hex vars + @theme inline). RULE: this project is Tailwind v4 now; never paste v3-style @tailwind directives again
- 2026-09-10 · Next upgraded 15.1.6 → 15.5.25 (CVE-2025-66478 fixed). Node v22 confirmed

- 2026-09-10 · NEXT 16.3.4 PERMANENT · Upgraded from 15.5.25 → 16.3.4 + React 19. User decision: stay on latest. Node v22 confirmed compatible
- 2026-09-10 · CARD.TSX REWRITE · shadcn card component used v4-only syntax (--spacing(), gap-(--var)). Rewrote as pure v3 (standard p-6, rounded-lg, shadow-sm). RULE: any new shadcn components need v3 syntax audit before use

- 2026-09-10 · REACT 19 COMPAT FIX · Fixed asChild errors: rewrote button.tsx with proper Radix Slot, removed asChild from not-found/page/header (use buttonVariants directly), fixed layout.tsx children type (no Readonly wrapper), removed delayDuration from TooltipProvider, silenced turbopack.root warning

- 2026-09-10 · W2C SHELL · Preloader blur veil (no spinner) · glass navbar · custom full-screen overlay menu (staggered giant links, numbered, block outline brand text, logo top) · left-side back-to-top with conic scroll-progress ring · animated sun/moon morph toggle · fonts swapped to Space Grotesk (display) + Manrope (body) per Mus'ab · logo auto-swaps to public/logo.webp when Mus'ab adds it · CSP dev-only unsafe-eval fix · Sheet removed from navigation
- PENDING W2D: hero canvas network background + video slot + partners marquee (admin-fed later)

- 2026-09-10 · W2C SHELL · Preloader blur veil (no spinner) · glass navbar · custom full-screen overlay menu (staggered giant links, numbered, block outline brand text, logo top) · left-side back-to-top with conic scroll-progress ring · animated sun/moon morph toggle · fonts swapped to Space Grotesk (display) + Manrope (body) per Mus'ab · logo auto-swaps to public/logo.webp when Mus'ab adds it · CSP dev-only unsafe-eval fix · Sheet removed from navigation
- PENDING W2D: hero canvas network background + video slot + partners marquee (admin-fed later)

- 2026-09-10 · W2D REWORK (user feedback round 2) · Splash preloader DELETED → whole-page blur-to-clear reveal (PageReveal) · menu now right-slide drawer 600ms with staggered links + block brand text · pill buttons (rounded-full, 2px hover lift) · Call + WhatsApp buttons conditional on siteConfig.phone/whatsapp · fonts → Syne (display) + Plus Jakarta Sans (body) · hero = animated amber node-network canvas + optional video via NEXT_PUBLIC_HERO_VIDEO · partners marquee after hero (config-fed now, admin-fed Wave 3) · duplicate page header removed

- 2026-09-10 · W2F PRECISION · drawer 75vw/300px · hero CTAs reduced to two (call/whatsapp navbar+drawer only) · currency ₦/$ + language EN/FR toggles restored per roadmap (LocaleProvider, persisted, Intl format() ready for Pricing) · global type 96% · marquee = Source Serif 4 italic, muted, airy (reference-image voice) · footer glue reinforced at body flex level
- NEXT (Wave 2G): remaining approved homepage sections — Services, Featured Projects, Process, Testimonials, Pricing preview, Foundie teaser, FAQ, Final CTA

- 2026-09-10 · W2G-0 LOCALE · custom flag dropdowns (currency default USD, language default EN) · languages EN/FR/AR/YO with instant whole-page switch + RTL auto-flip for Arabic · currencies USD/NGN/GBP/CNY/CAD with Intl format() · UI chrome dictionary src/config/i18n.ts · header fully rewritten clean (fixes missing drawer links) · hero + footer translated via t()

- 2026-09-10 · W2H LOCK · overscroll-behavior none + scrollbar-gutter stable (no rubber-band sway, no width jump) · drawer uses position-fixed scroll lock with scroll restore · drawer block text shrunk to text-2xl (fits 300px panel) · locale storage keys bumped to v2 so defaults USD/EN apply fresh

- 2026-09-10 · W2I CONTAINING-BLOCK FIX · root cause of "two overlays": PageReveal blur/scale (transform+filter) re-parented fixed drawer/backdrop/back-to-top to document height. Fix: Header/Footer/BackToTop moved outside PageReveal; reveal wraps page content only. RULE (permanent): never place fixed-position elements inside a transformed/filtered ancestor. Stagger tightened to 60ms+45ms

- 2026-09-10 · W2J-0 · language switch now veils (blur out → swap → blur in, reduced-motion safe) · drawer block text = tiny mono caps per FoundaPay reference · hero headline = Source Serif 4 (brand serif) · global type 93% · zoom-hard: clamp floors lowered, wordmark hidden <360px, cluster gaps tighten <380px, overflow-x clip

- 2026-09-10 · W2K · load veil slowed to 1100ms (language veil 450ms) · hero title word-drop cascade (masked spans, 90ms stagger, replays per language) · overscroll-y ban removed → native pull-to-refresh restored (drawer keeps overscroll-contain) · content seeds config mirrors future Supabase schema (real entities only, testimonials empty until real quotes)

- 2026-09-10 · W2L FULL-PAGE VEIL · VeilProvider + useVeilClasses: header (wrapper), content, footer, back-to-top all blur in together on load (1100ms) and on language swap (450ms). Revealed state leaves only opacity (no transform/filter) so fixed elements stay viewport-anchored. Drawer-open skips veil to avoid jumps. Theme toggle: eclipse cross-rotate morph + amber burst ring + active squash

- 2026-09-10 · W2M FOOTER v2 (BotShield reference) · brand block + credit + social icon row (env-driven: NEXT_PUBLIC_SOCIAL_GITHUB/X/LINKEDIN/TELEGRAM, only existing handles render) · Product/Company/Legal columns · © 2024–{currentYear} range · live StatusDot pinging /api/health (real, not decorative) · footer-copy.tsx retired

- 2026-09-10 · W2N COVERAGE · footer Product column now mirrors drawer exactly (Services/Projects/Pricing/FAQ/Contact) so no desktop user ever needs the hamburger · FAQ present in header nav + drawer + footer for all viewports · Call/WhatsApp stay header-only on desktop, drawer-only on mobile (excluded from footer per Mus'ab) · hamburger hidden >=1024px

- 2026-09-10 · W2O FIX · footer rewritten with inline SVG brand icons (no lucide Github/Linkedin version conflicts) · Product column now mirrors drawer exactly (Services/Projects/Pricing/FAQ/Contact) · Company column has About + Reviews · Legal column has Privacy/Terms/Refund · all legal labels translated in FR/AR/YO · footer-copy.tsx retired

- 2026-09-10 · W2J HOMEPAGE COMPLETE · 8 new sections shipped: Services grid (editorial), Process (4 steps w/ connector), Featured Projects (2 editorial cards, featured:true flag), Testimonials (honest empty state), Pricing preview (3 tiers, live currency via format() + rate table), FAQ accordion (shadcn, one open by default), Final CTA (closing conversion), Foundie teaser (floating amber pill, chat preview stub). All wired to content.ts seeds so Wave 3 swaps config → DB with zero component changes. Translated chrome + i18n for services/process. Reduced-motion safe.

- 2026-09-10 · W2J HOMEPAGE COMPLETE · 8 sections shipped: Services (editorial grid), Process (4 steps), Featured Projects (2 editorial cards), Testimonials (honest empty state), Pricing (live currency), FAQ (accordion), Final CTA, Foundie teaser. All wired to content.ts seeds, translated chrome, reduced-motion safe.

- 2026-09-10 · W2P PUBLIC PAGES · 8 new routes shipped: /about, /services, /projects (+ /projects/[slug] case studies), /pricing, /testimonials (honest empty state), /faq, /contact, /privacy, /terms, /refund. All reuse content.ts seeds. All 404s from homepage CTAs now resolve.

- 2026-09-10 · W2Q-1 POLISH · brand truth: nameExpansion = Foundation of Digital Africa + new positioning (4 langs) · footer uses siteConfig.description · Reveal component: sections blur-in on scroll · PageReveal first-paint veil fixed (always visible at first paint, 700ms min) · RouteVeil: spinner + frosted veil on every navigation incl. back · CookieBanner first-visit mini banner · slanted three-line hamburger · PROGRESS REBASELINED HONESTLY: overall ~40%, backend 0%

- 2026-09-10 · W2Q-2 THE TEN · 1 project preview modal (browser-chrome lightbox, live demo only on explicit click, /previews/{slug}.webp auto-detected) · 2 case studies filled (challenge/approach/outcome/highlights) · 3 desktop spread (1440px container, left-aligned headers md+) · 4 review modal form (queued-for-verification, honest) · 5 explore-below-cards on mobile · 6 scroll progress bar · 7 skip-to-content link · 8 auto breadcrumbs · 9 footer newsletter (frontend until Wave 3 Resend) · 10 rich 404 with quick links

- 2026-09-10 · W2Q-3 FIXES · popover tokens defined (dialogs/modals were transparent because --popover never existed) · Foundie teaser auto-closes on outside click + Escape, open state = ink pill · navbar + drawer hide TECHNOLOGIES subline (footer keeps it) · 404 = standalone full-viewport island (no site navbar/footer, own mini header + quick links)

- 2026-09-10 · W2R · hamburger = normal 3 lines · sticky navbar untrapped (veil wrapper div removed — sticky was confined to wrapper height) · founder section (server component, photo auto-detects public/team/founder.webp) · work gallery = image-first cards for ALL projects (previews auto-detect public/previews/{slug}.webp) · WAVE 3 ADMIN SCOPE CONFIRMED: Supabase Storage buckets (previews, team) + projects/founder tables = full upload + edit control from admin panel

- 2026-09-10 · WAVE 3 PART 1 SUPABASE WIRED · Supabase CLI installed as dev dep · env vars configured (URL + anon + service_role) · server/client/admin clients created (src/lib/supabase/) · schema migration written: projects, founder, testimonials, reviews, settings, contact_submissions, subscribers, profiles · RLS policies: public read verified/published, public insert for forms, admin-only writes · auto-profile trigger on auth.users insert · /api/test-db endpoint ready

- 2026-09-10 · W3-2A ADMIN FOUNDATION · storage buckets previews+team (public read, staff write) · seeded 4 projects + founder + settings · new signups default role=editor (security) · /login magic-link (signInWithOtp) · /admin layout gate (session + role check, redirect otherwise) · /admin dashboard with live counts via service-role client

- 2026-09-12 · W3-2B ADMIN PAGES · 4 missing admin pages built: /admin/founder (profile edit + photo upload to team bucket), /admin/settings (key-value editor with quick-add common keys), /admin/reviews (moderation queue: approve → auto-migrates to testimonials table), /admin/leads (contact submissions manager: mark replied/closed)

- 2026-09-12 · W3-3 FORMS WIRED · 3 server actions added: submitContact → contact_submissions + auto confirmation email, submitReview → reviews table, subscribe → subscribers table + welcome email · Contact form, newsletter, and review modals now persist to Supabase · Duplicate subscriber handled gracefully (23505 → ok)

- 2026-09-12 · W3-4 PROJECTS DB MIGRATION · /projects listing page now reads from Supabase via getPublishedProjects() instead of config seeds · Empty state for no projects · Preview images overlay on project cards

- 2026-09-12 · W4 PAYSTACK PAYMENT SYSTEM · orders table migration (reference, project_slug, customer, amount_kobo, currency, status, access_token) · lib/paystack: initPayment + verifyPayment + generateReference · POST /api/paystack/init: creates order + initializes Paystack payment · POST /api/webhook/paystack: verifies signature → verifies payment → marks order paid → sends delivery access email · PaymentCheckout component (dialog with form) · /delivery page with confirmation/access modes · Delivery room shows order details + permanent access link

- 2026-09-12 · W4 RESEND EMAIL INTEGRATION · lib/email: sendContactConfirmation, sendDeliveryAccess, sendNewsletterWelcome · Contact form sends confirmation email · Newsletter sends welcome email · Paystack webhook sends delivery access link with permanent token · All emails are best-effort (don't block form submission)

- 2026-09-12 · W5 FOUNDie AI · lib/ai/rag.ts: retrieveContext searches projects + settings tables via ilike · POST /api/chat: DeepSeek generation with RAG context, system prompt enforces HBL, max 300 tokens · FoundieTeaser upgraded to full chat bubble: message history, suggestion chips, loading state, auto-scroll

- 2026-09-12 · W5 SEO & SECURITY · Dynamic sitemap includes project slugs from DB (graceful fallback if DB unavailable) · BotShield server-side verification lib (lib/botshield) ready for cryptographic tokens · .env.example cleaned (deduplicated, added PAYSTACK_WEBHOOK_SECRET)

- 2026-09-12 · W5 BUILD VERIFIED · TypeScript: 0 errors · Production build: 30 routes compiled (24 static, 6 dynamic) · All admin pages, API routes, delivery, chat endpoints present
