import studio from '@sanity/eslint-config-studio'
import nextPlugin from '@next/eslint-plugin-next'

// Share modern React, accessibility, and TypeScript checks with Studio,
// then add Next.js routing and performance rules.
export default [
  ...studio,
  {
    plugins: {'@next/next': nextPlugin},
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {ignores: ['.next/**', 'sanity.types.ts', 'next-env.d.ts']},
]
