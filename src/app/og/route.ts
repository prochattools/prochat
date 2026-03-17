import fs from 'fs'
import path from 'path'
import React from 'react'
import { ImageResponse } from 'next/og'

import { brand } from '@/lib/brand'
import { ogFonts } from '@/lib/ogFonts'
import { applyWordmarkGradient, ogImageSize, svgToDataUri } from '@/lib/og-utils'

export const runtime = 'nodejs'

const h = React.createElement
const logoWordmarkSvg = fs.readFileSync(
  path.join(process.cwd(), 'public', 'logo', 'logo-wordmark.svg'),
  'utf8',
)

export async function GET() {
  const logoWordmark = svgToDataUri(
    applyWordmarkGradient(
      logoWordmarkSvg,
      brand.colors.primary,
      brand.colors.primaryStrong,
      brand.colors.white,
    ),
  )

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
          left: '50%',
          top: '46%',
          width: '700px',
          height: '700px',
          transform: 'translate(-50%, -50%)',
          borderRadius: brand.radii.pill,
          backgroundImage: brand.gradients.subtleGlow,
          filter: `blur(${brand.effects.haloBlur + 18}px)`,
          opacity: 0.4,
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0.8px, transparent 0.8px)',
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            height: '100%',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            },
          },
          h('img', { src: logoWordmark, alt: '', width: 248, height: 82 }),
          h(
            'span',
            {
              style: {
                fontFamily: brand.typography.meta.family,
                fontSize: 15,
                lineHeight: brand.typography.meta.lineHeight,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: brand.colors.mutedText,
                opacity: 0.9,
              },
            },
            'Production-Ready SaaS Infrastructure',
          ),
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              maxWidth: '86%',
              alignSelf: 'center',
            },
          },
          h(
            'h1',
            {
              style: {
                margin: 0,
                textAlign: 'center',
                fontFamily: brand.typography.ogTitle.family,
                fontWeight: 700,
                fontSize: 78,
                lineHeight: 1.08,
                letterSpacing: '-0.06em',
                color: brand.colors.white,
              },
            },
            'The Operating System',
          ),
          h(
            'p',
            {
              style: {
                margin: 0,
                textAlign: 'center',
                fontFamily: brand.typography.subtitle.family,
                fontWeight: 700,
                fontSize: 66,
                lineHeight: 1.08,
                letterSpacing: '-0.045em',
                color: brand.colors.subtleText,
              },
            },
            'for SaaS Builders',
          ),
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: brand.spacing.lg,
              marginTop: '12px',
            },
          },
          h(
            'p',
            {
              style: {
                margin: 0,
                maxWidth: '840px',
                fontFamily: brand.typography.bodySmall.family,
                fontWeight: brand.typography.bodySmall.weight,
                fontSize: 28,
                lineHeight: 1.34,
                color: brand.colors.white,
                whiteSpace: 'nowrap',
              },
            },
            'Structured infrastructure for launching with confidence.',
          ),
          h(
            'span',
            {
              style: {
                fontFamily: brand.typography.mono.family,
                fontSize: 16,
                lineHeight: brand.typography.meta.lineHeight,
                letterSpacing: '0.03em',
                color: brand.colors.mutedText,
                opacity: 0.72,
              },
            },
            'prochat.tools',
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
