export type MotionChapter = {
  label: string
  title: string
  copy: string
  name: string
}

export interface ScrollTriggerInstance {
  start: number
  end: number
  kill(): void
}

export const CONTEXT_CHAPTERS: MotionChapter[] = [
  {
    label: '01 · Task Intent',
    title: 'Start with the task, not the archive.',
    copy: 'Intent becomes the retrieval boundary before any memory is selected.',
    name: 'task-intent',
  },
  {
    label: '02 · Relevance Filtering',
    title: 'Relevance narrows the field.',
    copy: 'Only reviewed records that match the task brighten. Irrelevant memory remains present but quiet.',
    name: 'relevance-filtering',
  },
  {
    label: '03 · Context Assembly',
    title: 'Relevant memory becomes bounded context.',
    copy: 'Selected records move into an explicit context boundary with provenance still visible.',
    name: 'context-assembly',
  },
  {
    label: '04 · Applied Context',
    title: 'The answer shows where its context came from.',
    copy: 'Applied context stays inspectable rather than disappearing behind the response.',
    name: 'applied-context',
  },
]

export const CONTEXT_STATE_PROGRESS = [0.04, 0.3, 0.7, 0.99] as const
