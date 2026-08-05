import type { ReactNode } from 'react'
import type { PageMapItem } from 'nextra'

import { Layout } from 'nextra-theme-docs'

import 'nextra-theme-docs/style-prefixed.css'
import '../../../styles/docs.css'
import '@/assets/styles/prochat-public-chrome.css'

const PUBLIC_DOCS_NAVIGATION = [
  {
    name: 'overview',
    route: '/docs',
    frontMatter: { title: 'Overview' },
  },
  {
    name: 'memory',
    route: '/memory',
    frontMatter: { title: 'ProChat Memory' },
  },
  {
    name: 'memory-qa',
    route: '/memory-qa',
    frontMatter: { title: 'Memory for QA' },
  },
  {
    name: 'workbench',
    route: '/workbench',
    frontMatter: { title: 'ProChat Workbench' },
  },
  {
    name: 'contributing',
    route: 'https://github.com/prochattools/workbench/blob/main/CONTRIBUTING.md',
    frontMatter: { title: 'Contributing' },
  },
  {
    name: 'privacy',
    route: '/privacy',
    frontMatter: { title: 'Privacy' },
  },
  {
    name: 'terms',
    route: '/terms',
    frontMatter: { title: 'Terms' },
  },
] satisfies PageMapItem[]

const DOCS_FEEDBACK_LINK = 'https://github.com/orgs/prochattools/discussions'

export default async function DocsThemeLayout({
  children,
}: {
  children: ReactNode
  docsCategory?: string
}) {
  return (
    <div className="docs-shell-inner flex flex-1 flex-col">
      <Layout
        pageMap={PUBLIC_DOCS_NAVIGATION}
        editLink={null}
        feedback={{
          content: 'Question? Join the ProChat discussion →',
          link: DOCS_FEEDBACK_LINK,
          labels: 'docs',
        }}
        search={null}
        nextThemes={{
          storageKey: 'theme',
          attribute: 'class',
          defaultTheme: 'dark',
          disableTransitionOnChange: true,
        }}
        sidebar={{
          autoCollapse: true,
          defaultMenuCollapseLevel: 1,
        }}
        navbar={null}
        darkMode={false}
      >
        <div className="flex-1">{children}</div>
      </Layout>
    </div>
  )
}
