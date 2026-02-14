import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  const payload = await getPayload({ config })

  try {
    // Find danube cruise
    const result = await payload.find({
      collection: 'cruises',
      where: {
        title: { equals: 'Le Danube Impérial : De Vienne à Belgrade' },
      },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return NextResponse.json({ error: 'Cruise not found' })
    }

    const cruise = result.docs[0]

    // Update slug to danube-imperial to preserve URL
    await payload.update({
      collection: 'cruises',
      id: cruise.id,
      data: {
        slug: 'danube-imperial',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Slug updated to danube-imperial',
      cruiseId: cruise.id,
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
