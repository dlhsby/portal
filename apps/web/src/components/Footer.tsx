import { Leaf, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { apps } from '@/config/apps';

/** Site footer: brand, contact info, app links, copyright. */
export function Footer() {
  const t = useTranslations('footer');
  const tApps = useTranslations('apps');
  const tHeader = useTranslations('header');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                <Leaf className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-bold text-slate-900">{tHeader('brand')}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">{t('tagline')}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{t('contactTitle')}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                <a href={`mailto:${t('email')}`} className="hover:text-emerald-700">
                  {t('email')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                <span>{t('phone')}</span>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{t('appsTitle')}</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {apps.map((app) => (
                <li key={app.key}>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700"
                  >
                    {tApps(`${app.key}.name`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © {year} {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
