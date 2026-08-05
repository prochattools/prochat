import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { validateMailerLiteSource } from './secret-source-policy.mjs'

const validSource = `
const GROUP_ID = process.env.MAILERLITE_GROUP_ID
if (!process.env.MAILERLITE_API_KEY || !GROUP_ID) throw new Error('missing')
const header = \`Bearer \${process.env.MAILERLITE_API_KEY}\`
`

describe('validateMailerLiteSource', () => {
  it('accepts approved environment-only configuration', () => {
    assert.deepEqual(validateMailerLiteSource(validSource), [])
  })

  it('rejects a literal API credential assignment', () => {
    const errors = validateMailerLiteSource(
      `${validSource}\nconst SERVICE_API_KEY = 'literal-value'`,
    )
    assert(errors.some(error => error.includes('literal secret material')))
  })

  it('rejects a literal group identifier', () => {
    const errors = validateMailerLiteSource(
      `${validSource}\nconst GROUP_ID = 'literal-group'`,
    )
    assert(errors.some(error => error.includes('literal MailerLite group')))
  })

  it('rejects the ambiguous MAILERLITE fallback', () => {
    const errors = validateMailerLiteSource(
      `${validSource}\nconst legacy = process.env.MAILERLITE`,
    )
    assert(errors.some(error => error.includes('Unsupported MailerLite')))
  })

  it('rejects an API-key literal fallback', () => {
    const errors = validateMailerLiteSource(
      `${validSource}\nconst header = process.env.MAILERLITE_API_KEY || 'fallback'`,
    )
    assert(errors.some(error => error.includes('fallback for MAILERLITE_API_KEY')))
  })

  it('rejects a group-ID literal fallback', () => {
    const errors = validateMailerLiteSource(
      `${validSource}\nconst group = process.env.MAILERLITE_GROUP_ID ?? 'fallback'`,
    )
    assert(errors.some(error => error.includes('fallback for MAILERLITE_GROUP_ID')))
  })

  it('rejects a missing API-key environment read', () => {
    const errors = validateMailerLiteSource(
      'const GROUP_ID = process.env.MAILERLITE_GROUP_ID',
    )
    assert(errors.some(error => error.includes('MAILERLITE_API_KEY')))
  })
})
