import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from './config';

/**
 * Per-request i18n config consumed by the next-intl plugin. The portal is
 * single-locale (Indonesian) with no locale routing, so we always serve the
 * default bundle. When a second locale is added, resolve it from the request here.
 */
export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: (await import(`./messages/${defaultLocale}.json`)).default,
  };
});
