import type { Prisma } from '@prisma/client'
import prisma from '@/libs/prisma'
import { formatWaitlistProducts, type WaitlistProductValue } from '@/lib/waitlist/products'

export interface WaitlistAdminItem {
  id: string
  email: string
  products: string[]
  productsCsv: string
  status: 'subscribed' | 'unsubscribed'
  createdAt: Date
  unsubscribedAt: Date | null
}

function normalizeProductsFromJson(value: Prisma.JsonValue): WaitlistProductValue[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((entry): entry is WaitlistProductValue => typeof entry === 'string')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean) as WaitlistProductValue[]
}

export async function listAdminWaitlist(): Promise<WaitlistAdminItem[]> {
  const signups = await prisma.waitlistSignup.findMany({
    orderBy: { created_at: 'desc' },
  })

  return signups.map(signup => {
    const normalizedProducts = normalizeProductsFromJson(signup.selected_products)
    const formattedProducts = normalizedProducts.length > 0
      ? formatWaitlistProducts(normalizedProducts)
      : signup.selected_products_csv
          .split(',')
          .map(entry => entry.trim())
          .filter(Boolean)

    return {
      id: signup.id,
      email: signup.email,
      products: formattedProducts,
      productsCsv: signup.selected_products_csv,
      status: signup.unsubscribed_at ? 'unsubscribed' : 'subscribed',
      createdAt: signup.created_at,
      unsubscribedAt: signup.unsubscribed_at,
    }
  })
}
