import type { ReactNode } from 'react'
import type { PageMapItem } from 'nextra'

import { Layout, Navbar } from 'nextra-theme-docs'

import 'nextra-theme-docs/style-prefixed.css'
import '../../../styles/docs.css'

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
    <div className="docs-shell flex min-h-screen flex-col">
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
          navbar={
            <Navbar
              logoLink="/"
              logo={
                <span
                  className="docs-logo-wordmark"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    color: 'inherit',
                  }}
                >
                  <img
                    src="/logo/logo-wordmark.svg"
                    height="24"
                    width="120"
                    alt="ProChat"
                    style={{
                      transform: 'translateY(2px)',
                    }}
                  />
                </span>
              }
              projectLink="https://github.com/prochattools"
            />
          }
          darkMode
        >
          <div className="flex-1">{children}</div>
        </Layout>
      </div>
    </div>
  )
}
