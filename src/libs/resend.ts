import ThankYouTemplate from '@/components/email-templates/ThanksYouTemplate'
import config from '@/config'
import { Resend } from 'resend'

class ResendService {
  private client: Resend | null = null

  private getClient(): Resend {
    const key = process.env.RESEND_API_KEY

    if (!key) {
      throw new Error(
        'RESEND_API_KEY is not set. Configure Resend to enable email features.'
      )
    }

    if (!this.client) {
      this.client = new Resend(key)
    }

    return this.client
  }

  public async sendThanksYouEmail(toMail: string) {
    const { data, error } = await this.getClient().emails.send({
      from: config.resend.fromAdmin,
      to: [toMail],
      replyTo: config.resend.forwardRepliesTo,
      subject: config.resend.subjects.thankYou,
      react: ThankYouTemplate({ email: toMail }),
    })

    if (error) {
      throw error
    }

    return data
  }
}

export const resendService = new ResendService()
