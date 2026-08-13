import type { ReactNode } from 'react'

import '@/assets/styles/prochat-public-chrome.css'
import '@/assets/styles/prochat-public-bodies.css'

type PublicLegalPageProps = {
  children: ReactNode
  kind: 'privacy' | 'terms'
  title: string
  updated: string
  summary: string
}

export function PublicLegalPage({
  children,
  kind,
  title,
  updated,
  summary,
}: PublicLegalPageProps) {
  return (
    <div className="pc-body-page public-legal-page__main pc-legal-ledger" data-body-family="legal" data-legal-kind={kind}>
      <section className="pc-legal-ledger__masthead" aria-labelledby={`legal-${kind}-title`}>
        <div className="pc-legal-ledger__masthead-inner">
          <div>
            <div className="pc-body-kicker"><span aria-hidden="true" />Legal register / {kind}</div>
            <h1 id={`legal-${kind}-title`}>{title}</h1>
            <p>{summary}</p>
          </div>

          <div className="pc-legal-ledger__register" role="group" aria-label="Document metadata">
            <div><span>DOCUMENT</span><strong>{kind.toUpperCase()}</strong></div>
            <div><span>UPDATED</span><strong>{updated}</strong></div>
            <div><span>SCOPE</span><strong>PUBLIC WEBSITE</strong></div>
            <div><span>STATUS</span><strong>CURRENT</strong></div>
          </div>
        </div>
      </section>

      {children}
    </div>
  )
}
