import { resendService } from '@/libs/resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email?: string }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const createdContact = await resendService.addNewEmailAddress(email)
    const contactId = createdContact?.data?.id ?? null

    return NextResponse.json({ success: true, contactId }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Error in contactcreated' },
      { status: 500 }
    )
  }
}
