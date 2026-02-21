import { getPayloadClient } from '@/lib/payload-queries'
import { NextResponse } from 'next/server'
import { getEmailAdapter, EMAIL_FROM } from '@/payload/lib/email/emailAdapter'
import { renderLiveRegistrationConfirmation } from '@/payload/emails/LiveRegistrationConfirmation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { visioconferenceId, name, email, phone } = body

    if (!visioconferenceId || !name || !email) {
      return NextResponse.json(
        { error: 'Champs requis : nom, email et visioconference' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()

    // Verify visioconference exists and registration is open
    const visio = await payload.findByID({
      collection: 'visioconferences',
      id: visioconferenceId,
    })

    if (!visio) {
      return NextResponse.json(
        { error: 'Visioconference introuvable' },
        { status: 404 },
      )
    }

    if ((visio as any).type !== 'live' || !(visio as any).registrationOpen) {
      return NextResponse.json(
        { error: 'Les inscriptions ne sont pas ouvertes pour cette conference' },
        { status: 400 },
      )
    }

    // Check for duplicate registration
    const existing = await payload.find({
      collection: 'live-registrations',
      where: {
        and: [
          { email: { equals: email } },
          { visioconference: { equals: visioconferenceId } },
        ],
      },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      return NextResponse.json(
        { error: 'Vous etes deja inscrit(e) a cette conference' },
        { status: 409 },
      )
    }

    // Create registration
    await payload.create({
      collection: 'live-registrations',
      data: {
        visioconference: visioconferenceId,
        name,
        email,
        phone: phone || undefined,
      },
    })

    // Send confirmation email (async, don't block the response)
    const v = visio as any
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const dateStr = v.date
      ? new Date(v.date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''
    const speakerName =
      v.speakerOverride ||
      (typeof v.speaker === 'object' && v.speaker?.name) ||
      undefined

    try {
      const emailAdapter = getEmailAdapter()
      const html = await renderLiveRegistrationConfirmation({
        name,
        conferenceTitle: v.title,
        conferenceDate: dateStr,
        conferenceTime: v.time || undefined,
        speakerName,
        baseUrl,
      })

      await emailAdapter.send({
        to: email,
        subject: `Inscription confirmee - ${v.title}`,
        html,
        from: EMAIL_FROM,
      })
    } catch {
      // Log but don't fail the registration
      console.error('Failed to send confirmation email to', email)
    }

    return NextResponse.json({ success: true, message: 'Inscription confirmee !' })
  } catch {
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 },
    )
  }
}
