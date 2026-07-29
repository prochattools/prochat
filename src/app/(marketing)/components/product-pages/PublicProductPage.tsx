import type { CSSProperties, ReactNode } from 'react'

import { MarketingNav } from '../layout/MarketingNav'
import ProductTrackedAction from './ProductTrackedAction'
import '../../prochat-memory-theme.css'
import './product-pages.css'

type CanonicalProductRoute = '/memory' | '/memory-qa' | '/workbench'

export interface ProductAction {
  href: string
  label: string
  cta: string
  external?: boolean
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

function ProductActionLink({
  action,
  className,
  activeRoute,
  location,
}: {
  action: ProductAction
  className: string
  activeRoute: CanonicalProductRoute
  location: 'hero' | 'closing'
}) {
  const product = activeRoute.slice(1) as 'memory' | 'memory-qa' | 'workbench'
  const content = (
    <>
      {action.label}
      <ArrowIcon />
    </>
  )

  return (
    <ProductTrackedAction
      href={action.href}
      className={className}
      eventName={action.external ? 'outbound_funnel_click' : 'product_cta_click'}
      location={location}
      product={product}
      cta={action.cta}
      sourcePage={activeRoute}
      external={action.external}
    >
      {content}
    </ProductTrackedAction>
  )
}


export interface PublicProductPageProps {
  activeRoute: CanonicalProductRoute
  eyebrow: string
  title: string
  description: string
  primaryAction: ProductAction
  secondaryAction: ProductAction
  principles: readonly string[]
  visual: ReactNode
  children: ReactNode
}

export function PublicProductPage({
  activeRoute,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  principles,
  visual,
  children,
}: PublicProductPageProps) {
  const titleId = `pm-product-title-${activeRoute.slice(1)}`

  return (
    <div className="pm-marketing-page pm-public-product-page">
      <section className="pm-product-hero" aria-labelledby={titleId}>
        <div className="pm-grid-overlay" aria-hidden="true" />
        <MarketingNav />

        <div className="pm-product-hero__layout">
          <div className="pm-product-hero__copy">
            <div className="pm-section-pill">
              <span className="pm-section-pill__mark" aria-hidden="true" />
              {eyebrow}
            </div>
            <h1 id={titleId}>{title}</h1>
            <p>{description}</p>

            <div className="pm-product-actions">
              <ProductActionLink
                action={primaryAction}
                className="pm-pill-button pm-pill-button--light"
                activeRoute={activeRoute}
                location="hero"
              />
              <ProductActionLink
                action={secondaryAction}
                className="pm-hero-secondary-link"
                activeRoute={activeRoute}
                location="hero"
              />
            </div>

            <ul className="pm-product-principles" aria-label="Product principles">
              {principles.map(principle => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>

          <div className="pm-product-hero__visual">{visual}</div>
        </div>
      </section>

      {children}
    </div>
  )
}

export interface ProductSectionProps {
  id?: string
  eyebrow: string
  title: string
  description?: string
  tone?: 'default' | 'muted'
  children: ReactNode
}

export function ProductSection({
  id,
  eyebrow,
  title,
  description,
  tone = 'default',
  children,
}: ProductSectionProps) {
  const headingId = id ? `${id}-title` : undefined

  return (
    <section
      id={id}
      className={`pm-product-section pm-product-section--${tone}`}
      aria-labelledby={headingId}
    >
      <div className="pm-product-section__inner">
        <header className="pm-product-section__header">
          <span>{eyebrow}</span>
          <h2 id={headingId}>{title}</h2>
          {description ? <p>{description}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

export function ProductCardGrid({
  children,
  columns = 3,
}: {
  children: ReactNode
  columns?: 2 | 3 | 4
}) {
  return (
    <div
      className="pm-product-card-grid"
      style={{ '--pm-product-columns': columns } as CSSProperties}
    >
      {children}
    </div>
  )
}

export function ProductCard({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <article className="pm-product-card">
      <span className="pm-product-card__index">{index}</span>
      <h3>{title}</h3>
      <div className="pm-product-card__body">{children}</div>
    </article>
  )
}

export function ProductIllustrationCard({
  index,
  title,
  description,
  visual,
}: {
  index: string
  title: string
  description: string
  visual: ReactNode
}) {
  return (
    <article className="pm-product-illustration-card">
      <div className="pm-product-illustration-card__visual">{visual}</div>
      <span>{index}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export function ProductFlow({
  items,
}: {
  items: readonly { label: string; description: string }[]
}) {
  return (
    <ol className="pm-product-flow">
      {items.map((item, index) => (
        <li key={item.label}>
          <span className="pm-product-flow__index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function ProductBoundaryList({
  title,
  items,
}: {
  title: string
  items: readonly string[]
}) {
  return (
    <aside className="pm-product-boundary" aria-label={title}>
      <div className="pm-product-boundary__title">{title}</div>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  )
}

export function ProductPageAction({
  activeRoute,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  activeRoute: CanonicalProductRoute
  eyebrow: string
  title: string
  description: string
  primaryAction: ProductAction
  secondaryAction?: ProductAction
}) {
  return (
    <section className="pm-product-close" aria-labelledby="pm-product-close-title">
      <span>{eyebrow}</span>
      <h2 id="pm-product-close-title">{title}</h2>
      <p>{description}</p>
      <div className="pm-product-actions">
        <ProductActionLink
          action={primaryAction}
          className="pm-pill-button pm-pill-button--light"
          activeRoute={activeRoute}
          location="closing"
        />
        {secondaryAction ? (
          <ProductActionLink
            action={secondaryAction}
            className="pm-hero-secondary-link"
            activeRoute={activeRoute}
            location="closing"
          />
        ) : null}
      </div>
    </section>
  )
}
