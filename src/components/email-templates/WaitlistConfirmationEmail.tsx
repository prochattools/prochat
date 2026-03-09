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

interface WaitlistConfirmationEmailProps {
  email: string
  products: string[]
  logoUrl: string
  preferencesUrl: string
  unsubscribeUrl: string
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
  logoName: {
    color: brand.colors.textLight,
    fontFamily: 'Host Grotesk, Golos Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '1.2',
    margin: 0,
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
  logoUrl,
  preferencesUrl,
  unsubscribeUrl,
}) => {
  const singleProductLine =
    products.length === 1 ? `You joined the waitlist for: ${products[0]}` : null

  return (
    <Html>
      <Head />
      <Preview>You're on the ProChat waitlist</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.shell}>
            <Section style={styles.accentBar} />

            <Section style={styles.header}>
              <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
                <tbody>
                  <tr>
                    <td align="center">
                      <img
                        src={logoUrl}
                        width="40"
                        height="40"
                        alt="ProChat"
                        style={{ display: 'block', height: '40px', width: '40px' }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ paddingTop: '8px' }}>
                      <span style={styles.logoName}>ProChat</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Text style={styles.eyebrow}>ProChat Waitlist</Text>
              <Text style={styles.title}>You&apos;re on the ProChat waitlist</Text>
            </Section>

            <Section style={styles.section}>
              <Text style={styles.paragraph}>Thank you for joining the ProChat waitlist.</Text>

              {singleProductLine ? (
                <Text style={styles.paragraph}>{singleProductLine}</Text>
              ) : (
                <Section style={styles.listCard}>
                  <Text style={styles.listLabel}>Products selected</Text>
                  {products.map(product => (
                    <Text key={product} style={styles.bullet}>
                      • {product}
                    </Text>
                  ))}
                </Section>
              )}

              <Section style={styles.listCard}>
                <Text style={styles.listLabel}>You&apos;ll receive</Text>
                <Text style={styles.bullet}>• Early access invitations</Text>
                <Text style={styles.bullet}>• Roadmap updates</Text>
                <Text style={styles.bullet}>• Launch pricing details</Text>
              </Section>

              <Text style={styles.paragraph}>
                We build in public — expect transparent progress updates.
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
