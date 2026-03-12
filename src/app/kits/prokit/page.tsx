import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import { getStripePriceProkit } from '@/libs/stripe-env'
import ProKitPageContent from './ProKitPageContent'

const proKitTitle = 'ProKit – Build SaaS Applications Faster'
const proKitDescription =
	'Infrastructure and tooling for building production SaaS applications.'
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
	description: 'Infrastructure for building SaaS applications with modern web stacks.',
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
				text: 'ProKit provides the core infrastructure for building SaaS products with modern web stacks. It includes authentication, billing, database integration, and deployment tooling so founders can focus on building product features.',
			},
		},
		{
			"@type": 'Question',
			name: 'Who should use ProKit?',
			acceptedAnswer: {
				"@type": 'Answer',
				text: 'ProKit is designed for developers and technical founders who want to launch SaaS products quickly without rebuilding the same infrastructure for every project.',
			},
		},
		{
			"@type": 'Question',
			name: 'How is ProKit different from SaaSKit?',
			acceptedAnswer: {
				"@type": 'Answer',
				text: 'ProKit provides the developer infrastructure layer, while SaaSKit builds on top of it to provide a full SaaS application foundation including product structure and SaaS architecture.',
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
