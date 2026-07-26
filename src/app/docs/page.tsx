import { notFound } from 'next/navigation'

import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getDocsSchemas } from '@/libs/structured-data'

import DocsThemeLayout from './DocsThemeLayout'
import { getPublicDocEntry } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'

const DOCS_DESCRIPTION =
  'Documentation for ProChat Memory, the selected Memory for QA beta, and ProChat Workbench.'

export async function generateMetadata() {
  return getSEOTags({
    title: 'ProChat Documentation | Memory and Workbench',
    description: DOCS_DESCRIPTION,
    keywords: [
      'ProChat Memory',
      'Memory for QA',
      'ProChat Workbench',
      'reviewed memory',
      'local-first tools',
      'self-hosted Workbench',
      'QA memory',
    ],
    openGraph: {
      title: 'ProChat Documentation',
      description: DOCS_DESCRIPTION,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ProChat Documentation',
      description: DOCS_DESCRIPTION,
    },
    socialImage: {
      line1: 'ProChat Documentation',
      line2: 'Memory and Workbench',
      subtitle: 'Choose a product, understand the boundaries, and follow the current public path.',
    },
    canonicalUrlRelative: '/docs',
  })
}

export default async function DocsIndexPage() {
  const entry = await getPublicDocEntry([])

  if (!entry) notFound()

  const content = await renderDocsMdxContent(entry)
  const page = await DocsThemeLayout({
    docsCategory: 'docs',
    children: content,
  })

  return (
    <>
      <StructuredData id="schema-docs" data={getDocsSchemas()} />
      {page}
    </>
  )
}
