'use client'

import { useMemo, useState } from 'react'

type ContinentKey = 'europe' | 'afrique' | 'asie' | 'ameriques' | 'oceanie'

type Destination = any

const continents: { key: ContinentKey; label: string }[] = [
  { key: 'europe', label: 'Europe' },
  { key: 'afrique', label: 'Afrique' },
  { key: 'asie', label: 'Asie' },
  { key: 'ameriques', label: 'Amériques' },
  { key: 'oceanie', label: 'Océanie' },
]

const continentCopy: Record<ContinentKey, { title: string; description: string }> = {
  europe: {
    title: "L'Europe Millénaire",
    description: 'Le berceau des arts et de la civilisation.',
  },
  afrique: {
    title: "L'Afrique Originelle",
    description: 'Terres de légendes, de cultures et de paysages majestueux.',
  },
  asie: {
    title: "L'Asie Impériale",
    description: 'Rituels ancestraux et capitales vibrantes à découvrir.',
  },
  ameriques: {
    title: 'Les Amériques Sauvages',
    description: "Des fjords polaires aux déserts mythiques, l'aventure grandeur nature.",
  },
  oceanie: {
    title: "L'Océanie Infinie",
    description: 'Archipels secrets et horizons sans fin entre mer et désert.',
  },
}

type Cruise = any

type DestinationsClientProps = {
  destinations: Destination[]
  cruises: Cruise[]
}

export default function DestinationsClient({ destinations, cruises }: DestinationsClientProps) {
  const [activeContinent, setActiveContinent] = useState<ContinentKey>('europe')
  const filtered = useMemo(
    () => destinations.filter((d) => d.continent === activeContinent),
    [activeContinent, destinations]
  )
  const filteredCruises = useMemo(() => {
    const destIds = new Set(filtered.map((d: any) => String(d.id)))
    return cruises.filter((c: any) => {
      const dest = typeof c.destination === 'object' ? c.destination : null
      return dest && destIds.has(String(dest.id))
    })
  }, [filtered, cruises])
  const continentDetails = continentCopy[activeContinent]

  return (
    <>
      <div className="sticky top-[73px] z-40 border-b border-[#c5a050]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-4 py-8">
          <h4 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a050]">
            Choisissez un continent
          </h4>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
            {continents.map((c) => (
              <Tab
                key={c.key}
                label={c.label}
                active={c.key === activeContinent}
                onClick={() => setActiveContinent(c.key)}
              />
            ))}
          </div>
        </div>
      </div>
      <section className="bg-[#F9F8F6] px-6 pb-24 pt-24 lg:px-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold">{continentDetails.title}</h3>
              <p className="mt-2 text-[#0A1128]/60">{continentDetails.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-[#c5a050]/30 p-2 hover:bg-[#c5a050]/10">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="rounded-full border border-[#c5a050]/30 p-2 hover:bg-[#c5a050]/10">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Destinations */}
            {filtered.map((dest: any) => (
              <a
                key={`dest-${dest.id}`}
                href={`/catalogue?destination=${dest.id}`}
                className="luxury-grid-card group relative aspect-[4/5] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="card-image h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${dest.featuredImage?.url || ''}')` }}
                    aria-label={dest.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform group-hover:-translate-y-2">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#c5a050]">
                    {dest.region}
                  </span>
                  <h4 className="mb-4 text-3xl font-bold text-white">{dest.name}</h4>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
                    <span className="material-symbols-outlined text-sm">sailing</span>
                    Découvrir les itinéraires
                  </div>
                </div>
              </a>
            ))}
            {/* Croisières */}
            {filteredCruises.map((cruise: any) => {
              const imageUrl = cruise.featuredImage?.url || ''
              const dest = typeof cruise.destination === 'object' ? cruise.destination : null

              return (
                <a
                  key={`cruise-${cruise.id}`}
                  href={`/catalogue/${cruise.slug}`}
                  className="luxury-grid-card group relative aspect-[4/5] cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="card-image h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${imageUrl}')` }}
                      aria-label={cruise.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-8 transition-transform group-hover:-translate-y-2">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#c5a050]">
                      {dest?.name || ''}
                    </span>
                    <h4 className="mb-4 text-3xl font-bold text-white">{cruise.title}</h4>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
                      <span className="material-symbols-outlined text-sm">{cruise.voyageType === 'train' ? 'train' : 'sailing'}</span>
                      {cruise.price
                        ? `À partir de ${cruise.price.toLocaleString('fr-FR')} €`
                        : 'Découvrir'}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
          {filtered.length === 0 && filteredCruises.length === 0 ? (
            <p className="mt-8 text-center text-sm text-[#0A1128]/60">
              Aucun itinéraire disponible pour cette sélection.
            </p>
          ) : null}
        </div>
      </section>
    </>
  )
}

function Tab({
  label,
  active = false,
  onClick,
}: {
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex flex-col items-center transition-all ${
        active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
      }`}
    >
      <span
        className={`text-lg font-medium tracking-wide ${
          active
            ? 'border-b-2 border-[#c5a050] text-[#c5a050]'
            : 'border-b-2 border-transparent text-[#0A1128] group-hover:border-[#c5a050]'
        }`}
      >
        {label}
      </span>
    </button>
  )
}
