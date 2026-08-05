'use client'

import { useEffect, useRef } from 'react'

import { contactSubmissionSchema } from '@/lib/contact/schema'
import { trackEvent } from '@/utils/analytics'

import '../prochat-memory-theme.css'
import './contact-page.css'
import ContactPageMarkup from './ContactPageMarkup'

type ContactFieldName =
  | 'name'
  | 'email'
  | 'topic'
  | 'companyOrProjectUrl'
  | 'message'

type ContactApiResponse = {
  error?: string
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
  retryAfterSeconds?: number
  devMode?: boolean
}

const FORM_FIELDS: ContactFieldName[] = [
  'name',
  'email',
  'topic',
  'companyOrProjectUrl',
  'message',
]

const CONTACT_SUBMIT_IDLE_HTML = `
  <span class="pc-action-label">
    <span class="text-current md:hidden">SEND MY BRIEF</span>
    <span class="hidden text-current md:inline">SEND MY BRIEF</span>
    <span aria-hidden="true" class="hidden opacity-50 md:inline"> - </span>
    <span class="hidden opacity-50 md:inline">FOCUSED MEMORY CONTEXT</span>
  </span>
`

const CONTACT_SUBMIT_SUBMITTING_HTML = `
  <span class="pc-action-label">
    <span class="text-current">SENDING BRIEF...</span>
  </span>
`

function normalizeFieldName(raw: string): ContactFieldName | null {
  if (raw === 'companyUrl') return 'companyOrProjectUrl'
  if (FORM_FIELDS.includes(raw as ContactFieldName)) {
    return raw as ContactFieldName
  }
  return null
}

export type ContactInitialTopic =
  | 'ProChat Memory'
  | 'ProChat Memory for QA beta'
  | 'ProChat Workbench'

type ContactPageClientProps = {
  initialTopic: ContactInitialTopic
}

export default function ContactPageClient({ initialTopic }: ContactPageClientProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const form = root.querySelector<HTMLFormElement>('form[data-contact-form]')
    const submitButton = root.querySelector<HTMLButtonElement>('button[data-contact-submit]')
    const submitLabel = root.querySelector<HTMLElement>('[data-contact-submit-label]')
    const statusEl = root.querySelector<HTMLElement>('[data-contact-status]')
    const faqItems = Array.from(root.querySelectorAll<HTMLElement>('[data-faq-item]'))
    const faqTriggers = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-faq-trigger]'))
    const faqPanels = Array.from(root.querySelectorAll<HTMLElement>('[data-faq-panel]'))

    if (!form || !submitButton || !submitLabel || !statusEl) {
      return
    }

    const setStatus = (type: 'idle' | 'success' | 'error', message = '') => {
      statusEl.textContent = message
      statusEl.classList.remove('contact-status-success', 'contact-status-error', 'hidden')

      if (type === 'idle') {
        statusEl.classList.add('hidden')
        return
      }

      statusEl.classList.add(type === 'success' ? 'contact-status-success' : 'contact-status-error')

      // Keep status visible/announced even on small screens.
      requestAnimationFrame(() => {
        statusEl.focus({ preventScroll: true })
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }

    const clearFieldError = (field: ContactFieldName) => {
      const fieldEl = form.querySelector<HTMLElement>(`[name="${field}"]`)
      const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`)

      fieldEl?.removeAttribute('aria-invalid')
      fieldEl?.removeAttribute('aria-describedby')

      if (errorEl) {
        errorEl.textContent = ''
        errorEl.classList.add('hidden')
      }
    }

    const setFieldError = (field: ContactFieldName, message: string) => {
      const fieldEl = form.querySelector<HTMLElement>(`[name="${field}"]`)
      const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`)

      const errorId = `contact-error-${field}`
      if (fieldEl) {
        fieldEl.setAttribute('aria-invalid', 'true')
        fieldEl.setAttribute('aria-describedby', errorId)
      }

      if (errorEl) {
        errorEl.id = errorId
        errorEl.textContent = message
        errorEl.classList.remove('hidden')
      }
    }

    const clearAllErrors = () => {
      for (const field of FORM_FIELDS) {
        clearFieldError(field)
      }
    }

    const setSubmitting = (isSubmitting: boolean) => {
      submitButton.disabled = isSubmitting
      submitLabel.innerHTML = isSubmitting
        ? CONTACT_SUBMIT_SUBMITTING_HTML
        : CONTACT_SUBMIT_IDLE_HTML
    }

    let openIndex: number | null = null
    const setOpenFaqIndex = (nextIndex: number | null) => {
      openIndex = nextIndex

      faqTriggers.forEach((trigger, index) => {
        const isOpen = openIndex === index
        const panel = faqPanels[index]
        const item = faqItems[index]

        trigger.setAttribute('aria-expanded', String(isOpen))
        item?.setAttribute('data-open', isOpen ? 'true' : 'false')

        if (panel) {
          panel.hidden = !isOpen
        }
      })
    }

    const faqClickHandlers = faqTriggers.map((trigger, index) => {
      const onClick = () => {
        setOpenFaqIndex(openIndex === index ? null : index)
      }

      trigger.addEventListener('click', onClick)
      return { trigger, onClick }
    })
    setOpenFaqIndex(null)

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (!target?.name) return

      const normalized = normalizeFieldName(target.name)
      if (normalized) {
        clearFieldError(normalized)
      }
    }

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault()
      clearAllErrors()
      setStatus('idle')

      const formData = new FormData(form)
      const payload = {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        topic: String(formData.get('topic') || '').trim(),
        companyOrProjectUrl: String(formData.get('companyOrProjectUrl') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        honeypot: String(formData.get('honeypot') || '').trim(),
      }

      const validation = contactSubmissionSchema.safeParse(payload)
      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors
        let firstInvalidField: ContactFieldName | null = null

        for (const [rawField, messages] of Object.entries(fieldErrors)) {
          const field = normalizeFieldName(rawField)
          const message = messages?.[0]
          if (!field || !message) continue

          if (!firstInvalidField) {
            firstInvalidField = field
          }
          setFieldError(field, message)
        }

        if (firstInvalidField) {
          form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus()
        }
        return
      }

      setSubmitting(true)

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validation.data),
        })

        const json = (await response.json().catch(() => null)) as ContactApiResponse | null

        if (!response.ok) {
          if (json?.fieldErrors) {
            let firstInvalidField: ContactFieldName | null = null

            for (const [rawField, messages] of Object.entries(json.fieldErrors)) {
              const field = normalizeFieldName(rawField)
              const message = messages?.[0]
              if (!field || !message) continue

              if (!firstInvalidField) {
                firstInvalidField = field
              }
              setFieldError(field, message)
            }

            if (firstInvalidField) {
              form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus()
            }
          }

          const retrySuffix =
            response.status === 429 && json?.retryAfterSeconds
              ? ` Retry in ${json.retryAfterSeconds}s.`
              : ''

          throw new Error((json?.error || 'Unable to send your message right now.') + retrySuffix)
        }

        form.reset()
        trackEvent('contact_submit', {
          form: 'contact',
          source_page: '/contact',
        })
        setStatus(
          'success',
          json?.message ||
            (json?.devMode
              ? 'Message accepted in local dev mode.'
              : 'Message sent. We will reply by email.'),
        )
      } catch (error) {
        setStatus(
          'error',
          error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        )
      } finally {
        setSubmitting(false)
      }
    }

    form.addEventListener('input', handleInput)
    form.addEventListener('submit', handleSubmit)

    return () => {
      faqClickHandlers.forEach(({ trigger, onClick }) => {
        trigger.removeEventListener('click', onClick)
      })
      form.removeEventListener('input', handleInput)
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <div ref={rootRef} className="contact-page-root">
      <div className="contact-page-main">
        <ContactPageMarkup initialTopic={initialTopic} />
      </div>
    </div>
  )
}
