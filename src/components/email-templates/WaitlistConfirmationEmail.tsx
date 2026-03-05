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
  paragraph: {
    color: '#334155',
    fontSize: '16px',
    lineHeight: '1.7',
    margin: '0 0 14px',
  },
  label: {
    color: '#64748b',
    fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, monospace',
    fontSize: '11px',
    letterSpacing: '0.08em',
    margin: '20px 0 6px',
    textTransform: 'uppercase' as const,
  },
  value: {
    color: '#0b1220',
    fontSize: '15px',
    lineHeight: '1.5',
    margin: '0 0 8px',
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
