import React from 'react'
import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components'

import { brand } from '@/lib/brand'

interface LicenseRevokedEmailProps {
  productName: string
  repoName: string
  supportEmail: string
}

const styles = {
  body: {
    backgroundColor: brand.colors.darkBackground,
    color: brand.colors.textLight,
    fontFamily: 'Golos Text, Host Grotesk, -apple-system, system-ui, sans-serif',
    margin: 0,
    padding: '32px 14px',
  },
  container: {
    margin: '0 auto',
    maxWidth: '640px',
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
  content: {
    padding: '32px',
  },
  eyebrow: {
    color: brand.colors.primary,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    marginBottom: '10px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 12px',
    color: brand.colors.textLight,
  },
  paragraph: {
    margin: '0 0 16px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: brand.colors.textLight,
  },
  footer: {
    marginTop: '20px',
    borderTop: `1px solid ${brand.colors.surfaceBorder}`,
    paddingTop: '20px',
    fontSize: '13px',
    letterSpacing: '0.08em',
    color: brand.colors.mutedText,
    textTransform: 'uppercase' as const,
  },
} as const

const LicenseRevokedEmail: React.FC<Readonly<LicenseRevokedEmailProps>> = ({
  productName,
  repoName,
  supportEmail,
}) => (
  <Html>
    <Head />
    <Preview>Access revoked for {productName}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.shell}>
          <Section style={styles.accentBar} />
          <Section style={styles.content}>
            <Text style={styles.eyebrow}>ProChat Access</Text>
            <Text style={styles.title}>Access removed</Text>
            <Text style={styles.paragraph}>
              Your access to the {productName} repository ({repoName}) has been revoked by our team. This keeps the repo aligned with the current license status.
            </Text>
            <Text style={styles.paragraph}>
              If you believe this happened by mistake, please reply to this email or reach out to {supportEmail} and we will review.
            </Text>
            <Text style={styles.footer}>
              Support: {supportEmail}
            </Text>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default LicenseRevokedEmail
