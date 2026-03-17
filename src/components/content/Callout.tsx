import { ReactNode } from 'react'

import { cn } from '@/helpers/utils'
import { Panel } from '@/components/ui/surface'

type CalloutType = 'takeaway' | 'note' | 'insight' | 'steps'

type CalloutProps = {
  type?: CalloutType
  title?: string
  items?: string[]
  children?: ReactNode
  className?: string
}

const CALLOUT_COPY: Record<CalloutType, { title: string; accentClass: string }> = {
  takeaway: {
    title: 'Key Takeaways',
    accentClass: 'bg-primary/80',
  },
  note: {
    title: 'Note',
    accentClass: 'bg-border-strong/80',
  },
  insight: {
    title: 'Key Insight',
    accentClass: 'bg-secondary/80',
  },
  steps: {
    title: 'Execution Steps',
    accentClass: 'bg-primary/65',
  },
}

export default function Callout({
  type = 'takeaway',
  title,
  items,
  children,
  className,
}: CalloutProps) {
  if ((!items || items.length === 0) && !children) {
    return null
  }

  const resolvedTitle =
    title ||
    (type === 'takeaway' && items?.length === 1
      ? 'Key Takeaway'
      : CALLOUT_COPY[type].title)

  return (
    <aside className={cn('my-8', className)} aria-label={resolvedTitle}>
      <Panel
        tone="soft"
        padding="compact"
        className="border-border-subtle/80 bg-surface-soft/80 shadow-surface"
      >
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary">
          <span
            aria-hidden="true"
            className={cn('h-1.5 w-1.5 rounded-full', CALLOUT_COPY[type].accentClass)}
          />
          {resolvedTitle}
        </p>
        {items && items.length > 0 ? (
          <ul className="mt-4 space-y-3 pl-5 text-[0.98rem] leading-7 text-foreground/92 marker:text-primary/70">
            {items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 text-[0.98rem] leading-7 text-foreground/92">{children}</div>
        )}
      </Panel>
    </aside>
  )
}
