import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'
import { waitlistPreferencesSchema } from '@/lib/waitlist/schema'
import { formatWaitlistProducts } from '@/lib/waitlist/products'
import { getWaitlistSignupByToken } from '@/lib/waitlist/server'

export async function POST(request: Request) {
  const formData = await request.formData()

  const token = String(formData.get('token') || '').trim()
  const payload = {
    token,
    products: formData.getAll('products').map(value => String(value)),
    unsubscribe: formData.get('unsubscribe') === 'on',
  }

  const redirectUrl = new URL('/preferences', request.url)
  if (token) {
    redirectUrl.searchParams.set('token', token)
  }

  const parsed = waitlistPreferencesSchema.safeParse(payload)
  if (!parsed.success) {
    redirectUrl.searchParams.set(
      'error',
      parsed.error.flatten().fieldErrors.products?.[0] || 'invalid',
    )
    return NextResponse.redirect(redirectUrl, 303)
  }

  const signup = await getWaitlistSignupByToken(parsed.data.token)
  if (!signup) {
    redirectUrl.searchParams.set('error', 'invalid')
    return NextResponse.redirect(redirectUrl, 303)
  }

  await prisma.waitlistSignup.update({
    where: { id: signup.id },
    data: {
      selected_products: parsed.data.products,
      selected_products_csv: formatWaitlistProducts(parsed.data.products).join(', '),
      unsubscribed_at: parsed.data.unsubscribe ? new Date() : null,
    },
  })

  redirectUrl.searchParams.set('updated', '1')
  redirectUrl.searchParams.delete('error')

  return NextResponse.redirect(redirectUrl, 303)
}
