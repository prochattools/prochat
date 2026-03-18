import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPublicDocEntry } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { getSiteUrl } from '@/libs/site-url'

const DOCS_DESCRIPTION =
  'Implementation docs for SaaSKit, ProKit, and shared features. Most founders should start with SaaSKit, then use these docs to build, configure, and launch correctly.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Docs | ProChat',
    description: DOCS_DESCRIPTION,
    applicationName: 'ProChat',
    keywords: ['prochat docs', 'saaskit docs', 'prokit docs', 'saas implementation'],
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
