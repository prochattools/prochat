import fs from 'fs'
import path from 'path'
import React from 'react'
import { ImageResponse } from 'next/og'

import { brand } from '@/lib/brand'
import { ogFonts } from '@/lib/ogFonts'
import { applySvgGradient, ogImageSize, svgToDataUri } from '@/lib/og-utils'

export const runtime = 'nodejs'

const h = React.createElement
const logoMarkSvg = fs.readFileSync(
  path.join(process.cwd(), 'public', 'logo', 'logo-mark.svg'),
  'utf8',
)

export async function GET() {
  const logoMark = svgToDataUri(
    applySvgGradient(logoMarkSvg, brand.colors.primary, brand.colors.primaryStrong),
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
          justifyContent: 'center',
          alignItems: 'center',
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
          opacity: brand.effects.gridOpacity,
          backgroundImage: brand.gradients.gridOverlay,
          backgroundSize: '56px 56px',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          left: '50%',
          top: '30%',
          width: '340px',
          height: '340px',
          transform: 'translate(-50%, -50%)',
          borderRadius: brand.radii.pill,
          backgroundImage: brand.gradients.subtleGlow,
          filter: `blur(${brand.effects.haloBlur}px)`,
          opacity: brand.effects.haloOpacity,
        },
      }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: brand.spacing.lg,
            position: 'relative',
            zIndex: 1,
            marginTop: '-34px',
            maxWidth: '82%',
          },
        },
        h('img', { src: logoMark, alt: '', width: 102, height: 94 }),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: brand.spacing.sm,
            },
          },
          h(
            'h1',
            {
              style: {
                margin: 0,
                textAlign: 'center',
                fontFamily: brand.typography.ogTitle.family,
                fontWeight: brand.typography.ogTitle.weight,
                fontSize: brand.typography.ogTitle.size,
                lineHeight: brand.typography.ogTitle.lineHeight,
                letterSpacing: '-0.06em',
                color: brand.colors.white,
              },
            },
            'ProChat',
          ),
          h(
            'p',
            {
              style: {
                margin: 0,
                maxWidth: '860px',
                textAlign: 'center',
                fontFamily: brand.typography.subtitle.family,
                fontWeight: brand.typography.subtitle.weight,
                fontSize: brand.typography.subtitle.size,
                lineHeight: brand.typography.subtitle.lineHeight,
                letterSpacing: '0.02em',
                color: brand.colors.mutedText,
              },
            },
            'The Operating System for SaaS Builders',
          ),
        ),
      ),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            insetInline: brand.spacing.xxl,
            bottom: brand.spacing.lg,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          },
        },
        h(
          'span',
          {
            style: {
              fontFamily: brand.typography.mono.family,
              fontSize: brand.typography.meta.size,
              lineHeight: brand.typography.meta.lineHeight,
              color: brand.colors.subtleText,
            },
          },
          'prochat.tools',
        ),
        h(
          'span',
          {
            style: {
              fontFamily: brand.typography.mono.family,
              fontSize: brand.typography.meta.size,
              lineHeight: brand.typography.meta.lineHeight,
              color: brand.colors.mutedText,
            },
          },
          'Structured systems for shipping SaaS',
        ),
      ),
    ),
    {
      ...ogImageSize,
      fonts: ogFonts,
    },
  )
}
