import { z } from 'zod'

export const CONTACT_TOPICS = [
  'ProChat Memory',
  'ProChat Memory for QA beta',
  'ProChat Workbench',
  'SaaSKit Technical Support',
  'Billing / License',
  'Studio Work / Custom Project',
  'Partnership / Media',
  'Privacy / Terms',
  'General Question',
] as const

const optionalUrl = z
  .union([z.string().trim().url('Enter a valid URL (include https://)'), z.literal('')])
  .optional()
  .transform(value => (value ? value : undefined))

const contactSubmissionInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(120, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(320, 'Email is too long.'),
  topic: z.enum(CONTACT_TOPICS, {
    message: 'Please select a topic.',
  }),
  companyUrl: optionalUrl,
  companyOrProjectUrl: optionalUrl,
  message: z
    .string()
    .trim()
    .min(20, 'Please add a bit more detail (min 20 characters).')
    .max(4000, 'Message is too long.'),
  honeypot: z.string().optional().default(''),
})

export const contactSubmissionSchema = contactSubmissionInputSchema.transform(
  ({ companyOrProjectUrl, companyUrl, ...rest }) => {
    const normalizedCompanyUrl = companyUrl || companyOrProjectUrl
    return {
      ...rest,
      companyUrl: normalizedCompanyUrl,
      companyOrProjectUrl: normalizedCompanyUrl,
    }
  },
)

export type ContactSubmissionInput = z.input<typeof contactSubmissionSchema>
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>
