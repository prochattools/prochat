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
  messageBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    color: '#0f172a',
    fontSize: '15px',
    lineHeight: '1.65',
    margin: 0,
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
