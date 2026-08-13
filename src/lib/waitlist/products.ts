export const WAITLIST_PRODUCT_OPTIONS = [
  { value: 'memory-qa', label: 'Memory for QA beta' },
  { value: 'workbench', label: 'Workbench prerelease' },
] as const

export type WaitlistProductValue = (typeof WAITLIST_PRODUCT_OPTIONS)[number]['value']

export const WAITLIST_PRODUCT_LABELS: Record<WaitlistProductValue, string> = {
  'memory-qa': 'Memory for QA beta',
  workbench: 'Workbench prerelease',
}

export function formatWaitlistProducts(products: readonly string[]) {
  return products.map(product => {
    const normalized = product.trim().toLowerCase()
    if (normalized in WAITLIST_PRODUCT_LABELS) {
      return WAITLIST_PRODUCT_LABELS[normalized as WaitlistProductValue]
    }
    return product.trim()
  })
}
