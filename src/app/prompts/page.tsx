import SectionIndex from '@/components/content/SectionIndex'
import { getSectionEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Prompts | ProChat',
  description: 'Execution prompts for non-technical founders using Starting Point, the Production Guide, and SaaSKit to ship a real product.',
  canonicalUrlRelative: '/prompts',
})

export default async function PromptsIndexPage() {
  const entries = await getSectionEntries('prompts')

  return (
    <SectionIndex
      section="prompts"
      title="Execution Prompts for SaaSKit Builders"
      description="Use these prompts after Starting Point and the Production Guide when you need help moving the real build forward inside SaaSKit and the implementation docs."
      entries={entries}
    />
  )
}
