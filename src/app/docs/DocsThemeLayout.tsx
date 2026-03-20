import type { ReactNode } from 'react'

import { Layout, Navbar } from 'nextra-theme-docs'
import { headers } from 'next/headers'

import { getPublicDocsPageMap } from '@/lib/docs/public-docs'

import 'nextra-theme-docs/style-prefixed.css'
import '../../../styles/docs.css'

type DocsUtilityLinks = {
  docsRepositoryBase: string
  feedbackLink: string
}

const DEFAULT_DOCS_UTILITY_LINKS: DocsUtilityLinks = {
  docsRepositoryBase: 'https://github.com/prochattools/prochat/tree/main/src/content/docs',
  feedbackLink: 'https://github.com/stevewesthoek/prochat/discussions',
}

function resolveDocsUtilityLinks(pathname: string): DocsUtilityLinks {
  const segments = pathname.split('/').filter(Boolean)
  const productSegment = segments[1]

  if (productSegment === 'prokit') {
    return {
      docsRepositoryBase: 'https://github.com/stevewesthoek/prokit/blob/main/src/content/docs',
      feedbackLink: 'https://github.com/stevewesthoek/prokit/discussions',
    }
  }

  if (productSegment === 'saaskit') {
    return {
      docsRepositoryBase: 'https://github.com/stevewesthoek/saaskit/blob/main/src/content/docs',
      feedbackLink: 'https://github.com/stevewesthoek/saaskit/discussions',
    }
  }

  return DEFAULT_DOCS_UTILITY_LINKS
}

export default async function DocsThemeLayout({
  children,
}: {
  children: ReactNode
}) {
  const pageMap = await getPublicDocsPageMap()
  let pathname = ''
  try {
    pathname = headers().get('x-nextjs-pathname') ?? ''
  } catch {
    pathname = ''
  }
  const { docsRepositoryBase, feedbackLink } = resolveDocsUtilityLinks(pathname)

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
