// src/app/layout.tsx
import { Providers } from '@/components/providers'
import AppChrome from '@/components/AppChrome'
import StructuredData from '@/components/StructuredData'
import UmamiAnalytics from '@/components/UmamiAnalytics'
import { brand } from '@/lib/brand'
import { getSEOTags } from '@/libs/seo'
import { getOrganizationSchema, getWebsiteSchema } from '@/libs/structured-data'
import { Golos_Text, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Viewport } from 'next'
import { ReactNode } from 'react'
import '@fontsource/jetbrains-mono'

import '@/assets/styles/globals.scss'

const ROOT_TITLE = 'ProChat — Build SaaS with Structure, not Guesswork.'
const ROOT_DESCRIPTION =
  'ProChat helps founders build SaaS with structure, not guesswork. Structured systems, production-safe foundations, and AI-driven execution for non-technical founders.'

const fontSans = localFont({
  src: '../assets/fonts/HostGrotesk-latin.woff2',
  weight: '400 700',
  variable: '--font-sans',
  display: 'swap',
})

const fontBrand = Golos_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-brand',
  display: 'swap',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
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
        <link
          rel="preload"
          href="/assets/backgrounds/hero-main-lines-dark.svg"
          as="image"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="preload"
          href="/assets/backgrounds/hero-main-lines-light.svg"
          as="image"
          media="(prefers-color-scheme: light)"
        />
        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE_OVERRIDES }} />
        <StructuredData id="schema-organization" data={getOrganizationSchema()} />
        <StructuredData id="schema-website" data={getWebsiteSchema()} />
        <UmamiAnalytics />
      </head>
      <body className="font-body bg-background text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  )
}
