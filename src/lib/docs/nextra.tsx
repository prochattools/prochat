import path from 'path'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { jsxDEV } from 'react/jsx-dev-runtime'

import { compileMdx } from 'nextra/compile'

import { blogMdxComponents } from '@/components/blog/mdx-components'

function evaluateCompiledMdx(
  compiledSource: string,
  scope: Record<string, unknown> = {},
) {
  const keys = Object.keys(scope)
  const values = Object.values(scope)
  const hydrate = Reflect.construct(
    Function,
    ['$', ...keys, compiledSource],
  ) as (
    runtime: Record<string, unknown>,
    ...args: unknown[]
  ) => { default: () => JSX.Element }

  return hydrate(
    {
      Fragment,
      jsx,
      jsxDEV,
      jsxs,
      useMDXComponents: () => blogMdxComponents,
    },
    ...values,
  )
}

export async function renderDocsMdxContent(routeSegments: string[], source: string) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'docs', `${routeSegments.join('/')}.mdx`)
  const compiledSource = await compileMdx(source, {
    filePath,
    mdxOptions: {
      format: 'mdx',
    },
  })

  const { default: MDXContent } = evaluateCompiledMdx(compiledSource)

  return <MDXContent />
}
