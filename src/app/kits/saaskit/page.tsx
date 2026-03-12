import config from '@/config'
import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getStripePriceSaaskit } from '@/libs/stripe-env'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import SaaSkitPageContent from './SaaSkitPageContent'

const saaskitTitle = 'SaaSKit – Complete SaaS Application Foundation'
const saaskitDescription =
	'Production-ready foundation for building scalable SaaS products.'
const saaskitCanonical = 'https://prochat.tools/kits/saaskit'

export const metadata = {
	...getSEOTags({
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
	}),
	alternates: {
		canonical: saaskitCanonical,
	},
	openGraph: {
		title: saaskitTitle,
		description: saaskitDescription,
		url: saaskitCanonical,
		siteName: 'ProChat',
		type: 'website',
		images: ['/og/saaskit-product.png'],
	},
}

export default function SaaSkitPage() {
	const siteUrl = getSiteUrl()
	const saaskitProduct =
		config.stripe.products.find(product =>
			product.title.toLowerCase().includes('saaskit')
		) ?? null
	const envPriceId = getStripePriceSaaskit() || null
	const priceId = saaskitProduct?.priceId || envPriceId


	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'SaaSKit',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Web',
		url: 'https://prochat.tools/kits/saaskit',
		description: 'Complete foundation for building production SaaS applications.',
		brand: {
			'@type': 'Brand',
			name: 'ProChat',
		},
		publisher: {
			'@type': 'Organization',
			name: 'ProChat',
			url: 'https://prochat.tools',
		},
		softwareVersion: '1.0',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'EUR',
			availability: 'https://schema.org/PreOrder',
		},
	}

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is SaaSKit?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'SaaSKit is a production-ready foundation for building SaaS applications with modern architecture and infrastructure.',
				},
			},
			{
				'@type': 'Question',
				name: 'What can you build with SaaSKit?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'You can build subscription SaaS platforms, B2B tools, automation services, and niche SaaS products.',
				},
			},
			{
				'@type': 'Question',
				name: 'How does SaaSKit relate to ProKit?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'SaaSKit builds on top of ProKit. ProKit provides the infrastructure layer while SaaSKit provides the SaaS application architecture.',
				},
			},
		],
	}

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
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<SaaSkitPageContent priceId={priceId} />
		</>
	)
}
