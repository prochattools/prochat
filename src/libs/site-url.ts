import config from '@/config'

export function getSiteUrl() {
  const publicUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim()

  if (publicUrl) {
    return publicUrl.replace(/\/+$/, '')
  }

  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT?.trim() || '3056'
    return `http://localhost:${port}`
  }

  return `https://${config.domainName}`
}
