import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const payload = await getPayload({ config })

  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token requis' }, { status: 400 })
    }

    // Find subscriber with valid token
    const now = new Date()
    const result = await payload.find({
      collection: 'subscribers',
      where: {
        and: [
          { verificationToken: { equals: token } },
          { verificationTokenExpiry: { greater_than: now.toISOString() } },
          { status: { equals: 'pending' } },
        ],
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      // Redirect to newsletter page with error
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return NextResponse.redirect(`${baseUrl}/news-letter?error=token-invalid`)
    }

    const subscriber = result.docs[0] as any

    // Activate subscription
    await payload.update({
      collection: 'subscribers',
      id: subscriber.id,
      data: {
        status: 'active',
        subscribedAt: new Date().toISOString(),
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    })

    // Redirect to newsletter page with success
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/news-letter?confirmed=true`)
  } catch (error) {
    console.error('Newsletter confirmation error:', error)
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/news-letter?error=server`)
  }
}
