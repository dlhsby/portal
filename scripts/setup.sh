#!/usr/bin/env bash
# One-time local setup for the DLH portal: install workspace dependencies.
# The portal is a static landing page — no Docker infra, database, or seeding.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found. Enable it with: corepack enable" >&2
  exit 1
fi

echo "Installing dependencies (pnpm)…"
pnpm install

# Optional local env override (defaults already point at the live apps).
if [ ! -f apps/web/.env.local ] && [ -f apps/web/.env.example ]; then
  cp apps/web/.env.example apps/web/.env.local
  echo "Created apps/web/.env.local from .env.example"
fi

echo "Setup complete. Start the dev server with: ./scripts/start.sh"
