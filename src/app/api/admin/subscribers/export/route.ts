import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import Papa from 'papaparse'

export async function GET(request: NextRequest) {
  try {
    // Authenticate the request
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Fetch all subscribers
    const subscribers = await payload.find({
      collection: 'subscribers',
      limit: 0, // No limit
      pagination: false,
    })

    // Prepare data for CSV export
    const exportData = subscribers.docs.map((subscriber: any) => ({
      email: subscriber.email,
      firstName: subscriber.firstName || '',
      lastName: subscriber.lastName || '',
      status: subscriber.status,
      subscribedAt: subscriber.subscribedAt
        ? new Date(subscriber.subscribedAt).toISOString()
        : '',
      source: subscriber.source || '',
    }))

    // Convert to CSV
    const csvContent = Papa.unparse(exportData, {
      columns: [
        'email',
        'firstName',
        'lastName',
        'status',
        'subscribedAt',
        'source',
      ],
    })

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0]
    const filename = `subscribers-${date}.csv`

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'exportation",
      },
      { status: 500 }
    )
  }
}
