// src/app/layout.tsx
import { Providers } from '@/components/providers'
import AppShell from '@/components/AppShell'
import { Scaffolding } from '@/components/ui/Scaffolding'
import { getSEOTags } from '@/libs/seo'
import { SafeClerkProvider } from '@/libs/safeClerk'
import { Viewport } from 'next'
import Script from 'next/script'
import { ReactNode } from 'react'

import '@/assets/styles/globals.scss'

const ROOT_TITLE = 'ProChat - Build SaaS without guessing'
const ROOT_DESCRIPTION =
  'ProChat is a practical system: start with paid clients, extract repeating pain, then ship SaaS on a proven stack.'

const TAILWIND_RUNTIME_CONFIG = `
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['"Golos Text"', 'sans-serif'],
        },
        colors: {
          primary: '#885efe',
          secondary: '#5b49f5',
          success: '#61ce70',
          surface: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            900: '#111827',
          },
        },
        backgroundImage: {
          noise: "url('data:image/svg+xml,%3Csvg viewBox=%220%200%20200%20200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
          'grid-pattern':
            'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
        },
        animation: {
          float: 'float 6s ease-in-out infinite',
          'float-delayed': 'float 6s ease-in-out 3s infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        },
      },
    },
  }
`

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
        <Script
          id="tailwind-runtime-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: TAILWIND_RUNTIME_CONFIG }}
        />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE_OVERRIDES }} />
      </head>
      <body className="bg-gray-50 text-slate-900 selection:bg-purple-200">
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
