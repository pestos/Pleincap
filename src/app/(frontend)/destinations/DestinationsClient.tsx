'use client'

import { useMemo, useState } from 'react'

type Continent = 'Europe' | 'Afrique' | 'Asie' | 'Amériques' | 'Océanie'

type Region = {
  area: string
  title: string
  slug: string
  itineraries: number
  image: string
  continent: Continent
}

type Destination = any

const continents: Continent[] = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie']

const continentCopy: Record<Continent, { title: string; description: string }> = {
  Europe: {
    title: "L'Europe Millénaire",
    description: 'Le berceau des arts et de la civilisation.',
  },
  Afrique: {
    title: "L'Afrique Originelle",
    description: 'Terres de légendes, de cultures et de paysages majestueux.',
  },
  Asie: {
    title: "L'Asie Impériale",
    description: 'Rituels ancestraux et capitales vibrantes à découvrir.',
  },
  Amériques: {
    title: 'Les Amériques Sauvages',
    description: "Des fjords polaires aux déserts mythiques, l'aventure grandeur nature.",
  },
  Océanie: {
    title: "L'Océanie Infinie",
    description: 'Archipels secrets et horizons sans fin entre mer et désert.',
  },
}

// Map CMS region to continent
function mapRegionToContinent(region: string): Continent {
  const normalized = region.toLowerCase()
  if (normalized.includes('mediterranee') || normalized.includes('europe')) {
    return 'Europe'
  }
  if (normalized.includes('afrique')) {
    return 'Afrique'
  }
  if (normalized.includes('asie')) {
    return 'Asie'
  }
  if (normalized.includes('amerique')) {
    return 'Amériques'
  }
  if (normalized.includes('oceanie')) {
    return 'Océanie'
  }
  return 'Europe' // default
}

// Convert CMS destinations to Region format
function convertDestinationsToRegions(destinations: Destination[]): Region[] {
  return destinations.map((dest) => ({
    area: dest.region,
    title: dest.name,
    slug: dest.slug || '',
    itineraries: 0,
    image: dest.featuredImage?.url || '',
    continent: mapRegionToContinent(dest.region),
  }))
}

type DestinationsClientProps = {
  destinations: Destination[]
}

export default function DestinationsClient({ destinations }: DestinationsClientProps) {
  const regions = useMemo(() => convertDestinationsToRegions(destinations), [destinations])
  const [activeContinent, setActiveContinent] = useState<Continent>('Europe')
  const filteredRegions = useMemo(
    () => regions.filter((region) => region.continent === activeContinent),
    [activeContinent]
  )
  const continentDetails = continentCopy[activeContinent]

  return (
    <>
      <div className="sticky top-[73px] z-40 border-b border-[#c5a050]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-4 py-8">
          <h4 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a050]">
            Choisissez un continent
          </h4>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
            {continents.map((continent) => (
              <Tab
                key={continent}
                label={continent}
                active={continent === activeContinent}
                onClick={() => setActiveContinent(continent)}
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
            {filteredRegions.map((region) => (
              <a
                key={region.title}
                href={`/catalogue?destination=${encodeURIComponent(region.title)}`}
                className="luxury-grid-card group relative aspect-[4/5] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="card-image h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${region.image}')` }}
                    aria-label={region.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform group-hover:-translate-y-2">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#c5a050]">
                    {region.area}
                  </span>
                  <h4 className="mb-4 text-3xl font-bold text-white">{region.title}</h4>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
                    <span className="material-symbols-outlined text-sm">sailing</span>
                    Découvrir les itinéraires
                  </div>
                </div>
              </a>
            ))}
          </div>
          {filteredRegions.length === 0 ? (
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
