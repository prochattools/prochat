import { z } from 'zod'
import {
  WAITLIST_PRODUCT_OPTIONS,
  type WaitlistProductValue,
} from '@/lib/waitlist/products'

const waitlistProductEnum = z.enum(WAITLIST_PRODUCT_OPTIONS.map(option => option.value) as [
  (typeof WAITLIST_PRODUCT_OPTIONS)[number]['value'],
  ...(typeof WAITLIST_PRODUCT_OPTIONS)[number]['value'][],
])

function normalizeProducts(products: readonly string[]): WaitlistProductValue[] {
  return Array.from(
    new Set(products.map(product => product.trim().toLowerCase()).filter(Boolean)),
  ) as WaitlistProductValue[]
}

const waitlistSubmissionInputSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(320, 'Email is too long.'),
  products: z.array(waitlistProductEnum).optional(),
  selectedProducts: z.array(waitlistProductEnum).optional(),
  company_website: z.string().optional().default(''),
  honeypot: z.string().optional().default(''),
}).superRefine((data, ctx) => {
  const selected = normalizeProducts([...(data.products ?? []), ...(data.selectedProducts ?? [])])
  if (selected.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['products'],
      message: 'Select at least one product.',
    })
  }
})

export const waitlistSubmissionSchema = waitlistSubmissionInputSchema.transform(
  ({ company_website, honeypot, products, selectedProducts, ...rest }) => ({
    ...rest,
    products: normalizeProducts([...(products ?? []), ...(selectedProducts ?? [])]),
    honeypot: honeypot || company_website || '',
  }),
)

const waitlistPreferencesInputSchema = z.object({
  token: z.string().trim().min(1, 'Invalid token.'),
  products: z.array(waitlistProductEnum).optional(),
  unsubscribe: z.boolean().optional().default(false),
})

export const waitlistPreferencesSchema = waitlistPreferencesInputSchema.superRefine(
  (data, ctx) => {
    const selected = normalizeProducts(data.products ?? [])
    if (selected.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['products'],
        message: 'Select at least one product.',
      })
    }
  },
).transform(({ products, ...rest }) => ({
  ...rest,
  products: normalizeProducts(products ?? []),
}))

export type WaitlistSubmissionInput = z.input<typeof waitlistSubmissionSchema>
export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>
export type WaitlistPreferencesInput = z.input<typeof waitlistPreferencesSchema>
export type WaitlistPreferences = z.infer<typeof waitlistPreferencesSchema>
