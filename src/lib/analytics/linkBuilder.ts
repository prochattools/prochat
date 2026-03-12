export type TrackingParams = {
  ref?: string
  campaign?: string
  pillar?: string
}

export function buildTrackedUrl(url: string, params: TrackingParams) {
  if (!url) return url
  const existingIndex = url.indexOf('?')
  const base = existingIndex >= 0 ? url.slice(0, existingIndex) : url
  const search = existingIndex >= 0 ? url.slice(existingIndex + 1) : ''
  const query = new URLSearchParams(search)

  if (params.ref) query.set('ref', params.ref)
  if (params.campaign) query.set('campaign', params.campaign)
  if (params.pillar) query.set('pillar', params.pillar)

  const serialized = query.toString()
  return serialized ? `${base}?${serialized}` : base
}
