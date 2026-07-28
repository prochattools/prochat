import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getMemoryQaSchema } from '@/libs/structured-data'

import { QAMemoryComposition } from '../components/illustrations/compositions'
import {
  ProductBoundaryList,
  ProductCard,
  ProductCardGrid,
  ProductFlow,
  ProductPageAction,
  ProductSection,
  PublicProductPage,
} from '../components/product-pages/PublicProductPage'

const memoryQaRepository = 'https://github.com/prochattools/memory-qa'

export const metadata = getSEOTags({
  title: 'ProChat Memory for QA | Stop Solving the Same Failure Twice',
  description:
    'ProChat Memory for QA helps testers preserve reviewed lessons from failed tests, flaky behavior, selectors, environments, test data, and release decisions.',
  openGraph: {
    title: 'ProChat Memory for QA | Stop Solving the Same Failure Twice',
    description:
      'Keep QA evidence, investigations, corrections, and reviewed lessons available for the next related failure.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProChat Memory for QA | Stop Solving the Same Failure Twice',
    description:
      'A QA-specific edition of ProChat Memory for evidence-led, human-reviewed testing lessons.',
  },
  socialImage: {
    line1: 'Memory for QA',
    line2: 'Reviewed testing lessons',
    subtitle: 'Preserve evidence, corrections, and context for the next related failure.',
  },
  canonicalUrlRelative: '/memory-qa',
})

const qaWorkflow = [
  {
    label: 'Gather current failure evidence',
    description:
      'Start with the failing test, logs, screenshots, selector behavior, environment, test data, and release context.',
  },
  {
    label: 'Compare and draft a scoped lesson',
    description:
      'Relevant reviewed QA memory can inform the investigation, but the current evidence remains authoritative.',
  },
  {
    label: 'Tester reviews what survives',
    description:
      'A tester edits, approves, rejects, corrects, or retires the proposed lesson before future work can trust it.',
  },
] as const

const qaBoundaries = [
  'Memory for QA is not a testing framework or autonomous test operator.',
  'A stored lesson cannot replace current logs, screenshots, environment details, or tester judgment.',
  'Selectors, environments, data, and product behavior can change; stale memory must remain correctable.',
  'Client- or project-specific lessons require appropriate scope and sanitization.',
  'The repository is public source-available, while clone, local evaluation, and use remain limited to approved beta participants.',
  'The page does not promise universal tool compatibility or broad commercial availability.',
] as const

export default function MemoryQAPage() {
  return (
    <>
      <StructuredData id="schema-memory-qa" data={getMemoryQaSchema()} />
      <PublicProductPage
      activeRoute="/memory-qa"
      eyebrow="ProChat Memory / QA edition"
      title="Stop solving the same QA failure twice."
      description="Preserve the evidence, investigation, correction, and reviewed lesson from a failure so the next related test starts with project context instead of another blank page."
      primaryAction={{
        href: '/contact?topic=memory-qa-beta#contact-form-card',
        label: 'Apply for the selected beta',
        cta: 'apply_selected_beta',
      }}
      secondaryAction={{
        href: memoryQaRepository,
        label: 'View source-available repository',
        cta: 'view_repository',
        external: true,
      }}
      principles={[
        'Current evidence first',
        'Tester-reviewed',
        'Stale memory visible',
        'Project-scoped',
      ]}
      visual={
        <QAMemoryComposition
          motion="reveal"
          className="pm-product-hero-illustration"
        />
      }
    >
      <ProductSection
        eyebrow="Repeated investigation"
        title="The same failure often arrives with a different surface."
        description="A changed selector, flaky timing, environment mismatch, test-data rule, or release decision can recreate an investigation whose useful lesson already existed."
      >
        <ProductCardGrid columns={3}>
          <ProductCard index="01 / FAILURE" title="Evidence is scattered">
            <ul>
              <li>Failed tests and stack traces</li>
              <li>Screenshots, videos, and browser logs</li>
              <li>CI, environment, and release context</li>
            </ul>
          </ProductCard>
          <ProductCard index="02 / PATTERN" title="Causes repeat unevenly">
            <ul>
              <li>Flaky timing and asynchronous behavior</li>
              <li>Selector instability and product changes</li>
              <li>Test-data, account, and permission rules</li>
            </ul>
          </ProductCard>
          <ProductCard index="03 / HISTORY" title="Old conclusions can become stale">
            <ul>
              <li>Previous fixes may no longer apply</li>
              <li>Environment assumptions can change</li>
              <li>Release decisions need visible revision history</li>
            </ul>
          </ProductCard>
        </ProductCardGrid>
      </ProductSection>

      <ProductSection
        id="qa-workflow"
        eyebrow="QA memory workflow"
        title="Investigate with current evidence. Preserve only reviewed lessons."
        description="Memory supports triage by returning relevant project context, not by declaring a past answer automatically correct."
        tone="muted"
      >
        <ProductFlow items={qaWorkflow} />
      </ProductSection>

      <ProductSection
        eyebrow="Selected beta fit"
        title="Bring one repeated QA workflow that can be reviewed honestly."
        description="A strong evaluation starts with a concrete investigation pattern and a team willing to inspect, correct, and scope the resulting memory under the applicable beta terms."
        tone="muted"
      >
        <ProductCardGrid columns={2}>
          <ProductCard index="01 / FIT" title="A useful beta candidate">
            <ul>
              <li>Investigates repeated or closely related QA failures</li>
              <li>Can provide one concrete evaluation workflow</li>
              <li>Can review, correct, or reject generated memory</li>
              <li>Accepts the repository&apos;s applicable beta terms</li>
            </ul>
          </ProductCard>
          <ProductCard index="02 / APPLICATION" title="What to include">
            <ul>
              <li>The repeated failure class you want to evaluate</li>
              <li>Your current investigation workflow</li>
              <li>Evidence or context that is commonly lost</li>
              <li>The outcome that would make the evaluation useful</li>
            </ul>
          </ProductCard>
        </ProductCardGrid>
        <ProductFlow
          items={[
            {
              label: 'Capture one completed investigation',
              description: 'Keep the current evidence, conclusion, and relevant project context together as the first candidate lesson.',
            },
            {
              label: 'Review the candidate lesson',
              description: 'Approve, edit, reject, or narrow it before future work can rely on it.',
            },
            {
              label: 'Test reuse on a related failure',
              description: 'Check whether the reviewed lesson helps a new investigation without overriding current evidence.',
            },
            {
              label: 'Record corrections',
              description: 'Update or retire the lesson when the product, environment, or original conclusion changes.',
            },
          ]}
        />
      </ProductSection>

      <ProductSection
        eyebrow="Inspectable QA memory"
        title="Keep the lesson connected to what produced it."
        description="A useful QA record should make its evidence, scope, review state, and correction history understandable to the next tester."
      >
        <ProductCardGrid columns={4}>
          <ProductCard index="01" title="Failure evidence">
            <p>
              Preserve the observable result and the artifacts needed to
              understand it.
            </p>
          </ProductCard>
          <ProductCard index="02" title="Environment and data">
            <p>
              Keep browser, deployment, permissions, accounts, and test data
              close to the conclusion they influenced.
            </p>
          </ProductCard>
          <ProductCard index="03" title="Human review">
            <p>
              Testers decide whether a drafted lesson is accurate, scoped, and
              useful enough for future investigations.
            </p>
          </ProductCard>
          <ProductCard index="04" title="Stale-memory handling">
            <p>
              Correct or retire lessons that conflict with current product
              behavior without erasing their history.
            </p>
          </ProductCard>
        </ProductCardGrid>
        <ProductBoundaryList title="Current product limits" items={qaBoundaries} />
      </ProductSection>

      <ProductPageAction
        activeRoute="/memory-qa"
        eyebrow="Selected QA path"
        title="Use real investigations to test whether the memory helps."
        description="Memory for QA is a public source-available selected beta. Approved participants may clone and evaluate locally under the beta license."
        primaryAction={{
          href: '/contact?topic=memory-qa-beta#contact-form-card',
          label: 'Apply for the selected beta',
          cta: 'apply_selected_beta',
        }}
        secondaryAction={{
          href: `${memoryQaRepository}/issues`,
          label: 'Report sanitized feedback',
          cta: 'report_sanitized_feedback',
          external: true,
        }}
      />
      </PublicProductPage>
    </>
  )
}
