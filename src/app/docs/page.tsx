import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPublicDocEntry } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { getSiteUrl } from '@/libs/site-url'

const DOCS_DESCRIPTION =
  'Public implementation docs for SaaSKit, ProKit, and shared features. Most founders should start with SaaSKit.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Docs | ProChat',
    description: DOCS_DESCRIPTION,
    applicationName: 'ProChat',
    keywords: ['prochat', 'documentation', 'prokit', 'saaskit'],
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

  return renderDocsMdxContent(entry)
}
