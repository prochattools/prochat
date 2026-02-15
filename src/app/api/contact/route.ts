import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import config from '@/config'

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { name, email, reason, message } = body ?? {}

		if (!name || !email || !reason || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			)
		}

		const recipients = ['support@prochat.tools']
		const cc: string[] = []

		if (reason === 'Privacy / GDPR / Legal') {
			cc.push('privacy@prochat.tools')
		}

		const from =
			process.env.RESEND_FROM ||
			process.env.EMAIL_FROM ||
			config.resend.fromAdmin ||
			config.resend.supportEmail

		if (!from) {
			return NextResponse.json(
				{ error: 'Missing sender configuration' },
				{ status: 500 },
			)
		}

		const resendApiKey = process.env.RESEND_API_KEY
		if (!resendApiKey) {
			return NextResponse.json(
				{ error: 'Missing RESEND_API_KEY configuration' },
				{ status: 500 },
			)
		}

		const resend = new Resend(resendApiKey)

		const data = await resend.emails.send({
			from,
			to: recipients,
			cc: cc.length ? cc : undefined,
			replyTo: email,
			subject: `[Contact] ${reason} — ${name}`,
			text: `
Name: ${name}
Email: ${email}
Reason: ${reason}
Page: /contact
Timestamp: ${new Date().toISOString()}

Message:
${message}
      `,
		})

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error('Contact API Error:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
