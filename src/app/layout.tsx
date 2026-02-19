// src/app/layout.tsx
import { Providers } from '@/components/providers'
import AppShell from '@/components/AppShell'
import { Scaffolding } from '@/components/ui/Scaffolding'
import { getSEOTags } from '@/libs/seo'
import { SafeClerkProvider } from '@/libs/safeClerk'
import { Figtree, Golos_Text, JetBrains_Mono } from 'next/font/google'
import { Viewport } from 'next'
import { ReactNode } from 'react'

import '@/assets/styles/globals.scss'

const ROOT_TITLE = 'ProChat - Build SaaS without guessing'
const ROOT_DESCRIPTION =
  'ProChat is a practical system: start with paid clients, extract repeating pain, then ship SaaS on a proven stack.'

const fontSans = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const fontBrand = Golos_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-brand',
  display: 'swap',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const BASE_STYLE_OVERRIDES = `
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: #2563EB;
    color: white;
  }
`

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = getSEOTags({
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  openGraph: {
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
  },
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontBrand.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE_OVERRIDES }} />
      </head>
      <body className="font-body bg-gray-50 text-slate-900 dark:bg-[#010814] dark:text-slate-100 selection:bg-[#2563EB]/20 dark:selection:bg-[#1D4ED8]/40">
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <Scaffolding opacity={0.6} />
        </div>

        <div className="relative z-10">
          <Providers>
            <SafeClerkProvider>
              <AppShell>{children}</AppShell>
            </SafeClerkProvider>
          </Providers>
        </div>
      </body>
    </html>
  )
}
