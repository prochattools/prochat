import { redirect } from 'next/navigation'

export interface Params {
  slug?: string[]
}

export default function LearnPage({ params }: { params: Params }) {
  // Redirect all /docs/learn/* paths to /docs
  redirect('/docs')
}
