import js from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'

const config = [
  { ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'] },
  js.configs.recommended,
  ...nextVitals,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'no-extra-boolean-cast': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'prefer-const': 'off',
      'react/prop-types': 'off',
      'no-empty': 'off',
      'no-prototype-builtins': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-useless-escape': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
    },
  },
]

export default config
