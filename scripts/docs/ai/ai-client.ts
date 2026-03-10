export type Metadata = {
  title: string
  description: string
  category: string
  slug: string
  keywords: string[]
}

export type SectionRequest = {
  docId: string
  section: string
  heading: string
  templateId: string
  existingSections: Array<{ name: string; content: string }>
}

export async function generateSectionContent(metadata: Metadata, request: SectionRequest) {
  if (process.env.OPENAI_API_KEY) {
    try {
      const existing = request.existingSections
        .map(section => `Section ${section.name}:\n${section.content}`)
        .filter(Boolean)
        .join('\n\n')
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a documentation assistant that writes structured MDX sections.',
            },
            {
              role: 'user',
              content: `Generate only the ${request.heading} section for ${metadata.category}.${metadata.slug} (docId: ${request.docId}), using context from existing sections:\n\n${existing}`,
            },
          ],
          temperature: 0.2,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI ${response.status} ${response.statusText}`)
      }

      const payload = await response.json()
      const text = payload?.choices?.[0]?.message?.content
      if (typeof text === 'string' && text.trim()) {
        return text.trim()
      }
    } catch (error) {
      console.warn('OpenAI API failed, falling back to template:', (error as Error).message)
    }
  }

  return fallbackSection(metadata, request)
}

function fallbackSection(metadata: Metadata, request: SectionRequest) {
  const keywords = metadata.keywords.join(', ')
  const heading = request.heading || capitalize(request.section)
  switch (request.section) {
    case 'installation':
      return `## ${heading}\n- Step 1: Install dependencies\n- Step 2: Configure ${metadata.slug}\n- Step 3: Validate the ${metadata.category} environment`
    case 'usage':
      return `## ${heading}\nDescribe how to use ${metadata.slug} within ${metadata.category}, including any common workflows or edge cases.`
    case 'examples':
      return `## ${heading}\n\`\`\`bash\n# Example usage for ${metadata.slug}\n\`\`\``
    case 'api':
      return `## ${heading}\nList any exposed schema, props, or API endpoints with short descriptions.`
    default:
      return `## ${heading}\n${metadata.description}\n\nKeywords: ${keywords}`
  }
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
