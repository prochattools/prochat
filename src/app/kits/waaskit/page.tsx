import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getSiteUrl } from '@/libs/site-url'
import { getSoftwareApplicationSchema } from '@/libs/structured-data'
import WaaSKitPageContent from './WaaSKitPageContent'

const pageTitle = 'WaaSKit – Legacy Service-to-Product Concept for ProChat OS'
const pageDescription =
  'WaaSKit is a legacy service-to-product concept. Its useful client-first ideas may later become ProChat OS modules or managed workflow offers.'

export const metadata = getSEOTags({
  title: pageTitle,
  description: pageDescription,
  canonicalUrlRelative: '/kits/waaskit',
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: ['/og/saaskit-product.png'],
    type: 'website',
  },
})

export default function WaaSKitPage() {
  const siteUrl = getSiteUrl()

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
      <WaaSKitPageContent />
    </>
  )
}
