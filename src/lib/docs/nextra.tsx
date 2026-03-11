import path from 'path'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { jsxDEV } from 'react/jsx-dev-runtime'
import { ComponentType, ReactNode } from 'react'

import { compileMdx } from 'nextra/compile'
import { useMDXComponents as getDocsMdxComponents } from 'nextra-theme-docs'

import type { ContentEntry } from '@/lib/content/types'

type EvaluatedMdxModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>
  metadata?: Record<string, unknown>
  sourceCode?: string
  toc?: Array<{ depth: number; id: string; value: string }>
}

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
      useMDXComponents: getDocsMdxComponents,
    },
    ...values,
  ) as EvaluatedMdxModule
}

function stripGeneratedDocsMarkers(source: string) {
  return source
    .replace(/^<!-- GENERATED FILE - DO NOT EDIT -->\s*/m, '')
    .replace(/^\s*<!--\s*AI:[\w-]+:(?:start|end)\s*-->\s*$/gm, '')
}

export async function renderDocsMdxContent(entry: ContentEntry) {
  const filePath = path.join(process.cwd(), entry.sourcePath)
  const source = stripGeneratedDocsMarkers(entry.content)
  const compiledSource = await compileMdx(source, {
    filePath,
    mdxOptions: {
      format: 'mdx',
    },
  })

  const { default: MDXContent, metadata, sourceCode, toc } = evaluateCompiledMdx(compiledSource)
  const components = getDocsMdxComponents()
  const Wrapper = components.wrapper as ComponentType<{
    children: ReactNode
    metadata?: Record<string, unknown>
    sourceCode?: string
    toc?: Array<{ depth: number; id: string; value: string }>
  }> | undefined
  const { wrapper: _wrapper, ...pageComponents } = components
  const content = <MDXContent components={pageComponents} />

  if (!Wrapper) {
    return content
  }

  return (
    <Wrapper
      metadata={metadata}
      sourceCode={sourceCode}
      toc={toc}
    >
      {content}
    </Wrapper>
  )
}
