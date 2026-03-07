import fs from 'fs'
import path from 'path'
import React from 'react'
import { ImageResponse } from 'next/og'

import { brand } from '@/lib/brand'
import { ogFonts } from '@/lib/ogFonts'
import { applySvgGradient, clampOgTitle, ogImageSize, svgToDataUri } from '@/lib/og-utils'
import { getBlogPostBySlug } from '@/libs/blog'

export const runtime = 'nodejs'

const h = React.createElement
const logoMarkSvg = fs.readFileSync(
  path.join(process.cwd(), 'public', 'logo', 'logo-mark.svg'),
  'utf8',
)

function formatLabel(value?: string) {
  if (!value) return 'Blog'

  return value
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

type RouteContext = {
  params: {
    slug: string
  }
}

export async function GET(_request: Request, { params }: RouteContext) {
  const entry = await getBlogPostBySlug(params.slug)

  if (!entry) {
    return new Response('Not found', { status: 404 })
  }

  const logoMark = svgToDataUri(
    applySvgGradient(logoMarkSvg, brand.colors.primary, brand.colors.primaryStrong),
  )
  const badgeLabel = formatLabel(entry.pillarCategory || entry.category)
  const title = clampOgTitle(entry.title, 112)

  return new ImageResponse(
    h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: brand.spacing.xxl,
          backgroundColor: brand.colors.dark,
          backgroundImage: `${brand.gradients.deepBackground}, ${brand.gradients.canvas}`,
          color: brand.colors.white,
        },
      },
      h('div', {
        style: {
          position: 'absolute',
          inset: brand.spacing.lg,
          borderRadius: brand.radii.card,
          border: `1px solid ${brand.colors.surfaceBorder}`,
          background: brand.gradients.surfaceOverlay,
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: '760px',
          height: '280px',
          transform: 'translate(-50%, -50%)',
          borderRadius: brand.radii.card,
          backgroundImage: brand.gradients.subtleGlow,
          filter: `blur(${brand.effects.haloBlur}px)`,
          opacity: brand.effects.titleGlowOpacity,
        },
      }),
      h(
        'div',
        {
          style: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'flex-start',
              gap: brand.spacing.sm,
            },
          },
          h('img', { src: logoMark, alt: '', width: 62, height: 58 }),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: brand.spacing.xxs,
              },
            },
            h(
              'span',
              {
                style: {
                  fontFamily: brand.typography.meta.family,
                  fontSize: brand.typography.meta.size,
                  lineHeight: brand.typography.meta.lineHeight,
                  color: brand.colors.mutedText,
                },
              },
              'ProChat Blog',
            ),
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  padding: `${brand.spacing.xxs} ${brand.spacing.xs}`,
                  borderRadius: brand.radii.badge,
                  backgroundColor: brand.colors.badgeBackground,
                  border: `1px solid ${brand.colors.badgeBorder}`,
                },
              },
              h(
                'span',
                {
                  style: {
                    fontFamily: brand.typography.chip.family,
                    fontSize: 15,
                    lineHeight: brand.typography.chip.lineHeight,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: brand.colors.white,
                  },
                },
                badgeLabel,
              ),
            ),
          ),
        ),
      ),
      h(
        'div',
        {
          style: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: brand.spacing.sm,
            maxWidth: '80%',
          },
        },
        h(
          'h1',
          {
            style: {
              margin: 0,
              fontFamily: brand.typography.blogOgTitle.family,
              fontWeight: brand.typography.blogOgTitle.weight,
              fontSize: brand.typography.blogOgTitle.size,
              lineHeight: brand.typography.blogOgTitle.lineHeight,
              letterSpacing: '-0.05em',
              color: brand.colors.white,
            },
          },
          title,
        ),
        h(
          'p',
          {
            style: {
              margin: 0,
              fontFamily: brand.typography.bodySmall.family,
              fontWeight: brand.typography.bodySmall.weight,
              fontSize: 22,
              lineHeight: brand.typography.bodySmall.lineHeight,
              color: brand.colors.mutedText,
              maxWidth: '78%',
            },
          },
          entry.description,
        ),
      ),
      h(
        'div',
        {
          style: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
          },
        },
        h(
          'span',
          {
            style: {
              fontFamily: brand.typography.mono.family,
              fontSize: 22,
              lineHeight: brand.typography.mono.lineHeight,
              letterSpacing: '0.01em',
              color: brand.colors.mutedText,
            },
          },
          `prochat.tools • ${formatLabel(entry.category)}`,
        ),
      ),
    ),
    {
      ...ogImageSize,
      fonts: ogFonts,
    },
  )
}
