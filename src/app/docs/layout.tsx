import type { ReactNode } from 'react'

import { Layout, Navbar } from 'nextra-theme-docs'

import { getPublicDocsPageMap } from '@/lib/docs/public-docs'

import 'nextra-theme-docs/style-prefixed.css'

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
          editLink={null}
          feedback={{ content: null }}
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
              logoLink="/docs"
              logo={
                <span className="x:text-sm x:font-semibold x:tracking-tight">
                  Product Documentation
                </span>
              }
            />
          }
          footer={
            <div
              className="mx-auto flex w-full max-w-[var(--nextra-content-width)] items-center justify-center px-6 py-4 text-xs text-foreground/60"
            >
              Public product documentation for ProKit and SaaSKit.
            </div>
          }
          darkMode
          search={null}
        >
          <div className="flex-1">{children}</div>
        </Layout>
      </div>
    </div>
  )
}
