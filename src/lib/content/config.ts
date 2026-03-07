import path from 'path'
import { ContentRouteMode, ContentSchemaType, ContentSection } from './types'

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
  blog: {
    section: 'blog',
    label: 'Blog',
    routeMode: 'single',
    paramNames: ['slug'],
    schemaType: 'article',
    roots: [fromRoot('content', 'blog'), fromRoot('src', 'lib', 'content', 'blog')],
    indexPath: '/blog',
    cta: {
      title: 'Turn Reading Into Shipping',
      description:
        'Move from strategy content into the production-safe kit and guide system.',
      links: [
        { href: '/kits/saaskit', label: 'Explore SaaSKit' },
        { href: '/contact', label: 'Talk to ProChat' },
      ],
    },
  },
  docs: {
    section: 'docs',
    label: 'Docs',
    routeMode: 'nested',
    paramNames: ['category', 'slug'],
    schemaType: 'article',
    roots: [fromRoot('src', 'lib', 'content', 'docs')],
    indexPath: '/docs',
    cta: {
      title: 'Need the production context?',
      description: 'Use the docs cluster to connect implementation details back to the operating system.',
      links: [
        { href: '/blog', label: 'Open Blog Cluster' },
        { href: '/contact', label: 'Ask a Question' },
      ],
    },
  },
  glossary: {
    section: 'glossary',
    label: 'Glossary',
    routeMode: 'single',
    paramNames: ['term'],
    schemaType: 'glossary',
    roots: [fromRoot('content', 'glossary'), fromRoot('src', 'lib', 'content', 'glossary')],
    indexPath: '/saas-glossary',
    cta: {
      title: 'Keep the language operational',
      description: 'Use the glossary with guides and articles so founder terminology maps to real execution steps.',
      links: [
        { href: '/saas-glossary', label: 'Open Glossary Hub' },
        { href: '/blog', label: 'Read Related Articles' },
      ],
    },
  },
  playbooks: {
    section: 'playbooks',
    label: 'Playbooks',
    routeMode: 'nested',
    paramNames: ['segment', 'slug'],
    schemaType: 'howTo',
    roots: [fromRoot('src', 'lib', 'content', 'playbooks')],
    indexPath: '/playbooks',
    cta: {
      title: 'Need the operating sequence?',
      description: 'Move from concept pages into repeatable operating playbooks.',
      links: [
        { href: '/prompts/founder-ops/weekly-review', label: 'Open Prompt Library' },
        { href: '/contact', label: 'Talk to ProChat' },
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
      description: 'Pair prompt assets with playbooks, snippets, and production-safe foundations.',
      links: [
        { href: '/playbooks/founders/launch-sequence', label: 'Open Playbook' },
        { href: '/kits/saaskit', label: 'Explore SaaSKit' },
      ],
    },
  },
  snippets: {
    section: 'snippets',
    label: 'Snippets',
    routeMode: 'nested',
    paramNames: ['stack', 'slug'],
    schemaType: 'article',
    roots: [fromRoot('src', 'lib', 'content', 'snippets')],
    indexPath: '/snippets',
    cta: {
      title: 'Keep the pattern grounded',
      description: 'Use snippets as implementation references inside a larger operating system.',
      links: [
        { href: '/docs/foundations/authority-model', label: 'Read the Docs' },
        { href: '/blog', label: 'Return to Blog' },
      ],
    },
  },
  guides: {
    section: 'guides',
    label: 'Guides',
    routeMode: 'nested',
    paramNames: ['topic', 'slug'],
    schemaType: 'howTo',
    roots: [fromRoot('src', 'lib', 'content', 'guides')],
    indexPath: '/guides',
    cta: {
      title: 'Apply the guidance',
      description: 'Use guides to connect strategy content with prompts, playbooks, and product choices.',
      links: [
        { href: '/prompts/founder-ops/weekly-review', label: 'Open Prompts' },
        { href: '/contact', label: 'Talk to ProChat' },
      ],
    },
  },
}

export function getContentConfig(section: ContentSection) {
  return CONTENT_SECTIONS[section]
}
