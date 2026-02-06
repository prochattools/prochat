import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { MarketingBackground } from '@/saaskit/marketing/MarketingBackground'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-marketing relative min-h-screen bg-white text-slate-900 dark:bg-[#010814] dark:text-white selection:bg-[#885efe] selection:text-white overflow-x-hidden">
      <MarketingBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-24">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
