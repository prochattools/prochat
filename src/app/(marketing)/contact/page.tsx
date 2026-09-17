import ContactPageClient, { type ContactInitialTopic } from './ContactPageClient'

type ContactPageProps = {
  searchParams: Promise<{
    topic?: string | string[]
  }>
}

function resolveInitialTopic(topic: string | string[] | undefined): ContactInitialTopic {
  const value = Array.isArray(topic) ? topic[0] : topic

  if (value === 'nevermind') return 'Nevermind'
  if (value === 'mastermind' || value === 'workbench') return 'Mastermind'
  return 'Evermind'
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { topic } = await searchParams

  return <ContactPageClient initialTopic={resolveInitialTopic(topic)} />
}
