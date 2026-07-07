# CLAUDE.md

Guidance for Claude Code in the DLH portal repo.

## Project

Static landing page for **DLH Kota Surabaya** at `dlh.wahyutrip.com`, linking out to
SEKAR (`sekar.wahyutrip.com`) and SWAT (`swat.wahyutrip.com`). Future home of an SSO
portal — not built yet. No backend, database, or secrets.

**Stack:** pnpm + Turborepo monorepo · Next.js 16 (standalone) / React 19 / Tailwind 4 ·
next-intl (`id-ID`) · Node ≥ 20, pnpm 9.

## Conventions

- **i18n mandatory:** every user-facing string lives in
  `apps/web/src/i18n/messages/id-ID.json` and is read via `useTranslations`. Never
  hardcode display text. Adding a locale later = extend `src/i18n/config.ts` +
  resolve it in `src/i18n/request.ts`.
- **Immutability / no console** enforced by `@portal/eslint-config`.
- **Design:** clean, government-friendly, environmental green/teal. Brand tokens are
  in `apps/web/src/app/globals.css` (`--color-brand-*`); prefer Tailwind's built-in
  `emerald`/`teal`/`slate` ramps and `brand-*` for accents.
- Commits: `<type>: <description>` (feat/fix/refactor/docs/chore/ci). Commit/push only
  when asked; branch first if on the default branch.

## Commands

```bash
pnpm dev                 # dev server on :3000
pnpm lint && pnpm typecheck && pnpm build   # quality gates
docker build -f infra/Dockerfile.web -t portal-web .   # image (context = repo root)
```

## Deployment (see README for the full runbook)

Co-tenant on the shared dlhsby EC2 box. Release by pushing to the `staging` branch →
GitHub Actions builds `portal-web`, pushes to ECR, and deploys over SSM. The deploy is
**strictly additive** to the shared Caddy: it only writes `conf.d/portal.caddy` and
reloads Caddy — it never edits the shared Caddyfile or other co-tenants (sekar, swat).
Do not add steps that mutate sekar/swat config.
