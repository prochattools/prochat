import { NextResponse } from 'next/server'
import Stripe from 'stripe'

type ClaimBody = {
  session_id?: string
  github_username?: string
}

const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: '2024-06-20' })
  : null

const GITHUB_PAT = process.env.GITHUB_PROKIT_PAT
const GITHUB_REPO = process.env.GITHUB_PROKIT_REPO || 'prochattools/prokit'

async function addCollaborator(username: string) {
  if (!GITHUB_PAT) throw new Error('GitHub PAT not configured')
  const url = `https://api.github.com/repos/${GITHUB_REPO}/collaborators/${username}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_PAT}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ permission: 'pull' }),
  })

  if (resp.status === 404) {
    throw new Error('GitHub username not found')
  }
  if (!resp.ok && resp.status !== 201 && resp.status !== 204) {
    const text = await resp.text()
    console.error('[github] collaborator error', resp.status, text)
    throw new Error('GitHub invitation failed')
  }
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }
    const body: ClaimBody = await req.json()
    const sessionId = body.session_id?.trim()
    const username = body.github_username?.trim()

    if (!sessionId || !username) {
      return NextResponse.json({ error: 'session_id and github_username are required' }, { status: 400 })
    }
    if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
      return NextResponse.json({ error: 'Invalid GitHub username format' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer'],
    })

    if (
      session.metadata?.product_slug !== 'prokit' ||
      (session.payment_status !== 'paid' && session.status !== 'complete')
    ) {
      return NextResponse.json({ error: 'Payment not verified for ProKit' }, { status: 400 })
    }

    const customerId = session.customer as string | null
    let customerMetadata: Record<string, string> = {}
    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId)
      if (!customer || customer.deleted) {
        return NextResponse.json({ error: 'Customer not found' }, { status: 400 })
      }
      customerMetadata = (customer as Stripe.Customer).metadata || {}
      if (customerMetadata.prochat_prokit_github_provisioned === 'true') {
        return NextResponse.json({ success: true, message: 'Access already provisioned.' })
      }
    }

    await addCollaborator(username)

    if (customerId) {
      await stripe.customers.update(customerId, {
        metadata: {
          ...customerMetadata,
          prochat_prokit_paid: 'true',
          prochat_prokit_github_provisioned: 'true',
          prochat_prokit_github_username: username,
          prochat_prokit_last_session: session.id,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    const msg = error?.message || 'Server error'
    const status = msg.includes('username not found') ? 400 : 500
    return NextResponse.json({ error: msg }, { status })
  }
}
