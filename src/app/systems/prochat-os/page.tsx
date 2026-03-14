import config from '@/config'
import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getStripePriceSaaskit } from '@/libs/stripe-env'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import ProChatOSPageContent from './ProChatOSPageContent'

const pageTitle = 'ProChat OS – Operating System for SaaS Companies'
const pageDescription =
  'Command center for managing SaaS applications, clients, and subscriptions.'
const pageCanonical = 'https://prochat.tools/systems/prochat-os'

export const metadata = {
  ...getSEOTags({
    title: pageTitle,
    description: pageDescription,
    keywords: ['ProChat OS', 'business control center', 'AI operations'],
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
    canonicalUrlRelative: '/systems/prochat-os',
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
		name: 'ProChat OS',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
	url: 'https://prochat.tools/systems/prochat-os',
		description:
			'Operating system for SaaS companies to manage applications, subscriptions, clients, and workflows.',
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
				name: 'What is ProChat OS?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'ProChat OS is the operating system for SaaS companies providing a central dashboard to manage SaaS products, clients, and subscriptions.',
				},
			},
			{
				'@type': 'Question',
				name: 'Who should use ProChat OS?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'ProChat OS is designed for founders managing multiple SaaS products who need a unified command center.',
				},
			},
			{
				'@type': 'Question',
				name: 'How does ProChat OS work with the ProChat kits?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'ProChat OS connects and manages products built with ProKit, SaaSKit, UXKit, and WaaSKit.',
				},
			},
		],
	}

	return (
		<>
		<StructuredData
        id="schema-prochat-os"
        data={getSoftwareApplicationSchema({
          name: 'ProChat OS',
          description: pageDescription,
          urlPath: '/systems/prochat-os',
          offers: [
            {
              '@type': 'Offer',
              price: String(saaskitProduct?.price ?? 247),
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              url: `${siteUrl}/systems/prochat-os`,
            },
          ],
        })}
      />
		<script
			type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
      <ProChatOSPageContent priceId={priceId} />
    </>
  )
}
