export const ogImageSize = {
  width: 1200,
  height: 630,
} as const

export function svgToDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function applySvgColor(svg: string, color: string) {
  return svg.replace(/currentColor/g, color)
}

export function applySvgGradient(svg: string, start: string, end: string) {
  const gradientId = 'prochatGradient'
  const defs = `<defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${start}" /><stop offset="100%" stop-color="${end}" /></linearGradient></defs>`

  return svg
    .replace(/<svg([^>]*)>/, `<svg$1>${defs}`)
    .replace(/fill="currentColor"/g, `fill="url(#${gradientId})"`)
}

export function clampOgTitle(title: string, maxLength = 96) {
  const trimmed = title.trim()
  if (trimmed.length <= maxLength) return trimmed

  const candidate = trimmed.slice(0, maxLength)
  const lastSpace = candidate.lastIndexOf(' ')

  return `${candidate.slice(0, lastSpace > 48 ? lastSpace : maxLength).trimEnd()}…`
}
