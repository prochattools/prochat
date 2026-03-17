'use client'

import { FormEvent, useEffect, useId, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent, trackEventOncePerSession } from '@/utils/analytics'
import { resolveStartingPointSource } from '@/app/go/source'

interface StartSignupFormProps {
  buttonLabel?: ReactNode
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getCookieValue(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`))
  if (!match) return null
  return decodeURIComponent(match.split('=')[1] || '')
}

export default function StartSignupForm({
  buttonLabel = 'Get the PDF',
}: StartSignupFormProps) {
  const inputId = useId()
  const sourceCookie = getCookieValue('pc_source')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const referrer = typeof document !== 'undefined' ? document.referrer : ''
  const queryParamSource = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('src') : null
  const resolvedSource = resolveStartingPointSource({
    queryParamSource,
    cookieSource: sourceCookie,
    referrer,
  })

  useEffect(() => {
    trackEventOncePerSession('lead_magnet_view', 'lead_magnet_view:/starting-point', {
      source_page: '/starting-point',
      asset: 'preparation_framework',
      source: resolvedSource,
      entry: 'go',
      campaign: 'lead-magnet',
    })
  }, [resolvedSource])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Email is required.')
      return
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    trackEvent('lead_magnet_submit', {
      source_page: '/starting-point',
      asset: 'preparation_framework',
      source: resolvedSource,
      entry: 'go',
      campaign: 'lead-magnet',
    })

    try {
      const response = await fetch('/api/mailerlite/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source: resolvedSource,
          entry: 'go',
          campaign: 'lead-magnet',
        }),
      })

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string
        message?: string
      }

      if (!response.ok) {
        setError(payload.error || 'Something went wrong. Please try again.')
        return
      }

      setSuccess(
        payload.message || 'Check your inbox — your copy is on its way.'
      )
      trackEvent('lead_magnet_success', {
        source_page: '/starting-point',
        asset: 'preparation_framework',
        source: resolvedSource,
        entry: 'go',
        campaign: 'lead-magnet',
      })
      setEmail('')
    } catch (submitError) {
      console.error('MailerLite subscription error:', submitError)
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <input type="hidden" name="source" value={resolvedSource} />
      <input type="hidden" name="entry" value="go" />
      <input type="hidden" name="campaign" value="lead-magnet" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2.5">
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
          className="h-12 w-full rounded-[var(--pc-button-radius)] border border-border/60 bg-foreground/5 px-5 text-base text-foreground placeholder:text-foreground/70 outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full whitespace-nowrap px-8 text-sm font-semibold sm:w-auto sm:min-w-[232px] sm:px-10"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : buttonLabel}
        </Button>
      </div>

      {error && <p className="text-base font-medium text-red-500">{error}</p>}
      {success && <p className="text-base font-medium text-emerald-600">{success}</p>}
    </form>
  )
}
