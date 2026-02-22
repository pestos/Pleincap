'use client'

import { useField, useAllFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export default function CabinCategorySelect({ path, field }: any) {
  const { value, setValue } = useField<string>({ path })
  const [fields] = useAllFormFields()
  const boatValue = fields?.boat?.value
  const boatId = typeof boatValue === 'object' && boatValue !== null ? (boatValue as any).id : boatValue
  const [cabinOptions, setCabinOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!boatId) {
      setCabinOptions([])
      return
    }
    setLoading(true)
    fetch(`/api/boats/${boatId}?depth=0`)
      .then((r) => r.json())
      .then((data) => {
        const cabins = data.cabins || []
        setCabinOptions(cabins.map((c: any) => c.category).filter(Boolean))
      })
      .catch(() => setCabinOptions([]))
      .finally(() => setLoading(false))
  }, [boatId])

  const label = field?.label || 'Categorie de cabine'
  const required = field?.required

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '13px', fontWeight: 600 }}>
        {label}
        {required && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
      </label>
      {!boatId ? (
        <p style={{ color: '#888', fontSize: '13px', fontStyle: 'italic' }}>
          Assignez d&apos;abord un bateau pour voir les categories de cabines.
        </p>
      ) : loading ? (
        <p style={{ color: '#888', fontSize: '13px' }}>Chargement des cabines...</p>
      ) : cabinOptions.length === 0 ? (
        <p style={{ color: '#888', fontSize: '13px', fontStyle: 'italic' }}>
          Aucune cabine definie sur ce bateau.
        </p>
      ) : (
        <select
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid var(--theme-elevation-150, #ddd)',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: 'var(--theme-input-bg, #fff)',
            color: 'var(--theme-text, #333)',
            cursor: 'pointer',
          }}
        >
          <option value="">— Selectionner une categorie —</option>
          {cabinOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
