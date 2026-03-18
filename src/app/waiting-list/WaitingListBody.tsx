'use client'

import { useEffect, useRef } from 'react'
import { waitlistSubmissionSchema } from '@/lib/waitlist/schema'
import { trackEvent, trackEventOncePerSession } from '@/utils/analytics'

import './waitlist-page.css'
import WaitlistPageMarkup from './WaitlistPageMarkup'

type WaitlistApiResponse = {
  success?: boolean
  error?: string
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
  retryAfterSeconds?: number
  warning?: string
  selectedProducts?: string[]
  selectedProductsCsv?: string
  ids?: {
    admin?: string | null
    confirmation?: string | null
  }
  emailStatus?: 'sent' | 'skipped' | 'failed'
}

function normalizeWaitlistApiResponse(value: unknown): WaitlistApiResponse {
  if (!value || typeof value !== 'object') {
    return {}
  }

  return value as WaitlistApiResponse
}

export default function WaitingListBody() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const form = root.querySelector<HTMLFormElement>('form[data-waitlist-form]')
    const emailInput = root.querySelector<HTMLInputElement>('input[name="email"]')
    const productInputs = Array.from(
      root.querySelectorAll<HTMLInputElement>('input[name="products"]'),
    )
    const submitButton = root.querySelector<HTMLButtonElement>('button[data-waitlist-submit]')
    const submitLabel = root.querySelector<HTMLElement>('[data-waitlist-submit-label]')
    const emailErrorEl = root.querySelector<HTMLElement>('[data-error-for="email"]')
    const productsErrorEl = root.querySelector<HTMLElement>('[data-error-for="products"]')
    const statusEl = root.querySelector<HTMLElement>('[data-waitlist-status]')

    if (!form || !emailInput || productInputs.length === 0 || !submitButton || !submitLabel || !statusEl) {
      return
    }

    const requestedProduct = new URLSearchParams(window.location.search)
      .get('product')
      ?.trim()
      .toLowerCase()

    const matchedProductInput = requestedProduct
      ? productInputs.find(input => input.value.trim().toLowerCase() === requestedProduct)
      : undefined

    productInputs.forEach(input => {
      input.checked = matchedProductInput ? input === matchedProductInput : false
    })

    const sourcePage = window.location.pathname
    trackEventOncePerSession('waitlist_view', `waitlist_view:${sourcePage}`, {
      source_page: sourcePage,
    })

    const getPrimaryProduct = (products: string[]) =>
      products.length === 1 ? products[0] : 'other'

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

    const clearProductsError = () => {
      productInputs.forEach(input => {
        input.removeAttribute('aria-invalid')
      })

      if (productsErrorEl) {
        productsErrorEl.textContent = ''
        productsErrorEl.classList.add('hidden')
      }
    }

    const setProductsError = (message: string) => {
      productInputs.forEach(input => {
        input.setAttribute('aria-invalid', 'true')
        input.setAttribute('aria-describedby', 'waitlist-products-error')
      })

      if (productsErrorEl) {
        productsErrorEl.textContent = message
        productsErrorEl.classList.remove('hidden')
      }
    }

    const setSubmitting = (isSubmitting: boolean) => {
      submitButton.disabled = isSubmitting
      submitLabel.textContent = isSubmitting ? 'Joining waitlist...' : 'Join waitlist'
    }

    const handleInput = () => {
      clearEmailError()
      clearProductsError()
      setStatus('idle')
    }

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault()
      clearEmailError()
      clearProductsError()
      setStatus('idle')

      const formData = new FormData(form)
      const selectedProducts = formData
        .getAll('products')
        .map(value => String(value).trim().toLowerCase())
        .filter(Boolean)

      const payload = {
        email: String(formData.get('email') || '').trim().toLowerCase(),
        products: selectedProducts,
        selectedProducts,
        company_website: String(formData.get('company_website') || '').trim(),
        honeypot: String(formData.get('honeypot') || '').trim(),
      }

      const validation = waitlistSubmissionSchema.safeParse(payload)
      if (!validation.success) {
        const emailMessage = validation.error.flatten().fieldErrors.email?.[0]
        const productsMessage = validation.error.flatten().fieldErrors.products?.[0]
        if (emailMessage) {
          setEmailError(emailMessage)
        }
        if (productsMessage) {
          setProductsError(productsMessage)
        }
        if (!emailMessage && !productsMessage) {
          setEmailError('Please enter a valid email address.')
        }
        if (productsMessage) {
          productInputs[0]?.focus()
        } else {
          emailInput.focus()
        }
        return
      }

      setSubmitting(true)
      trackEvent('waitlist_submit', {
        source_page: sourcePage,
        product: getPrimaryProduct(validation.data.products),
        products: validation.data.products.join(','),
      })

      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validation.data),
        })

        const json = normalizeWaitlistApiResponse(
          await response.json().catch(() => null),
        )

        if (!response.ok) {
          const emailFieldMessage = json.fieldErrors?.email?.[0]
          if (emailFieldMessage) {
            setEmailError(emailFieldMessage)
            emailInput.focus()
          }

          const retrySuffix =
            response.status === 429 && json.retryAfterSeconds
              ? ` Retry in ${json.retryAfterSeconds}s.`
              : ''

          throw new Error((json.error || 'Unable to join the waitlist right now.') + retrySuffix)
        }

        form.reset()
        trackEvent('waitlist_success', {
          source_page: sourcePage,
          product: getPrimaryProduct(validation.data.products),
          products: validation.data.products.join(','),
        })
        setStatus('success', json.message || "You're on the ProChat waitlist.")
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
    productInputs.forEach(input => input.addEventListener('change', handleInput))
    form.addEventListener('submit', handleSubmit)

    return () => {
      emailInput.removeEventListener('input', handleInput)
      productInputs.forEach(input => input.removeEventListener('change', handleInput))
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <main ref={rootRef} className="waitlist-page-root">
      <WaitlistPageMarkup />
    </main>
  )
}
