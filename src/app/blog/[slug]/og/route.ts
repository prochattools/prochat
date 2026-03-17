import {
  getProductionGuideEntry,
  getProductionGuideSocialImage,
  LEGACY_PRODUCTION_GUIDE_SLUG,
} from '@/lib/learning/production-guide'
import { renderSocialImage } from '@/lib/renderSocialImage'

export const runtime = 'nodejs'

type RouteContext = {
  params: {
    slug: string
  }
}

export async function GET(_request: Request, { params }: RouteContext) {
  if (params.slug !== LEGACY_PRODUCTION_GUIDE_SLUG) {
    return new Response('Not found', { status: 404 })
  }

  const entry = await getProductionGuideEntry()

  if (!entry) {
    return new Response('Not found', { status: 404 })
  }

  const png = await renderSocialImage(getProductionGuideSocialImage(entry))

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
