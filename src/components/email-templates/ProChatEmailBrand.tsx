import React from 'react'
import { Img, Section } from '@react-email/components'

import { brand } from '@/lib/brand'

interface ProChatEmailBrandProps {
  logoUrl: string
  wordmarkUrl: string
}

const styles = {
  wrap: {
    paddingBottom: '8px',
    textAlign: 'center' as const,
  },
  mark: {
    display: 'block',
    width: '40px',
    height: '40px',
    margin: '0 auto',
  },
  wordmark: {
    display: 'block',
    width: '120px',
    height: '24px',
    margin: '10px auto 0',
    color: brand.colors.textLight,
  },
} as const

export default function ProChatEmailBrand({
  logoUrl,
  wordmarkUrl,
}: Readonly<ProChatEmailBrandProps>) {
  return (
    <Section style={styles.wrap}>
      <Img src={logoUrl} width="40" height="40" alt="ProChat logo mark" style={styles.mark} />
      <Img
        src={wordmarkUrl}
        width="120"
        height="24"
        alt="ProChat"
        style={styles.wordmark}
      />
    </Section>
  )
}
