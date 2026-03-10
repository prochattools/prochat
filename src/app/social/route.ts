import { renderSocialImage } from '@/lib/renderSocialImage'
import { getSocialDefaultTitle, sanitizeSocialSubtitle, sanitizeSocialTitle } from '@/lib/social-image'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const normalizedTitle = sanitizeSocialTitle(searchParams.get('title')) || getSocialDefaultTitle()
  const normalizedSubtitle = sanitizeSocialSubtitle(searchParams.get('subtitle'))
  const image = await renderSocialImage(normalizedTitle, normalizedSubtitle)

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
    },
  })
}
