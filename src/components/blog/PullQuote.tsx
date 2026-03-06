import { ReactNode } from 'react'

import { cn } from '@/helpers/utils'
import { Panel } from '@/components/ui/surface'

export default function PullQuote({
  children,
  className,
  attribution,
}: {
  children: ReactNode
  className?: string
  attribution?: string
}) {
  return (
    <aside className={cn('my-10 md:my-12', className)} aria-label="Pull quote">
      <Panel
        tone="soft"
        padding="compact"
        className="border-border-subtle/80 bg-surface-soft/80 shadow-surface"
      >
        <div className="border-l-2 border-primary/45 pl-5 md:pl-6">
          <p className="font-brand text-xl font-semibold leading-relaxed tracking-[-0.02em] text-foreground md:text-2xl">
            {children}
          </p>
          {attribution ? (
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-tertiary">
              {attribution}
            </p>
          ) : null}
        </div>
      </Panel>
    </aside>
  )
}
