import { getSEOTags } from '@/libs/seo'
import EventTaxonomyContent from './EventTaxonomyContent'

export const metadata = getSEOTags({
	title: 'Event taxonomy | ProChat',
	description: 'The analytics events used across ProChat and the kits.',
	openGraph: {
		title: 'Event taxonomy | ProChat',
		description: 'The analytics events used across ProChat and the kits.',
	},
	canonicalUrlRelative: '/systems/events',
})

export default function EventTaxonomyPage() {
	return <EventTaxonomyContent />
}
