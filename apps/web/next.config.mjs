import createNextIntlPlugin from 'next-intl/plugin';

// Single-locale (id) setup: no i18n routing/middleware — the plugin just wires
// the per-request message bundle from ./src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained server bundle for the production Docker image.
  output: 'standalone',
  // Trace from the monorepo root so the standalone bundle resolves the
  // pnpm-symlinked workspace deps and the next-intl plugin.
  outputFileTracingRoot: new URL('../../', import.meta.url).pathname,
};

export default withNextIntl(nextConfig);
