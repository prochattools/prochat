import { CinematicProductFunnel } from '@/components/funnels/CinematicProductFunnel'
import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
  title: 'Nevermind — Founding Edition',
  description: 'Nevermind is the operating layer for a personal AI environment, with a €39 once macOS Founding Edition.',
  canonicalUrlRelative: '/nevermind',
})

export default function NevermindPage() {
  return <CinematicProductFunnel kind="nevermind" />
}
