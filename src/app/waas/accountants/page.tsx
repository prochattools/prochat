import { redirect } from 'next/navigation'

// PXF-018E: Item 11 — CONSOLIDATE /waas/accountants → /workbench
// Approved 2026-08-07: consolidate WaaS product variant to unified workbench
// Legacy /waas/accountants bridge page consolidated into workbench
export default function WaaSAccountantsPage() {
  redirect('/workbench')
}
