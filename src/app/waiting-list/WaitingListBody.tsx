'use client'

import { useEffect, useRef } from 'react'

import './stitch-waitlist.css'
import { STITCH_WAITLIST_HTML } from './stitch-waitlist-html'

type WaitlistApiResponse = {
  error?: string
  success?: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function WaitingListBody() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const form = root.querySelector<HTMLFormElement>('form[data-waitlist-form]')
    const emailInput = root.querySelector<HTMLInputElement>('input[name="email"]')
    const submitButton = root.querySelector<HTMLButtonElement>('button[data-waitlist-submit]')
    const submitLabel = root.querySelector<HTMLElement>('[data-waitlist-submit-label]')
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

    const setSubmitting = (isSubmitting: boolean) => {
      submitButton.disabled = isSubmitting
      submitLabel.textContent = isSubmitting ? 'Joining...' : 'Join Waitlist'
    }

    const handleInput = () => {
      setStatus('idle')
    }

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault()
      setStatus('idle')

      const email = emailInput.value.trim().toLowerCase()
      if (!EMAIL_REGEX.test(email)) {
        setStatus('error', 'Please enter a valid email address.')
        emailInput.focus()
        return
      }

      setSubmitting(true)

      try {
        const response = await fetch('/api/waiting-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })

        const json = (await response.json().catch(() => null)) as WaitlistApiResponse | null

        if (!response.ok) {
          throw new Error(json?.error || 'Unable to join the waitlist right now.')
        }

        form.reset()
        setStatus('success', 'You are on the waitlist. We will email you updates.')
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
    <main
      ref={rootRef}
      className="stitch-waitlist-root"
      dangerouslySetInnerHTML={{ __html: STITCH_WAITLIST_HTML }}
    />
  )
}
