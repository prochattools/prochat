import type { ReactNode } from 'react'

import { Layout, Navbar } from 'nextra-theme-docs'

import { getPublicDocsPageMap } from '@/lib/docs/public-docs'

import 'nextra-theme-docs/style-prefixed.css'
import '../../../styles/docs.css'

export default async function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  const pageMap = await getPublicDocsPageMap()

  return (
    <div className="docs-shell flex min-h-screen flex-col">
      <div className="docs-shell-inner flex flex-1 flex-col">
        <Layout
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/prochattools/prochat/tree/main/src/content/docs"
          editLink="Edit this page on GitHub →"
          feedback={{
            content: 'Question? Give us feedback →',
            labels: 'docs',
          }}
          nextThemes={{
            storageKey: 'theme',
            attribute: 'class',
            defaultTheme: 'system',
            disableTransitionOnChange: true,
          }}
          sidebar={{
            autoCollapse: true,
            defaultMenuCollapseLevel: 1,
          }}
          navbar={
            <Navbar
              logoLink="https://prochat.tools"
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
