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

const styles = {
  body: {
    backgroundColor: '#f8fafc',
    color: '#0b1220',
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
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#eff6ff',
    borderBottom: '1px solid #dbeafe',
    padding: '18px 24px',
  },
  headerKicker: {
    color: '#1d4ed8',
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '0 0 6px',
    textTransform: 'uppercase' as const,
  },
  headerTitle: {
    color: '#0b1220',
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '1.2',
    margin: 0,
  },
  section: {
    padding: '20px 24px',
  },
  label: {
    color: '#64748b',
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '0 0 6px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: '#0b1220',
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 14px',
  },
  footer: {
    borderTop: '1px solid #e2e8f0',
    color: '#64748b',
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
