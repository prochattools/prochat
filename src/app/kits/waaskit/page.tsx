import config from '@/config'
import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getStripePriceSaaskit } from '@/libs/stripe-env'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import WaaSKitPageContent from './WaaSKitPageContent'

const pageTitle = 'WaaSKit – Website as a Service Infrastructure'
const pageDescription =
  'WaaSKit is a Website-as-a-Service starter kit for launching a niche website business and evolving it into SaaS.'
const pageCanonical = 'https://prochat.tools/kits/waaskit'

export const metadata = {
  ...getSEOTags({
    title: pageTitle,
    description: pageDescription,
    keywords: ['WaaSKit', 'Website-as-a-Service', 'niche website business', 'SaaS kit'],
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
    canonicalUrlRelative: '/kits/waaskit',
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
		name: 'WaaSKit',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		url: 'https://prochat.tools/kits/waaskit',
		description:
			'WaaSKit is a Website-as-a-Service starter kit for launching a niche website business and evolving it into SaaS.',
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
				name: 'What is WaaSKit?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'WaaSKit is a Website-as-a-Service starter kit that helps founders launch a niche website business and evolve it into SaaS.',
				},
			},
			{
				'@type': 'Question',
				name: 'What is Website-as-a-Service?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Website-as-a-Service is a model where websites are sold as subscription services instead of one-time projects.',
				},
			},
			{
				'@type': 'Question',
				name: 'How does WaaSKit help discover SaaS ideas?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'By working with real clients and solving their problems, founders discover recurring needs that can evolve into SaaS products.',
				},
			},
		],
	}

	return (
		<>
      <StructuredData
        id="schema-waaskit-software"
        data={getSoftwareApplicationSchema({
          name: 'WaaSKit',
          description: pageDescription,
          urlPath: '/kits/waaskit',
          offers: [
            {
              '@type': 'Offer',
              price: String(saaskitProduct?.price ?? 247),
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: `${siteUrl}/kits/waaskit`,
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
      <WaaSKitPageContent priceId={priceId} />
    </>
  )
}
