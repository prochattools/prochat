import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import SaaSkitPageContent from './SaaSkitPageContent'

const saaskitTitle = 'SaaSkit — SaaS Launch Kit | ProChat'
const saaskitDescription =
	'SaaSkit is the launch kit for builders with an offer or audience. Use the ProChat operating system to package, sell, and deliver faster.'

export const metadata = getSEOTags({
	title: saaskitTitle,
	description: saaskitDescription,
	openGraph: {
		title: saaskitTitle,
		description: saaskitDescription,
	},
	canonicalUrlRelative: '/kits/saaskit',
})

export default function SaaSkitPage() {
	const saaskitProduct =
		config.stripe.products.find(product =>
			product.title.toLowerCase().includes('saaskit')
		) ?? null
	const priceId = saaskitProduct?.priceId ?? null

	return <SaaSkitPageContent priceId={priceId} />
}

