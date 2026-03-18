import type { Prisma } from '@prisma/client'

import prisma from '@/libs/prisma'
import { getSiteUrl } from '@/libs/site-url'
import {
  WAITLIST_PRODUCT_LABELS,
  WAITLIST_PRODUCT_OPTIONS,
  type WaitlistProductValue,
} from '@/lib/waitlist/products'

const waitlistProductValues = new Set<WaitlistProductValue>(
  WAITLIST_PRODUCT_OPTIONS.map(option => option.value),
)

export function normalizeStoredWaitlistProducts(value: Prisma.JsonValue | null | undefined) {
  if (!Array.isArray(value)) {
    return [] as WaitlistProductValue[]
  }

  return value
    .map(entry => String(entry).trim().toLowerCase())
    .filter((entry): entry is WaitlistProductValue =>
      waitlistProductValues.has(entry as WaitlistProductValue),
    )
}

export function buildWaitlistPreferenceUrls(token: string) {
  const siteUrl = getSiteUrl()

  return {
    logoUrl: `${siteUrl}/logo/logo-mark.svg`,
    wordmarkUrl: `${siteUrl}/logo/logo-wordmark.svg`,
    preferencesUrl: `${siteUrl}/preferences?token=${encodeURIComponent(token)}`,
    unsubscribeUrl: `${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`,
  }
}

export function formatWaitlistProductList(products: WaitlistProductValue[]) {
  return products.map(product => WAITLIST_PRODUCT_LABELS[product])
}

export async function getWaitlistSignupByToken(token: string) {
  const safeToken = token.trim()
  if (!safeToken) return null

  const signup = await prisma.waitlistSignup.findUnique({
    where: { unsubscribe_token: safeToken },
  })

  if (!signup) return null

  return {
    ...signup,
    products: normalizeStoredWaitlistProducts(signup.selected_products),
  }
}

export async function unsubscribeWaitlistSignup(token: string) {
  const signup = await getWaitlistSignupByToken(token)
  if (!signup) {
    return { status: 'invalid' as const }
  }

  if (!signup.unsubscribed_at) {
    await prisma.waitlistSignup.update({
      where: { id: signup.id },
      data: { unsubscribed_at: new Date() },
    })
  }

  return { status: 'success' as const }
}
