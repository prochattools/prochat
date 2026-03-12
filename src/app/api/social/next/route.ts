import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

type Platform = 'twitter' | 'linkedin'

const SOCIAL_DIR = path.join(process.cwd(), 'content', 'social')

function readJson<T>(file: string): T | null {
  try {
    const data = fs.readFileSync(file, 'utf8')
    return JSON.parse(data) as T
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-social-secret')
  if (!process.env.SOCIAL_AUTOMATION_SECRET) {
    console.error('SOCIAL_AUTOMATION_SECRET not configured')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }
  if (secret !== process.env.SOCIAL_AUTOMATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const platform = request.nextUrl.searchParams.get('platform')
  if (platform !== 'twitter' && platform !== 'linkedin') {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }

  const feedPath = path.join(SOCIAL_DIR, `${platform}.json`)
  const statePath = path.join(SOCIAL_DIR, 'state.json')

  if (!fs.existsSync(feedPath)) {
    return NextResponse.json({ error: 'Social feed unavailable' }, { status: 500 })
  }
  const posts = readJson<Array<Record<string, unknown>>>(feedPath)
  if (!Array.isArray(posts)) {
    console.error('Invalid social feed structure')
    return NextResponse.json({ error: 'Social feed corrupted' }, { status: 500 })
  }
  const state = readJson<{ [key in Platform]: { postedIds: number[] } }>(statePath)

  if (!posts || !state) {
    return NextResponse.json({ error: 'Social feed unavailable' }, { status: 500 })
  }

  const postedIds = new Set(state[platform].postedIds)
  const next = posts.find(post => !postedIds.has(post.id as number))

  if (!next) {
    return new NextResponse(null, { status: 204 })
  }

  return NextResponse.json(next)
}
