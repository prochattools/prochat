import { notFound, redirect } from 'next/navigation'

import {
  LEGACY_PRODUCTION_GUIDE_SLUG,
  PRODUCTION_GUIDE_PATH,
} from '@/lib/learning/production-guide'

type PageParams = { params: { slug: string } }

export default function BlogArticlePage({ params }: PageParams) {
  if (params.slug === LEGACY_PRODUCTION_GUIDE_SLUG) {
    redirect(PRODUCTION_GUIDE_PATH)
  }

  notFound()
}
