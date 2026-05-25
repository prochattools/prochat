import { getSEOTags } from '@/libs/seo'
import BookPageContent from './BookPageContent'

export const metadata = getSEOTags({
  title: 'Book a Call | ProChat',
  description:
    'Book a free AI Fit Check or a 60-minute Personal AI Setup Session for practical help with AI tools, automations, local setup, privacy basics, and workflow planning.',
  keywords: [
    'AI setup session',
    'AI consultation',
    'personal AI workflow',
    'business AI setup',
    'AI automation help',
    'ProChat booking',
  ],
  openGraph: {
    title: 'Book a Call | ProChat',
    description:
      'Book a free AI Fit Check or a 60-minute Personal AI Setup Session for practical help setting up AI for your work, business, or personal productivity.',
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
  canonicalUrlRelative: '/book',
})

export default function BookPage() {
  return <BookPageContent />
}
