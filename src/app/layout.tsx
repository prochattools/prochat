// src/app/layout.tsx
import { Providers } from '@/components/providers'
import { getSEOTags } from '@/libs/seo'
import { SafeClerkProvider } from '@/libs/safeClerk'
import { Viewport } from 'next'
import { Golos_Text, Inter } from 'next/font/google'
import { ReactNode } from 'react'

import '@/assets/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })
const golos = Golos_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-golos',
})

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = getSEOTags()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${golos.variable}`}>
        <Providers>
          <SafeClerkProvider>{children}</SafeClerkProvider>
        </Providers>
      </body>
    </html>
  )
}
