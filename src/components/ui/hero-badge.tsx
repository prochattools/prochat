import { cn } from '@/helpers/utils'

type HeroBadgeProps = {
  text: string
  className?: string
}

export function HeroBadge({ text, className }: HeroBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs font-medium text-muted-foreground shadow-sm',
        className,
      )}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
      {text}
    </div>
  )
}

export default HeroBadge
