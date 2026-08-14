import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      error: 'Runtime authentication is deferred. Ory session validation is not enabled, so this internal route remains fail-closed.',
    },
    { status: 501 }
  )
}

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    {
      error: 'Runtime authentication is deferred. Ory session validation is not enabled, so this internal route remains fail-closed.',
    },
    { status: 501 }
  )
}
