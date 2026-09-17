import { HomeV2 } from '@/components/HomeV2'
import '@/components/home-v2.css'
import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
  title: 'Evermind, Nevermind, and Mastermind',
  description:
    'Human-owned memory, working context, and controlled execution across the AI models and providers you choose.',
  keywords: [
    'Evermind',
    'Nevermind',
    'Mastermind',
    'local-first AI memory',
    'working context',
    'controlled execution',
    'model provider flexibility',
  ],
  openGraph: {
    title: 'Evermind, Nevermind, and Mastermind',
    description:
      'Human-owned memory, working context, and controlled execution across the AI models and providers you choose.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  socialImage: {
    line1: 'Evermind · Nevermind · Mastermind',
    line2: 'Memory. Context. Execution.',
    subtitle: 'Human-owned memory. Working context. Controlled execution.',
  },
  canonicalUrlRelative: '/',
})

export default function Home() {
  return <HomeV2 />
}
