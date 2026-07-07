import { useTranslations } from 'next-intl';

import { apps } from '@/config/apps';

import { AppCard } from './AppCard';

/** Grid of app cards (SEKAR + SWAT). */
export function AppsSection() {
  const t = useTranslations('apps');

  return (
    <section id="apps" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {apps.map((app) => (
            <AppCard key={app.key} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
