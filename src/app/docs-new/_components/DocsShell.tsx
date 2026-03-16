import { ReactNode } from 'react'
import DocsSidebar from './DocsSidebar'
import DocsContent from './DocsContent'
import DocsPager from './DocsPager'

export default function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 py-12 px-page">
        <div className="flex min-h-[60vh] gap-8 lg:gap-12">
          <DocsSidebar />
          <DocsContent>{children}</DocsContent>
        </div>
        <DocsPager />
      </div>
    </div>
  )
}
