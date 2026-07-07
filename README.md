# Portal DLH Kota Surabaya

Landing page + future SSO portal for **Dinas Lingkungan Hidup (DLH) Kota Surabaya**,
served at **https://dlh.wahyutrip.com**. It introduces DLH and links out to the
department's apps:

- **SEKAR** — RTH worker tracking → https://sekar.wahyutrip.com
- **SWAT** — waste-transport fleet ops → https://swat.wahyutrip.com

For now this is a **static landing page only** (no auth, backend, or database). A
unified Single Sign-On (SSO) portal is planned — the page already shows a "coming
soon" placeholder for it.

## Stack

| Layer      | Tech                                                              |
| ---------- | ---------------------------------------------------------------- |
| Monorepo   | pnpm workspaces + Turborepo                                       |
| Web        | Next.js 16 (App Router, standalone) · React 19 · Tailwind CSS 4  |
| i18n       | next-intl (Indonesian, `id-ID`)                                   |
| Icons      | lucide-react                                                     |
| Deploy     | Docker → AWS ECR → GitHub Actions (OIDC) → SSM · shared Caddy edge |

Node ≥ 20, **pnpm 9** (`corepack enable`).

## Layout

```
portal/
├── apps/
│   └── web/            # @portal/web — Next.js landing page
├── packages/
│   ├── tsconfig/       # @portal/tsconfig — shared TS configs
│   └── eslint-config/  # @portal/eslint-config — shared ESLint flat config
├── infra/
│   ├── Dockerfile.web        # multi-stage standalone image (no secrets)
│   ├── compose.staging.yml   # one web container on the shared `edge` network
│   └── portal.caddy          # Caddy drop-in for dlh.wahyutrip.com (co-tenant)
├── scripts/            # setup.sh · start.sh
└── .github/workflows/  # web-quality.yml · deploy-staging.yml
```

## Local development

```bash
corepack enable            # once, to get pnpm 9
./scripts/setup.sh         # pnpm install (+ optional .env.local)
./scripts/start.sh         # http://localhost:3000
```

Quality gates (run before pushing):

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Editing copy: all user-facing strings live in
`apps/web/src/i18n/messages/id-ID.json` — never hardcode display text in components.

## Docker (local image check)

```bash
docker build -f infra/Dockerfile.web -t portal-web .
docker run --rm -p 3000:3000 portal-web
curl -fsSI http://localhost:3000/     # expect HTTP/1.1 200
```

## Deployment

The portal is a **co-tenant** on the shared dlhsby EC2 host, exactly like SWAT.
The box's Caddy (owned by the sekar stack) auto-imports co-tenant site files from
`conf.d/*.caddy`; this project only ever ships its own `portal.caddy` drop-in, so
**sekar's and swat's config are never touched**.

**Release** = push/merge to the `staging` branch (or run the workflow manually).
GitHub Actions then:

1. runs lint + typecheck + build,
2. builds `portal-web` and pushes it to ECR (`:staging` + `:<sha>`),
3. over SSM on the box: writes `compose.staging.yml`, drops `portal.caddy` into the
   shared Caddy's `conf.d/`, `docker compose up -d --wait`, reloads the shared Caddy,
4. smoke-tests `https://dlh.wahyutrip.com`.

**Storage hygiene** (so the shared box and ECR don't fill up, matching sekar):

- On the box, each deploy runs `docker image prune -af` + `docker builder prune -af`
  before pulling and `docker image prune -f` after recreating — reclaiming unused
  layers/cache only (never volumes, certs, or live images).
- The `portal-web` ECR repo has a lifecycle policy: **expire untagged images after
  1 day** and **keep only the last 10** tagged images.

### One-time operator prerequisites

These need AWS/GitHub console access and are done once:

1. **DNS** — `dlh.wahyutrip.com` A record → the shared Elastic IP `16.79.124.63`. ✅ (done)
2. **ECR repo** — create `portal-web` in `ap-southeast-3` (account `659828096624`).
3. **IAM/OIDC role** `portal-gha-deploy` trusting `repo:dlhsby/portal:*`, with
   permission to push to the `portal-web` ECR repo and run `ssm:SendCommand` /
   `ssm:GetCommandInvocation` on the box. (Clone the sekar deploy role's policy.)
4. **GitHub repo** `dlhsby/portal` → Settings → Secrets and variables → Actions →
   **Variables**:
   - `AWS_REGION` = `ap-southeast-3`
   - `AWS_ROLE_ARN` = the `portal-gha-deploy` role ARN
   - `ECR_WEB` = `659828096624.dkr.ecr.ap-southeast-3.amazonaws.com/portal-web`
   - `EC2_INSTANCE_ID` = `i-08edccdc966c0985e`
   - _(optional)_ `SEKAR_URL`, `SWAT_URL`, `CADDY_CONFD_DIR`, `SHARED_CADDY_CONTAINER`
     — only if the defaults in `deploy-staging.yml` need overriding.

   No Environment **secrets** are required — the portal has none.

The shared Caddy's `conf.d/` drop-in dir already exists on the box (the sekar deploy
ensures it). Nothing about this deploy edits the shared Caddyfile itself.
