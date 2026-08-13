import React from 'react'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import { brand } from '@/lib/brand'
import ProChatEmailBrand from '@/components/email-templates/ProChatEmailBrand'

interface WaitlistAdminNotificationEmailProps {
  email: string
  timestampIso: string
  products: string[]
  brandLockupUrl: string
}

const styles = {
  body: {
    backgroundColor: brand.colors.darkBackground,
    color: brand.colors.textLight,
    fontFamily: 'Host Grotesk, Golos Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    margin: 0,
    padding: '32px 14px',
  },
  container: {
    margin: '0 auto',
    maxWidth: '600px',
    width: '100%',
  },
  shell: {
    backgroundColor: brand.surface.section,
    border: `1px solid ${brand.colors.surfaceBorder}`,
    borderRadius: '24px',
    overflow: 'hidden',
  },
  accentBar: {
    backgroundImage: brand.gradients.primary,
    height: '6px',
    width: '100%',
  },
  header: {
    padding: '28px 28px 12px',
  },
  eyebrow: {
    color: brand.colors.primary,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.12em',
    margin: '14px 0 10px',
    textTransform: 'uppercase' as const,
  },
  title: {
    color: brand.colors.textLight,
    fontFamily: 'Golos Text, Host Grotesk, sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '1.16',
    letterSpacing: '-0.03em',
    margin: 0,
  },
  section: {
    padding: '8px 28px 28px',
  },
  label: {
    color: brand.colors.primary,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.12em',
    margin: '0 0 8px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: brand.colors.textLight,
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 18px',
  },
  card: {
    backgroundColor: brand.surface.elevated,
    border: `1px solid ${brand.colors.surfaceBorder}`,
    borderRadius: '18px',
    margin: '18px 0',
    padding: '16px 18px',
  },
  bullet: {
    color: brand.colors.textLight,
    fontSize: '15px',
    lineHeight: '1.65',
    margin: '0 0 6px',
  },
  footer: {
    borderTop: `1px solid ${brand.colors.surfaceBorder}`,
    color: brand.colors.mutedText,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: 0,
    padding: '18px 28px 24px',
    textTransform: 'uppercase' as const,
  },
} as const

const WaitlistAdminNotificationEmail: React.FC<Readonly<WaitlistAdminNotificationEmailProps>> = ({
  email,
  timestampIso,
  products,
  brandLockupUrl,
}) => (
  <Html>
    <Head />
    <Preview>New ProChat Beta Interest</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.shell}>
          <Section style={styles.accentBar} />

          <Section style={styles.header}>
            <ProChatEmailBrand lockupUrl={brandLockupUrl} />
            <Text style={styles.eyebrow}>ProChat Beta Intake</Text>
            <Text style={styles.title}>New ProChat Beta Interest</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            <Section style={styles.card}>
              <Text style={styles.label}>Programs selected</Text>
              {products.map(product => (
                <Text key={product} style={styles.bullet}>
                  • {product}
                </Text>
              ))}
            </Section>

            <Text style={styles.label}>Timestamp</Text>
            <Text style={styles.value}>{timestampIso}</Text>
          </Section>

          <Text style={styles.footer}>Status: BETA INTEREST NOTIFICATION SENT</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WaitlistAdminNotificationEmail
