import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'ProChat',
  description:
    'ProChat is the operating system for SaaS builders. Structured systems, production-safe foundations, and AI-driven execution for non-technical founders.',
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
      'ProChat is the operating system for SaaS builders. Structured systems, production-safe foundations, and AI-driven execution for non-technical founders.',
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
