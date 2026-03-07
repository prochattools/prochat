import SectionIndex from '@/components/content/SectionIndex'
import { getSectionEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Docs | ProChat',
  description: 'System documentation that explains how the ProChat operating system is structured.',
  canonicalUrlRelative: '/docs',
})

export default async function DocsIndexPage() {
  const entries = await getSectionEntries('docs')

  return (
    <SectionIndex
      section="docs"
      title="Documentation for the ProChat Operating System"
      description="Implementation detail, architecture context, and system guidance for the authority stack."
      entries={entries}
    />
  )
}
