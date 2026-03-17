import type { MDXComponents } from 'mdx/types'

import { contentMdxComponents } from '@/components/content/mdx-components'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...contentMdxComponents,
    ...components,
  }
}
