import { Golos_Text } from 'next/font/google'
import { getSEOTags } from '@/libs/seo'
import marketingMetadata from './marketing-ai-studio/metadata.json'
import MarketingApp from './marketing-ai-studio/App'
import styles from './marketing-ai-studio/landing.module.css'

const golos = Golos_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-golos',
})

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
    <div className={`${golos.variable} ${styles.marketingRoot}`}>
      <MarketingApp />
    </div>
  )
}
