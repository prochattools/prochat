import SectionIndex from '@/components/content/SectionIndex'
import { getSectionEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Prompts | ProChat',
  description: 'AI prompts designed to work inside the ProChat operating system for SaaS builders.',
  canonicalUrlRelative: '/prompts',
})

export default async function PromptsIndexPage() {
  const entries = await getSectionEntries('prompts')

  return (
    <SectionIndex
      section="prompts"
      title="Prompt Assets for SaaS Builders"
      description="Reusable AI prompts that connect to playbooks, guides, and production-safe execution patterns."
      entries={entries}
    />
  )
}
