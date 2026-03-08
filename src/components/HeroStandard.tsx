import type { ReactNode } from 'react'

import { cn } from '@/helpers/utils'

type HeroStandardProps = {
  label: string
  title: string
  subtitle: string
  rightSlot?: ReactNode
  footer?: ReactNode
  embedded?: boolean
  showDivider?: boolean
  fullBleed?: boolean
}

export default function HeroStandard({
  label,
  title,
  subtitle,
  rightSlot,
  footer,
  embedded = false,
  showDivider = true,
  fullBleed = false,
}: HeroStandardProps) {
  const hero = (
    <section
      className={cn(
        'pc-marketing-hero pc-marketing-hero--compact pc-marketing-hero--left w-full shrink-0 pb-4 pt-[calc(var(--pc-header-height)+1rem)] md:pb-5',
        !showDivider && 'pc-marketing-hero--no-divider',
      )}
    >
      <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
      <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
      <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
      <div aria-hidden className="pc-marketing-hero__glow hidden dark:block" />
      <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

      <div className="pc-marketing-hero__inner">
        <div
          className={cn(
            'pc-marketing-hero__layout',
            rightSlot && 'grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-end',
          )}
        >
          <div className="pc-marketing-hero__content max-w-3xl">
            <div>
              <p className="pc-kicker">{label}</p>
            </div>

            <div className="pc-marketing-hero__title-wrap">
              <h1 className="pc-hero-title text-foreground">{title}</h1>
              <p className="pc-marketing-hero__subtitle">{subtitle}</p>
            </div>

            {footer ? <div className="pc-marketing-hero__footer">{footer}</div> : null}
          </div>

          {rightSlot ? <div className="lg:justify-self-end lg:pl-4">{rightSlot}</div> : null}
        </div>
      </div>
    </section>
  )

  if (embedded) {
    return hero
  }

  if (fullBleed) {
    return (
      <section className="-mt-14 flex h-full w-full flex-col pb-4 md:-mt-16 md:pb-5 lg:-mt-[72px]">
        {hero}
      </section>
    )
  }

  return (
    <section className="mx-auto -mt-14 flex h-full max-w-7xl flex-col overflow-hidden px-page pb-4 md:-mt-16 md:pb-5 lg:-mt-[72px]">
      {hero}
    </section>
  )
}
