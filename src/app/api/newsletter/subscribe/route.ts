import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { getEmailAdapter, EMAIL_FROM } from '@/payload/lib/email/emailAdapter'
import { renderDoubleOptIn } from '@/payload/emails/DoubleOptIn'

export async function POST(request: NextRequest) {
  const payload = await getPayload({ config })

  try {
    const body = await request.json()
    const { email } = body

    // Basic email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists
    const existingResult = await payload.find({
      collection: 'subscribers',
      where: {
        email: { equals: normalizedEmail },
      },
      limit: 1,
    })

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    // Handle existing subscriber
    if (existingResult.docs.length > 0) {
      const subscriber = existingResult.docs[0] as any

      if (subscriber.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'Vous êtes déjà inscrit',
        })
      }

      // Resend verification for pending or reactivate unsubscribed
      const verificationToken = nanoid(32)
      const verificationTokenExpiry = new Date()
      verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24)

      // Generate unsubscribe token if it doesn't exist
      const unsubscribeToken = subscriber.unsubscribeToken || nanoid(32)

      await payload.update({
        collection: 'subscribers',
        id: subscriber.id,
        data: {
          status: 'pending',
          verificationToken,
          verificationTokenExpiry: verificationTokenExpiry.toISOString(),
          unsubscribeToken,
        },
      })

      // Send verification email
      const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${verificationToken}`
      const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}`
      const emailHtml = await renderDoubleOptIn({
        email: normalizedEmail,
        confirmUrl,
        baseUrl,
      })

      const emailAdapter = getEmailAdapter()
      await emailAdapter.send({
        to: normalizedEmail,
        subject: 'Confirmez votre inscription - PleinCap',
        html: emailHtml,
        from: EMAIL_FROM,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Un email de confirmation a été envoyé',
      })
    }

    // Create new subscriber
    const verificationToken = nanoid(32)
    const unsubscribeToken = nanoid(32)
    const verificationTokenExpiry = new Date()
    verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24)

    // Capture IP and user agent for GDPR audit
    const ipAddress = request.headers.get('x-forwarded-for') || null
    const userAgent = request.headers.get('user-agent') || null

    const newSubscriber = await payload.create({
      collection: 'subscribers',
      data: {
        email: normalizedEmail,
        status: 'pending',
        verificationToken,
        verificationTokenExpiry: verificationTokenExpiry.toISOString(),
        unsubscribeToken,
        source: 'website',
        ipAddress,
        userAgent,
      },
    })

    // Send verification email
    const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${verificationToken}`
    const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${unsubscribeToken}`
    const emailHtml = await renderDoubleOptIn({
      email: normalizedEmail,
      confirmUrl,
      baseUrl,
    })

    const emailAdapter = getEmailAdapter()
    await emailAdapter.send({
      to: normalizedEmail,
      subject: 'Confirmez votre inscription - PleinCap',
      html: emailHtml,
      from: EMAIL_FROM,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Un email de confirmation a été envoyé',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      {
        error: 'Une erreur est survenue',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
