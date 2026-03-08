import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/helpers/utils'

type HeroCTA = {
  href: string
  label: string
  note?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'nav'
  onClick?: () => void
}

type HeroLink = {
  href: string
  label: string
  onClick?: () => void
}

export interface HeroSectionProps {
  title: ReactNode
  subtitle?: ReactNode
  primaryCTA?: HeroCTA
  secondaryCTA?: HeroCTA
  tertiaryCTA?: HeroLink
  align?: 'center' | 'left'
  density?: 'full' | 'compact'
  eyebrow?: ReactNode
  microcopy?: ReactNode
  footer?: ReactNode
  ambientMotion?: boolean
  className?: string
  contentClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  children?: ReactNode
}

export function HeroSection({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  tertiaryCTA,
  align = 'center',
  density = 'full',
  eyebrow,
  microcopy,
  footer,
  ambientMotion = false,
  className,
  contentClassName,
  titleClassName,
  subtitleClassName,
  children,
}: HeroSectionProps) {
  const hasActions = Boolean(primaryCTA || secondaryCTA)

  return (
    <section
      className={cn(
        'pc-marketing-hero',
        density === 'full' ? 'pc-marketing-hero--full' : 'pc-marketing-hero--compact',
        align === 'center' ? 'pc-marketing-hero--center' : 'pc-marketing-hero--left',
        className,
      )}
    >
      <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
      <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
      <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
      <div
        aria-hidden
        className={cn(
          'pc-marketing-hero__glow hidden dark:block',
          ambientMotion && 'pc-hero-glow-pulse',
        )}
      />
      {ambientMotion ? (
        <div aria-hidden className="pc-marketing-hero__logo-halo pc-hero-halo-float hidden dark:block" />
      ) : null}
      <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

      <div className="pc-marketing-hero__inner">
        <div className="pc-marketing-hero__layout">
          <div className={cn('pc-marketing-hero__content', contentClassName)}>
            {eyebrow ? <div>{eyebrow}</div> : null}

            <div className="pc-marketing-hero__title-wrap">
              <h1 className={cn('pc-hero-title text-foreground', titleClassName)}>{title}</h1>
              {subtitle ? (
                <p className={cn('pc-marketing-hero__subtitle', subtitleClassName)}>{subtitle}</p>
              ) : null}
            </div>

            {children ? <div className="pc-marketing-hero__children">{children}</div> : null}

            {hasActions ? (
              <div className="pc-marketing-hero__action-stack">
                <div className="pc-marketing-hero__actions">
                  {primaryCTA ? (
                    <Button asChild variant={primaryCTA.variant ?? 'primary'} size="lg" className="w-full whitespace-normal text-center md:w-auto">
                      <Link href={primaryCTA.href} onClick={primaryCTA.onClick}>
                        {primaryCTA.label}
                      </Link>
                    </Button>
                  ) : null}
                  {secondaryCTA ? (
                    <Button asChild variant={secondaryCTA.variant ?? 'secondary'} size="lg" className="w-full whitespace-normal text-center md:w-auto">
                      <Link href={secondaryCTA.href} onClick={secondaryCTA.onClick}>
                        {secondaryCTA.label}
                      </Link>
                    </Button>
                  ) : null}
                </div>
                {primaryCTA?.note ? <p className="pc-cta-note">{primaryCTA.note}</p> : null}
              </div>
            ) : null}

            {microcopy ? (
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">{microcopy}</div>
            ) : null}

            {tertiaryCTA ? (
              <Link
                href={tertiaryCTA.href}
                onClick={tertiaryCTA.onClick}
                className="pc-marketing-hero__tertiary"
              >
                {tertiaryCTA.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}

            {footer ? <div className="pc-marketing-hero__footer">{footer}</div> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
