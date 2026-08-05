import type { ReactNode } from 'react'

import { Footer } from '@/app/(marketing)/components/layout/Footer'
import { MarketingNav } from '@/app/(marketing)/components/layout/MarketingNav'
import '@/assets/styles/prochat-public-chrome.css'

export const CANONICAL_MAIN_ID = 'main-content'
export const CANONICAL_FOUNDATION_CLASS = 'pc-canonical-shell'

export function CanonicalPublicShell({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className={CANONICAL_FOUNDATION_CLASS}>
      <MarketingNav />
      <main id={CANONICAL_MAIN_ID} className="pc-canonical-main">
        {children}
      </main>
      <Footer />
    </div>
  )
}
