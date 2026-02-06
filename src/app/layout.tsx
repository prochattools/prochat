// src/app/layout.tsx
import { Providers } from '@/components/providers'
import { getSEOTags } from '@/libs/seo'
import { SafeClerkProvider } from '@/libs/safeClerk'
import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import '@/assets/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = getSEOTags()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SafeClerkProvider>
            {children}
          </SafeClerkProvider>
        </Providers>
      </body>
    </html>
  )
}
