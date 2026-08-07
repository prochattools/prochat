import { redirect } from 'next/navigation'

// PXF-018A: Item 2 — REDIRECT /book → /contact
// Approved 2026-08-07: consolidate booking entry point to contact page
// Legacy /book content merged into contact flow
export default function BookPage() {
  redirect('/contact')
}
