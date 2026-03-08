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
        'flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-md border border-border bg-card/90 px-4 py-2 font-mono text-sm leading-none text-foreground shadow-sm backdrop-blur-sm sm:flex-nowrap',
        className,
      )}
    >
      {items.map((item, index) => (
        <div key={item} className="contents">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <HeroCheckIcon />
            <span>{item}</span>
          </span>
          {index < items.length - 1 ? <span className="hidden text-border sm:inline">|</span> : null}
        </div>
      ))}
    </div>
  )
}

export default HeroCheckRow
