import { ReactNode } from 'react'
import { getSEOTags } from '@/libs/seo'
import config from '@/config'

export const metadata = getSEOTags({
  title: `Contact ${config.appName} | Memory Beta and Workbench`,
  description:
    'Contact ProChat about ProChat Memory, the selected Memory for QA beta, or guarded local project work with ProChat Workbench.',
  canonicalUrlRelative: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
