import React from 'react';
import { Html, Head, Body, Container, Section, Text, Link, Preview } from '@react-email/components';

interface EmailTemplateProps {
  email: string;
}

const EMAIL_COLORS = {
  background: 'rgb(243 244 246)',
  surface: 'rgb(255 255 255)',
  accent: 'rgb(59 130 246)',
  textBody: 'rgb(55 65 81)',
  textOnAccent: 'rgb(255 255 255)',
} as const;

const styles = {
  body: {
    backgroundColor: EMAIL_COLORS.background,
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
  },
  section: {
    backgroundColor: EMAIL_COLORS.surface,
    borderRadius: '5px',
    padding: '40px',
  },
  h1: {
    color: EMAIL_COLORS.accent,
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 20px',
  },
  text: {
    color: EMAIL_COLORS.textBody,
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center' as const,
  },
  button: {
    backgroundColor: EMAIL_COLORS.accent,
    borderRadius: '5px',
    color: EMAIL_COLORS.textOnAccent,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '12px 24px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    marginTop: '32px',
  },
};

const ThankYouTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <Html>
    <Head />
    <Preview>Welcome to our community!</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.section}>
          <Text style={styles.h1}>Welcome aboard!</Text>
          <Text style={styles.text}>
            We&apos;re thrilled to have you join us, {email}!
          </Text>
          <Text style={styles.text}>
            Get ready for an amazing journey. We can&apos;t wait to see what you&apos;ll achieve with us.
          </Text>
          <Section style={{ textAlign: 'center' }}>
            <Link
              href="http://localhost:3056/dashboard"
              style={styles.button}
            >
              Get Started
            </Link>
          </Section>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ThankYouTemplate;
