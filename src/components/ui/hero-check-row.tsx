import { cn } from '@/helpers/utils'

import { HeroCheckIcon } from './icons'

type HeroCheckRowProps = {
  items: readonly string[]
  className?: string
}

export function HeroCheckRow({ items, className }: HeroCheckRowProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-fit max-w-full min-h-11 flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-md border border-border bg-card/90 px-5 py-2.5 font-mono text-sm leading-none text-foreground shadow-sm backdrop-blur-sm',
        className,
      )}
    >
      {items.map((item, index) => (
        <div key={item} className="contents">
          <span className="inline-flex items-center gap-2.5">
            <HeroCheckIcon />
            <span>{item}</span>
          </span>
          {index < items.length - 1 ? <span className="hidden text-border lg:inline">|</span> : null}
        </div>
      ))}
    </div>
  )
}

export default HeroCheckRow
