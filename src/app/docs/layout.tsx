import type { ReactNode } from 'react'

import { Layout, Navbar } from 'nextra-theme-docs'

import { getPublicDocsPageMap } from '@/lib/docs/public-docs'
import Logo from '@/components/logo'

import 'nextra-theme-docs/style-prefixed.css'

const FEEDBACK_LINK =
  'https://github.com/prochattools/prochat/issues/new?labels=docs&title=ProChat%20Docs%20Feedback'

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
          docsRepositoryBase="https://github.com/prochattools/prochat/blob/main/src/content/docs"
        nextThemes={{
          storageKey: 'theme',
          attribute: 'class',
          defaultTheme: 'dark',
          disableTransitionOnChange: true,
        }}
          navbar={
            <Navbar
              logoLink="/"
              logo={
                <div className="flex items-center gap-2">
                  <Logo scale={0.65} />
                  <span className="x:text-sm x:font-semibold x:tracking-tight">Documentation</span>
                </div>
              }
              projectLink="https://github.com/prochattools/prochat"
            >
              <a
                href="/"
                className="x:text-sm x:text-foreground/70 x:transition x:hover:text-foreground"
              >
                Back to ProChat
              </a>
            </Navbar>
          }
          footer={
            <div
              className="mx-auto flex w-full max-w-[var(--nextra-content-width)] items-center justify-center px-6 py-4 text-xs text-foreground/60"
            >
              Managed docs for the ProChat operating system.
            </div>
          }
          feedback={{
            content: 'Give feedback',
            link: FEEDBACK_LINK,
            labels: 'docs',
          }}
          darkMode
          search={null}
        >
          <div className="flex-1">{children}</div>
        </Layout>
      </div>
    </div>
  )
}
