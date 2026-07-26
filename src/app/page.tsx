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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  socialImage: {
    line1: 'ProChat Memory',
    line2: 'AI-assisted work',
    subtitle: 'Local-first memory. Reviewed context. Guarded local tools.',
  },
  canonicalUrlRelative: '/',
})

export default function Home() {
  return <MarketingApp />
}
