const umamiScriptUrl =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim()
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim()

export default function UmamiAnalytics() {
  if (!umamiScriptUrl || !umamiWebsiteId) {
    return null
  }

  return (
    <script
      src={umamiScriptUrl}
      defer
      data-website-id={umamiWebsiteId}
    />
  )
}
