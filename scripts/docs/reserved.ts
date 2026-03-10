import path from 'path'

export const RESERVED_DIRECTORIES = new Set(['api', 'cli', 'sdk'])

export function detectReservedDirectory(relativePath: string): string | null {
  const segments = relativePath.split(path.sep).filter(Boolean)
  const directories = segments.slice(0, -1)
  for (const segment of directories) {
    const normalized = segment.toLowerCase()
    if (RESERVED_DIRECTORIES.has(normalized)) {
      return normalized
    }
  }
  return null
}
