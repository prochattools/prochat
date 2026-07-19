import type { Metadata } from 'next'

import {
  CaptureComposition,
  RetrievalComposition,
  ReviewStructureComposition,
} from '../components/illustrations/compositions'
import {
  ProductBoundaryList,
  ProductCard,
  ProductCardGrid,
  ProductFlow,
  ProductIllustrationCard,
  ProductPageAction,
  ProductSection,
  PublicProductPage,
} from '../components/product-pages/PublicProductPage'

export const metadata: Metadata = {
  title: 'ProChat Memory | Durable, Reviewed Context',
  description:
    'ProChat Memory keeps useful evidence, decisions, corrections, and lessons available as local, reviewable, selectively retrieved context.',
  alternates: { canonical: '/memory' },
  openGraph: {
    title: 'ProChat Memory | Durable, Reviewed Context',
    description:
      'Capture useful work, connect it to evidence, review it, correct it, and retrieve only what matters for the current task.',
    url: '/memory',
    type: 'website',
    images: ['/og'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProChat Memory | Durable, Reviewed Context',
    description:
      'Local, Markdown-first memory shaped by evidence, human review, correction, and selective retrieval.',
    images: ['/og'],
  },
}

const memoryFlow = [
  {
    label: 'Capture useful fragments',
    description:
      'Notes, decisions, conversations, results, and source evidence become inspectable records instead of disappearing across tools.',
  },
  {
    label: 'Review and structure',
    description:
      'Evidence, scope, correction history, and human judgment determine what becomes durable memory.',
  },
  {
    label: 'Retrieve for current intent',
    description:
      'Only the smallest relevant reviewed context returns. Historical patterns remain available without controlling the present.',
  },
] as const

const boundaries = [
  'Captured information is not automatically trusted memory.',
  'Current evidence remains stronger than a stored conclusion.',
  'Historical and superseded records remain visible when their history matters.',
  'A retrieved record supports a human decision; it does not make that decision.',
  'ProChat does not claim that every discipline already has a supported edition.',
  'Repository, installation, licensing, and broad availability remain release-gated.',
] as const

export default function MemoryPage() {
  return (
    <PublicProductPage
      activeRoute="/memory"
      eyebrow="ProChat Memory / flagship"
      title="Keep useful work available as trusted context."
      description="ProChat Memory turns fragmented evidence, decisions, corrections, and lessons into local, reviewable records that can return when the current task needs them."
      primaryAction={{ href: '#memory-model', label: 'Explore the Memory model' }}
      secondaryAction={{ href: '/memory-qa', label: 'See Memory for QA' }}
      principles={[
        'Local files',
        'Markdown-first',
        'Human-reviewed',
        'Selectively retrieved',
      ]}
      visual={
        <ReviewStructureComposition
          motion="reveal"
          className="pm-product-hero-illustration"
        />
      }
    >
      <ProductSection
        id="memory-problem"
        eyebrow="The memory problem"
        title="Useful work creates knowledge before it creates structure."
        description="Decisions live in conversations, evidence is separated from conclusions, and corrections disappear into history. Memory starts by keeping those fragments inspectable."
      >
        <ProductCardGrid columns={3}>
          <ProductCard index="01 / FRAGMENTS" title="Work leaves evidence behind">
            <p>
              Research notes, project decisions, operating lessons, outcomes,
              and corrections already contain reusable context.
            </p>
          </ProductCard>
          <ProductCard index="02 / LOSS" title="Tools divide the story">
            <p>
              The source, reasoning, decision, and later correction often live
              in different places, making the original judgment hard to trust.
            </p>
          </ProductCard>
          <ProductCard index="03 / REUSE" title="The next task starts too early">
            <p>
              Without reviewed memory, people repeat explanations and rebuild
              context even when the work has already produced a useful lesson.
            </p>
          </ProductCard>
        </ProductCardGrid>
      </ProductSection>

      <ProductSection
        id="memory-model"
        eyebrow="Memory model"
        title="Capture, review, and retrieve without hiding the history."
        description="The product separates raw material from reviewed memory and keeps current intent stronger than historical pattern."
        tone="muted"
      >
        <ProductCardGrid columns={3}>
          <ProductIllustrationCard
            index="01 / CAPTURE"
            title="Work becomes inspectable records."
            description="Useful fragments cross a capture boundary without being treated as automatically approved."
            visual={<CaptureComposition motion="reveal" />}
          />
          <ProductIllustrationCard
            index="02 / REVIEW"
            title="Evidence and judgment create trust."
            description="Provenance, explicit review, and visible correction shape what joins structured memory."
            visual={<ReviewStructureComposition motion="reveal" />}
          />
          <ProductIllustrationCard
            index="03 / RETRIEVE"
            title="Current intent selects the context."
            description="Relevant reviewed records return while unrelated and historical material stays outside the active set."
            visual={<RetrievalComposition motion="reveal" />}
          />
        </ProductCardGrid>
      </ProductSection>

      <ProductSection
        eyebrow="Ownership and portability"
        title="Memory stays readable beyond any one model."
        description="The durable asset is the reviewed record and its history, not a specific chat interface or model response."
      >
        <ProductCardGrid columns={4}>
          <ProductCard index="01" title="Local files">
            <p>
              The current product model keeps customer memory on the
              customer&apos;s computer rather than requiring ProChat-hosted memory.
            </p>
          </ProductCard>
          <ProductCard index="02" title="Markdown-first">
            <p>
              Human-readable records remain inspectable and portable instead of
              being available only through an opaque application state.
            </p>
          </ProductCard>
          <ProductCard index="03" title="Git-versioned">
            <p>
              Version history can preserve when a record changed, what it
              replaced, and which conclusion is current.
            </p>
          </ProductCard>
          <ProductCard index="04" title="Model-independent">
            <p>
              Reviewed memory can outlast the model or interface used to put
              that context to work.
            </p>
          </ProductCard>
        </ProductCardGrid>
      </ProductSection>

      <ProductSection
        eyebrow="Human agency"
        title="Stored memory informs the present. It does not overrule it."
        description="Review, correction, and selective retrieval keep the person or organization responsible for what becomes trusted and what gets used."
        tone="muted"
      >
        <ProductFlow items={memoryFlow} />
        <ProductBoundaryList title="Product boundaries" items={boundaries} />
      </ProductSection>

      <ProductPageAction
        eyebrow="Current edition"
        title="See the Memory model applied to QA."
        description="ProChat Memory for QA is the first niche-specific edition, focused on preserving reviewed lessons from repeated software-testing investigations."
        primaryAction={{ href: '/memory-qa', label: 'Explore Memory for QA' }}
        secondaryAction={{ href: '/docs', label: 'Read documentation' }}
      />
    </PublicProductPage>
  )
}
