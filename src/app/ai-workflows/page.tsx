import { getSEOTags } from '@/libs/seo'
import AIWorkflowsPageContent from './AIWorkflowsPageContent'

const title = 'Managed AI Workflows for Messy Business Processes | ProChat OS'
const description =
  'ProChat OS helps businesses automate one repetitive workflow first: emails, PDFs, forms, notes, folders, and APIs become summaries, checklists, reports, draft replies, tasks, and status updates with human approval first.'

export const metadata = getSEOTags({
  title,
  description,
  keywords: [
    'managed AI workflows',
    'AI workflow automation',
    'ProChat OS',
    'business process automation',
    'client intake automation',
    'document workflow automation',
    'agentic workflows',
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
