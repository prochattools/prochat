import config from '@/config'

export function getSiteUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()

  if (publicUrl) {
    return publicUrl.replace(/\/+$/, '')
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }

  return `https://${config.domainName}`
}
