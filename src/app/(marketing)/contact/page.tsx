import ContactPageClient, { type ContactInitialTopic } from './ContactPageClient'

type ContactPageProps = {
  searchParams: Promise<{
    topic?: string | string[]
  }>
}

function resolveInitialTopic(topic: string | string[] | undefined): ContactInitialTopic {
  const value = Array.isArray(topic) ? topic[0] : topic

  if (value === 'memory-qa' || value === 'memory-qa-beta') {
    return 'ProChat Memory for QA beta'
  }

  if (value === 'workbench') {
    return 'ProChat Workbench'
  }

  return 'ProChat Memory'
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { topic } = await searchParams

  return <ContactPageClient initialTopic={resolveInitialTopic(topic)} />
}
