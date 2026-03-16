export default function DocsNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-5 text-sm text-blue-100">
      <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Note</p>
      <div className="mt-2 text-sm leading-relaxed text-blue-50">{children}</div>
    </div>
  )
}
