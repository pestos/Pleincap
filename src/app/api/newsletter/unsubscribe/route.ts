import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return handleUnsubscribe(request)
}

export async function POST(request: NextRequest) {
  // Support POST method for List-Unsubscribe-Post header (RFC 8058)
  return handleUnsubscribe(request)
}

async function handleUnsubscribe(request: NextRequest) {
  const payload = await getPayload({ config })

  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token requis' }, { status: 400 })
    }

    // Find subscriber with unsubscribe token
    const result = await payload.find({
      collection: 'subscribers',
      where: {
        and: [
          { unsubscribeToken: { equals: token } },
          { status: { not_equals: 'unsubscribed' } },
        ],
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      // Redirect to newsletter page with error
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      return NextResponse.redirect(`${baseUrl}/news-letter?error=link-invalid`)
    }

    const subscriber = result.docs[0] as any

    // Immediately unsubscribe (GDPR requirement - no confirmation step)
    await payload.update({
      collection: 'subscribers',
      id: subscriber.id,
      data: {
        status: 'unsubscribed',
        unsubscribedAt: new Date().toISOString(),
      },
    })

    // Redirect to newsletter page with unsubscribed status
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/news-letter?unsubscribed=true`)
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/news-letter?error=server`)
  }
}
