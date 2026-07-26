import StructuredData from '@/components/StructuredData'
import { getSEOTags } from '@/libs/seo'
import { getWorkbenchSchema } from '@/libs/structured-data'

import {
  ProductBoundaryList,
  ProductCard,
  ProductCardGrid,
  ProductFlow,
  ProductPageAction,
  ProductSection,
  PublicProductPage,
} from '../components/product-pages/PublicProductPage'
import { WorkbenchRunVisual } from '../components/product-pages/ProductVisuals'

const workbenchRepository = 'https://github.com/prochattools/workbench'

export const metadata = getSEOTags({
  title: 'ProChat Workbench | Build Apps Through ChatGPT Locally',
  description:
    'ProChat Workbench connects ChatGPT reasoning to exact local project context through bounded reads, guarded changes, confirmation, validation, and explicit Git boundaries.',
  openGraph: {
    title: 'ProChat Workbench | Build Apps Through ChatGPT Locally',
    description:
      'Work with a real local project through exact context, guarded changes, targeted validation, and explicit Git actions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProChat Workbench | Build Apps Through ChatGPT Locally',
    description:
      'A controlled local workbench for bounded project context, guarded file changes, validation, and explicit Git boundaries.',
  },
  socialImage: {
    line1: 'ProChat Workbench',
    line2: 'Guarded local project work',
    subtitle: 'Bounded context. Explicit changes. Visible validation and Git boundaries.',
  },
  canonicalUrlRelative: '/workbench',
})

const guardedFlow = [
  {
    label: 'Admit exact local context',
    description:
      'The run begins with an identified project and bounded source material rather than broad access to every local file.',
  },
  {
    label: 'Confirm guarded changes',
    description:
      'Requested edits remain scoped, inspectable, and subject to explicit confirmation when the action requires it.',
  },
  {
    label: 'Validate before Git action',
    description:
      'Targeted checks establish what changed and whether it works. Staging, committing, and pushing remain separate explicit decisions.',
  },
] as const

const workbenchBoundaries = [
  'Workbench does not silently grant ChatGPT broad access to the computer.',
  'A requested change does not authorize unrelated reads or edits.',
  'Validation results must remain distinguishable from assumptions or model confidence.',
  'No workflow should broadly stage, commit, or push without an explicit action.',
  'Persistent run-state availability varies by workflow and is not claimed as universal.',
  'Workbench is free and self-hosted under AGPL-3.0-only; commercial availability remains separate from the public repository path.',
] as const

export default function WorkbenchPage() {
  return (
    <>
      <StructuredData id="schema-workbench" data={getWorkbenchSchema()} />
      <PublicProductPage
      activeRoute="/workbench"
      eyebrow="ProChat Workbench / second product"
      title="Build apps through ChatGPT locally."
      description="Bring exact project context into a guarded local workflow where reads stay bounded, file changes remain explicit, validation is visible, and Git actions keep their own boundary."
      primaryAction={{
        href: workbenchRepository,
        label: 'View Workbench repository',
        external: true,
      }}
      secondaryAction={{ href: '#guarded-workflow', label: 'See the guarded workflow' }}
      principles={[
        'Exact context',
        'Bounded reads',
        'Guarded changes',
        'Explicit Git actions',
      ]}
      visual={<WorkbenchRunVisual />}
    >
      <ProductSection
        id="guarded-workflow"
        eyebrow="Guarded local workflow"
        title="Reasoning can move quickly without silently widening scope."
        description="Workbench separates project admission, local context, requested change, validation, and Git action so each boundary remains understandable."
      >
        <ProductFlow items={guardedFlow} />
      </ProductSection>

      <ProductSection
        eyebrow="Control surface"
        title="Every consequential step keeps a visible boundary."
        description="The product experience should make scope, confirmation, validation, and repository state easier to inspect than a free-form agent transcript."
        tone="muted"
      >
        <ProductCardGrid columns={4}>
          <ProductCard index="01" title="Source isolation">
            <p>
              A run belongs to an admitted project and does not treat the rest
              of the computer as available context.
            </p>
          </ProductCard>
          <ProductCard index="02" title="Bounded reads">
            <p>
              Context gathering follows the request and declared scope instead
              of exploring unrelated files by default.
            </p>
          </ProductCard>
          <ProductCard index="03" title="Guarded changes">
            <p>
              File mutations remain attributable to the requested work, with
              explicit confirmation where the operation requires it.
            </p>
          </ProductCard>
          <ProductCard index="04" title="Targeted validation">
            <p>
              Checks correspond to the changed behavior and report failure
              separately from completion.
            </p>
          </ProductCard>
        </ProductCardGrid>
      </ProductSection>

      <ProductSection
        eyebrow="Run continuity"
        title="Keep execution state visible without turning continuation into permission."
        description="A persistent run should preserve its declared objective, admitted source, completed checks, current file state, and next required confirmation."
      >
        <ProductCardGrid columns={3}>
          <ProductCard index="01 / SCOPE" title="The objective stays bounded">
            <p>
              Continuation should resume the same declared work rather than
              silently expanding the task or source boundary.
            </p>
          </ProductCard>
          <ProductCard index="02 / STATE" title="Evidence survives the handoff">
            <p>
              Completed reads, changes, validation, and blockers remain visible
              so the next step does not rely on reconstructed confidence.
            </p>
          </ProductCard>
          <ProductCard index="03 / GIT" title="Repository actions stay separate">
            <p>
              Unstaged work, explicit staging, commit, and push remain distinct
              states even when a run continues over time.
            </p>
          </ProductCard>
        </ProductCardGrid>
        <ProductBoundaryList
          title="Current availability boundaries"
          items={workbenchBoundaries}
        />
      </ProductSection>

      <ProductPageAction
        eyebrow="Release-safe next step"
        title="Understand the boundaries before choosing a workflow."
        description="Workbench can be viewed, cloned, and self-hosted from the public AGPL repository. Contribution proposals still require the contributor-rights boundary."
        primaryAction={{
          href: `${workbenchRepository}/blob/main/README.md`,
          label: 'Read the Workbench README',
          external: true,
        }}
        secondaryAction={{
          href: `${workbenchRepository}/blob/main/CONTRIBUTING.md`,
          label: 'Review contribution boundary',
          external: true,
        }}
      />
      </PublicProductPage>
    </>
  )
}
