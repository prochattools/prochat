import type { ReactNode } from 'react'

import '@/assets/styles/prochat-public-chrome.css'

type PublicLegalPageProps = {
  children: ReactNode
}

export function PublicLegalPage({ children }: PublicLegalPageProps) {
  return (
    <div className="public-legal-page__main">{children}</div>
  )
}
