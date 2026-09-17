import StructuredData from '@/components/StructuredData'
import { CinematicProductFunnel } from '@/components/funnels/CinematicProductFunnel'
import { getSEOTags } from '@/libs/seo'
import { getMastermindSchema } from '@/libs/structured-data'

export const metadata = getSEOTags({
  title: 'Mastermind — Turn Vague Intentions Into Controlled Execution',
  description:
    'Mastermind reasons across authorized project context, turns ambiguity into executable plans, delegates bounded work, and validates completion while you stay in control.',
  canonicalUrlRelative: '/mastermind',
})

export default function MastermindPage() {
  return (
    <>
      <StructuredData id="schema-mastermind" data={getMastermindSchema()} />
      <CinematicProductFunnel kind="mastermind" />
    </>
  )
}
