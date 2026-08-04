import { NextRequest, NextResponse } from 'next/server'

const BASE_URL =
  process.env.MAILERLITE_API_BASE_URL || 'https://connect.mailerlite.com/api'
const GROUP_ID = process.env.MAILERLITE_GROUP_ID
const API_KEY = process.env.MAILERLITE_API_KEY

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email?: string }
  const normalizedEmail = (email || '').trim().toLowerCase()

  if (!normalizedEmail) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    )
  }

  if (!API_KEY || !GROUP_ID) {
    return NextResponse.json(
      { error: 'Server is missing required configuration.' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(`${BASE_URL}/subscribers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        groups: [GROUP_ID],
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorPayload = await response
        .json()
        .catch(() => ({ message: 'MailerLite request failed.' }))

      const errorMessage =
        errorPayload?.message || errorPayload?.error || 'MailerLite request failed.'

      if (
        [409, 422].includes(response.status) &&
        /already|exists|taken/i.test(String(errorMessage))
      ) {
        return NextResponse.json(
          { message: 'You are already subscribed.' },
          { status: 200 }
        )
      }

      return NextResponse.json({ error: errorMessage }, { status: 502 })
    }

    return NextResponse.json(
      { message: 'Check your inbox — your copy is on its way.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('MailerLite subscribe error:', error)
    return NextResponse.json(
      { error: 'Unable to subscribe right now. Please try again.' },
      { status: 500 }
    )
  }
}
