#!/usr/bin/env bash
# Run the portal web app in dev mode (http://localhost:${WEB_PORT:-3000}).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

exec pnpm dev
