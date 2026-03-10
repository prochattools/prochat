import React from 'react'
import { ImageResponse } from 'next/og'

import { brand } from '@/lib/brand'
import { ogFonts } from '@/lib/ogFonts'
import { ogImageSize } from '@/lib/og-utils'
import {
  getSocialHeadlineFontSize,
  sanitizeSocialSubtitle,
  getSocialWordmarkDataUri,
  sanitizeSocialTitle,
  splitSocialTitle,
} from '@/lib/social-image'

const h = React.createElement

function createSocialImageResponse(title: string, subtitle?: string) {
  const normalizedTitle = sanitizeSocialTitle(title)
  const normalizedSubtitle = sanitizeSocialSubtitle(subtitle)
  const titleLines = splitSocialTitle(normalizedTitle)
  const titleFontSize = getSocialHeadlineFontSize(titleLines)
  const wordmark = getSocialWordmarkDataUri()

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
          padding: '100px',
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
          opacity: 0.05,
          backgroundImage: brand.gradients.gridOverlay,
          backgroundSize: '72px 72px',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          left: '34%',
          top: '33%',
          width: '760px',
          height: '760px',
          transform: 'translate(-50%, -50%)',
          borderRadius: brand.radii.pill,
          backgroundImage: brand.gradients.subtleGlow,
          filter: `blur(${brand.effects.haloBlur + 22}px)`,
          opacity: 0.28,
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(11,18,32,0) 42%, rgba(11,18,32,0.34) 100%)',
        },
      }),
      h(
        'div',
        {
          style: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '18px',
            },
          },
          h('img', { src: wordmark, alt: '', width: 240, height: 80 }),
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '1000px',
                gap: '12px',
              },
            },
            ...titleLines.map((line, index) =>
              h(
                'h1',
                {
                  key: `${line}-${index}`,
                  style: {
                    margin: 0,
                    fontFamily: brand.typography.ogTitle.family,
                    fontWeight: 700,
                    fontSize: titleFontSize,
                    lineHeight: 1.04,
                    letterSpacing: '-0.055em',
                    color: brand.colors.white,
                    textShadow: '0 0 32px rgba(59, 130, 246, 0.12)',
                  },
                },
                line,
              ),
            ),
          ),
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
            },
          },
          h(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                minWidth: 0,
                alignItems: 'flex-end',
              },
            },
            normalizedSubtitle
              ? h(
                  'span',
                  {
                    style: {
                      fontFamily: brand.typography.bodySmall.family,
                      fontSize: 22,
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: brand.colors.subtleText,
                      opacity: 0.88,
                    },
                  },
                  normalizedSubtitle,
                )
              : null,
          ),
          h(
            'span',
            {
              style: {
                fontFamily: brand.typography.mono.family,
                fontSize: 18,
                lineHeight: brand.typography.meta.lineHeight,
                color: brand.colors.mutedText,
                opacity: 0.78,
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

export async function renderSocialImage(title: string, subtitle?: string): Promise<Buffer> {
  const response = createSocialImageResponse(title, subtitle)
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
