import type { ReactNode } from 'react'

import { headers } from 'next/headers'
import { Layout, Navbar } from 'nextra-theme-docs'

import { getPublicDocsPageMap } from '@/lib/docs/public-docs'

import 'nextra-theme-docs/style-prefixed.css'
import '../../../styles/docs.css'

export default async function DocsThemeLayout({
  children,
}: {
  children: ReactNode
}) {
  const pageMap = await getPublicDocsPageMap()
  const pathname = headers().get('x-nextjs-pathname') ?? ''
  const segments = pathname.split('/').filter(Boolean)
  const productSegment = segments[1]
  const PRODUCT_LINKS: Record<'prokit' | 'saaskit', { repo: string; discussions: string }> = {
    prokit: {
      repo: 'https://github.com/stevewesthoek/prokit/blob/main/src/content/docs',
      discussions: 'https://github.com/stevewesthoek/prokit/discussions',
    },
    saaskit: {
      repo: 'https://github.com/stevewesthoek/saaskit/blob/main/src/content/docs',
      discussions: 'https://github.com/stevewesthoek/saaskit/discussions',
    },
  }
  const productLinks = PRODUCT_LINKS[productSegment as 'prokit' | 'saaskit']
  const docsRepositoryBase = productLinks?.repo ?? 'https://github.com/prochattools/prochat/tree/main/src/content/docs'
  const feedbackLink = productLinks?.discussions ?? 'https://github.com/stevewesthoek/prochat/discussions'

  return (
    <div className="docs-shell flex min-h-screen flex-col">
      <div className="docs-shell-inner flex flex-1 flex-col">
        <Layout
          pageMap={pageMap}
          docsRepositoryBase={docsRepositoryBase}
          editLink="View source on GitHub"
          feedback={{
            content: 'Question? Give us feedback →',
            link: feedbackLink,
            labels: 'docs',
          }}
          search={null}
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
