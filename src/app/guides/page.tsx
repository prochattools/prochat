import SectionIndex from '@/components/content/SectionIndex'
import { getSectionEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Guides | ProChat',
  description: 'Guides that connect strategy, execution, and product foundations for SaaS builders.',
  canonicalUrlRelative: '/guides',
})

export const revalidate = 3600

export default async function GuidesIndexPage() {
  const entries = await getSectionEntries('guides')

  return (
    <SectionIndex
      section="guides"
      title="Guides for Structured SaaS Execution"
      description="Walkthroughs that connect business decisions to prompts, playbooks, and production-safe systems."
      entries={entries}
    />
  )
}
