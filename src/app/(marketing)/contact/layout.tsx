import { ReactNode } from 'react'
import { getSEOTags } from '@/libs/seo'
import config from '@/config'

export const metadata = getSEOTags({
  title: `Contact ${config.appName} | SaaSKit, ProKit, and Licensing`,
  description:
    'Contact ProChat for SaaSKit or ProKit questions, implementation blockers, and licensing support.',
  canonicalUrlRelative: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
