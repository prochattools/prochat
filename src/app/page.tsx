import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'ProChat — Build Your SaaS with AI (Without Breaking It)',
  description:
    'ProChat helps non-technical founders build and launch real SaaS products using AI — with a production-ready Next.js foundation including authentication, billing, database integration and deployment patterns.',
  keywords: [
    'SaaS boilerplate',
    'Next.js SaaS starter',
    'build SaaS without coding',
    'AI SaaS builder',
    'production-ready SaaS foundation',
    'Supabase Stripe Next.js starter',
  ],
  openGraph: {
    title: 'ProChat — Build Your SaaS with AI (Without Breaking It)',
    description:
      'ProChat helps non-technical founders build and launch real SaaS products using AI — with a production-ready Next.js foundation including authentication, billing, database integration and deployment patterns.',
    images: ['/og/prochat-home.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/prochat-home.png'],
  },
  canonicalUrlRelative: '/',
})

export default function Home() {
  return <MarketingApp />
}
