export type SectionName = 'overview' | 'installation' | 'usage' | 'examples' | 'api'

export type TemplateSection = {
  name: SectionName
  heading: string
  description?: string
}

export type TemplateDefinition = {
  id: string
  sections: TemplateSection[]
}
