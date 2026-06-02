import { getSEOTags } from '@/libs/seo'
import LegalAIWorkflowsPageContent from './LegalAIWorkflowsPageContent'

const title = 'AI Document Workflow Support for Small Law Firms | ProChat OS'
const description =
  'ProChat helps small law firms spend less time sorting client emails, PDFs, notes, and attachments by preparing intake summaries, missing-information checklists, matter tasks, and draft follow-ups for lawyer review.'

export const metadata = getSEOTags({
  title,
  description,
  keywords: [
    'legal AI workflow',
    'law firm document workflow',
    'legal admin automation',
    'client intake summary',
    'law firm follow-up emails',
    'document review summary',
    'ProChat OS',
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
  canonicalUrlRelative: '/legal-ai-workflows',
})

export default function LegalAIWorkflowsPage() {
  return <LegalAIWorkflowsPageContent />
}
