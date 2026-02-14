import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { validateSubscriberCSV } from '@/payload/lib/validation/csvValidator'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Fichier requis' }, { status: 400 })
    }

    // Validate file type
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      return NextResponse.json(
        { error: 'Le fichier doit être un CSV' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier ne doit pas dépasser 5MB' },
        { status: 400 }
      )
    }

    // Read file content
    const csvContent = await file.text()

    // Validate CSV content
    const validationResult = validateSubscriberCSV(csvContent)

    if (validationResult.valid.length === 0) {
      return NextResponse.json(
        {
          error: 'Aucune ligne valide trouvée',
          stats: validationResult.stats,
          errors: validationResult.errors,
        },
        { status: 400 }
      )
    }

    // Process valid rows
    const skipped: Array<{ email: string; reason: string }> = []
    let importedCount = 0

    for (const row of validationResult.valid) {
      try {
        // Check if subscriber already exists
        const existing = await payload.find({
          collection: 'subscribers',
          where: {
            email: {
              equals: row.email.toLowerCase(),
            },
          },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          skipped.push({
            email: row.email,
            reason: 'Email déjà présent',
          })
          continue
        }

        // Create new subscriber with active status
        // Admin importing CSV is asserting consent was already collected
        await payload.create({
          collection: 'subscribers',
          data: {
            email: row.email,
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            status: 'active',
            subscribedAt: new Date().toISOString(),
            source: 'import',
            unsubscribeToken: nanoid(32),
          },
        })

        importedCount++
      } catch (error) {
        skipped.push({
          email: row.email,
          reason:
            error instanceof Error
              ? error.message
              : 'Erreur lors de la création',
        })
      }
    }

    return NextResponse.json({
      success: true,
      imported: importedCount,
      skipped: skipped.length,
      errors: validationResult.errors.length,
      stats: validationResult.stats,
      details: {
        skipped,
        errors: validationResult.errors,
      },
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Erreur lors de l\'importation',
      },
      { status: 500 }
    )
  }
}
