const APPROVED_MAILERLITE_ENVIRONMENT_VARIABLES = new Set([
  'MAILERLITE_API_BASE_URL',
  'MAILERLITE_API_KEY',
  'MAILERLITE_GROUP_ID',
])

export function validateMailerLiteSource(source) {
  const errors = []

  if (!source.includes('process.env.MAILERLITE_API_KEY')) {
    errors.push('MailerLite API credential must come from MAILERLITE_API_KEY')
  }

  if (!source.includes('const GROUP_ID = process.env.MAILERLITE_GROUP_ID')) {
    errors.push('MailerLite group identifier must come from MAILERLITE_GROUP_ID')
  }

  if (/\b(?:const|let|var)\s+API_KEY\s*=/.test(source)) {
    errors.push('Do not assign the MailerLite API credential to an API_KEY local')
  }

  if (/(?<!!)process\.env\.MAILERLITE_API_KEY\s*(?:\|\||\?\?)/.test(source)) {
    errors.push('Do not use a fallback for MAILERLITE_API_KEY')
  }

  if (/(?<!!)process\.env\.MAILERLITE_GROUP_ID\s*(?:\|\||\?\?)/.test(source)) {
    errors.push('Do not use a fallback for MAILERLITE_GROUP_ID')
  }

  if (/\b(?:const|let|var)\s+GROUP_ID\s*=\s*['"`]/.test(source)) {
    errors.push('Do not assign a literal MailerLite group identifier')
  }

  if (/\b(?:const|let|var)\s+[A-Z0-9_]*(?:KEY|TOKEN|SECRET)\s*=\s*['"`]/.test(source)) {
    errors.push('Do not assign literal secret material in the MailerLite handler')
  }

  const environmentVariables = [
    ...source.matchAll(/process\.env\.(MAILERLITE[A-Z0-9_]*)/g),
  ].map(match => match[1])

  for (const variableName of environmentVariables) {
    if (!APPROVED_MAILERLITE_ENVIRONMENT_VARIABLES.has(variableName)) {
      errors.push(`Unsupported MailerLite environment variable: ${variableName}`)
    }
  }

  return [...new Set(errors)]
}
