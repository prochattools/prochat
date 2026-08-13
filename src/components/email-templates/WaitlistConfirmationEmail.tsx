import React from 'react'
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import { brand } from '@/lib/brand'
import ProChatEmailBrand from '@/components/email-templates/ProChatEmailBrand'

interface WaitlistConfirmationEmailProps {
  email: string
  products: string[]
  brandLockupUrl: string
  preferencesUrl: string
  unsubscribeUrl: string
}

const styles = {
  body: {
    backgroundColor: brand.surface.section,
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
  paragraph: {
    color: brand.colors.subtleText,
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 16px',
  },
  listCard: {
    backgroundColor: brand.surface.elevated,
    border: `1px solid ${brand.colors.surfaceBorder}`,
    borderRadius: '18px',
    margin: '20px 0',
    padding: '16px 18px',
  },
  listLabel: {
    color: brand.colors.primary,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.12em',
    margin: '0 0 10px',
    textTransform: 'uppercase' as const,
  },
  bullet: {
    color: brand.colors.textLight,
    fontSize: '15px',
    lineHeight: '1.65',
    margin: '0 0 6px',
  },
  footer: {
    borderTop: `1px solid ${brand.colors.surfaceBorder}`,
    padding: '18px 28px 24px',
  },
  footerLink: {
    color: brand.colors.mutedText,
    fontSize: '12px',
    lineHeight: '1.6',
    marginRight: '16px',
    textDecoration: 'none',
  },
  footerText: {
    color: brand.colors.mutedText,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '14px 0 0',
    textTransform: 'uppercase' as const,
  },
} as const

const WaitlistConfirmationEmail: React.FC<Readonly<WaitlistConfirmationEmailProps>> = ({
  email,
  products,
  brandLockupUrl,
  preferencesUrl,
  unsubscribeUrl,
}) => {
  const singleProductLine =
    products.length === 1 ? `You registered interest in: ${products[0]}` : null

  return (
    <Html>
      <Head />
      <Preview>Your ProChat beta interest is confirmed</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.shell}>
            <Section style={styles.accentBar} />

            <Section style={styles.header}>
              <ProChatEmailBrand lockupUrl={brandLockupUrl} />
              <Text style={styles.eyebrow}>ProChat Beta Interest</Text>
              <Text style={styles.title}>Your beta interest is confirmed</Text>
            </Section>

            <Section style={styles.section}>
              <Text style={styles.paragraph}>Thank you for registering your interest.</Text>

              {singleProductLine ? (
                <Text style={styles.paragraph}>{singleProductLine}</Text>
              ) : (
                <Section style={styles.listCard}>
                  <Text style={styles.listLabel}>Programs selected</Text>
                  {products.map(product => (
                    <Text key={product} style={styles.bullet}>
                      • {product}
                    </Text>
                  ))}
                </Section>
              )}

              <Section style={styles.listCard}>
                <Text style={styles.listLabel}>You may receive</Text>
                <Text style={styles.bullet}>• Selected beta or prerelease invitations</Text>
                <Text style={styles.bullet}>• Relevant product progress updates</Text>
                <Text style={styles.bullet}>• Requests for focused feedback</Text>
              </Section>

              <Text style={styles.paragraph}>
                Updates will stay focused on the Memory for QA or Workbench program you selected.
              </Text>

              <Text style={styles.paragraph}>Signed up with: {email}</Text>
            </Section>

            <Section style={styles.footer}>
              <Link href={preferencesUrl} style={styles.footerLink}>
                Manage preferences
              </Link>
              <Link href={unsubscribeUrl} style={styles.footerLink}>
                Unsubscribe
              </Link>
              <Text style={styles.footerText}>Status: WAITLIST CONFIRMED</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WaitlistConfirmationEmail
