import ContextualLinkCta from '@/components/ContextualLinkCta'
import { getContentConfig } from '@/lib/content/config'
import { ContentSection } from '@/lib/content/types'

export default function CTASection({ section }: { section: ContentSection }) {
  const config = getContentConfig(section)

  return (
    <ContextualLinkCta
      className="mx-auto mt-14 max-w-4xl border-border/80 bg-surface-elevated/95 shadow-elevated"
      title={config.cta.title}
      description={config.cta.description}
      links={config.cta.links}
      analytics={{ eventName: 'blog_cta_click', location: `${section}_content_footer` }}
    />
  )
}
