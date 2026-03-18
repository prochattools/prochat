import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import WaaSKitPageContent from './WaaSKitPageContent'

const pageTitle = 'WaaSKit – Future Website-as-a-Service Direction'
const pageDescription =
  'Roadmap preview of a future website-as-a-service path for founders who may want to validate through client work before building SaaS. SaaSKit remains the current live offer.'
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

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'WaaSKit',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		url: 'https://prochat.tools/kits/waaskit',
		description:
			'Future website-as-a-service direction for founders who may want to validate through client work before productizing recurring problems into SaaS later.',
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
					text: 'WaaSKit is a future Website-as-a-Service direction in the ProChat roadmap. It is not a live product today.',
				},
			},
			{
				'@type': 'Question',
				name: 'What is Website-as-a-Service?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Website-as-a-Service is a model where websites are sold as subscription services instead of one-time projects so founders can learn from recurring customer work.',
				},
			},
			{
				'@type': 'Question',
				name: 'How does WaaSKit help discover SaaS ideas?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'The planned idea behind WaaSKit is that recurring client problems can reveal the patterns worth productizing into SaaS later.',
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
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/PreOrder',
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
      <WaaSKitPageContent />
    </>
  )
}
