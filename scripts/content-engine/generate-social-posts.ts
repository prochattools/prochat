import fs from 'fs'
import path from 'path'
import { parse as parseYaml } from 'yaml'
// Local helper (duplicate of src/lib/analytics/linkBuilder) to avoid runtime ESM resolution
function buildTrackedUrl(url: string, params: { ref: string; campaign: string; pillar: string }) {
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

type Platform = 'twitter' | 'linkedin'

type PostEntry = {
  id: number
  type: string
  text: string
  link: string | null
  pillar: string | null
  platform?: Platform
}

const PLATFORM_SCHEDULE = {
  twitter: {
    scheduledDay: 'Tuesday/Thursday',
    scheduledTimeLisbon: '16:00',
  },
  linkedin: {
    scheduledDay: 'Tuesday/Thursday',
    scheduledTimeLisbon: '11:00',
  },
} as const

interface SocialPost {
  id: number
  platform: Platform
  type: 'insight' | 'definition' | 'principle'
  text: string
  link: string
  pillar: string
  campaign: 'evergreen'
  scheduledDay: string
  scheduledTimeLisbon: string
}

type GuideEntry = { title: string; slug: string; url: string }
type GlossaryEntry = { term: string; slug: string; url: string }

const ROOT = process.cwd()
const contentDir = path.join(ROOT, 'content')
const outputDir = path.join(contentDir, 'social')

function listFiles(dir: string, base = dir): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap(entry => {
    const target = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return listFiles(target, base)
    }
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      return path.relative(base, target)
    }
    return []
  })
}

function readFrontmatter(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/) // capture frontmatter
  if (!match) return null
  return parseYaml(match[1])
}

function normalizeGuide(file: string): GuideEntry | null {
  const fullPath = path.join(ROOT, 'src', 'lib', 'content', 'guides', file)
  const bits = file.replace(/\.mdx$/, '').split(path.sep)
  const slug = bits[bits.length - 1]
  if (slug === 'index') return null
  const topic = bits[0]
  const frontmatter = readFrontmatter(fullPath) || {}
  const title = frontmatter?.title || slug.replace(/-/g, ' ')
  return {
    title: String(title),
    slug,
    url: `/guides/${topic}/${slug}`,
  }
}

function normalizeGlossary(fullPath: string): GlossaryEntry {
  const slug = path.basename(fullPath, '.mdx')
  const frontmatter = readFrontmatter(fullPath)
  const title = frontmatter?.title || slug.replace(/-/g, ' ')
  return {
    term: String(title),
    slug,
    url: `/glossary/${slug}`,
  }
}

function collectGuides(): GuideEntry[] {
  const guideDir = path.join(ROOT, 'src', 'lib', 'content', 'guides')
  const files = listFiles(guideDir, guideDir)
  const mapped = files.map(normalizeGuide)
  const filtered = mapped.filter((entry): entry is GuideEntry => Boolean(entry))
  return filtered.sort((a, b) => a.slug.localeCompare(b.slug))
}

function collectGlossary(): GlossaryEntry[] {
  const paths = [
    path.join(ROOT, 'content', 'glossary'),
    path.join(ROOT, 'src', 'lib', 'content', 'glossary'),
  ]
  const seen = new Set<string>()
  const terms: GlossaryEntry[] = []
  for (const base of paths) {
    if (!fs.existsSync(base)) continue
    const files = listFiles(base, base)
    for (const file of files) {
      const slug = path.basename(file, '.mdx')
      if (seen.has(slug)) continue
      seen.add(slug)
      const normalized = normalizeGlossary(path.join(base, file))
      terms.push(normalized)
    }
  }
  return terms.sort((a, b) => a.slug.localeCompare(b.slug))
}

function guidePillar(guide: GuideEntry) {
  const lower = guide.slug.toLowerCase()
  if (lower.includes('idea')) return 'ideas'
  if (lower.includes('saas')) return 'saas'
  if (lower.includes('waas')) return 'waas'
  return 'saas'
}

function buildPosts() {
  const insights = collectGuides()
  const definitions = collectGlossary()
  const total = 104
  const perType = Math.floor(total / 3)
  const remainder = total % 3
  const targetCounts = [
    perType + (remainder > 0 ? 1 : 0),
    perType + (remainder > 1 ? 1 : 0),
    perType,
  ]
  type PostEntry = { id: number; type: string; text: string; link: string | null; pillar: string | null }
  const posts: PostEntry[] = []
  const seenText = new Set<string>()
  const producedCounts = [0, 0, 0]
  let id = 1
  let guideIndex = 0
  let termIndex = 0

  while (posts.length < total) {
    let added = false
    for (let typeIdx = 0; typeIdx < 3 && posts.length < total; typeIdx += 1) {
      if (producedCounts[typeIdx] >= targetCounts[typeIdx]) {
        continue
      }
      let text: string | null = null
      let link: string | null = null
      let typeLabel: string
      let pillar: string | null = null

      if (typeIdx === 0) {
        const guide = insights[guideIndex % insights.length]
        guideIndex += 1
        text = `Most SaaS founders struggle with ${guide.title}.

The solution is simple.

Learn the framework ↓
${guide.url}`
        link = guide.url
        pillar = guidePillar(guide)
        typeLabel = 'insight'
      } else if (typeIdx === 1) {
        const term = definitions[termIndex % definitions.length]
        termIndex += 1
        text = `${term.term} means solving the right problem.

Most founders misunderstand it.

Definition ↓
${term.url}`
        link = term.url
        pillar = 'saas'
        typeLabel = 'definition'
      } else {
        text = `SaaS success is not about features.

It is about solving real problems.`
        link = null
        typeLabel = 'principle'
        pillar = 'saas'
      }

      if (!text || seenText.has(text)) {
        continue
      }

      seenText.add(text)
      posts.push({
        id: id++,
        type: typeLabel,
        text,
        link,
        pillar,
      })
      producedCounts[typeIdx] += 1
      added = true
    }

    if (!added) {
      break
    }
  }

  return posts.slice(0, total)
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function trackedPosts(posts: PostEntry[], platform: Platform): SocialPost[] {
  const schedule = PLATFORM_SCHEDULE[platform]
  return posts.map(post => ({
    id: post.id,
    platform,
    type: post.type as 'insight' | 'definition' | 'principle',
    text: post.text,
    link: post.link
      ? buildTrackedUrl(post.link, {
          ref: platform,
          campaign: 'evergreen',
          pillar: post.pillar || 'saas',
        })
      : '',
    pillar: post.pillar || 'saas',
    campaign: 'evergreen',
    scheduledDay: schedule.scheduledDay,
    scheduledTimeLisbon: schedule.scheduledTimeLisbon,
  }))
}

function writeJson(file: string, data: unknown) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function run() {
  const posts = buildPosts()
  ensureDir(outputDir)
  const twitterPosts: SocialPost[] = trackedPosts(posts, 'twitter')
  const linkedinPosts: SocialPost[] = trackedPosts(posts, 'linkedin')
  twitterPosts.forEach((post, index) => {
    post.id = index + 1
  })
  linkedinPosts.forEach((post, index) => {
    post.id = index + 1
  })
  writeJson(path.join(outputDir, 'twitter.json'), twitterPosts)
  writeJson(path.join(outputDir, 'linkedin.json'), linkedinPosts)
}

run()
