import path from 'path'
import type { ContentRouteMode, ContentSchemaType, ContentSection } from './types.ts'
import { PRODUCTION_GUIDE_PATH } from '../learning/production-guide.ts'

export type ContentSectionConfig = {
  section: ContentSection
  label: string
  routeMode: ContentRouteMode
  paramNames: readonly string[]
  schemaType: ContentSchemaType
  roots: string[]
  indexPath: string
  cta: {
    title: string
    description: string
    links: Array<{ href: string; label: string }>
  }
}

const fromRoot = (...parts: string[]) => path.join(process.cwd(), ...parts)

export const CONTENT_SECTIONS: Record<ContentSection, ContentSectionConfig> = {
  docs: {
    section: 'docs',
    label: 'Docs',
    routeMode: 'nested',
    paramNames: ['category', 'slug'],
    schemaType: 'article',
    roots: [fromRoot('src', 'content', 'docs')],
    indexPath: '/docs',
    cta: {
      title: 'Need the production context?',
      description: 'Use the docs cluster to connect implementation details back to the operating system.',
      links: [
        { href: PRODUCTION_GUIDE_PATH, label: 'Open Production Guide' },
        { href: '/contact', label: 'Ask a Question' },
      ],
    },
  },
  prompts: {
    section: 'prompts',
    label: 'Prompts',
    routeMode: 'nested',
    paramNames: ['category', 'slug'],
    schemaType: 'howTo',
    roots: [fromRoot('src', 'lib', 'content', 'prompts')],
    indexPath: '/prompts',
    cta: {
      title: 'Turn prompts into systems',
      description: 'Use prompt assets alongside the production guide and docs when execution work starts.',
      links: [
        { href: PRODUCTION_GUIDE_PATH, label: 'Open Production Guide' },
        { href: '/docs', label: 'Read the Docs' },
      ],
    },
  },
}

export function getContentConfig(section: ContentSection) {
  return CONTENT_SECTIONS[section]
}
