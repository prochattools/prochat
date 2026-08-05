import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import ContactConfirmationEmail from '@/components/email-templates/ContactConfirmationEmail'
import ContactNotificationEmail from '@/components/email-templates/ContactNotificationEmail'
import { contactSubmissionSchema } from '@/lib/contact/schema'
import {
  createFixedWindowRateLimiter,
  type FixedWindowRateLimitEntry,
} from '@/lib/security/fixed-window-rate-limit'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 6

const globalRateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, FixedWindowRateLimitEntry>
}

const rateLimitStore =
  globalRateLimitStore.__contactRateLimitStore ??
  new Map<string, FixedWindowRateLimitEntry>()

if (!globalRateLimitStore.__contactRateLimitStore) {
  globalRateLimitStore.__contactRateLimitStore = rateLimitStore
}

const checkRateLimit = createFixedWindowRateLimiter({
  maxRequests: RATE_LIMIT_MAX_REQUESTS,
  windowMs: RATE_LIMIT_WINDOW_MS,
  store: rateLimitStore,
})

function normalizeEmailAddress(value: string | undefined) {
  const raw = (value || '').trim()
  if (!raw) return ''

  // Accept "Name <email@domain>" and normalize to plain email.
  const bracketMatch = raw.match(/<([^>]+)>/)
  const candidate = (bracketMatch?.[1] || raw).trim()

  return candidate
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSubmissionSchema.safeParse(body)

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
    const timestampIso = new Date().toISOString()

    if (submission.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, spamFiltered: true })
    }

    const rateLimitKey = `${getClientIp(request)}::contact`
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
      process.env.CONTACT_FROM_EMAIL ||
      process.env.RESEND_FROM ||
      process.env.EMAIL_FROM ||
      'info@prochat.tools'

    const supportInboxRaw =
      process.env.SUPPORT_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      'support@prochat.tools'

    const from = normalizeEmailAddress(fromRaw)
    const supportInbox = normalizeEmailAddress(supportInboxRaw)

    if (!from) {
      return NextResponse.json(
        { error: 'Missing sender configuration (RESEND_FROM / EMAIL_FROM).' },
        { status: 500 },
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      if (process.env.NODE_ENV !== 'production') {
        console.info('[contact] RESEND_API_KEY missing; dev-mode mail preview', {
          to: supportInbox,
          name: submission.name,
          email: submission.email,
          topic: submission.topic,
          companyUrl: submission.companyUrl,
          message: submission.message,
          timestampIso,
        })
        return NextResponse.json({
          success: true,
          devMode: true,
          message:
            'Message accepted in development mode (emails not sent because RESEND_API_KEY is missing).',
        })
      }

      return NextResponse.json(
        {
          error:
            'Email service is not configured. Please set RESEND_API_KEY.',
        },
        { status: 500 },
      )
    }

    const resend = new Resend(resendApiKey)

    const [internalEmailResult, confirmationEmailResult] = await Promise.all([
      resend.emails.send({
        from,
        to: [supportInbox],
        replyTo: [submission.email],
        subject: `[Contact] ${submission.topic} — ${submission.name}`,
        react: ContactNotificationEmail({
          name: submission.name,
          email: submission.email,
          topic: submission.topic,
          companyUrl: submission.companyUrl,
          message: submission.message,
          timestampIso,
        }),
      }),
      resend.emails.send({
        from,
        to: [submission.email],
        replyTo: [supportInbox],
        subject: 'We received your message',
        react: ContactConfirmationEmail({
          name: submission.name,
          topic: submission.topic,
          message: submission.message,
        }),
      }),
    ])

    if (internalEmailResult.error || confirmationEmailResult.error) {
      console.error('Contact email send error', {
        internalError: internalEmailResult.error,
        confirmationError: confirmationEmailResult.error,
      })

      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json(
          {
            error: 'Failed to send contact emails.',
            resendErrors: {
              internal: internalEmailResult.error ?? null,
              confirmation: confirmationEmailResult.error ?? null,
            },
          },
          { status: 500 },
        )
      }

      return NextResponse.json(
        { error: 'Failed to send contact emails. Please try again shortly.' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
      ids: {
        internal: internalEmailResult.data?.id ?? null,
        confirmation: confirmationEmailResult.data?.id ?? null,
      },
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
