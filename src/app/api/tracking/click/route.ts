import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const campaignId = searchParams.get('c')
  const subscriberId = searchParams.get('s')
  const targetUrl = searchParams.get('url')

  // Validate target URL is present
  if (!targetUrl) {
    return NextResponse.json({ error: 'URL requise' }, { status: 400 })
  }

  // Security: Validate URL to prevent open redirect attacks
  // Only allow URLs starting with http:// or https://
  const urlLower = targetUrl.toLowerCase()
  if (!urlLower.startsWith('http://') && !urlLower.startsWith('https://')) {
    return NextResponse.json(
      { error: 'URL invalide - seuls les protocoles HTTP/HTTPS sont autorisés' },
      { status: 400 }
    )
  }

  // Additional security: prevent javascript:, data:, and other dangerous protocols
  if (
    urlLower.startsWith('javascript:') ||
    urlLower.startsWith('data:') ||
    urlLower.startsWith('vbscript:') ||
    urlLower.startsWith('file:')
  ) {
    return NextResponse.json(
      { error: 'URL invalide - protocole non autorisé' },
      { status: 400 }
    )
  }

  // Track the click event if both IDs are present
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
          event: 'click',
          campaign: campaignId,
          subscriber: subscriberId,
          url: targetUrl,
          ipAddress,
          userAgent,
        },
      })
    } catch (error) {
      // Tracking must not fail the redirect
      console.error('Error tracking email click:', error)
    }
  }

  // Redirect to target URL
  return NextResponse.redirect(targetUrl)
}
