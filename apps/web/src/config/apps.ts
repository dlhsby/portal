/**
 * Metadata for the apps the portal links out to. URLs come from build-time
 * public env vars (NOT secrets) with sensible production defaults, so a build
 * without env still points at the live apps.
 */
export type PortalApp = {
  /** Stable key; also the i18n namespace under `apps.<key>`. */
  key: 'sekar' | 'swat';
  /** Public URL of the app. */
  url: string;
  /** Tailwind gradient classes for the card accent. */
  accentFrom: string;
  accentTo: string;
};

export const apps: readonly PortalApp[] = [
  {
    key: 'sekar',
    url: process.env.NEXT_PUBLIC_SEKAR_URL ?? 'https://sekar.wahyutrip.com',
    accentFrom: 'from-emerald-500',
    accentTo: 'to-teal-600',
  },
  {
    key: 'swat',
    url: process.env.NEXT_PUBLIC_SWAT_URL ?? 'https://swat.wahyutrip.com',
    accentFrom: 'from-teal-500',
    accentTo: 'to-cyan-600',
  },
] as const;
