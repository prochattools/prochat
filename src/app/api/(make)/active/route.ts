import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      error: 'Runtime authentication is not implemented yet. Ory session validation is still TODO.',
    },
    { status: 501 }
  )
}

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    {
      error: 'Runtime authentication is not implemented yet. Ory session validation is still TODO.',
    },
    { status: 501 }
  )
}
