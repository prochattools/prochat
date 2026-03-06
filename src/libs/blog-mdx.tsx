import { evaluate } from '@mdx-js/mdx'
import type { MDXComponents } from 'mdx/types'
import { ComponentType } from 'react'
import * as devRuntime from 'react/jsx-dev-runtime'
import * as runtime from 'react/jsx-runtime'

import { blogMdxComponents } from '@/components/blog/mdx-components'

type EvaluatedMdxModule = {
  default: ComponentType<{ components?: MDXComponents }>
}

const isDevelopment = process.env.NODE_ENV === 'development'

async function getMdxComponent(source: string) {
  const module = (await evaluate(source, {
    ...(isDevelopment ? { ...runtime, ...devRuntime } : runtime),
    development: isDevelopment,
    useMDXComponents: () => blogMdxComponents,
  })) as EvaluatedMdxModule

  return module.default
}

export async function renderBlogMdx(source: string) {
  const Content = await getMdxComponent(source)
  return <Content components={blogMdxComponents} />
}
