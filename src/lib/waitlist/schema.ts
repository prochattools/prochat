import { z } from 'zod'

const optionalName = z
  .union([z.string().trim().min(2, 'Name is too short.').max(120, 'Name is too long.'), z.literal('')])
  .optional()
  .transform(value => (value ? value : undefined))

const optionalRole = z
  .union([z.string().trim().max(120, 'Role is too long.'), z.literal('')])
  .optional()
  .transform(value => (value ? value : undefined))

const waitlistSubmissionInputSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(320, 'Email is too long.'),
  name: optionalName,
  role: optionalRole,
  company_website: z.string().optional().default(''),
  honeypot: z.string().optional().default(''),
})

export const waitlistSubmissionSchema = waitlistSubmissionInputSchema.transform(
  ({ company_website, honeypot, ...rest }) => ({
    ...rest,
    honeypot: honeypot || company_website || '',
  }),
)

export type WaitlistSubmissionInput = z.input<typeof waitlistSubmissionSchema>
export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>
