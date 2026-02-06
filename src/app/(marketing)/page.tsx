import { getSEOTags } from '@/libs/seo'
import marketingMetadata from '@/saaskit/marketing/landing/metadata.json'
import MarketingApp from '@/saaskit/marketing/landing/App'

export const metadata = getSEOTags({
  title: marketingMetadata.name,
  description: marketingMetadata.description,
  openGraph: {
    title: marketingMetadata.name,
    description: marketingMetadata.description,
  },
  canonicalUrlRelative: '/',
})

export default function Home() {
  return (
    // Offset the global header padding so the hero can sit under the transparent navbar.
    <div className="-mt-24">
      <MarketingApp />
    </div>
  )
}
