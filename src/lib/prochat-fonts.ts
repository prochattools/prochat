import { Golos_Text, JetBrains_Mono } from 'next/font/google'

export const prochatSans = Golos_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prochat-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
})

export const prochatMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-prochat-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
})

export const prochatFontVariables = `${prochatSans.variable} ${prochatMono.variable}`

export const prochatFontFallbacks = {
  primary: 'system-ui, -apple-system, Segoe UI, sans-serif',
  technical: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const
