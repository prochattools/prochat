import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import ProChatOSPageContent from './ProChatOSPageContent'

const pageTitle = 'ProChat OS – Messy Business Information In, Useful Work Out'
const pageDescription =
  'ProChat OS helps businesses turn messy emails, PDFs, forms, notes, folders, and API data into summaries, checklists, tasks, reports, status updates, and draft replies for human review.'
const pageCanonical = 'https://prochat.tools/systems/prochat-os'

export const metadata = {
  ...getSEOTags({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'ProChat OS',
      'AI workflow automation',
      'business process automation',
      'admin automation',
      'document workflow automation',
      'client intake automation',
      'managed AI workflows',
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
          text: 'ProChat OS helps businesses get repetitive information work done faster by turning messy emails, PDFs, forms, notes, folders, and API data into clear summaries, checklists, tasks, reports, status updates, and draft replies for human review.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does a business use ProChat OS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A business can send work to ProChat through simple entry points such as email, forms, file drops, or API calls. ProChat prepares structured output that the team can review, edit, approve, or send onward.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does ProChat OS act without approval?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Important outputs can be reviewed by people before they are sent, changed, or treated as final. The first goal is useful work that remains under human control.',
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
              priceCurrency: 'EUR',
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
