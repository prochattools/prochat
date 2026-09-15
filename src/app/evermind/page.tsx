import { CinematicProductFunnel } from '@/components/funnels/CinematicProductFunnel'
import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
  title: 'Evermind — AI Memory You Own',
  description: 'Evermind gives AI durable, human-readable memory you can inspect, keep, and move with you.',
  canonicalUrlRelative: '/evermind',
})

export default function EvermindPage() {
  return <CinematicProductFunnel kind="evermind" />
}
