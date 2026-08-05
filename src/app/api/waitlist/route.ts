import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import WaitlistAdminNotificationEmail from '@/components/email-templates/WaitlistAdminNotificationEmail'
import WaitlistConfirmationEmail from '@/components/email-templates/WaitlistConfirmationEmail'
import prisma from '@/libs/prisma'
import { waitlistSubmissionSchema } from '@/lib/waitlist/schema'
import { formatWaitlistProducts } from '@/lib/waitlist/products'
import {
  createFixedWindowRateLimiter,
  type FixedWindowRateLimitEntry,
} from '@/lib/security/fixed-window-rate-limit'
import { buildWaitlistPreferenceUrls } from '@/lib/waitlist/server'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 6

const globalRateLimitStore = globalThis as typeof globalThis & {
  __waitlistRateLimitStore?: Map<string, FixedWindowRateLimitEntry>
}

const rateLimitStore =
  globalRateLimitStore.__waitlistRateLimitStore ??
  new Map<string, FixedWindowRateLimitEntry>()

if (!globalRateLimitStore.__waitlistRateLimitStore) {
  globalRateLimitStore.__waitlistRateLimitStore = rateLimitStore
}

const checkRateLimit = createFixedWindowRateLimiter({
  maxRequests: RATE_LIMIT_MAX_REQUESTS,
  windowMs: RATE_LIMIT_WINDOW_MS,
  store: rateLimitStore,
})

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

function maskEmail(email: string) {
  const [localPart, domain = ''] = email.split('@')
  const localSafe =
    localPart.length > 1 ? `${localPart[0]}***${localPart.slice(-1)}` : '*'
  return `${localSafe}@${domain}`
}

function waitlistError(
  error: string,
  status: number,
  extras: Record<string, unknown> = {},
) {
  return NextResponse.json(
    {
      success: false,
      error,
      ...extras,
    },
    { status },
  )
}

function waitlistSuccess(
  message: string,
  extras: Record<string, unknown> = {},
) {
  return NextResponse.json({
    success: true,
    message,
    ...extras,
  })
}

function getWaitlistSignupModel() {
  const waitlistSignup = prisma?.waitlistSignup

  if (!waitlistSignup || typeof waitlistSignup.create !== 'function') {
    console.error('[waitlist] Prisma waitlistSignup model unavailable', {
      hasPrismaClient: Boolean(prisma),
      hasWaitlistSignup: Boolean(waitlistSignup),
      ci: process.env.CI ?? null,
      nodeEnv: process.env.NODE_ENV ?? null,
    })
    return null
  }

  return waitlistSignup
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return waitlistError('Invalid request payload.', 400)
    }

    const parsed = waitlistSubmissionSchema.safeParse(body)

    if (!parsed.success) {
      return waitlistError('Validation failed', 400, {
        fieldErrors: parsed.error.flatten().fieldErrors,
      })
    }

    const submission = parsed.data

    if (submission.honeypot.trim().length > 0) {
      return waitlistSuccess("You're on the ProChat waitlist.", {
        spamFiltered: true,
      })
    }

    const rateLimitKey = `${getClientIp(request)}::waitlist`
    const rateLimit = checkRateLimit(rateLimitKey)
    if (rateLimit.limited) {
      return NextResponse.json(
        {
          success: false,
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

    const resendApiKey = process.env.RESEND_API_KEY
    const waitlistSignupModel = getWaitlistSignupModel()
    if (!waitlistSignupModel) {
      return waitlistError(
        'Unable to join the waitlist right now. Please try again shortly.',
        500,
      )
    }

    const unsubscribeToken = crypto.randomUUID()
    const formattedProducts = formatWaitlistProducts(submission.products)
    const selectedProductsCsv = formattedProducts.join(', ')

    const signup = await waitlistSignupModel.create({
      data: {
        email: submission.email,
        selected_products: submission.products,
        selected_products_csv: selectedProductsCsv,
        source: 'waitlist',
        unsubscribe_token: unsubscribeToken,
      },
    })

    const timestampIso = signup.created_at.toISOString()
    const { brandLockupUrl, preferencesUrl, unsubscribeUrl } =
      buildWaitlistPreferenceUrls(unsubscribeToken)

    let emailStatus: 'sent' | 'skipped' | 'failed' = 'skipped'
    let emailWarning: string | null = null
    let emailIds = {
      admin: null as string | null,
      confirmation: null as string | null,
    }

    if (!resendApiKey || !from || !adminInbox) {
      emailWarning =
        'Waitlist signup saved without sending confirmation emails because email configuration is incomplete.'
      console.error('[waitlist] email configuration incomplete', {
        hasResendApiKey: Boolean(resendApiKey),
        hasFrom: Boolean(from),
        hasAdminInbox: Boolean(adminInbox),
      })
    } else {
      try {
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
              brandLockupUrl,
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
              brandLockupUrl,
              preferencesUrl,
              unsubscribeUrl,
            }),
          }),
        ])

        if (adminResult?.error || confirmationResult?.error) {
          emailStatus = 'failed'
          emailWarning = 'Waitlist signup saved, but confirmation email delivery failed.'
          console.error('[waitlist] email send error', {
            adminError: adminResult?.error ?? null,
            confirmationError: confirmationResult?.error ?? null,
          })
        } else {
          emailStatus = 'sent'
          emailIds = {
            admin: adminResult?.data?.id ?? null,
            confirmation: confirmationResult?.data?.id ?? null,
          }
        }
      } catch (error) {
        emailStatus = 'failed'
        emailWarning = 'Waitlist signup saved, but confirmation email delivery failed.'
        console.error('[waitlist] unexpected email error', error)
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.info('[waitlist] signup accepted', {
        email: maskEmail(submission.email),
        selectedProducts: submission.products,
        confirmationId: emailIds.confirmation,
        adminId: emailIds.admin,
        emailStatus,
      })
    }

    return waitlistSuccess("You're on the ProChat waitlist.", {
      ids: emailIds,
      selectedProducts: submission.products,
      selectedProductsCsv,
      emailStatus,
      ...(emailWarning
        ? {
            warning: emailWarning,
          }
        : {}),
    })
  } catch (error) {
    console.error('[waitlist] API error', error)
    return waitlistError(
      'Unable to join the waitlist right now. Please try again shortly.',
      500,
      {
        ids: {
          admin: null,
          confirmation: null,
        },
        selectedProducts: [],
        selectedProductsCsv: '',
        emailStatus: 'failed',
      },
    )
  }
}
