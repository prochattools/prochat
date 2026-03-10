export function generateSocialImageUrl(title: string, subtitle?: string): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    ''
  ).replace(/\/$/, '')

  const params = new URLSearchParams({ title })
  if (subtitle?.trim()) {
    params.set('subtitle', subtitle)
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
