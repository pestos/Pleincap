'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

type Destination = {
  id: string | number
  name: string
}

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

export default function HomeSearchBox({ destinations }: { destinations: Destination[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [month, setMonth] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Filter destinations based on typed query
  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return destinations.filter((d) => d.name.toLowerCase().includes(q))
  }, [query, destinations])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Generate next 18 months as options
  const now = new Date()
  const monthOptions: { label: string; value: string }[] = []
  for (let i = 0; i < 18; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`
    monthOptions.push({ value, label })
  }

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest)
    setQuery(dest.name)
    setShowSuggestions(false)
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    setSelectedDestination(null)
    setShowSuggestions(true)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedDestination) {
      params.set('destination', String(selectedDestination.id))
    } else if (query.trim()) {
      params.set('q', query.trim())
    }
    if (month) params.set('month', month)
    const qs = params.toString()
    router.push(`/catalogue${qs ? `?${qs}` : ''}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false)
      handleSearch()
    }
  }

  return (
    <section className="relative z-20 -mt-12 w-full">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        <div className="flex flex-col items-end justify-between gap-8 border border-primary/30 bg-background-light p-6 shadow-2xl dark:bg-background-dark md:flex-row md:p-8">
          <div className="grid w-full flex-1 grid-cols-1 gap-12 md:grid-cols-2">
            {/* Destination autocomplete */}
            <div className="flex flex-col gap-2" ref={wrapperRef}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Destination
              </label>
              <div className="relative">
                <div className="flex items-center gap-3 border-b border-abyss/20 py-2">
                  <span className="material-symbols-outlined text-sm">map</span>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => query.trim() && setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tapez une destination..."
                    className="w-full border-none bg-transparent p-0 text-sm text-abyss placeholder:text-abyss/40 focus:outline-none focus:ring-0 dark:text-ecru dark:placeholder:text-ecru/40"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setSelectedDestination(null); setShowSuggestions(false) }}
                      className="text-abyss/40 transition-colors hover:text-abyss dark:text-ecru/40 dark:hover:text-ecru"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto border border-abyss/10 bg-white shadow-lg dark:border-white/10 dark:bg-background-dark">
                    {suggestions.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => handleSelectDestination(dest)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                      >
                        <span className="material-symbols-outlined text-sm text-primary">place</span>
                        <span>{dest.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {showSuggestions && query.trim() && suggestions.length === 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-abyss/10 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-background-dark">
                    <p className="text-xs text-abyss/50 dark:text-ecru/50">Aucune destination trouvée</p>
                  </div>
                )}
              </div>
            </div>

            {/* Period selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Période
              </label>
              <div className="flex items-center gap-3 border-b border-abyss/20 py-2">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full appearance-none border-none bg-transparent p-0 text-sm text-abyss focus:ring-0 dark:text-ecru"
                >
                  <option value="">Toutes les périodes</option>
                  {monthOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-8 md:w-auto">
            <a
              className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-abyss transition-colors hover:text-primary"
              href="/catalogue"
            >
              Recherche avancée
            </a>
            <button
              onClick={handleSearch}
              className="sharp-edge w-full bg-abyss px-12 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 dark:bg-primary dark:text-white md:w-auto"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
