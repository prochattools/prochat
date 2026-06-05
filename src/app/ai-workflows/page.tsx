import { getSEOTags } from '@/libs/seo'
import AIWorkflowsPageContent from './AIWorkflowsPageContent'

const title = 'First Time-Saving Test for Repeated Business Work | ProChat OS'
const description =
  'Show ProChat one repeated task your team still does by hand. We turn your examples, notes, emails, and context into a review-ready draft, summary, task list, report, or reply.'

export const metadata = getSEOTags({
  title,
  description,
  keywords: [
    'AI work automation',
    'business time saving test',
    'repeated work automation',
    'AI draft preparation',
    'sales follow-up automation',
    'support reply automation',
    'proposal draft automation',
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
  canonicalUrlRelative: '/ai-workflows',
})

export default function AIWorkflowsPage() {
  return <AIWorkflowsPageContent />
}
