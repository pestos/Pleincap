import Papa from 'papaparse'
import { z } from 'zod'

const SubscriberRowSchema = z.object({
  email: z.string().email('Format email invalide'),
  firstName: z.string().optional().default(''),
  lastName: z.string().optional().default(''),
})

export interface ValidationResult {
  valid: Array<{ email: string; firstName?: string; lastName?: string }>
  errors: Array<{ row: number; email: string; error: string }>
  stats: { total: number; valid: number; invalid: number; duplicates: number }
}

/**
 * Sanitizes a field value against CSV injection attacks
 * Strips leading =, +, -, @ characters that could be interpreted as formulas
 */
function sanitizeField(value: string): string {
  if (typeof value !== 'string') return ''
  return value.replace(/^[=+\-@]+/, '').trim()
}

/**
 * Maps common CSV header variations to standard field names
 */
function normalizeHeaders(header: string): string {
  const normalized = header.toLowerCase().trim()
  const mapping: Record<string, string> = {
    'e-mail': 'email',
    'prenom': 'firstName',
    'prénom': 'firstName',
    'nom': 'lastName',
    'first_name': 'firstName',
    'last_name': 'lastName',
    'firstname': 'firstName',
    'lastname': 'lastName',
  }
  return mapping[normalized] || normalized
}

/**
 * Validates a CSV file containing subscriber data
 * Handles header variations, deduplication, and CSV injection sanitization
 */
export function validateSubscriberCSV(csvContent: string): ValidationResult {
  const valid: Array<{ email: string; firstName?: string; lastName?: string }> = []
  const errors: Array<{ row: number; email: string; error: string }> = []
  const seenEmails = new Set<string>()
  let duplicateCount = 0

  // Parse CSV with header normalization
  const parseResult = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: normalizeHeaders,
  })

  const rows = parseResult.data as Array<Record<string, string>>

  rows.forEach((row, index) => {
    const rowNumber = index + 2 // Account for 1-based indexing + header row

    // Sanitize all fields
    const sanitizedRow = {
      email: sanitizeField(row.email || ''),
      firstName: sanitizeField(row.firstName || row.firstname || ''),
      lastName: sanitizeField(row.lastName || row.lastname || ''),
    }

    // Validate with Zod
    const validation = SubscriberRowSchema.safeParse(sanitizedRow)

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Validation failed'
      errors.push({
        row: rowNumber,
        email: sanitizedRow.email || '(vide)',
        error: errorMessage,
      })
      return
    }

    // Check for duplicates (case-insensitive)
    const emailLower = validation.data.email.toLowerCase()
    if (seenEmails.has(emailLower)) {
      duplicateCount++
      errors.push({
        row: rowNumber,
        email: validation.data.email,
        error: 'Email en double dans le fichier',
      })
      return
    }

    seenEmails.add(emailLower)
    valid.push(validation.data)
  })

  return {
    valid,
    errors,
    stats: {
      total: rows.length,
      valid: valid.length,
      invalid: errors.length,
      duplicates: duplicateCount,
    },
  }
}
