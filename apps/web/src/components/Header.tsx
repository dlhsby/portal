import { Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Sticky top bar: brand mark + section anchors. */
export function Header() {
  const t = useTranslations('header');

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
            <Leaf className="h-5 w-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-slate-900">{t('brand')}</span>
            <span className="hidden text-xs text-slate-500 sm:block">{t('org')}</span>
          </span>
        </a>

        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
          <a href="#apps" className="hidden rounded-lg px-3 py-2 hover:bg-slate-100 sm:block">
            {t('nav.apps')}
          </a>
          <a href="#about" className="hidden rounded-lg px-3 py-2 hover:bg-slate-100 sm:block">
            {t('nav.about')}
          </a>
          <a
            href="#sso"
            className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
          >
            {t('nav.sso')}
          </a>
        </nav>
      </div>
    </header>
  );
}
