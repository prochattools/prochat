import SectionIndex from '@/components/content/SectionIndex'
import { getSectionEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'

export const metadata = getSEOTags({
  title: 'Playbooks | ProChat',
  description: 'Execution playbooks for SaaS builders working inside the ProChat operating system.',
  canonicalUrlRelative: '/playbooks',
})

export default async function PlaybooksIndexPage() {
  const entries = await getSectionEntries('playbooks')

  return (
    <SectionIndex
      section="playbooks"
      title="Playbooks for SaaS Builder Execution"
      description="Repeatable sequences that turn system understanding into operating behavior."
      entries={entries}
    />
  )
}
