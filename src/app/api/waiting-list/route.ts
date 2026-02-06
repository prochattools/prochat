import { resendService } from '@/libs/resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email?: string }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          'Waiting list is not configured. Set RESEND_API_KEY to enable email capture.',
      },
      { status: 501 }
    )
  }

  try {
    const createdContact = await resendService.addNewEmailAddress(email)

    return NextResponse.json(
      { id: createdContact.data?.id },
      {
        status: 200,
        statusText:
          'Contact created' +
          (createdContact.data?.id ? `: ${createdContact.data.id}` : ''),
      }
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to add email to waiting list' },
      { status: 500 }
    )
  }
}
