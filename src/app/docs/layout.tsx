import type { ReactNode } from 'react'

import DocsThemeLayout from './DocsThemeLayout'

export default async function DocsLayout({ children }: { children: ReactNode }) {
  return DocsThemeLayout({ children })
}
