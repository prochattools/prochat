import { getSEOTags } from '@/libs/seo'
import MarketingApp from './(marketing)/App'

export const metadata = getSEOTags({
  title: 'ProChat OS | Agentic Workflow OS',
  description:
    'ProChat OS is an installable Agentic Workflow OS that connects messy business inputs to structured outputs, approvals, memory, agents, and the tools a business already uses.',
  keywords: [
    'ProChat OS',
    'Agentic Workflow OS',
    'agentic workflows',
    'AI workflow automation',
    'business process automation',
    'private AI workflow runtime',
    'AI orchestration',
  ],
  openGraph: {
    title: 'ProChat OS | Agentic Workflow OS',
    description:
      'Agentic workflows between your messy inputs and your business tools. Install a private workflow runtime with memory, connectors, approvals, and agents.',
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
