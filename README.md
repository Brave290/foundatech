# Founda Technologies — Company Platform
Foundation Of Useful Digital Solutions · Building technology that solves real problems.

## Docs (read in this order)
1. PROJECT-STATEMENT.md — vision, brand, locked decisions
2. CONTINUITY.md — current wave, open items, log (living memory)
3. This file — setup & commands

## Stack
Next.js 15 (App Router, pinned 15.1.6) · TypeScript strict · Tailwind v3 + shadcn/ui ·
Zustand · TanStack Query · Supabase (Postgres/Auth/Storage) · Paystack · Resend ·
DeepSeek RAG · BotShield · Vercel (+ cron) + cron-job.org

## Setup
npm install
cp .env.example .env   # fill values; never commit, never share
npm run dev            # http://localhost:3000

## Domains
Canonical: https://foundatech.name.ng
301 aliases: foundatech.online · *.vercel.app (src/middleware.ts)

## Structure
src/app (routes) · src/components (ui + providers) · src/config/site.ts (brand facts) ·
src/lib (utils, future services) · src/middleware.ts (canonical + security)

## Terminal companion (Foundie)
Scan = universal scoreboard · foundie scan / Founda = this project ·
Audit = 13-layer table · Health = trend · Report = paste-able report · Fix [--apply]
