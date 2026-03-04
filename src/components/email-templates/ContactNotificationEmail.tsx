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
    margin: 0,
  },
  messageBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    color: '#0f172a',
    fontSize: '15px',
    lineHeight: '1.65',
    margin: '0',
    padding: '14px 16px',
    whiteSpace: 'pre-wrap' as const,
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

            <Hr style={{ borderColor: '#e2e8f0', margin: '4px 0 16px' }} />

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
