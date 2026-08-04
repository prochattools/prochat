import type { ReactNode } from 'react'

import '@/assets/styles/prochat-public-chrome.css'

import { Footer } from './Footer'
import { MarketingNav } from './MarketingNav'

type PublicLegalPageProps = {
  children: ReactNode
}

export function PublicLegalPage({ children }: PublicLegalPageProps) {
  return (
    <div className="pm-marketing-page public-legal-page">
      <MarketingNav />
      <div className="public-legal-page__main">{children}</div>
      <Footer />
    </div>
  )
}
