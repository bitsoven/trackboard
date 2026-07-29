import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  from: {
    address: env.get('MAIL_FROM_ADDRESS', 'no-reply@example.com'),
    name: env.get('MAIL_FROM_NAME', 'Trackboard'),
  },

  /**
   * The mailers object can be used to configure multiple mailers, each using
   * a different transport (or the same transport with different options).
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST', ''),
      port: env.get('SMTP_PORT', 587),
      secure: false,
      auth: {
        type: 'login',
        user: env.get('SMTP_USER', ''),
        pass: env.get('SMTP_PASSWORD', ''),
      },
    }),

    resend: transports.resend({
      key: env.get('RESEND_API_KEY', ''),
      baseUrl: 'https://api.resend.com',
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
