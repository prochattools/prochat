'use client'

import type { ReactNode } from 'react'

export const CANONICAL_MAIN_ID = 'main-content'
export const CANONICAL_FOUNDATION_CLASS = 'pc-foundation-scope'
export const CANONICAL_FONT_VARIABLES = [
  '--font-prochat-sans',
  '--font-prochat-mono',
] as const

export function CanonicalPublicShell({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div
      className={CANONICAL_FOUNDATION_CLASS}
      data-font-primary={CANONICAL_FONT_VARIABLES[0]}
      data-font-technical={CANONICAL_FONT_VARIABLES[1]}
    >
      <a href={`#${CANONICAL_MAIN_ID}`} className="pc-skip-link">
        Skip to content
      </a>
      <main id={CANONICAL_MAIN_ID}>{children}</main>
    </div>
  )
}
