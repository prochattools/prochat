export const WAITLIST_PRODUCT_OPTIONS = [
  { value: 'uxkit', label: 'UXKit' },
  { value: 'waaskit', label: 'WaaSKit' },
  { value: 'prochat-os', label: 'ProChat OS' },
] as const

export type WaitlistProductValue = (typeof WAITLIST_PRODUCT_OPTIONS)[number]['value']

export const WAITLIST_PRODUCT_LABELS: Record<WaitlistProductValue, string> = {
  uxkit: 'UXKit',
  waaskit: 'WaaSKit',
  'prochat-os': 'ProChat OS',
}

export function formatWaitlistProducts(products: WaitlistProductValue[]) {
  return products.map(product => WAITLIST_PRODUCT_LABELS[product])
}
