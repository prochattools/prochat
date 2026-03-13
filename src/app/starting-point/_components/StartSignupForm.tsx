'use client'

import { FormEvent, useEffect, useId, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackEvent, trackEventOncePerSession } from '@/utils/analytics'

interface StartSignupFormProps {
  buttonLabel?: string
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
  const sourceCookie = getCookieValue('pc_source') || 'direct'
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    trackEventOncePerSession('lead_magnet_view', 'lead_magnet_view:/starting-point', {
      source_page: '/starting-point',
      asset: 'preparation_framework',
    })
  }, [])

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
          source: sourceCookie,
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
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <input type="hidden" name="source" value={sourceCookie} />
      <input type="hidden" name="entry" value="go" />
      <input type="hidden" name="campaign" value="lead-magnet" />
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold uppercase tracking-[0.16em] text-slate-600"
      >
        Email Address
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
          className="h-12 w-full rounded-full border border-slate-300 bg-white px-5 text-base text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full whitespace-nowrap px-6 text-base sm:w-auto sm:min-w-[170px] sm:px-7 bg-primary hover:bg-secondary shadow-[0_0_26px_-12px_rgb(var(--pc-blue-600-rgb)/0.45)] hover:shadow-[0_0_34px_-10px_rgb(var(--pc-blue-600-rgb)/0.55)]"
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
