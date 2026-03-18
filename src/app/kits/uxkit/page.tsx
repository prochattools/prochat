import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import UXKitPageContent from './UXKitPageContent'

const pageTitle = 'UXKit – Future UI Layer for the ProChat Stack'
const pageDescription =
  'Roadmap preview of the future UI layer planned to sit on top of SaaSKit and ProKit. UXKit is not the current live offer.'
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

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UXKit',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  url: 'https://prochat.tools/kits/uxkit',
  description:
    'Future UI layer planned for the ProChat stack, intended to complement SaaSKit and ProKit once the core foundation is already live.',
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
          text: 'UXKit is a planned future UI layer for reusable SaaS screens and patterns. It is still roadmap work, not a live offer.',
        },
      },
			{
				'@type': 'Question',
				name: 'Why use UXKit?',
				acceptedAnswer: {
					'@type': 'Answer',
          text: 'UXKit is intended to improve the visual quality and consistency of SaaS products later on, after the core product foundation is already in place.',
				},
			},
      {
        '@type': 'Question',
        name: 'Can UXKit be used with SaaSKit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. UXKit is being planned as a future complement to SaaSKit and ProKit, not as a replacement for the current live kit path.',
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
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/PreOrder',
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
      <UXKitPageContent />
    </>
  )
}
