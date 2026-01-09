import { getSEOTags } from '@/libs/seo'
import ProofPageContent from './ProofPageContent'

export const metadata = getSEOTags({
	title: 'Proof | ProChat',
	description:
		'No inflated metrics. Just inspectable evidence that the system exists and is being followed.',
	openGraph: {
		title: 'Proof | ProChat',
		description:
			'No inflated metrics. Just inspectable evidence that the system exists and is being followed.',
	},
	canonicalUrlRelative: '/proof',
})

export default function ProofPage() {
	return <ProofPageContent />
}
