import { getSEOTags } from '@/libs/seo'
import ProofPageContent from './ProofPageContent'

export const metadata = getSEOTags({
	title: 'Proof | ProChat',
	description:
		'Inspectable evidence that the ProChat workflow produces real implementation outputs and points founders toward SaaSKit.',
	openGraph: {
		title: 'Proof | ProChat',
		description:
			'Inspectable evidence that the ProChat workflow produces real implementation outputs and points founders toward SaaSKit.',
	},
	canonicalUrlRelative: '/proof',
})

export default function ProofPage() {
	return <ProofPageContent />
}
