import Script from 'next/script'

const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim()
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim()

export default function UmamiAnalytics() {
  if (!umamiScriptUrl || !umamiWebsiteId) {
    return null
  }

  return (
    <Script
      id="umami-analytics"
      src={umamiScriptUrl}
      data-website-id={umamiWebsiteId}
      strategy="lazyOnload"
    />
  )
}
