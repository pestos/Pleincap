import type { TaskConfig } from 'payload'
import { getEmailAdapter, EMAIL_FROM } from '../lib/email/emailAdapter'
import { renderLiveLinkNotification } from '../emails/LiveLinkNotification'

interface SendLiveLinkInput {
  visioconferenceId: string
}

interface SendLiveLinkOutput {
  sentCount: number
  failedCount: number
}

export const sendLiveLink: TaskConfig = {
  slug: 'sendLiveLink',
  handler: async ({ input, req }) => {
    const { visioconferenceId } = input as SendLiveLinkInput

    // Get visioconference with speaker populated
    const visio = await req.payload.findByID({
      collection: 'visioconferences',
      id: visioconferenceId,
      depth: 1,
    }) as any

    if (!visio || !visio.youtubeLiveUrl) {
      throw new Error('Visioconference introuvable ou lien live manquant')
    }

    // Get all registrations for this visioconference
    const registrations = await req.payload.find({
      collection: 'live-registrations',
      where: {
        visioconference: { equals: visioconferenceId },
      },
      pagination: false,
    })

    if (registrations.docs.length === 0) {
      return { output: { sentCount: 0, failedCount: 0 } as SendLiveLinkOutput }
    }

    const emailAdapter = getEmailAdapter()
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    // Format date
    const dateStr = visio.date
      ? new Date(visio.date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''

    const speakerName =
      visio.speakerOverride ||
      (typeof visio.speaker === 'object' && visio.speaker?.name) ||
      undefined

    let sentCount = 0
    let failedCount = 0

    // Send emails in batches of 50
    const batchSize = 50
    for (let i = 0; i < registrations.docs.length; i += batchSize) {
      const batch = registrations.docs.slice(i, i + batchSize)

      for (const reg of batch) {
        try {
          const html = await renderLiveLinkNotification({
            name: (reg as any).name,
            conferenceTitle: visio.title,
            conferenceDate: dateStr,
            conferenceTime: visio.time || undefined,
            speakerName,
            youtubeLiveUrl: visio.youtubeLiveUrl,
            baseUrl,
          })

          const result = await emailAdapter.send({
            to: (reg as any).email,
            subject: `Le lien pour le live est disponible - ${visio.title}`,
            html,
            from: EMAIL_FROM,
          })

          if (result.success) {
            sentCount++
          } else {
            failedCount++
          }
        } catch {
          failedCount++
        }
      }
    }

    // Mark visioconference as sent
    await req.payload.update({
      collection: 'visioconferences',
      id: visioconferenceId,
      data: {
        liveLinkSent: true,
      },
    })

    return {
      output: { sentCount, failedCount } as SendLiveLinkOutput,
    }
  },
}
