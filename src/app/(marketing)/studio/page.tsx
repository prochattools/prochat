import { getSEOTags } from '@/libs/seo'
import StudioPageContent from './StudioPageContent'

export const metadata = getSEOTags({
	title: 'Studio | ProChat',
	description:
		'Client work, executed under the same constraints the system enforces. No shortcuts. No speculative builds.',
	openGraph: {
		title: 'Studio | ProChat',
		description:
			'Client work, executed under the same constraints the system enforces. No shortcuts. No speculative builds.',
	},
	canonicalUrlRelative: '/studio',
})

export default function StudioPage() {
	return <StudioPageContent />
}
