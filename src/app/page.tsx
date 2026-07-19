import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'Memory for AI-Assisted Work',
  description:
    'ProChat builds local-first, review-first tools for reusable memory and safe AI-assisted project work.',
  keywords: [
    'ProChat Memory',
    'ProChat Memory for QA',
    'ProChat Workbench',
    'AI-assisted work memory',
    'local-first memory',
    'review-first AI tools',
    'persistent project context',
    'safe AI-assisted project work',
  ],
  openGraph: {
    title: 'Memory for AI-Assisted Work',
    description:
      'Local-first, review-first tools for reusable memory and safe AI-assisted project work.',
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
  canonicalUrlRelative: '/',
})

export default function Home() {
  return <MarketingApp />
}
