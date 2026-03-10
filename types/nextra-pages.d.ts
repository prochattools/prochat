declare module 'nextra/compile' {
  export function compileMdx(
    rawMdx: string,
    options?: Record<string, unknown>,
  ): Promise<string>
}

declare module 'nextra/mdx-remote' {
  import type { ReactNode } from 'react'
  import type { MDXComponents } from 'mdx/types'

  export function MDXRemote(props: {
    compiledSource: string
    components?: MDXComponents
    scope?: Record<string, unknown>
    lazy?: boolean
  }): ReactNode
}
