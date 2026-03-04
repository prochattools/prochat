import InvoiceTemplate from '@/components/email-templates/Invoice'
import ThankYouTemplate from '@/components/email-templates/ThanksYouTemplate'
import config from '@/config'
import prisma from '@/libs/prisma'
import { Resend } from 'resend'

function normalizeEmailAddress(value: string | undefined) {
	const raw = (value || '').trim()
	if (!raw) return ''

	const bracketMatch = raw.match(/<([^>]+)>/)
	return (bracketMatch?.[1] || raw).trim()
}

class ResendService {
	private getResendClient() {
		const apiKey = process.env.RESEND_API_KEY
		if (!apiKey) {
			throw new Error('Missing RESEND_API_KEY')
		}
		return new Resend(apiKey)
	}

	public async sendThanksYouEmail(toMail: string) {
		const resend = this.getResendClient()
		const { data, error } = await resend.emails.send({
			from: normalizeEmailAddress(config.resend.fromAdmin),
			to: [toMail],
			replyTo: [normalizeEmailAddress(config.resend.forwardRepliesTo)],
			subject: config.resend.subjects?.thankYou ?? 'Welcome to ProChat',
			react: ThankYouTemplate({ email: toMail }),
		})

		if (error) {
			throw error
		}

		return data
	}

	public async sendInvoice(toMail: string, renderData: any) {
		const resend = this.getResendClient()
		const { data, error } = await resend.emails.send({
			from: normalizeEmailAddress(config.resend.fromAdmin),
			to: [toMail],
			replyTo: [normalizeEmailAddress(config.resend.forwardRepliesTo)],
			subject: 'Invoice: ' + renderData.id,
			react: InvoiceTemplate(renderData),
		})

		if (error) {
			throw error
		}

		return data
	}

	public async addNewEmailAddress(email: string) {
		const audience = await this.upsertAudience()
		const resend = this.getResendClient()
		return resend.contacts.create({
			email,
			unsubscribed: false,
			audienceId: audience.resend_id,
		})
	}

	private async upsertAudience() {
		const audience = await prisma.audiences.findFirst()

		if (audience) {
			return audience
		}

		const resend = this.getResendClient()
		const resendAudience = await resend.audiences.create({
			name: 'Waiting List',
		})

		const id = resendAudience.data?.id
		const name = resendAudience.data?.name

		if (!id || !name) {
			throw new Error('Failed to create Resend audience')
		}

		return prisma.audiences.create({
			data: {
				id: crypto.randomUUID(),
				resend_id: id,
				name,
			},
		})
	}
}

export const resendService = new ResendService()
