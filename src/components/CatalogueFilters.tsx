'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type FilterOption = {
  label: string
  value: string
}

type Props = {
  destinations: FilterOption[]
  voyageTypes: FilterOption[]
  boats: FilterOption[]
}

export default function CatalogueFilters({ destinations, voyageTypes, boats }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeDestination = searchParams.get('destination') || ''
  const activeVoyageType = searchParams.get('voyageType') || ''
  const activeBoat = searchParams.get('boat') || ''

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get(key)

    if (current === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    const qs = params.toString()
    router.push(`/catalogue${qs ? `?${qs}` : ''}`)
  }, [router, searchParams])

  const resetFilters = useCallback(() => {
    router.push('/catalogue')
  }, [router])

  return (
    <div className="sticky top-32 space-y-10">
      <div className="flex items-center justify-between border-b border-abyss/20 pb-4 dark:border-white/20">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Filtres Avancés</h3>
        <button
          onClick={resetFilters}
          className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      <div className="space-y-10">
        {destinations.length > 0 && (
          <FilterSection
            title="Destination"
            options={destinations}
            activeValue={activeDestination}
            onToggle={(value) => updateFilter('destination', value)}
          />
        )}

        {voyageTypes.length > 0 && (
          <FilterSection
            title="Type de croisières"
            options={voyageTypes}
            activeValue={activeVoyageType}
            onToggle={(value) => updateFilter('voyageType', value)}
          />
        )}

        {boats.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-abyss dark:text-white">
              <span className="text-xs font-bold uppercase tracking-widest">Bateaux</span>
            </div>
            <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
              {boats.map((opt) => (
                <label key={opt.value} className="group flex cursor-pointer items-center gap-3">
                  <input
                    className="h-4 w-4 rounded-none border-abyss/20 bg-transparent text-primary focus:ring-primary dark:border-white/20"
                    type="checkbox"
                    checked={activeBoat === opt.value}
                    onChange={() => updateFilter('boat', opt.value)}
                  />
                  <span className={`text-xs font-medium uppercase tracking-tight transition-colors group-hover:text-primary ${activeBoat === opt.value ? 'text-primary' : ''}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FilterSection({
  title,
  options,
  activeValue,
  onToggle,
}: {
  title: string
  options: FilterOption[]
  activeValue: string
  onToggle: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-abyss dark:text-white">
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="group flex cursor-pointer items-center gap-3">
            <input
              className="h-4 w-4 rounded-none border-abyss/20 bg-transparent text-primary focus:ring-primary dark:border-white/20"
              type="checkbox"
              checked={activeValue === opt.value}
              onChange={() => onToggle(opt.value)}
            />
            <span className={`text-xs font-medium uppercase tracking-tight transition-colors group-hover:text-primary ${activeValue === opt.value ? 'text-primary' : ''}`}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
