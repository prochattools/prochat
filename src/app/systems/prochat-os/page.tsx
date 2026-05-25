import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import ProChatOSPageContent from './ProChatOSPageContent'

const pageTitle = 'ProChat OS – Agentic Workflow OS'
const pageDescription =
  'ProChat OS is an installable Agentic Workflow OS: a private workflow runtime that connects messy business inputs to structured outputs, approvals, memory, agents, and business tools.'
const pageCanonical = 'https://prochat.tools/systems/prochat-os'

export const metadata = {
  ...getSEOTags({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'ProChat OS',
      'Agentic Workflow OS',
      'agentic workflows',
      'AI workflow automation',
      'private AI runtime',
      'business process automation',
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

export default function ProChatOSPage() {
  const siteUrl = getSiteUrl()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is ProChat OS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ProChat OS is an installable Agentic Workflow OS: a private workflow runtime that connects messy business inputs to structured outputs, approvals, memory, agents, and the tools a business already uses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is ProChat OS a chatbot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. ProChat OS is not only a chatbot or dashboard. It is a workflow runtime with memory, connectors, model routing, approvals, logs, and a control console.',
        },
      },
      {
        '@type': 'Question',
        name: 'What gets installed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A customer installs a private ProChat OS instance with their own memory, workflows, credentials, connectors, logs, approvals, and optional workflow modules.',
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
