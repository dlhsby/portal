import { type Metadata, type Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('title'),
    description: t('description'),
    icons: { icon: '/favicon.svg' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: 'id_ID',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Single-locale portal: messages resolve from src/i18n/request.ts.
  const messages = await getMessages();

  return (
    <html lang="id">
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
