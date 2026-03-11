type SocialImageUrlOptions = {
  line1: string
  line2?: string
  subtitle?: string
}

export function generateSocialImageUrl(title: string, subtitle?: string): string
export function generateSocialImageUrl(options: SocialImageUrlOptions): string
export function generateSocialImageUrl(
  titleOrOptions: string | SocialImageUrlOptions,
  subtitle?: string,
): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    ''
  ).replace(/\/$/, '')

  const params = new URLSearchParams()

  if (typeof titleOrOptions === 'string') {
    params.set('title', titleOrOptions)
    if (subtitle?.trim()) {
      params.set('subtitle', subtitle)
    }
  } else {
    params.set('line1', titleOrOptions.line1)
    if (titleOrOptions.line2?.trim()) {
      params.set('line2', titleOrOptions.line2)
    }
    if (titleOrOptions.subtitle?.trim()) {
      params.set('subtitle', titleOrOptions.subtitle)
    }
  }

  const path = `/social?${params.toString()}`
  return baseUrl ? `${baseUrl}${path}` : path
}

export function generateStaticSocialImageUrl(slug: string): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    ''
  ).replace(/\/$/, '')

  const path = `/social/${encodeURIComponent(slug)}.png`
  return baseUrl ? `${baseUrl}${path}` : path
}
