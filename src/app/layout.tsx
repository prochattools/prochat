// src/app/layout.tsx
import { Providers } from '@/components/providers'
import AppShell from '@/components/AppShell'
import { Scaffolding } from '@/components/ui/Scaffolding'
import { getSEOTags } from '@/libs/seo'
import { SafeClerkProvider } from '@/libs/safeClerk'
import { Viewport } from 'next'
import { ReactNode } from 'react'

import '@/assets/styles/globals.scss'

const ROOT_TITLE = 'ProChat - Build SaaS without guessing'
const ROOT_DESCRIPTION =
  'ProChat is a practical system: start with paid clients, extract repeating pain, then ship SaaS on a proven stack.'

const BASE_STYLE_OVERRIDES = `
  body {
    font-family: 'Golos Text', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: #885efe;
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE_OVERRIDES }} />
      </head>
      <body className="bg-gray-50 text-slate-900 dark:bg-[#010814] dark:text-slate-100 selection:bg-purple-200 dark:selection:bg-[#5b49f5]/40">
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
