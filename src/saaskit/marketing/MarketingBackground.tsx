'use client'

import { Scaffolding } from '@/saaskit/marketing/landing/components/ui/Scaffolding'

export function MarketingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Scaffolding opacity={0.6} />
    </div>
  )
}
