import { evaluate } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import { ComponentType } from 'react'
import * as devRuntime from 'react/jsx-dev-runtime'
import * as runtime from 'react/jsx-runtime'

import { blogMdxComponents } from '@/components/blog/mdx-components'

const isDevelopment = process.env.NODE_ENV === 'development'

function normalizeMdxSource(source: string) {
  return source.replace(/^import\s+.+$/gm, '').trim()
}

type EvaluatedMdxModule = {
  default: ComponentType<{ components?: MDXComponents }>
}

async function getMdxComponent(source: string) {
  const module = (await evaluate(normalizeMdxSource(source), {
    ...(isDevelopment ? { ...runtime, ...devRuntime } : runtime),
    development: isDevelopment,
    useMDXComponents: () => blogMdxComponents,
  })) as EvaluatedMdxModule

  return module.default
}

export async function renderMdxContent(source: string) {
  const Content = await getMdxComponent(source)
  return <Content components={blogMdxComponents} />
}

export default async function MDXRenderer({ source }: { source: string }) {
  return renderMdxContent(source)
}
