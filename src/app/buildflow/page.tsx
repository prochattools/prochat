import { getSEOTags } from '@/libs/seo'
import BuildFlowPageContent from './BuildFlowPageContent'

export const metadata = getSEOTags({
  title: 'BuildFlow | Secondary ProChat Product',
  description:
    'BuildFlow is a secondary ProChat project-context and AI execution product. ProChat OS is the flagship Agentic Workflow OS strategy.',
  keywords: [
    'BuildFlow',
    'ProChat OS',
    'AI project context',
    'safe AI file operations',
    'agentic workflow OS',
  ],
  openGraph: {
    title: 'BuildFlow | Secondary ProChat Product',
    description:
      'BuildFlow remains a useful project-context product, but the canonical ProChat strategy is ProChat OS.',
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
  canonicalUrlRelative: '/buildflow',
})

export default function BuildFlowPage() {
  return <BuildFlowPageContent />
}
