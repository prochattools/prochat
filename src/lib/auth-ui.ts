export type AuthAppId = 'prochat' | 'fala' | 'unknown'

export type AuthTheme = {
  appId: AuthAppId
  productName: string
  accent: string
  tagline: string
  loginCta: string
  signupCta: string
}

const DEFAULT_THEME: AuthTheme = {
  appId: 'unknown',
  productName: 'ProChat',
  accent: '#3B82F6',
  tagline: 'Shared Ory authentication for ProChat apps.',
  loginCta: 'Continue to login',
  signupCta: 'Continue to registration',
}

const THEMES: Record<Exclude<AuthAppId, 'unknown'>, AuthTheme> = {
  prochat: {
    appId: 'prochat',
    productName: 'ProChat',
    accent: '#3B82F6',
    tagline: 'Sign in to ProChat and connected products.',
    loginCta: 'Continue to ProChat login',
    signupCta: 'Continue to ProChat registration',
  },
  fala: {
    appId: 'fala',
    productName: 'Fala',
    accent: '#C0392B',
    tagline: 'Sign in to keep learning Portuguese with Fala.',
    loginCta: 'Continue to Fala login',
    signupCta: 'Continue to Fala registration',
  },
}

export function getAuthTheme(appId?: string | null): AuthTheme {
  if (!appId) return DEFAULT_THEME

  const normalized = appId.trim().toLowerCase()
  if (normalized in THEMES) {
    return THEMES[normalized as Exclude<AuthAppId, 'unknown'>]
  }

  return DEFAULT_THEME
}
