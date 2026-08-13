'use client'

import { useEffect, useState } from 'react'
import { generateSocialImageUrl } from '@/lib/generateSocialImageUrl'

type FormState = {
  line1: string
  line2: string
  subtitle: string
}

const defaultValues: FormState = {
  line1: 'Build with reviewed context.',
  line2: 'Ship with bounded execution.',
  subtitle: 'ProChat Memory and Workbench keep evidence, review, and local project work explicit.',
}

function toAbsoluteUrl(pathOrUrl: string, origin: string) {
  try {
    const url = new URL(pathOrUrl)
    return new URL(`${url.pathname}${url.search}`, origin).toString()
  } catch {
    return new URL(pathOrUrl, origin).toString()
  }
}

export function AdminOgGenerator() {
  const [values, setValues] = useState<FormState>(defaultValues)
  const [origin, setOrigin] = useState('')
  const [copied, setCopied] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState('')

  function buildGeneratedUrl(nextValues: FormState, nextOrigin: string) {
    const rawUrl = generateSocialImageUrl({
      line1: nextValues.line1,
      line2: nextValues.line2,
      subtitle: nextValues.subtitle,
    })

    if (!nextOrigin) {
      return rawUrl
    }

    return toAbsoluteUrl(rawUrl, nextOrigin)
  }

  useEffect(() => {
    const nextOrigin = window.location.origin
    setOrigin(nextOrigin)
    setGeneratedUrl(buildGeneratedUrl(defaultValues, nextOrigin))
  }, [])

  useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  useEffect(() => {
    setGeneratedUrl(buildGeneratedUrl(values, origin))
  }, [origin, values])

  function updateField(field: keyof FormState, value: string) {
    setValues(current => ({ ...current, [field]: value }))
  }

  function handleGenerate() {
    setGeneratedUrl(buildGeneratedUrl(values, origin))
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">OG image generator</h2>
        <p className="text-sm text-muted-foreground">
          Uses the existing social image route. Edit the copy, generate the URL, and copy it in one
          click.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col text-sm text-muted-foreground">
          Line one
          <input
            value={values.line1}
            onChange={event => updateField('line1', event.target.value)}
            className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="flex flex-col text-sm text-muted-foreground">
          Line two
          <input
            value={values.line2}
            onChange={event => updateField('line2', event.target.value)}
            className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <label className="flex flex-col text-sm text-muted-foreground md:col-span-2">
          Subtitle
          <textarea
            value={values.subtitle}
            onChange={event => updateField('subtitle', event.target.value)}
            rows={3}
            className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleGenerate}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/50"
        >
          Generate URL
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Generated URL</p>
        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <input
            readOnly
            value={generatedUrl}
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/50"
            >
              {copied ? 'Copied' : 'Copy URL'}
            </button>
            <a
              href={generatedUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
            >
              Open image
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
