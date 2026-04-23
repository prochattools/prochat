import type { Metadata } from 'next'
import { AuthScreen } from '@/components/AuthScreen'
import { getAuthTheme } from '@/lib/auth-ui'

const OryPublicUrl = process.env.NEXT_PUBLIC_ORY_PUBLIC_URL || 'https://auth.prochat.tools'
const AuthUiUrl = process.env.NEXT_PUBLIC_AUTH_UI_URL || 'https://prochat.tools'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page({ searchParams }: { searchParams?: { redirect_url?: string; app?: string } }) {
  const redirectUrl = searchParams?.redirect_url?.startsWith('/') ? searchParams.redirect_url : '/dashboard'
  const theme = getAuthTheme(searchParams?.app)
  const registrationUrl = new URL('/self-service/registration/browser', OryPublicUrl)
  registrationUrl.searchParams.set('return_to', `${AuthUiUrl}${redirectUrl}`)

  return (
    <AuthScreen
      title={`Create your ${theme.productName} account`}
      description={theme.tagline}
    >
      <div className="space-y-4 rounded-[28px] border border-border bg-surface/80 p-8 shadow-sm">
        <p className="text-sm leading-6 text-muted-foreground">
          {theme.productName} handles the registration experience and hands control to Ory for identity creation.
        </p>
        <a
          href={registrationUrl.toString()}
          className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: theme.accent }}
        >
          {theme.signupCta}
        </a>
      </div>
    </AuthScreen>
  )
}
