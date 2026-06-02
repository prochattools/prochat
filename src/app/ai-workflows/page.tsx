import { getSEOTags } from '@/libs/seo'
import AIWorkflowsPageContent from './AIWorkflowsPageContent'

const title = 'Managed AI Workflows That Save Admin Time | ProChat OS'
const description =
  'ProChat OS helps businesses turn messy emails, PDFs, forms, notes, folders, and API data into summaries, checklists, tasks, reports, and draft replies for human review.'

export const metadata = getSEOTags({
  title,
  description,
  keywords: [
    'managed AI workflows',
    'AI workflow automation',
    'business process automation',
    'admin automation',
    'client intake automation',
    'document workflow automation',
    'draft replies',
  ],
  openGraph: {
    title,
    description,
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
  canonicalUrlRelative: '/ai-workflows',
})

export default function AIWorkflowsPage() {
  return <AIWorkflowsPageContent />
}
