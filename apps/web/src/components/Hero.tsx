import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Landing hero: headline, subtitle, and primary/secondary calls to action. */
export function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft green gradient wash + subtle grid backdrop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {t('eyebrow')}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {t('subtitle')}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#apps"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            {t('ctaApps')}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {t('ctaAbout')}
          </a>
        </div>
      </div>
    </section>
  );
}
