import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import DocsThemeLayout from './DocsThemeLayout'
import { getPublicDocEntry } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { getSiteUrl } from '@/libs/site-url'

const DOCS_DESCRIPTION =
  'Documentation for ProChat Memory, the selected Memory for QA beta, and ProChat Workbench.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ProChat Documentation | Memory and Workbench',
    description: DOCS_DESCRIPTION,
    applicationName: 'ProChat',
    keywords: [
      'ProChat Memory',
      'Memory for QA',
      'ProChat Workbench',
      'reviewed memory',
      'local-first tools',
      'self-hosted Workbench',
      'QA memory',
    ],
    metadataBase: new URL(`${getSiteUrl()}/`),
    alternates: { canonical: '/docs' },
    openGraph: {
      title: 'ProChat Documentation',
      description: DOCS_DESCRIPTION,
      url: '/docs',
      images: ['/og'],
      type: 'website',
    },
    twitter: {
      title: 'ProChat Documentation',
      description: DOCS_DESCRIPTION,
      images: ['/og'],
      card: 'summary_large_image',
    },
  }
}

export default async function DocsIndexPage() {
  const entry = await getPublicDocEntry([])

  if (!entry) notFound()

  const content = await renderDocsMdxContent(entry)
  return DocsThemeLayout({
    docsCategory: 'docs',
    children: content,
  })
}
