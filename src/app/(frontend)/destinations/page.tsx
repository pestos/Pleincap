import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import DestinationsClient from "./DestinationsClient";
import { getDestinations, getFeaturedCruises } from '@/lib/payload-queries'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Destinations Culturelles | Plein Cap',
  description: "Voyages d'exception, continents et itinéraires culturels Plein Cap.",
}

function calculateDuration(departure: string, returnDate: string): number {
  const start = new Date(departure)
  const end = new Date(returnDate)
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

export default async function DestinationsPage() {
  const [destinations, featuredCruises] = await Promise.all([
    getDestinations(),
    getFeaturedCruises({ limit: 2 }),
  ])

  return (
      <div
          className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#F9F8F6] text-[#0A1128]`}
      >
          <SiteHeader />
          <main className="flex-1">
              <Hero />
              <DestinationsClient destinations={destinations} />
              <TopItineraries cruises={featuredCruises} />
          </main>
          <SiteFooter />
      </div>
  );
}

function Hero() {
  return (
      <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
              <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                      backgroundImage: "url('/bannerDestination.jpg')",
                  }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 " />
          </div>
          <div className="relative z-10 px-4 text-center drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
              <span className="mb-6 block text-sm font-bold uppercase tracking-[0.4em] text-[#c5a050]">
                  Voyages d'Exception
              </span>
              <h1 className="mb-8 text-5xl font-bold leading-tight text-white md:text-7xl">
                  Explorez le Monde: Destinations Culturelles
              </h1>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-light italic text-white/90">
                  L'art de la navigation au service de la culture et de la
                  découverte.
              </p>
          </div>
      </section>
  );
}


function TopItineraries({ cruises }: { cruises: any[] }) {
  if (cruises.length === 0) return null

  return (
    <section className="border-t border-[#c5a050]/5 bg-white px-6 pb-24 pt-24 lg:px-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-[#c5a050]">Sélection Premium</h4>
          <h2 className="text-4xl font-bold italic md:text-5xl">Itinéraires d'Exception</h2>
          <div className="mx-auto mt-8 h-px w-24 bg-[#c5a050]" />
        </div>
        <div className="space-y-12">
          {cruises.map((cruise: any) => {
            const imageUrl = cruise.featuredImage?.url || ''
            const days = calculateDuration(cruise.departureDate, cruise.returnDate)
            const price = cruise.price
              ? `À PARTIR DE ${cruise.price.toLocaleString('fr-FR')} \u20AC`
              : 'Prix sur demande'

            return (
              <article
                key={cruise.id}
                className="group flex flex-col items-start gap-8 border-b border-[#c5a050]/10 pb-12 md:flex-row"
              >
                <div className="aspect-[3/2] w-full overflow-hidden md:w-1/3">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={cruise.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-2xl font-bold italic transition-colors group-hover:text-[#c5a050]">{cruise.title}</h3>
                    <span className="text-sm font-bold tracking-widest text-[#c5a050]">{price}</span>
                  </div>
                  <p className="mb-6 leading-relaxed text-[#0A1128]/70">{cruise.excerpt}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider opacity-60">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      {days} Jours
                    </div>
                    <a
                      href={`/catalogue/${cruise.slug}`}
                      className="ml-auto flex items-center gap-2 border-b-2 border-[#c5a050] pb-1 text-xs font-bold uppercase tracking-widest transition-all group-hover:pr-2"
                    >
                      Découvrir <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-16 text-center">
          <a
            href="/catalogue"
            className="inline-block rounded-sm border-2 border-[#c5a050] px-12 py-4 font-bold uppercase tracking-[0.2em] text-[#c5a050] transition-all hover:bg-[#c5a050] hover:text-[#0A1128]"
          >
            Voir tous les itinéraires
          </a>
        </div>
      </div>
    </section>
  )
}
