'use client'

import { usePathname } from 'next/navigation'

import { MarketingNav } from '@/app/(marketing)/components/layout/MarketingNav'
import { isChromelessPath } from '@/helpers/chrome-routes'

export default function Header({ forceVisible = false }: { forceVisible?: boolean }) {
  const pathname = usePathname() || ''

  if (!forceVisible && isChromelessPath(pathname)) return null

  return <MarketingNav />
}
