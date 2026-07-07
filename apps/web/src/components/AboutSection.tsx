import { Leaf, Recycle, MonitorSmartphone, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const POINTS: ReadonlyArray<{ key: string; icon: LucideIcon }> = [
  { key: 'rth', icon: Leaf },
  { key: 'waste', icon: Recycle },
  { key: 'digital', icon: MonitorSmartphone },
];

/** "Tentang DLH" — mission blurb + three focus areas. */
export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{t('body')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {POINTS.map(({ key, icon: Icon }) => (
            <div key={key} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {t(`points.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {t(`points.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
