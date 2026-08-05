import { readFile } from 'node:fs/promises'

import { validateMailerLiteSource } from './secret-source-policy.mjs'

const targetPath = 'src/app/api/mailerlite/subscribe/route.ts'
const source = await readFile(targetPath, 'utf8')
const errors = validateMailerLiteSource(source)

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`Secret source policy failed: ${error}`)
  }
  process.exit(1)
}

console.log('Secret source policy passed for MailerLite configuration.')
