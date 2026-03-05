import { ReactNode } from 'react'
import { getSEOTags } from '@/libs/seo'
import config from '@/config'

export const metadata = getSEOTags({
  title: `Contact ${config.appName} | Support, Studio, and Licensing`,
  description:
    'Contact ProChat for SaaSKit support, billing and licensing questions, and Studio implementation work.',
  canonicalUrlRelative: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
