import { notFound } from 'next/navigation'

import { getPublicDocEntry } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Docs | ProChat',
  description: 'Public product and implementation docs rendered from src/content/docs.',
  canonicalUrlRelative: '/docs',
})

export default async function DocsIndexPage() {
  const entry = await getPublicDocEntry([])

  if (!entry) notFound()

  return renderDocsMdxContent(entry)
}
