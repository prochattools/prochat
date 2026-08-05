import type { ReactNode } from 'react'

import { Footer } from '@/app/(marketing)/components/layout/Footer'
import { MarketingNav } from '@/app/(marketing)/components/layout/MarketingNav'
import '@/assets/styles/prochat-public-chrome.css'

export const DOCS_FOUNDATION_CLASS = 'pc-canonical-shell'

export function DocsPublicShell({ children }: { children: ReactNode }) {
  return (
    <div className={DOCS_FOUNDATION_CLASS}>
      <MarketingNav />
      <div className="pc-canonical-main">
        {children}
      </div>
      <Footer />
    </div>
  )
}
