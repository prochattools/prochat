type DocsCodeBlockProps = {
  code: string
  language?: string
}

export default function DocsCodeBlock({ code, language = 'bash' }: DocsCodeBlockProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-slate-950/60 p-5 text-sm font-mono">
      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-400">{language}</p>
      <pre className="mt-2 overflow-x-auto text-slate-200">{code}</pre>
    </div>
  )
}
