import fs from 'fs'
import path from 'path'
import React from 'react'
import { ImageResponse } from 'next/og'

import { brand } from '@/lib/brand'
import { ogFonts } from '@/lib/ogFonts'
import { applyWordmarkGradient, clampOgTitle, ogImageSize, svgToDataUri } from '@/lib/og-utils'
import { getBlogPostBySlug } from '@/libs/blog'

export const runtime = 'nodejs'

const h = React.createElement
const logoWordmarkSvg = fs.readFileSync(
  path.join(process.cwd(), 'public', 'logo', 'logo-wordmark.svg'),
  'utf8',
)

function formatLabel(value?: string) {
  if (!value) return 'Blog'

  return value
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

function splitTitleForOg(title: string) {
  const match = title.match(/^(.*?)(?:\s*\(([^()]+)\))$/)
  if (!match) {
    return {
      main: clampOgTitle(title, 62),
      detail: '',
    }
  }

  return {
    main: clampOgTitle(match[1].trim(), 58),
    detail: clampOgTitle(match[2].trim(), 34),
  }
}

function clampLine(text: string, maxLength: number) {
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed

  const candidate = trimmed.slice(0, maxLength)
  const lastSpace = candidate.lastIndexOf(' ')

  return `${candidate.slice(0, lastSpace > 24 ? lastSpace : maxLength).trimEnd()}…`
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

  const wordmark = svgToDataUri(
    applyWordmarkGradient(
      logoWordmarkSvg,
      brand.colors.primary,
      brand.colors.primaryStrong,
      brand.colors.white,
    ),
  )
  const badgeLabel = formatLabel(entry.pillarCategory || entry.category)
  const title = splitTitleForOg(entry.title)
  const subtitle = clampLine(entry.description, 84)

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
          padding: brand.spacing.xxl,
          backgroundColor: brand.colors.dark,
          backgroundImage: `${brand.gradients.deepBackground}, ${brand.gradients.canvas}`,
          color: brand.colors.white,
        },
      },
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          background: brand.gradients.canvasOverlay,
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: brand.gradients.gridOverlay,
          backgroundSize: '72px 72px',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          left: '28%',
          top: '24%',
          width: '760px',
          height: '760px',
          transform: 'translate(-50%, -50%)',
          borderRadius: brand.radii.pill,
          backgroundImage: brand.gradients.subtleGlow,
          filter: `blur(${brand.effects.haloBlur + 26}px)`,
          opacity: 0.18,
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0.8px, transparent 0.8px)',
          backgroundSize: '18px 18px',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(11,18,32,0) 44%, rgba(11,18,32,0.34) 100%)',
        },
      }),
      h(
        'div',
        {
          style: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '80px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '76%',
            },
          },
          h('img', { src: wordmark, alt: '', width: 198, height: 64 }),
          h(
            'span',
            {
              style: {
                marginTop: '16px',
                fontFamily: brand.typography.meta.family,
                fontSize: 15,
                lineHeight: brand.typography.meta.lineHeight,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
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
                marginTop: '24px',
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
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '20px',
                marginTop: '60px',
              },
            },
            h(
              'h1',
              {
                style: {
                  margin: 0,
                  maxWidth: '100%',
                  fontFamily: brand.typography.blogOgTitle.family,
                  fontWeight: 700,
                  fontSize: 58,
                  lineHeight: 1.18,
                  letterSpacing: '-0.045em',
                  color: brand.colors.white,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                },
              },
              title.main,
              title.detail
                ? h(
                    'span',
                    {
                      style: {
                        fontSize: 40,
                        lineHeight: 1.18,
                        fontWeight: 500,
                        color: brand.colors.subtleText,
                      },
                    },
                    `(${title.detail})`,
                  )
                : null,
            ),
            h(
              'p',
              {
                style: {
                  margin: 0,
                  fontFamily: brand.typography.bodySmall.family,
                  fontWeight: brand.typography.bodySmall.weight,
                  fontSize: 24,
                  lineHeight: 1.34,
                  color: brand.colors.white,
                  opacity: 0.9,
                  maxWidth: '88%',
                },
              },
              subtitle,
            ),
          ),
        ),
      ),
    ),
    {
      ...ogImageSize,
      fonts: ogFonts,
    },
  )
}
