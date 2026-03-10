import type { TemplateDefinition } from './types'

export const template: TemplateDefinition = {
  id: 'platform',
  sections: [
    { name: 'overview', heading: 'Overview' },
    { name: 'installation', heading: 'Installation' },
    { name: 'usage', heading: 'Usage' },
    { name: 'api', heading: 'API Reference' },
    { name: 'examples', heading: 'Examples' },
  ],
}
