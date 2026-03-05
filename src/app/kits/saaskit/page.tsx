import config from '@/config'
import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getStripePriceSaaskit } from '@/libs/stripe-env'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import SaaSkitPageContent from './SaaSkitPageContent'

const saaskitTitle = 'SaaSKit — Production-Ready Next.js SaaS Boilerplate'
const saaskitDescription =
	'SaaSKit is a production-ready Next.js SaaS boilerplate with authentication, Stripe billing, Supabase integration and deployment patterns — built for non-technical founders using AI.'

export const metadata = getSEOTags({
	title: saaskitTitle,
	description: saaskitDescription,
	keywords: [
		'build SaaS with AI',
		'launch SaaS fast',
		'non-technical founder SaaS',
		'SaaS starter with Stripe and Supabase',
		'Next.js SaaS boilerplate',
	],
	openGraph: {
		title: saaskitTitle,
		description: saaskitDescription,
		images: ['/og/saaskit-product.png'],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/og/saaskit-product.png'],
	},
	canonicalUrlRelative: '/kits/saaskit',
})

export default function SaaSkitPage() {
	const siteUrl = getSiteUrl()
	const saaskitProduct =
		config.stripe.products.find(product =>
			product.title.toLowerCase().includes('saaskit')
		) ?? null
	const envPriceId = getStripePriceSaaskit() || null
	const priceId = saaskitProduct?.priceId || envPriceId

	return (
		<>
			<StructuredData
				id='schema-saaskit-software'
				data={getSoftwareApplicationSchema({
					name: 'SaaSKit',
					description: saaskitDescription,
					urlPath: '/kits/saaskit',
					offers: [
						{
							'@type': 'Offer',
							price: String(saaskitProduct?.price ?? 247),
							priceCurrency: 'USD',
							availability: 'https://schema.org/InStock',
							url: `${siteUrl}/kits/saaskit`,
						},
					],
				})}
			/>
			<SaaSkitPageContent priceId={priceId} />
		</>
	)
}
