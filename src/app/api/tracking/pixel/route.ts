import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// 1x1 transparent GIF as base64
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const campaignId = searchParams.get('c')
  const subscriberId = searchParams.get('s')

  // Track the open event if both IDs are present
  if (campaignId && subscriberId) {
    try {
      const payload = await getPayload({ config })

      // Extract IP address and user agent from headers
      const ipAddress =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        ''
      const userAgent = request.headers.get('user-agent') || ''

      // Create analytics record - using Local API (server-side)
      await payload.create({
        collection: 'email-analytics',
        data: {
          event: 'open',
          campaign: campaignId,
          subscriber: subscriberId,
          ipAddress,
          userAgent,
        },
      })
    } catch (error) {
      // Tracking must not fail the pixel response
      console.error('Error tracking email open:', error)
    }
  }

  // Always return the transparent GIF
  return new NextResponse(TRANSPARENT_GIF, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}
