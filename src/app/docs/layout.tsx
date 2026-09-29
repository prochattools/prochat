import type { ReactNode } from 'react'
import { CinematicMarketingShell } from '@/components/CinematicMarketingShell'

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <CinematicMarketingShell
      contentOwnsMain
      utilityTheme
      cta={{ label: 'Explore Evermind', href: '/evermind', trackingCta: 'explore_evermind' }}
    >
      <div data-utility-main="">{children}</div>
    </CinematicMarketingShell>
  )
}
