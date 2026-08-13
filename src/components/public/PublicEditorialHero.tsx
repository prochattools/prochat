import type { ReactNode } from 'react'
import Link from 'next/link'

import '@/assets/styles/prochat-public-bodies.css'

export type PublicEditorialHeroVariant = 'docs' | 'contact'

export type PublicEditorialHeroAction = {
  href: string
  label: string
  external?: boolean
  onClick?: () => void
}

type PublicEditorialHeroProps = {
  variant: PublicEditorialHeroVariant
  eyebrow: string
  title: ReactNode
  description: ReactNode
  primaryAction?: PublicEditorialHeroAction
  secondaryAction?: PublicEditorialHeroAction
  signals: readonly string[]
  visualTitle?: string
  visualCaption?: string
}

const VISUAL_STEPS: Record<PublicEditorialHeroVariant, readonly string[]> = {
  docs: ['CHOOSE', 'READ', 'EVALUATE', 'REPORT'],
  contact: ['TOPIC', 'CONTEXT', 'REVIEW', 'REPLY'],
}

function EditorialVisual({
  variant,
  title,
  caption,
}: {
  variant: PublicEditorialHeroVariant
  title?: string
  caption?: string
}) {
  const steps = VISUAL_STEPS[variant]

  return (
    <figure className={`pc-body-hero__visual pc-body-hero__visual--${variant}`}>
      <figcaption className="sr-only">
        {caption ?? `${variant} process visual`}
      </figcaption>

      <div className="pc-body-hero__visual-bar" aria-hidden="true">
        <span>{title ?? variant.toUpperCase()}</span>
        <span>PUBLIC / SYSTEM</span>
        <span className="pc-body-hero__live">LIVE</span>
      </div>

      <div className="pc-body-hero__diagram" aria-hidden="true">
        <span className="pc-body-hero__diagram-axis pc-body-hero__diagram-axis--x" />
        <span className="pc-body-hero__diagram-axis pc-body-hero__diagram-axis--y" />
        <span className="pc-body-hero__diagram-pulse" />
        <ol>
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              <i />
            </li>
          ))}
        </ol>
      </div>

      <div className="pc-body-hero__visual-footer" aria-hidden="true">
        <span>{caption ?? 'ROUTE-SPECIFIC OPERATING VIEW'}</span>
        <span>{steps.length} STAGES</span>
      </div>
    </figure>
  )
}

function EditorialAction({ action, primary }: { action: PublicEditorialHeroAction; primary?: boolean }) {
  const className = primary
    ? 'pc-body-button pc-body-button--primary'
    : 'pc-body-button pc-body-button--secondary'

  if (action.external) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noopener noreferrer" onClick={action.onClick}>
        {action.label}
        <span aria-hidden="true">↗</span>
      </a>
    )
  }

  return (
    <Link className={className} href={action.href} onClick={action.onClick}>
      {action.label}
      <span aria-hidden="true">→</span>
    </Link>
  )
}

export default function PublicEditorialHero({
  variant,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  signals,
  visualTitle,
  visualCaption,
}: PublicEditorialHeroProps) {
  return (
    <section className={`pc-body-hero pc-body-hero--${variant}`} data-body-variant={variant}>
      <div className="pc-body-hero__grid" aria-hidden="true" />
      <div className="pc-body-hero__inner">
        <div className="pc-body-hero__copy">
          <div className="pc-body-kicker">
            <span aria-hidden="true" />
            {eyebrow}
          </div>
          <h1>{title}</h1>
          <div className="pc-body-hero__description">{description}</div>

          {(primaryAction || secondaryAction) ? (
            <div className="pc-body-hero__actions">
              {primaryAction ? <EditorialAction action={primaryAction} primary /> : null}
              {secondaryAction ? <EditorialAction action={secondaryAction} /> : null}
            </div>
          ) : null}

          <ul className="pc-body-signal-strip" aria-label="Page signals">
            {signals.map((signal, index) => (
              <li key={signal}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <EditorialVisual variant={variant} title={visualTitle} caption={visualCaption} />
      </div>
    </section>
  )
}
