import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'ProChat OS | Messy Business Information In, Useful Work Out',
  description:
    'ProChat OS helps businesses turn messy emails, PDFs, forms, notes, folders, and API data into summaries, checklists, draft replies, reports, tasks, and status updates ready for human review.',
  keywords: [
    'ProChat OS',
    'AI workflow automation',
    'business process automation',
    'client intake automation',
    'document workflow automation',
    'admin automation',
    'managed AI workflows',
  ],
  openGraph: {
    title: 'ProChat OS | Messy Business Information In, Useful Work Out',
    description:
      'Turn messy business information into summaries, checklists, draft replies, reports, tasks, and status updates your team can review and use.',
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
