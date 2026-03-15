import config from '@/config'
import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getStripePriceSaaskit } from '@/libs/stripe-env'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import UXKitPageContent from './UXKitPageContent'

const pageTitle = 'UXKit – SaaS Interface Layer'
const pageDescription =
  'Preview dashboards, onboarding flows, and SaaS UI patterns that are still in progress.'
const pageCanonical = 'https://prochat.tools/kits/uxkit'

export const metadata = {
	...getSEOTags({
		title: pageTitle,
		description: pageDescription,
		keywords: [
			'UXKit',
			'SaaS design system',
			'SaaS UI kit',
			'Next.js UI infrastructure',
		],
		openGraph: {
			title: pageTitle,
			description: pageDescription,
			images: ['/og/saaskit-product.png'],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			images: ['/og/saaskit-product.png'],
		},
		canonicalUrlRelative: '/kits/uxkit',
	}),
	alternates: {
		canonical: pageCanonical,
	},
	openGraph: {
		title: pageTitle,
		description: pageDescription,
		url: pageCanonical,
		siteName: 'ProChat',
		type: 'website',
		images: ['/og/saaskit-product.png'],
	},
}

export default function UXKitPage() {
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
  name: 'UXKit',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  url: 'https://prochat.tools/kits/uxkit',
  description:
    'Early-access SaaS interface layer preview including dashboards, onboarding flows, and billing UI patterns.',
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
        name: 'What is UXKit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UXKit is a planned interface layer for reusable SaaS screens and patterns that is currently in development.',
        },
      },
			{
				'@type': 'Question',
				name: 'Why use UXKit?',
				acceptedAnswer: {
					'@type': 'Answer',
          text: 'UXKit is designed to accelerate SaaS development by planning proven UI patterns instead of designing interfaces from scratch.',
				},
			},
      {
        '@type': 'Question',
        name: 'Can UXKit be used with SaaSKit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. UXKit is being designed to complement SaaSKit and ProKit so it can provide the interface layer for SaaS applications.',
        },
      },
		],
	}

	return (
		<>
      <StructuredData
        id="schema-uxkit-software"
        data={getSoftwareApplicationSchema({
          name: 'UXKit',
          description: pageDescription,
          urlPath: '/kits/uxkit',
          offers: [
            {
              '@type': 'Offer',
              price: String(saaskitProduct?.price ?? 247),
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: `${siteUrl}/kits/uxkit`,
            },
          ],
        })}
      />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
      <UXKitPageContent priceId={priceId} />
    </>
  )
}
