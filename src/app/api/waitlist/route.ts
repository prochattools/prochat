import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import WaitlistAdminNotificationEmail from '@/components/email-templates/WaitlistAdminNotificationEmail'
import WaitlistConfirmationEmail from '@/components/email-templates/WaitlistConfirmationEmail'
import prisma from '@/libs/prisma'
import { waitlistSubmissionSchema } from '@/lib/waitlist/schema'
import { formatWaitlistProducts } from '@/lib/waitlist/products'
import { buildWaitlistPreferenceUrls } from '@/lib/waitlist/server'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 6

type RateLimitEntry = {
  count: number
  resetAt: number
}

const globalRateLimitStore = globalThis as typeof globalThis & {
  __waitlistRateLimitStore?: Map<string, RateLimitEntry>
}

const rateLimitStore =
  globalRateLimitStore.__waitlistRateLimitStore ??
  new Map<string, RateLimitEntry>()

if (!globalRateLimitStore.__waitlistRateLimitStore) {
  globalRateLimitStore.__waitlistRateLimitStore = rateLimitStore
}

function normalizeEmailAddress(value: string | undefined) {
  const raw = (value || '').trim()
  if (!raw) return ''

  const bracketMatch = raw.match(/<([^>]+)>/)
  return (bracketMatch?.[1] || raw).trim()
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  return 'unknown'
}

function checkRateLimit(key: string) {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    })
    return { limited: false, retryAfterSeconds: 0 }
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((current.resetAt - now) / 1000),
      ),
    }
  }

  current.count += 1
  rateLimitStore.set(key, current)
  return { limited: false, retryAfterSeconds: 0 }
}

function maskEmail(email: string) {
  const [localPart, domain = ''] = email.split('@')
  const localSafe =
    localPart.length > 1 ? `${localPart[0]}***${localPart.slice(-1)}` : '*'
  return `${localSafe}@${domain}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = waitlistSubmissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const submission = parsed.data

    if (submission.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, spamFiltered: true })
    }

    const rateLimitKey = `${getClientIp(request)}::waitlist`
    const rateLimit = checkRateLimit(rateLimitKey)
    if (rateLimit.limited) {
      return NextResponse.json(
        {
          error:
            'Too many requests. Please wait a minute and try again.',
          retryAfterSeconds: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      )
    }

    const fromRaw =
      process.env.WAITLIST_FROM_EMAIL ||
      process.env.CONTACT_FROM_EMAIL ||
      process.env.RESEND_FROM ||
      process.env.EMAIL_FROM

    const adminInboxRaw =
      process.env.WAITLIST_ADMIN_EMAIL ||
      process.env.SUPPORT_EMAIL ||
      process.env.CONTACT_TO_EMAIL

    const from = normalizeEmailAddress(fromRaw)
    const adminInbox = normalizeEmailAddress(adminInboxRaw)

    if (!from) {
      return NextResponse.json(
        {
          error:
            'Missing sender configuration. Set WAITLIST_FROM_EMAIL or CONTACT_FROM_EMAIL.',
        },
        { status: 500 },
      )
    }

    if (!adminInbox) {
      return NextResponse.json(
        {
          error:
            'Missing admin inbox configuration. Set WAITLIST_ADMIN_EMAIL or SUPPORT_EMAIL.',
        },
        { status: 500 },
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json(
        {
          error:
            'RESEND_API_KEY is missing. Configure it before using waitlist emails.',
        },
        { status: 500 },
      )
    }

    const unsubscribeToken = crypto.randomUUID()
    const formattedProducts = formatWaitlistProducts(submission.products)
    const selectedProductsCsv = formattedProducts.join(', ')

    const signup = await prisma.waitlistSignup.create({
      data: {
        email: submission.email,
        selected_products: submission.products,
        selected_products_csv: selectedProductsCsv,
        source: 'waitlist',
        unsubscribe_token: unsubscribeToken,
      },
    })

    const timestampIso = signup.created_at.toISOString()
    const { logoUrl, preferencesUrl, unsubscribeUrl } =
      buildWaitlistPreferenceUrls(unsubscribeToken)

    const resend = new Resend(resendApiKey)

    const [adminResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from,
        to: [adminInbox],
        replyTo: [submission.email],
        subject: 'New ProChat Waitlist Signup',
        react: WaitlistAdminNotificationEmail({
          email: submission.email,
          timestampIso,
          products: formattedProducts,
          logoUrl,
        }),
      }),
      resend.emails.send({
        from,
        to: [submission.email],
        replyTo: [adminInbox],
        subject: "You're on the ProChat waitlist",
        react: WaitlistConfirmationEmail({
          email: submission.email,
          products: formattedProducts,
          logoUrl,
          preferencesUrl,
          unsubscribeUrl,
        }),
      }),
    ])

    if (adminResult.error || confirmationResult.error) {
      console.error('Waitlist email send error', {
        adminError: adminResult.error,
        confirmationError: confirmationResult.error,
      })
      return NextResponse.json(
        { error: 'Failed to send waitlist emails. Please try again shortly.' },
        { status: 500 },
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      console.info('[waitlist] signup accepted', {
        email: maskEmail(submission.email),
        selectedProducts: submission.products,
        confirmationId: confirmationResult.data?.id ?? null,
        adminId: adminResult.data?.id ?? null,
      })
    }

    return NextResponse.json({
      success: true,
      message: "You're on the ProChat waitlist.",
      ids: {
        admin: adminResult.data?.id ?? null,
        confirmation: confirmationResult.data?.id ?? null,
      },
      selectedProducts: submission.products,
      selectedProductsCsv,
    })
  } catch (error) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
