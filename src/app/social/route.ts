import { renderSocialImage } from '@/lib/renderSocialImage'
import {
  getSocialDefaultTitle,
  sanitizeSocialHeadlineLine,
  sanitizeSocialSubtitle,
} from '@/lib/social-image'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const explicitLine1 = sanitizeSocialHeadlineLine(searchParams.get('line1'))
  const normalizedLine1 =
    explicitLine1 || sanitizeSocialHeadlineLine(searchParams.get('title')) || getSocialDefaultTitle()
  const normalizedLine2 = explicitLine1 ? sanitizeSocialHeadlineLine(searchParams.get('line2')) : ''
  const normalizedSubtitle = sanitizeSocialSubtitle(searchParams.get('subtitle'))
  const image = await renderSocialImage({
    line1: normalizedLine1,
    line2: normalizedLine2,
    subtitle: normalizedSubtitle,
  })

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
    },
  })
}
