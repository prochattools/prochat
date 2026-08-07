import { redirect } from 'next/navigation'

// PXF-018D: Item 10 — CONSOLIDATE /starting-point → /workbench
// Approved 2026-08-07: consolidate onboarding entry point to unified workbench
// Legacy /starting-point/SaaS framework content merged into workbench flow
export default function StartingPointPage() {
  redirect('/workbench')
}
