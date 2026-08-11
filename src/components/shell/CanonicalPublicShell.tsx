import type { ReactNode } from 'react'

import { Footer } from '@/app/(marketing)/components/layout/Footer'
import { MarketingNav } from '@/app/(marketing)/components/layout/MarketingNav'
import { PublicRouteScene } from '@/components/shell/PublicRouteScene'
import type { PublicVisualVariant } from '@/helpers/public-route-design'
import '@/assets/styles/prochat-public-chrome.css'
import '@/assets/styles/prochat-public-v4.css'

export const CANONICAL_MAIN_ID = 'main-content'
export const CANONICAL_FOUNDATION_CLASS = 'pc-canonical-shell'

export function CanonicalPublicShell({
  children,
  visualVariant = 'home',
  contentOwnsMain = false,
}: {
  children: ReactNode
  visualVariant?: PublicVisualVariant
  contentOwnsMain?: boolean
}) {
  return (
    <div
      className={`${CANONICAL_FOUNDATION_CLASS} pc-public-v4 pc-public-v4--${visualVariant} dark`}
      data-public-variant={visualVariant}
    >
      <PublicRouteScene variant={visualVariant} />
      <MarketingNav />
      {contentOwnsMain ? (
        <div className="pc-canonical-main pc-canonical-main--content-owned">
          {children}
        </div>
      ) : (
        <main id={CANONICAL_MAIN_ID} className="pc-canonical-main">
          {children}
        </main>
      )}
      <Footer />
    </div>
  )
}
