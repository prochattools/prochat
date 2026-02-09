import { ConfigProps } from '@/types'

const config: ConfigProps = {
  // REQUIRED
  appName: 'ProChat',

  // REQUIRED: used for metadata + default descriptions.
  // Keep this engine-focused (ProKit ships without a marketing layer).
  appDescription:
    'ProChat is the SaaS boilerplate built on the ProKit engine (auth, billing, database, deploy gate).',

  // REQUIRED (no https://, no trailing slash)
  domainName: 'prochat.tools',

  stripe: {
    // Optional: configure your Stripe products here.
    // If empty, the billing UI will show a setup hint instead of breaking.
    products: [],
  },

  colors: {
    // Theme name used by the UI (light/dark). Leave blank to defer to system.
    theme: 'light',
    // Used for browser UI (tabs/PWA theme/loading bar, etc.)
    main: '#006FEE',
  },

  resend: {
    // Used when sending transactional emails (optional).
    fromAdmin: `ProChat <info@prochat.tools>`,
    supportEmail: 'info@prochat.tools',
    forwardRepliesTo: 'info@prochat.tools',
    subjects: {
      thankYou: 'Welcome to ProChat',
    },
  },
}

export default config
