'use strict'
exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'ProChat'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || '',
  distributed_tracing: { enabled: true },
  logging: { level: 'info' },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'response.headers.set-cookie',
    ],
  },
}
