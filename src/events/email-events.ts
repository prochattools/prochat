import { EventEmitter } from 'events'
import { resendService } from '../libs/resend'

const emailEvents = new EventEmitter()

emailEvents.on('sendThanksYouEmail', async (email: string) => {
  try {
    await resendService.sendThanksYouEmail(email)
  } catch (err) {
    // Optional feature: do not crash the app if Resend is not configured.
    console.warn('Resend email skipped:', (err as any)?.message || err)
  }
})

export default emailEvents
