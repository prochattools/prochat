// src/app/layout.tsx
import { Providers } from '@/components/providers'
import AppShell from '@/components/AppShell'
import Header from '@/components/Header'
import { Scaffolding } from '@/components/ui/Scaffolding'
import StructuredData from '@/components/StructuredData'
import UmamiAnalytics from '@/components/UmamiAnalytics'
import { brand } from '@/lib/brand'
import { getSEOTags } from '@/libs/seo'
import { getOrganizationSchema, getWebsiteSchema } from '@/libs/structured-data'
import { SafeClerkProvider } from '@/libs/safeClerk'
import { Golos_Text, JetBrains_Mono } from 'next/font/google'
import { Viewport } from 'next'
import { ReactNode } from 'react'

import '@/assets/styles/globals.scss'

const ROOT_TITLE = 'ProChat — The Operating System for SaaS Builders'
const ROOT_DESCRIPTION =
  'ProChat is the operating system for SaaS builders. Structured systems, production-safe foundations, and AI-driven execution for non-technical founders.'

const fontSans = { variable: '' }

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
    background: rgb(var(--pc-blue-600-rgb) / 1);
    color: white;
  }
`

export const viewport: Viewport = {
  themeColor: brand.colors.darkBackground,
  width: 'device-width',
  initialScale: 1,
}

export const metadata = getSEOTags({
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  openGraph: {
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
    images: ['/og'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${fontSans.variable} ${fontBrand.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE_OVERRIDES }} />
        <StructuredData id="schema-organization" data={getOrganizationSchema()} />
        <StructuredData id="schema-website" data={getWebsiteSchema()} />
        <UmamiAnalytics />
      </head>
      <body className="font-body bg-background text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <Scaffolding opacity={0.6} />
        </div>

        <div className="relative z-10">
          <Providers>
            <SafeClerkProvider>
              <Header />
              <AppShell>{children}</AppShell>
            </SafeClerkProvider>
          </Providers>
        </div>
      </body>
    </html>
  )
}
