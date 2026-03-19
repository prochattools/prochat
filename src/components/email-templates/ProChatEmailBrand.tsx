import React from 'react'
import { Img, Section } from '@react-email/components'

interface ProChatEmailBrandProps {
  lockupUrl: string
}

const styles = {
  wrap: {
    paddingBottom: '8px',
    textAlign: 'center' as const,
  },
  lockup: {
    display: 'block',
    width: '170px',
    height: '56px',
    margin: '0 auto',
  },
} as const

export default function ProChatEmailBrand({
  lockupUrl,
}: Readonly<ProChatEmailBrandProps>) {
  return (
    <Section style={styles.wrap}>
      <Img src={lockupUrl} width="170" height="56" alt="ProChat" style={styles.lockup} />
    </Section>
  )
}
