/**
 * Metadata for the apps the portal links out to. URLs come from build-time
 * public env vars (NOT secrets) with sensible production defaults, so a build
 * without env still points at the live apps. Each app's own logo (its official
 * mark, served from /public) is used on its card.
 */
export type PortalApp = {
  /** Stable key; also the i18n namespace under `apps.<key>`. */
  key: 'sekar' | 'swat';
  /** Public URL of the app. */
  url: string;
  /** Path to the app's logo in /public (its own official mark). */
  logo: string;
};

export const apps: readonly PortalApp[] = [
  {
    key: 'sekar',
    url: process.env.NEXT_PUBLIC_SEKAR_URL ?? 'https://sekar.wahyutrip.com',
    logo: '/sekar-logo.svg',
  },
  {
    key: 'swat',
    url: process.env.NEXT_PUBLIC_SWAT_URL ?? 'https://swat.wahyutrip.com',
    logo: '/swat-logo.svg',
  },
] as const;
