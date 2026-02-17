import { getSEOTags } from '@/libs/seo'
import marketingMetadata from './(marketing)/metadata.json'
import MarketingApp from './(marketing)/App'

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
  return <MarketingApp />
}
