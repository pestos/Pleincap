/**
 * Email Adapter Interface
 *
 * Provider-agnostic abstraction for email sending.
 * Allows swapping email providers without changing business logic.
 */

export interface EmailSendParams {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
  headers?: Record<string, string>
}

export interface EmailSendResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface EmailBatchItem {
  to: string
  subject: string
  html: string
}

export interface EmailAdapter {
  send(params: EmailSendParams): Promise<EmailSendResult>
  sendBatch(emails: EmailBatchItem[]): Promise<EmailSendResult[]>
}

/**
 * Console Email Adapter
 *
 * Development/testing adapter that logs emails to console instead of sending.
 * This is the default adapter when no provider is configured.
 */
export class ConsoleEmailAdapter implements EmailAdapter {
  async send(params: EmailSendParams): Promise<EmailSendResult> {
    console.log('\n========== EMAIL (Console Adapter) ==========')
    console.log('To:', params.to)
    console.log('From:', params.from || EMAIL_FROM)
    console.log('Subject:', params.subject)
    if (params.replyTo) console.log('Reply-To:', params.replyTo)
    if (params.headers) console.log('Headers:', params.headers)
    console.log('--- HTML ---')
    console.log(params.html)
    if (params.text) {
      console.log('--- TEXT ---')
      console.log(params.text)
    }
    console.log('=============================================\n')

    return {
      success: true,
      messageId: `console-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }
  }

  async sendBatch(emails: EmailBatchItem[]): Promise<EmailSendResult[]> {
    console.log(`\n========== BATCH EMAIL (${emails.length} emails) ==========`)
    const results = await Promise.all(
      emails.map((email, index) =>
        this.send({
          ...email,
          subject: `[BATCH ${index + 1}/${emails.length}] ${email.subject}`,
        })
      )
    )
    console.log('=============================================\n')
    return results
  }
}

/**
 * Email adapter factory
 *
 * Returns the configured email adapter based on environment variables.
 * Defaults to ConsoleEmailAdapter for development.
 */
export function getEmailAdapter(): EmailAdapter {
  const provider = process.env.EMAIL_PROVIDER || 'console'

  switch (provider.toLowerCase()) {
    case 'console':
      return new ConsoleEmailAdapter()
    default:
      throw new Error(
        `Unsupported email provider: "${provider}". Available options: console`
      )
  }
}

/**
 * Default email sender address
 */
export const EMAIL_FROM = process.env.EMAIL_FROM || 'newsletter@plein-cap.com'
