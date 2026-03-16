import { ReactNode } from 'react'
import DocsShell from './_components/DocsShell'

export default function DocsNewLayout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>
}
