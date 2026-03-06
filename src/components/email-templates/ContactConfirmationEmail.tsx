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

interface ContactConfirmationEmailProps {
  name: string
  topic: string
  message: string
}

const EMAIL_COLORS = {
  background: 'rgb(248 250 252)',
  textPrimary: 'rgb(11 18 32)',
  textStrong: 'rgb(15 23 42)',
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
  messageBox: {
    backgroundColor: EMAIL_COLORS.background,
    border: EMAIL_BORDERS.soft,
    borderRadius: '12px',
    color: EMAIL_COLORS.textStrong,
    fontSize: '15px',
    lineHeight: '1.65',
    margin: 0,
    padding: '14px 16px',
    whiteSpace: 'pre-wrap' as const,
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

const ContactConfirmationEmail: React.FC<Readonly<ContactConfirmationEmailProps>> = ({
  name,
  topic,
  message,
}) => (
  <Html>
    <Head />
    <Preview>We received your message</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.card}>
          <Section style={styles.header}>
            <Text style={styles.headerKicker}>ProChat Contact</Text>
            <Text style={styles.headerTitle}>We received your message</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.paragraph}>Hi {name},</Text>
            <Text style={styles.paragraph}>
              Thanks for contacting ProChat. We have your message and will reply
              by email as soon as possible.
            </Text>
            <Text style={styles.paragraph}>
              <strong>Topic:</strong> {topic}
            </Text>

            <Text style={styles.label}>Your message</Text>
            <Text style={styles.messageBox}>{message}</Text>

            <Text style={{ ...styles.paragraph, marginTop: '18px' }}>
              Next step: we review this and respond with clear, practical
              guidance. No jargon. No spam.
            </Text>
          </Section>

          <Text style={styles.footer}>Status: MESSAGE_RECEIVED // SYSTEM: OPERATIONAL</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ContactConfirmationEmail
