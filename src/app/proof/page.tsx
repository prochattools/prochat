import { getSEOTags } from '@/libs/seo'
import ProofPageContent from './ProofPageContent'

export const metadata = getSEOTags({
	title: 'Proof | ProChat',
	description:
		'Inspectable SaaSKit proof: live implementation evidence, operational readiness, and a concrete path from validation into a production-ready build.',
	openGraph: {
		title: 'Proof | ProChat',
		description:
			'Inspectable SaaSKit proof: live implementation evidence, operational readiness, and a concrete path from validation into a production-ready build.',
	},
	canonicalUrlRelative: '/proof',
})

export default function ProofPage() {
	return <ProofPageContent />
}
