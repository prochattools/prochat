import { getSEOTags } from '@/libs/seo'
import LegalAIWorkflowsPageContent from './LegalAIWorkflowsPageContent'

const title = 'Private Legal AI Workflows for Small Law Firms | ProChat OS'
const description =
  'ProChat OS helps small law firms test private AI document and intake workflows: client emails, PDFs, notes, forms, and attachments become structured summaries, missing-information checklists, task lists, and draft follow-ups with lawyer approval first.'

export const metadata = getSEOTags({
  title,
  description,
  keywords: [
    'legal AI workflows',
    'law firm AI workflow',
    'legal document workflow',
    'client intake automation',
    'law firm admin automation',
    'ProChat OS',
    'private legal AI workspace',
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
