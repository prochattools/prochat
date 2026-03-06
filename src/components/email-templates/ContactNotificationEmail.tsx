import React from 'react'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactNotificationEmailProps {
  name: string
  email: string
  topic: string
  companyUrl?: string
  message: string
  timestampIso: string
}

const EMAIL_COLORS = {
  background: 'rgb(248 250 252)',
  textPrimary: 'rgb(11 18 32)',
  textStrong: 'rgb(15 23 42)',
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
    margin: 0,
  },
  messageBox: {
    backgroundColor: EMAIL_COLORS.background,
    border: EMAIL_BORDERS.soft,
    borderRadius: '12px',
    color: EMAIL_COLORS.textStrong,
    fontSize: '15px',
    lineHeight: '1.65',
    margin: '0',
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

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Section style={{ marginBottom: '16px' }}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </Section>
)

const ContactNotificationEmail: React.FC<Readonly<ContactNotificationEmailProps>> = ({
  name,
  email,
  topic,
  companyUrl,
  message,
  timestampIso,
}) => (
  <Html>
    <Head />
    <Preview>New contact message: {topic}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.card}>
          <Section style={styles.header}>
            <Text style={styles.headerKicker}>ProChat Contact Intake</Text>
            <Text style={styles.headerTitle}>New message received</Text>
          </Section>

          <Section style={styles.section}>
            <DetailRow label="Topic" value={topic} />
            <DetailRow label="Name" value={name} />
            <DetailRow label="Email" value={<Link href={`mailto:${email}`}>{email}</Link>} />
            <DetailRow
              label="Company / Project URL"
              value={companyUrl ? <Link href={companyUrl}>{companyUrl}</Link> : 'Not provided'}
            />
            <DetailRow label="Timestamp" value={timestampIso} />

            <Hr style={{ borderColor: 'rgb(226 232 240)', margin: '4px 0 16px' }} />

            <Text style={styles.label}>Message</Text>
            <Text style={styles.messageBox}>{message}</Text>
          </Section>

          <Text style={styles.footer}>Status: CONTACT_NOTIFICATION_SENT</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ContactNotificationEmail
