import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CatalogueFilters from '@/components/CatalogueFilters'
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
  const voyageTypeFilter = typeof params.voyageType === 'string' ? params.voyageType : undefined

  const [cruisesResult, destinations, boats] = await Promise.all([
    getCruises({
      published: true,
      destinationId: destinationFilter,
      month: monthFilter,
      search: searchQuery,
      voyageType: voyageTypeFilter,
    }),
    getDestinations(),
    getBoats(),
  ])

  const cruises = cruisesResult.docs
  const totalPages = cruisesResult.totalPages

  const voyageTypeLabels: Record<string, string> = {
    maritime: 'Maritime',
    fluviale: 'Fluviale',
    train: 'Train',
    escapade: 'Escapade',
  }

  // Build filter options for sidebar
  const destinationOptions = destinations.map((d: any) => ({
    label: d.name,
    value: String(d.id),
  }))

  const voyageTypeOptions = Object.entries(voyageTypeLabels).map(([value, label]) => ({
    label,
    value,
  }))

  const boatOptions = boats.map((b: any) => ({
    label: b.name,
    value: String(b.id),
  }))

  // Resolve active filter labels for the banner
  const activeDestination = destinationFilter
    ? destinations.find((d: any) => String(d.id) === destinationFilter)
    : null
  const activeVoyageTypeLabel = voyageTypeFilter ? voyageTypeLabels[voyageTypeFilter] || voyageTypeFilter : null
  const activeMonthLabel = monthFilter
    ? (() => {
        const [year, m] = monthFilter.split('-').map(Number)
        const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
        return `${months[m - 1]} ${year}`
      })()
    : null
  const hasActiveFilters = !!activeDestination || !!activeMonthLabel || !!searchQuery || !!activeVoyageTypeLabel

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
              {activeVoyageTypeLabel && (
                <span className="border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                  {activeVoyageTypeLabel}
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
            <CatalogueFilters
              destinations={destinationOptions}
              voyageTypes={voyageTypeOptions}
              boats={boatOptions}
            />
          </aside>

          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between border-b border-abyss/10 pb-6 dark:border-white/10">
              <span className="font-serif text-sm italic">
                {cruises.length} voyage{cruises.length > 1 ? 's' : ''} de prestige sélectionné{cruises.length > 1 ? 's' : ''}
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

            {cruises.length === 0 ? (
              <div className="py-20 text-center">
                <span className="material-symbols-outlined mb-4 text-5xl text-primary/30">sailing</span>
                <p className="serif-heading mb-2 text-2xl">Aucun voyage trouvé</p>
                <p className="text-sm opacity-50">Essayez de modifier vos critères de recherche.</p>
                <Link
                  href="/catalogue"
                  className="mt-6 inline-block border border-primary px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white"
                >
                  Voir tous les voyages
                </Link>
              </div>
            ) : (
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
                            {cruise.price.toLocaleString('fr-FR')} {'\u20AC'}
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
            )}

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
