import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';

import portalNext from '@portal/eslint-config/next';

/**
 * Web (Next.js) ESLint flat config. Composes the shared Next flat layer with the
 * Next.js plugin's `recommended` + `core-web-vitals` rules and the React Hooks
 * rules (registered directly to avoid the duplicate `import`-plugin conflict that
 * eslint-config-next's bundled flat config would cause).
 */
export default [
  ...portalNext,
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    settings: { next: { rootDir: import.meta.dirname } },
  },
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: [
      '.next/',
      'node_modules/',
      'next-env.d.ts',
      '**/*.config.{js,ts,mjs}',
      'eslint.config.mjs',
    ],
  },
];
