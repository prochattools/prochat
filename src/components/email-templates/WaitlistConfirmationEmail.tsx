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

interface WaitlistConfirmationEmailProps {
  email: string
  name?: string
  role?: string
  productName: string
  audienceTag: string
}

const EMAIL_COLORS = {
  background: 'rgb(248 250 252)',
  textPrimary: 'rgb(11 18 32)',
  textBody: 'rgb(51 65 85)',
  textMuted: 'rgb(100 116 139)',
  surface: 'rgb(255 255 255)',
  headerSurface: 'rgb(239 246 255)',
  headerAccent: 'rgb(29 78 216)',
} as const

const EMAIL_BORDERS = {
  soft: '1px solid rgb(226 232 240)',
  header: '1px solid rgb(219 234 254)',
} as const

const styles = {
  body: {
    backgroundColor: EMAIL_COLORS.background,
    color: EMAIL_COLORS.textPrimary,
    fontFamily: 'Host Grotesk, Golos Text, -apple-system, Segoe UI, Arial, sans-serif',
    margin: 0,
    padding: '24px 12px',
  },
  container: {
    margin: '0 auto',
    maxWidth: '640px',
    width: '100%',
  },
  card: {
    backgroundColor: EMAIL_COLORS.surface,
    border: EMAIL_BORDERS.soft,
    borderRadius: '16px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: EMAIL_COLORS.headerSurface,
    borderBottom: EMAIL_BORDERS.header,
    padding: '18px 24px',
  },
  headerKicker: {
    color: EMAIL_COLORS.headerAccent,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '0 0 6px',
    textTransform: 'uppercase' as const,
  },
  headerTitle: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '1.2',
    margin: 0,
  },
  section: {
    padding: '20px 24px',
  },
  paragraph: {
    color: EMAIL_COLORS.textBody,
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 14px',
  },
  label: {
    color: EMAIL_COLORS.textMuted,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '20px 0 6px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 8px',
  },
  footer: {
    borderTop: EMAIL_BORDERS.soft,
    color: EMAIL_COLORS.textMuted,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.06em',
    margin: 0,
    padding: '16px 24px',
    textTransform: 'uppercase' as const,
  },
} as const

const WaitlistConfirmationEmail: React.FC<Readonly<WaitlistConfirmationEmailProps>> = ({
  email,
  name,
  role,
  productName,
  audienceTag,
}) => (
  <Html>
    <Head />
    <Preview>You're on the {productName} waitlist</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.card}>
          <Section style={styles.header}>
            <Text style={styles.headerKicker}>ProChat Waitlist</Text>
            <Text style={styles.headerTitle}>You're on the {productName} waitlist</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.paragraph}>
              {name ? `Hi ${name},` : 'Hi,'}
            </Text>
            <Text style={styles.paragraph}>
              Thanks for joining the {productName} waitlist. We will send early
              access updates, launch timing, and release notes as soon as they
              are available.
            </Text>

            {role ? (
              <>
                <Text style={styles.label}>Role</Text>
                <Text style={styles.value}>{role}</Text>
              </>
            ) : null}

            <Text style={styles.label}>Subscribed email</Text>
            <Text style={styles.value}>{email}</Text>

            <Text style={styles.paragraph}>
              No spam. You can unsubscribe anytime.
            </Text>
          </Section>

          <Text style={styles.footer}>
            Status: WAITLIST_CONFIRMED // LIST: {audienceTag.toUpperCase()}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WaitlistConfirmationEmail
