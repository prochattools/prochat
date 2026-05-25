import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(_req: NextRequest) {
  try {
    return NextResponse.json(
      {
        error: 'Runtime authentication is not implemented yet. Ory session validation is still TODO.',
      },
      { status: 501 }
    )
  } catch (error: any) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    )
  }
}
