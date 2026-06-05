import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import ProChatOSPageContent from './ProChatOSPageContent'

const pageTitle = 'ProChat OS – Turn Repeated Work Into Review-Ready Output'
const pageDescription =
  'ProChat OS helps businesses use their own examples, style, notes, and business knowledge to prepare drafts, summaries, reports, replies, and next steps faster.'
const pageCanonical = 'https://prochat.tools/systems/prochat-os'

export const metadata = {
  ...getSEOTags({
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'ProChat OS',
      'AI work automation',
      'repeated work automation',
      'business knowledge automation',
      'AI draft preparation',
      'sales follow-up automation',
      'support reply automation',
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
          text: 'ProChat OS helps businesses turn repeated emails, notes, examples, reports, and follow-ups into drafts, summaries, tasks, replies, and next steps their team can review and use.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does a business use ProChat OS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A business starts with one repeated task and a few examples of good work. ProChat prepares a review-ready output such as a reply, proposal draft, report, task list, or summary.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does ProChat OS replace people?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. ProChat prepares work for people to review. Important outputs stay under human control before they are sent, changed, or treated as final.',
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
