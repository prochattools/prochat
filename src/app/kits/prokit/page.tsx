import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import { getStripePriceProkit } from '@/libs/stripe-env'
import ProKitPageContent from './ProKitPageContent'

const proKitTitle = 'ProKit – Lean SaaS Infrastructure Layer'
const proKitDescription =
	'The lighter secondary option under SaaSKit for founders who want the core engine without the full launch layer.'
const proKitCanonical = 'https://prochat.tools/kits/prokit'

export const metadata = {
	...getSEOTags({
		title: proKitTitle,
		description: proKitDescription,
		openGraph: {
			title: proKitTitle,
			description: proKitDescription,
		},
		canonicalUrlRelative: '/kits/prokit',
	}),
	alternates: {
		canonical: proKitCanonical,
	},
	openGraph: {
		title: proKitTitle,
		description: proKitDescription,
		url: proKitCanonical,
		siteName: 'ProChat',
		type: 'website',
	},
}

export default function ProKitPage() {
	const prokitProduct =
		config.stripe.products.find(product =>
			product.title.toLowerCase().includes('prokit')
		) ?? null
	const envPriceId = getStripePriceProkit() || null
	const priceId = prokitProduct?.priceId || envPriceId

const schema = {
	"@context": 'https://schema.org',
	"@type": 'SoftwareApplication',
	name: 'ProKit',
	applicationCategory: 'DeveloperApplication',
	operatingSystem: 'Web',
	url: 'https://prochat.tools/kits/prokit',
	description: 'The lighter secondary infrastructure layer under SaaSKit for building SaaS applications with modern web stacks.',
	brand: {
		"@type": 'Brand',
		name: 'ProChat',
	},
	publisher: {
		"@type": 'Organization',
		name: 'ProChat',
		url: 'https://prochat.tools',
	},
	softwareVersion: '1.0',
	offers: {
		"@type": 'Offer',
		price: '0',
		priceCurrency: 'EUR',
		availability: 'https://schema.org/PreOrder',
	},
}

const faqSchema = {
	"@context": 'https://schema.org',
	"@type": 'FAQPage',
	mainEntity: [
		{
			"@type": 'Question',
			name: 'What is ProKit?',
			acceptedAnswer: {
				"@type": 'Answer',
				text: 'ProKit is the lighter infrastructure layer in the ProChat product stack. It includes authentication, billing, database integration, and deployment tooling for builders who want the core engine without the fuller launch layer in SaaSKit.',
			},
		},
		{
			"@type": 'Question',
			name: 'Who should use ProKit?',
			acceptedAnswer: {
				"@type": 'Answer',
				text: 'ProKit is designed for developers and technical founders who already know what they want to build and want maximum control over brand, funnel, and product structure.',
			},
		},
		{
			"@type": 'Question',
			name: 'How is ProKit different from SaaSKit?',
			acceptedAnswer: {
				"@type": 'Answer',
				text: 'ProKit is the lighter engine layer. SaaSKit is the flagship productization layer built on top of ProKit for founders who want the fuller production-ready foundation.',
			},
		},
	],
}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<ProKitPageContent priceId={priceId} />
		</>
	)
}
