import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'ProChat OS | Stop Rewriting the Same Work',
  description:
    'ProChat helps businesses turn repeated emails, notes, examples, reports, and follow-ups into drafts, summaries, tasks, and replies their team can review and use.',
  keywords: [
    'ProChat OS',
    'AI work automation',
    'business process automation',
    'repeated work automation',
    'AI drafts for business',
    'support reply automation',
    'sales follow-up automation',
    'managed AI workflows',
  ],
  openGraph: {
    title: 'ProChat OS | Stop Rewriting the Same Work',
    description:
      'Turn repeated business work into drafts, summaries, task lists, reports, and replies your team can review and use.',
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
