import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { type PortalApp } from '@/config/apps';

/** Card linking out to one app (SEKAR / SWAT). Opens the app in a new tab. */
export function AppCard({ app }: { app: PortalApp }) {
  const t = useTranslations('apps');

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <div className="flex items-start justify-between">
        <Image
          src={app.logo}
          alt={`Logo ${t(`${app.key}.name`)}`}
          width={56}
          height={56}
          unoptimized
          className="h-14 w-14"
        />
        <ArrowUpRight
          className="h-5 w-5 text-slate-300 transition group-hover:text-emerald-600"
          aria-hidden
        />
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
        {t(`${app.key}.name`)}
      </h3>
      <p className="mt-1 text-sm font-semibold text-emerald-700">{t(`${app.key}.tagline`)}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {t(`${app.key}.description`)}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
        {t('openApp')}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </span>
    </a>
  );
}
