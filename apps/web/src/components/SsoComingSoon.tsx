import { LockKeyhole } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Placeholder for the future unified SSO login — visible but disabled. */
export function SsoComingSoon() {
  const t = useTranslations('sso');

  return (
    <section id="sso" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-600 to-teal-700 px-8 py-12 text-center text-white shadow-lg sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
          />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-50">
            {t('badge')}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50/90 sm:text-base">
            {t('description')}
          </p>
          <button
            type="button"
            disabled
            aria-disabled
            className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-white/90 px-6 py-3 text-sm font-semibold text-emerald-800 opacity-70"
          >
            <LockKeyhole className="h-4 w-4" aria-hidden />
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
