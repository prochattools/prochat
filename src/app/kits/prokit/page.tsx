import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import { getStripePriceProkit } from '@/libs/stripe-env'
import ProKitPageContent from './ProKitPageContent'

const proKitTitle = 'ProKit — Developer Core Boilerplate | ProChat'
const proKitDescription =
	'ProKit is the production-ready core boilerplate for builders who want stable infrastructure before they scale.'

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
	const prokitProduct =
		config.stripe.products.find(product =>
			product.title.toLowerCase().includes('prokit')
		) ?? null
	const envPriceId = getStripePriceProkit() || null
	const priceId = prokitProduct?.priceId || envPriceId

	return <ProKitPageContent priceId={priceId} />
}
