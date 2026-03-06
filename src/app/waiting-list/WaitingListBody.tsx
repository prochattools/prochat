'use client'

import { useEffect, useRef } from 'react'

import { getActionLabelHtml } from '@/helpers/action-label'
import { waitlistSubmissionSchema } from '@/lib/waitlist/schema'

import './waitlist-page.css'
import WaitlistPageMarkup from './WaitlistPageMarkup'

type WaitlistApiResponse = {
  error?: string
  message?: string
  success?: boolean
  fieldErrors?: Record<string, string[] | undefined>
  retryAfterSeconds?: number
}

export default function WaitingListBody() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const form = root.querySelector<HTMLFormElement>('form[data-waitlist-form]')
    const emailInput = root.querySelector<HTMLInputElement>('input[name="email"]')
    const submitButton = root.querySelector<HTMLButtonElement>('button[data-waitlist-submit]')
    const submitLabel = root.querySelector<HTMLElement>('[data-waitlist-submit-label]')
    const emailErrorEl = root.querySelector<HTMLElement>('[data-error-for="email"]')
    const statusEl = root.querySelector<HTMLElement>('[data-waitlist-status]')

    if (!form || !emailInput || !submitButton || !submitLabel || !statusEl) {
      return
    }

    const setStatus = (type: 'idle' | 'success' | 'error', message = '') => {
      statusEl.textContent = message
      statusEl.classList.remove('waitlist-status-success', 'waitlist-status-error', 'hidden')

      if (type === 'idle') {
        statusEl.classList.add('hidden')
        return
      }

      statusEl.classList.add(type === 'success' ? 'waitlist-status-success' : 'waitlist-status-error')

      requestAnimationFrame(() => {
        statusEl.focus({ preventScroll: true })
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }

    const clearEmailError = () => {
      emailInput.removeAttribute('aria-invalid')
      emailInput.removeAttribute('aria-describedby')
      if (emailErrorEl) {
        emailErrorEl.textContent = ''
        emailErrorEl.classList.add('hidden')
      }
    }

    const setEmailError = (message: string) => {
      const errorId = 'waitlist-email-error'
      emailInput.setAttribute('aria-invalid', 'true')
      emailInput.setAttribute('aria-describedby', errorId)

      if (emailErrorEl) {
        emailErrorEl.id = errorId
        emailErrorEl.textContent = message
        emailErrorEl.classList.remove('hidden')
      }
    }

    const setSubmitting = (isSubmitting: boolean) => {
      submitButton.disabled = isSubmitting
      submitLabel.innerHTML = getActionLabelHtml(isSubmitting ? 'Joining...' : 'Join Waitlist')
    }

    const handleInput = () => {
      clearEmailError()
      setStatus('idle')
    }

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault()
      clearEmailError()
      setStatus('idle')

      const formData = new FormData(form)
      const payload = {
        name: String(formData.get('name') || '').trim(),
        role: String(formData.get('role') || '').trim(),
        email: String(formData.get('email') || '').trim().toLowerCase(),
        company_website: String(formData.get('company_website') || '').trim(),
        honeypot: String(formData.get('honeypot') || '').trim(),
      }

      const validation = waitlistSubmissionSchema.safeParse(payload)
      if (!validation.success) {
        const emailMessage = validation.error.flatten().fieldErrors.email?.[0]
        if (emailMessage) {
          setEmailError(emailMessage)
        } else {
          setEmailError('Please enter a valid email address.')
        }
        emailInput.focus()
        return
      }

      setSubmitting(true)

      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validation.data),
        })

        const json = (await response.json().catch(() => null)) as WaitlistApiResponse | null

        if (!response.ok) {
          const emailFieldMessage = json?.fieldErrors?.email?.[0]
          if (emailFieldMessage) {
            setEmailError(emailFieldMessage)
            emailInput.focus()
          }

          const retrySuffix =
            response.status === 429 && json?.retryAfterSeconds
              ? ` Retry in ${json.retryAfterSeconds}s.`
              : ''

          throw new Error((json?.error || 'Unable to join the waitlist right now.') + retrySuffix)
        }

        form.reset()
        setStatus('success', json?.message || "You're on the UXKit waitlist.")
      } catch (error) {
        setStatus(
          'error',
          error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        )
      } finally {
        setSubmitting(false)
      }
    }

    emailInput.addEventListener('input', handleInput)
    form.addEventListener('submit', handleSubmit)

    return () => {
      emailInput.removeEventListener('input', handleInput)
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <main ref={rootRef} className="waitlist-page-root">
      <WaitlistPageMarkup />
    </main>
  )
}
