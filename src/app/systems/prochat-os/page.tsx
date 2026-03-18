import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import ProChatOSPageContent from './ProChatOSPageContent'

const pageTitle = 'ProChat OS – Long-Term ProChat Vision'
const pageDescription =
  'Long-term vision for a future ProChat operating layer that could help founders oversee multiple products later. SaaSKit remains the current live offer.'
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

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'ProChat OS',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
	url: 'https://prochat.tools/systems/prochat-os',
		description:
			'Long-term ProChat vision for a simple operating layer that could help founders oversee multiple products and workflows later on.',
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
					text: 'ProChat OS is a long-term ProChat vision for a future operating dashboard, not a live product today.',
				},
			},
			{
				'@type': 'Question',
				name: 'Who should use ProChat OS?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'ProChat OS is intended for a later stage when founders are managing multiple products and need more operational visibility across the stack.',
				},
			},
			{
				'@type': 'Question',
				name: 'How does ProChat OS work with the ProChat kits?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'The long-term idea is that ProChat OS would sit after the kit layer and help founders oversee products built with the ProChat stack.',
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
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/PreOrder',
              url: `${siteUrl}/systems/prochat-os`,
            },
          ],
        })}
      />
		<script
			type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
      <ProChatOSPageContent />
    </>
  )
}
