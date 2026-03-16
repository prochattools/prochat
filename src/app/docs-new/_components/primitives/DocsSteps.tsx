type DocsStepsProps = {
  title?: string
  items: string[]
}

export default function DocsSteps({ title, items }: DocsStepsProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-surface/80 p-5 text-sm text-muted-foreground">
      {title && <p className="text-xs uppercase tracking-[0.3em] text-tertiary">{title}</p>}
      <ol className="mt-3 space-y-2 pl-5 text-slate-100">
        {items.map((step, index) => (
          <li key={step} className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">Step {index + 1}</span>
            <p className="text-sm text-slate-200">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
