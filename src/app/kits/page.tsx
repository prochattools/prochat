import { getSEOTags } from '@/libs/seo'
import KitsPageContent from './KitsPageContent'

export const metadata = getSEOTags({
  title: 'Legacy Products | ProChat',
  description:
    'View ProChat legacy and supporting products. ProChat OS is the flagship Agentic Workflow OS; SaaSKit, ProKit, and BuildFlow remain supporting products.',
  openGraph: {
    title: 'Legacy Products | ProChat',
    description:
      'ProChat OS is the flagship. SaaSKit, ProKit, BuildFlow, UXKit, and WaaSKit are legacy or supporting products under the ProChat OS strategy.',
  },
  canonicalUrlRelative: '/kits',
})

export default function KitsPage() {
  return <KitsPageContent />
}
