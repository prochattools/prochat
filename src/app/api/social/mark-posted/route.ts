import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

type Platform = 'twitter' | 'linkedin'

const SOCIAL_STATE_PATH = path.join(process.cwd(), 'content', 'social', 'state.json')

type SocialState = Record<Platform, { postedIds: number[] }>

function readState(): SocialState | null {
  try {
    const data = fs.readFileSync(SOCIAL_STATE_PATH, 'utf8')
    return JSON.parse(data) as SocialState
  } catch (error) {
    console.error('Failed to read social state', error)
    return null
  }
}

function writeState(state: SocialState) {
  const tmpPath = `${SOCIAL_STATE_PATH}.tmp`
  fs.writeFileSync(tmpPath, JSON.stringify(state, null, 2))
  fs.renameSync(tmpPath, SOCIAL_STATE_PATH)
}

export async function POST(request: NextRequest) {
  if (!process.env.SOCIAL_AUTOMATION_SECRET) {
    console.error('SOCIAL_AUTOMATION_SECRET not configured')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }
  const secret = request.headers.get('x-social-secret')
  if (secret !== process.env.SOCIAL_AUTOMATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const platform = (body as Record<string, unknown>).platform as Platform | undefined
  const id = Number((body as Record<string, unknown>).id)

  if (platform !== 'twitter' && platform !== 'linkedin') {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const state = readState()
  if (!state) {
    return NextResponse.json({ error: 'Social state unavailable' }, { status: 500 })
  }

  const postedIds = state[platform].postedIds
  if (!postedIds.includes(id)) {
    postedIds.push(id)
    postedIds.sort((a, b) => a - b)
  }

  try {
    writeState(state)
  } catch (error) {
    console.error('Failed to write social state', error)
    return NextResponse.json({ error: 'Unable to persist state' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
