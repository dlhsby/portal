/** Locale configuration. Indonesian-only for now; the array is where a second
 *  locale (e.g. `en-US`) would be added when the portal grows. */
export const locales = ['id-ID'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'id-ID';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
