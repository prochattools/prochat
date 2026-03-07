import SectionIndex from '@/components/content/SectionIndex'
import { getSectionEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Snippets | ProChat',
  description: 'Implementation snippets that support the ProChat authority and product system.',
  canonicalUrlRelative: '/snippets',
})

export default async function SnippetsIndexPage() {
  const entries = await getSectionEntries('snippets')

  return (
    <SectionIndex
      section="snippets"
      title="Snippet Library"
      description="Focused implementation references that support the larger operating system and SEO architecture."
      entries={entries}
    />
  )
}
