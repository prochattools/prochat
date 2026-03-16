export default function DocsWarning({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm text-amber-50">
      <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Warning</p>
      <div className="mt-2 text-sm leading-relaxed text-amber-100">{children}</div>
    </div>
  )
}
