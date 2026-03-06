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

interface WaitlistAdminNotificationEmailProps {
  email: string
  name?: string
  role?: string
  timestampIso: string
  productName: string
  audienceTag: string
}

const EMAIL_COLORS = {
  background: 'rgb(248 250 252)',
  textPrimary: 'rgb(11 18 32)',
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
  label: {
    color: EMAIL_COLORS.textMuted,
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '0 0 6px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: EMAIL_COLORS.textPrimary,
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 14px',
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

const Field = ({ label, value }: { label: string; value: string }) => (
  <Section>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </Section>
)

const WaitlistAdminNotificationEmail: React.FC<Readonly<WaitlistAdminNotificationEmailProps>> = ({
  email,
  name,
  role,
  timestampIso,
  productName,
  audienceTag,
}) => (
  <Html>
    <Head />
    <Preview>New {productName} waitlist signup</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.card}>
          <Section style={styles.header}>
            <Text style={styles.headerKicker}>ProChat Waitlist Intake</Text>
            <Text style={styles.headerTitle}>New {productName} waitlist signup</Text>
          </Section>

          <Section style={styles.section}>
            <Field label="List Tag" value={audienceTag} />
            <Field label="Email" value={email} />
            <Field label="Name" value={name || 'Not provided'} />
            <Field label="Role" value={role || 'Not provided'} />
            <Field label="Timestamp" value={timestampIso} />
          </Section>

          <Text style={styles.footer}>
            Status: WAITLIST_NOTIFICATION_SENT // LIST: {audienceTag.toUpperCase()}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WaitlistAdminNotificationEmail
