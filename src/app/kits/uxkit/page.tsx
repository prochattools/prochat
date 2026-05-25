import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import UXKitPageContent from './UXKitPageContent'

const pageTitle = 'UXKit – Legacy UX Concept for ProChat OS'
const pageDescription =
  'UXKit is a legacy UX and product workflow concept. Its useful ideas may later become ProChat OS modules or supporting workflow patterns.'

export const metadata = getSEOTags({
  title: pageTitle,
  description: pageDescription,
  canonicalUrlRelative: '/kits/uxkit',
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: ['/og/saaskit-product.png'],
    type: 'website',
  },
})

export default function UXKitPage() {
  const siteUrl = getSiteUrl()

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
      <UXKitPageContent />
    </>
  )
}
