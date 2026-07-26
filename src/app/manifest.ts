import type { MetadataRoute } from 'next'

import { brand } from '@/lib/brand'
import { DEFAULT_DESCRIPTION } from '@/lib/seo/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProChat',
    short_name: 'ProChat',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: brand.colors.darkBackground,
    theme_color: brand.colors.darkBackground,
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
