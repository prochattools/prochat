import Link from 'next/link'

type DocsCTAProps = {
  title: string
  description: string
  href: string
}

export default function DocsCTA({ title, description, href }: DocsCTAProps) {
  return (
    <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-5 text-sm text-blue-50">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Link className="text-xs uppercase tracking-[0.3em] text-blue-200" href={href}>
          Learn more →
        </Link>
      </div>
      <p className="mt-2 text-sm text-blue-100">{description}</p>
    </div>
  )
}
