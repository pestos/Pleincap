import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getCruises, getDestinations, getBoats } from '@/lib/payload-queries'
import Link from 'next/link'

type Media = { url?: string; alt?: string; id?: number | string }

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Plein Cap Cruises Catalogue - Boutique Luxury Voyages',
  description: "Catalogue des croisières d'exception Plein Cap",
}

function formatFrenchDate(dateString: string): string {
  const date = new Date(dateString)
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

function calculateDuration(departure: string, returnDate: string): string {
  const start = new Date(departure)
  const end = new Date(returnDate)
  const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return `${days} Jours`
}

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Catalogue({ searchParams }: PageProps) {
  const params = await searchParams
  const destinationFilter = typeof params.destination === 'string' ? params.destination : undefined
  const monthFilter = typeof params.month === 'string' ? params.month : undefined
  const searchQuery = typeof params.q === 'string' ? params.q : undefined

  const [cruisesResult, destinations, boats] = await Promise.all([
    getCruises({
      published: true,
      destinationId: destinationFilter,
      month: monthFilter,
      search: searchQuery,
    }),
    getDestinations(),
    getBoats(),
  ])

  const cruises = cruisesResult.docs
  const totalPages = cruisesResult.totalPages

  // Derive voyage types from cruises data
  const voyageTypeLabels: Record<string, string> = {
    maritime: 'Maritime',
    fluviale: 'Fluviale',
    train: 'Train',
    escapade: 'Escapade',
  }
  const voyageTypes = Array.from(new Set(
    cruises
      .map((c: any) => c.voyageType)
      .filter(Boolean)
  )) as string[]

  const destinationNames = destinations.map((d: any) => d.name).filter(Boolean)
  const boatNames = boats.map((b: any) => b.name).filter(Boolean)

  // Resolve active filter labels
  const activeDestination = destinationFilter
    ? destinations.find((d: any) => String(d.id) === destinationFilter)
    : null
  const activeMonthLabel = monthFilter
    ? (() => {
        const [year, m] = monthFilter.split('-').map(Number)
        const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
        return `${months[m - 1]} ${year}`
      })()
    : null
  const hasActiveFilters = !!activeDestination || !!activeMonthLabel || !!searchQuery

  return (
    <div
      className={`${plusJakarta.className} relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-background-light`}
    >
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-24 pt-36 md:pt-40 lg:px-12">
        <div className="mb-16">
          <h2 className="serif-heading mb-6 text-5xl text-abyss dark:text-white md:text-7xl">
            Catalogue des Itinéraires
          </h2>
          <p className="max-w-2xl font-serif text-xl italic text-abyss/60 dark:text-background-light/60">
            L'élégance du voyage à la française, des fleuves d'Europe aux horizons lointains.
          </p>
          {hasActiveFilters && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Filtres actifs :</span>
              {searchQuery && (
                <span className="border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                  &laquo; {searchQuery} &raquo;
                </span>
              )}
              {activeDestination && (
                <span className="border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                  {(activeDestination as any).name}
                </span>
              )}
              {activeMonthLabel && (
                <span className="border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                  {activeMonthLabel}
                </span>
              )}
              <Link
                href="/catalogue"
                className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
              >
                Effacer les filtres
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-16 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-72">
            <div className="sticky top-32 space-y-10">
              <div className="flex items-center justify-between border-b border-abyss/20 pb-4 dark:border-white/20">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Filtres Avancés</h3>
                <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                  Réinitialiser
                </button>
              </div>

              <div className="space-y-10">
                {destinationNames.length > 0 && (
                  <FilterBlock
                    title="Destination"
                    options={destinationNames}
                  />
                )}
                {voyageTypes.length > 0 && (
                  <FilterBlock
                    title="Type de croisières"
                    options={voyageTypes.map(v => voyageTypeLabels[v] || v)}
                  />
                )}
                <FilterBlock title="Accompagnement" options={["Voyage accompagné"]} />

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="relative">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                        Date de début
                      </label>
                      <input
                        className="rounded-none border-abyss/20 bg-transparent p-3 text-xs font-bold uppercase tracking-widest focus:border-primary focus:ring-primary dark:border-white/20"
                        type="date"
                      />
                    </div>
                    <div className="relative">
                      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                        Date de fin
                      </label>
                      <input
                        className="rounded-none border-abyss/20 bg-transparent p-3 text-xs font-bold uppercase tracking-widest focus:border-primary focus:ring-primary dark:border-white/20"
                        type="date"
                      />
                    </div>
                  </div>
                </div>

                {boatNames.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-abyss dark:text-white">
                      <span className="text-xs font-bold uppercase tracking-widest">Bateaux</span>
                    </div>
                    <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
                      <FilterBlock
                        title=""
                        options={boatNames}
                        hideTitle
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between border-b border-abyss/10 pb-6 dark:border-white/10">
              <span className="font-serif text-sm italic">
                {cruises.length} voyages de prestige sélectionnés
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                  Trier par :
                </span>
                <div className="relative">
                  <div className="group flex cursor-pointer items-center gap-6 border-b border-abyss/30 pb-2">
                    <span className="font-serif text-sm text-abyss dark:text-white">Date de départ</span>
                    <span className="material-symbols-outlined text-base text-primary">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
              {cruises.map((cruise: any) => {
                const featuredImage = cruise.featuredImage as Media | undefined
                const boat = typeof cruise.boat === 'object' ? cruise.boat : null
                const destination = typeof cruise.destination === 'object' ? cruise.destination : null

                return (
                  <Link
                    key={cruise.id}
                    href={`/catalogue/${cruise.slug}`}
                    className="group flex flex-col"
                  >
                    <div className="relative mb-8 aspect-[3/4] overflow-hidden bg-abyss/5">
                      {featuredImage?.url && (
                        <img
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          src={featuredImage.url}
                          alt={featuredImage.alt || cruise.title}
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-abyss/90 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                        <span className="border-b border-primary/40 pb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">
                          Voir l'itinéraire
                        </span>
                      </div>
                      {destination && (
                        <div className="absolute left-6 top-6 z-10">
                          <span className="border border-abyss/5 bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-abyss">
                            {destination.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="mb-3 flex items-baseline gap-3">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          Prochain départ
                        </span>
                        <span className="border-b border-primary/30 text-lg font-serif italic">
                          {formatFrenchDate(cruise.departureDate)}
                        </span>
                      </div>
                      <h3 className="serif-heading mb-3 text-3xl leading-tight transition-colors group-hover:text-primary">
                        {cruise.title}
                      </h3>
                      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] opacity-50">
                        {cruise.excerpt}
                      </p>
                    </div>

                    <div className="mb-8 flex items-center gap-6 border-l border-primary/40 pl-5 text-[11px] font-bold uppercase tracking-widest">
                      <span className="opacity-60">
                        {calculateDuration(cruise.departureDate, cruise.returnDate)}
                      </span>
                      <span className="opacity-20">/</span>
                      {boat && (
                        <>
                          <span className="opacity-60">{boat.name}</span>
                          <span className="opacity-20">/</span>
                        </>
                      )}
                      <span className="text-primary">Croisière accompagnée</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-abyss/5 pt-6 dark:border-white/5">
                      <div>
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                          À partir de
                        </span>
                        <span className="text-2xl font-bold">
                          {cruise.price.toLocaleString('fr-FR')} \u20AC
                        </span>
                        <span
                          className="mt-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-primary hover:underline"
                        >
                          Prochaines dates
                        </span>
                      </div>
                      <span className="border border-abyss px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-abyss hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-abyss">
                        Découvrir
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-24 flex items-center justify-center gap-2">
                <button className="flex h-12 w-12 items-center justify-center border border-abyss/10 opacity-30">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`flex h-12 w-12 items-center justify-center text-xs font-bold transition-colors ${
                      i === 0
                        ? 'bg-abyss text-white'
                        : 'hover:bg-abyss/5'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
                <button className="flex h-12 w-12 items-center justify-center border border-abyss/20">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function FilterBlock({ title, options, defaultChecked = [], hideTitle = false }: { title: string; options: string[]; defaultChecked?: number[]; hideTitle?: boolean }) {
  return (
    <div className="space-y-2">
      {!hideTitle && (
        <div className="flex items-center gap-2 text-abyss dark:text-white">
          <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
        </div>
      )}
      <div className="space-y-2">
        {options.map((label, idx) => (
          <label key={label} className="group flex cursor-pointer items-center gap-3">
            <input
              className="h-4 w-4 rounded-none border-abyss/20 bg-transparent text-primary focus:ring-primary dark:border-white/20"
              type="checkbox"
              defaultChecked={defaultChecked.includes(idx)}
            />
            <span className="text-xs font-medium uppercase tracking-tight transition-colors group-hover:text-primary">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
