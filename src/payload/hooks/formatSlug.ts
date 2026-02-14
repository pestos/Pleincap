import type { FieldHook } from 'payload'

/**
 * Reusable field hook for auto-generating URL-safe slugs from a fallback field.
 * Handles French text with accents by normalizing and stripping diacritics.
 *
 * @param fallback - The field name to use as source for slug generation (e.g., 'name', 'title')
 * @returns Payload FieldHook that auto-generates slugs on create or when empty
 *
 * @example
 * ```ts
 * {
 *   name: 'slug',
 *   type: 'text',
 *   hooks: {
 *     beforeValidate: [formatSlug('name')]
 *   }
 * }
 * ```
 */
export const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, data }) => {
    // Only auto-generate on create or when slug is empty
    if (operation === 'create' || !value) {
      const fallbackValue = data?.[fallback]

      if (typeof fallbackValue === 'string' && fallbackValue.trim()) {
        // Normalize Unicode to decompose accents (é becomes e + ́)
        const normalized = fallbackValue.normalize('NFD')

        // Strip accent marks (combining diacritical marks range U+0300-U+036F)
        const withoutAccents = normalized.replace(/[\u0300-\u036f]/g, '')

        // Convert to lowercase, replace non-alphanumeric with hyphens, trim hyphens
        const slug = withoutAccents
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')

        return slug
      }
    }

    // Preserve existing value on update (don't overwrite manual edits)
    return value
  }
