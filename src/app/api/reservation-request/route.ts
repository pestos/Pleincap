import { getPayloadClient } from '@/lib/payload-queries'
import { NextResponse } from 'next/server'
import { getEmailAdapter, EMAIL_FROM } from '@/payload/lib/email/emailAdapter'
import { renderReservationRequestConfirmation } from '@/payload/emails/ReservationRequestConfirmation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      cruiseId, cruiseTitle, cabinCategory,
      civility, firstName, lastName, email, phone,
      address, postalCode, city, country,
      adults, children, childrenAges, cabinsRequested,
      message,
    } = body

    if (!cruiseId || !cruiseTitle || !cabinCategory || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Champs requis : prenom, nom, email, telephone, croisiere et categorie de cabine' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()

    // Verify cruise exists
    const cruise = await payload.findByID({
      collection: 'cruises',
      id: cruiseId,
    })

    if (!cruise) {
      return NextResponse.json(
        { error: 'Croisiere introuvable' },
        { status: 404 },
      )
    }

    // Create reservation request
    await payload.create({
      collection: 'reservation-requests',
      data: {
        cruise: cruiseId,
        cabinCategory,
        civility: civility || undefined,
        firstName,
        lastName,
        email,
        phone,
        address: address || undefined,
        postalCode: postalCode || undefined,
        city: city || undefined,
        country: country || undefined,
        adults: adults || 2,
        children: children || 0,
        childrenAges: childrenAges || undefined,
        cabinsRequested: cabinsRequested || 1,
        message: message || undefined,
      },
    })

    // Send confirmation email (async, don't block the response)
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const fullName = `${firstName} ${lastName}`

    try {
      const emailAdapter = getEmailAdapter()
      const html = await renderReservationRequestConfirmation({
        name: fullName,
        cruiseTitle,
        cabinCategory,
        adults: adults || 2,
        children: children || 0,
        cabinsRequested: cabinsRequested || 1,
        baseUrl,
      })

      await emailAdapter.send({
        to: email,
        subject: `Demande de reservation - ${cruiseTitle}`,
        html,
        from: EMAIL_FROM,
      })
    } catch {
      console.error('Failed to send reservation confirmation email to', email)
    }

    return NextResponse.json({ success: true, message: 'Demande enregistree !' })
  } catch {
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 },
    )
  }
}
