import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import ProKitPageContent from './ProKitPageContent'

const proKitTitle = 'ProKit — Developer Core Boilerplate | ProChat'
const proKitDescription =
	'ProKit is the developer core boilerplate that powers ProChat kits—ship faster with a standardized Next.js, TypeScript, Stripe, and Postgres stack.'

export const metadata = getSEOTags({
	title: proKitTitle,
	description: proKitDescription,
	openGraph: {
		title: proKitTitle,
		description: proKitDescription,
	},
	canonicalUrlRelative: '/kits/prokit',
})

export default function ProKitPage() {
	const defaultProduct =
		config.stripe.products.find(product => product.isBest) ??
		config.stripe.products[0]
	const priceId = defaultProduct?.priceId ?? null

	return <ProKitPageContent priceId={priceId} />
}
