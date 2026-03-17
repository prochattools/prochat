import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'ProChat',
  description:
    'ProChat helps non-technical founders move from preparation to implementation, with SaaSKit as the production-ready boilerplate for real launches.',
  keywords: [
    'SaaS boilerplate',
    'Next.js SaaS starter',
    'build SaaS without coding',
    'AI SaaS builder',
    'production-ready SaaS foundation',
    'Supabase Stripe Next.js starter',
  ],
  openGraph: {
    title: 'ProChat',
    description:
      'ProChat helps non-technical founders move from preparation to implementation, with SaaSKit as the production-ready boilerplate for real launches.',
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
