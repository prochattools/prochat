import { ConfigProps } from '@/types'

const config: ConfigProps = {
  // REQUIRED
  appName: 'ProKit',

  // REQUIRED: used for metadata + default descriptions.
  // Keep this engine-focused (ProKit ships without a marketing layer).
  appDescription:
    "ProKit is ProChat's developer core boilerplate for building SaaS apps.",

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
    fromAdmin: `ProKit <info@prochat.tools>`,
    supportEmail: 'info@prochat.tools',
    forwardRepliesTo: 'info@prochat.tools',
    subjects: {
      thankYou: 'Welcome to ProKit',
    },
  },
}

export default config

