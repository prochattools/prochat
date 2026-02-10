import { getSEOTags } from '@/libs/seo'
import KitsPageContent from './KitsPageContent'

export const metadata = getSEOTags({
	title: 'Kits | ProChat',
	description:
		'Explore the ProChat kits and choose your starting point: WaaSKit, SaaSKit, or ProKit.',
	openGraph: {
		title: 'Kits | ProChat',
		description:
			'Explore the ProChat kits and choose your starting point: WaaSKit, SaaSKit, or ProKit.',
	},
	canonicalUrlRelative: '/kits',
})

export default function KitsPage() {
	return <KitsPageContent />
}
