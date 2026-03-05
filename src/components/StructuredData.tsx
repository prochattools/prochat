type JsonLd =
  | Record<string, unknown>
  | Array<Record<string, unknown>>

export default function StructuredData({
  id,
  data,
}: {
  id: string
  data: JsonLd
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
