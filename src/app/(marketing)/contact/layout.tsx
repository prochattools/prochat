import { ReactNode, Suspense } from 'react'
import { getSEOTags } from '@/libs/seo'
import config from '@/config'

export const metadata = getSEOTags({
  title: `Contact ${config.appName} | Evermind, Nevermind, and Mastermind`,
  description:
    'Contact ProChat about human-owned memory, working context, or controlled execution with Evermind, Nevermind, and Mastermind.',
  canonicalUrlRelative: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Suspense fallback={null}>{children}</Suspense>
}
