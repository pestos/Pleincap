import type { TaskConfig } from 'payload'
import { getEmailAdapter } from '../lib/email/emailAdapter'
import { renderCampaignEmail } from '../emails/CampaignTemplate'
import { lexicalToHtml, lexicalToPlainText } from '../lib/lexicalToHtml'

interface SendCampaignInput {
  campaignId: string
}

interface SendCampaignOutput {
  sentCount: number
  failedCount: number
}

export const sendCampaign: TaskConfig = {
  slug: 'sendCampaign',
  handler: async ({ input, req }) => {
    const { campaignId } = input as SendCampaignInput

    try {
      // Get campaign
      const campaign = await req.payload.findByID({
        collection: 'campaigns',
        id: campaignId,
      })

      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`)
      }

      // Get all active subscribers
      const subscribers = await req.payload.find({
        collection: 'subscribers',
        where: {
          status: {
            equals: 'active',
          },
        },
        limit: 0,
        pagination: false,
      })

      const totalRecipients = subscribers.docs.length

      if (totalRecipients === 0) {
        throw new Error('No active subscribers to send to')
      }

      // Create CampaignSend record
      const campaignSend = await req.payload.create({
        collection: 'campaign-sends',
        data: {
          campaign: campaignId,
          status: 'sending',
          totalRecipients,
          sentCount: 0,
          failedCount: 0,
          startedAt: new Date().toISOString(),
        },
      })

      // Get email adapter
      const emailAdapter = getEmailAdapter()

      // Convert campaign content to HTML
      const contentHtml = lexicalToHtml(campaign.content)
      const contentText = lexicalToPlainText(campaign.content)

      // Get base URL for tracking and unsubscribe links
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

      // Process subscribers in batches of 50
      const batchSize = 50
      let sentCount = 0
      let failedCount = 0
      const errors: string[] = []

      for (let i = 0; i < subscribers.docs.length; i += batchSize) {
        const batch = subscribers.docs.slice(i, i + batchSize)

        // Send each email individually (for personalized unsubscribe links)
        for (const subscriber of batch) {
          try {
            // Render email template
            const html = await renderCampaignEmail({
              preheader: campaign.preheader || '',
              heading: campaign.subject,
              content: contentHtml,
              campaignId: String(campaign.id),
              subscriberId: String(subscriber.id),
              unsubscribeUrl: `${baseUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`,
              baseUrl,
            })

            // Send email
            const result = await emailAdapter.send({
              to: subscriber.email,
              subject: campaign.subject,
              html,
              text: contentText,
              headers: {
                'List-Unsubscribe': `<${baseUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
              },
            })

            if (result.success) {
              sentCount++
            } else {
              failedCount++
              errors.push(`${subscriber.email}: ${result.error || 'Unknown error'}`)
            }
          } catch (error) {
            failedCount++
            const errorMsg = error instanceof Error ? error.message : 'Unknown error'
            errors.push(`${subscriber.email}: ${errorMsg}`)
          }
        }

        // Update CampaignSend progress after each batch
        await req.payload.update({
          collection: 'campaign-sends',
          id: campaignSend.id,
          data: {
            sentCount,
            failedCount,
          },
        })
      }

      // Mark campaign send as completed
      await req.payload.update({
        collection: 'campaign-sends',
        id: campaignSend.id,
        data: {
          status: 'completed',
          completedAt: new Date().toISOString(),
          errorLog: errors.length > 0 ? errors.slice(0, 100).join('\n') : undefined,
        },
      })

      // Update campaign with final stats
      await req.payload.update({
        collection: 'campaigns',
        id: campaignId,
        data: {
          status: 'sent',
          sentAt: new Date().toISOString(),
          sentCount,
          failedCount,
        },
      })

      return {
        output: {
          sentCount,
          failedCount,
        } as SendCampaignOutput,
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      // Try to update campaign status to failed
      try {
        await req.payload.update({
          collection: 'campaigns',
          id: campaignId,
          data: {
            status: 'failed',
          },
        })
      } catch {
        // Ignore update errors during error handling
      }

      // Throw error to mark job as failed
      throw new Error(`Campaign send failed: ${errorMessage}`)
    }
  },
}
