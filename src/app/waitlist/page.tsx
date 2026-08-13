import { redirect } from 'next/navigation'

export default function WaitlistPage() {
  redirect('/contact?topic=memory-qa-beta#contact-form-card')
}
