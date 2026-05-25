import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import { getStripePriceProkit } from '@/libs/stripe-env'
import ProKitPageContent from './ProKitPageContent'

const proKitTitle = 'ProKit – Legacy SaaS Engine | ProChat OS Is the Flagship'
const proKitDescription =
  'ProKit is the preserved lean SaaS engine from ProChat. ProChat OS is now the flagship Agentic Workflow OS for messy inputs, structured outputs, memory, connectors, approvals, and managed workflows.'
const proKitCanonical = 'https://prochat.tools/kits/prokit'

export const metadata = {
  ...getSEOTags({
    title: proKitTitle,
    description: proKitDescription,
    keywords: [
      'ProKit',
      'ProChat OS',
      'Agentic Workflow OS',
      'legacy SaaS engine',
      'SaaS infrastructure',
      'agentic workflows',
    ],
    openGraph: {
      title: proKitTitle,
      description: proKitDescription,
      images: ['/og/saaskit-product.png'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og/saaskit-product.png'],
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
    images: ['/og/saaskit-product.png'],
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
    description:
      'ProKit is the preserved lean SaaS engine from ProChat. It remains available as a legacy/supporting product while ProChat OS is the flagship Agentic Workflow OS.',
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
      price: '97',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://prochat.tools/kits/prokit#pricing',
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
          text: 'ProKit is the preserved lean SaaS engine from ProChat. It remains available as a legacy/supporting product for builders who specifically want old-school SaaS infrastructure patterns.',
        },
      },
      {
        "@type": 'Question',
        name: 'Is ProKit the flagship ProChat product?',
        acceptedAnswer: {
          "@type": 'Answer',
          text: 'No. ProChat OS is the flagship product. ProChat OS is an installable Agentic Workflow OS that connects messy business inputs to structured outputs, memory, connectors, approvals, agents, and business tools.',
        },
      },
      {
        "@type": 'Question',
        name: 'When should I choose ProKit instead of ProChat OS?',
        acceptedAnswer: {
          "@type": 'Answer',
          text: 'Choose ProKit only if you specifically want the preserved lean SaaS foundation. Choose ProChat OS if you want the current ProChat direction: agentic workflows, private workflow runtime, managed setup, and modular automation.',
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
