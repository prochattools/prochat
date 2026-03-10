import { template as apiTemplate } from './api.ts'
import { template as boilerplateTemplate } from './boilerplate.ts'
import type { TemplateDefinition } from './types.ts'
import { template as platformTemplate } from './platform.ts'

export const templates: Record<string, TemplateDefinition> = {
  boilerplate: boilerplateTemplate,
  platform: platformTemplate,
  api: apiTemplate,
}

export const DEFAULT_TEMPLATE = boilerplateTemplate
