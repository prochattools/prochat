import ContextualLinkCta from '@/components/ContextualLinkCta'
import { getContentConfig } from '@/lib/content/config'
import { ContentSection } from '@/lib/content/types'

type CTASectionProps = {
  section?: ContentSection
  title?: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function CTASection({
  section,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  const config = section ? getContentConfig(section) : null
  const links = [
    primaryHref && primaryLabel ? { href: primaryHref, label: primaryLabel } : null,
    secondaryHref && secondaryLabel ? { href: secondaryHref, label: secondaryLabel } : null,
  ].filter(Boolean) as Array<{ href: string; label: string }>

  return (
    <ContextualLinkCta
      className="mx-auto mt-14 max-w-4xl border-border/80 bg-surface-elevated/95 shadow-elevated"
      title={title || config?.cta.title || 'Explore ProChat'}
      description={
        description ||
        config?.cta.description ||
        'Move from content into the production-ready systems behind ProChat.'
      }
      links={links.length ? links : config?.cta.links || [{ href: '/kits', label: 'Explore Kits' }]}
      analytics={{
        eventName: 'blog_cta_click',
        location: section ? `${section}_content_footer` : 'mdx_inline_cta',
      }}
    />
  )
}
