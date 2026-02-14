import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import DestinationsClient from "./DestinationsClient";
import { getDestinations } from '@/lib/payload-queries'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Destinations Culturelles | Plein Cap',
  description: "Voyages d'exception, continents et itinéraires culturels Plein Cap.",
}

type Itinerary = {
  title: string
  price: string
  days: string
  description: string
  image: string
}

const itineraries: Itinerary[] = [
  {
    title: "L'Archipel des Dieux",
    price: 'À PARTIR DE 4 250 €',
    days: '12 Jours',
    description:
      'Un périple à travers les Cyclades, de Santorin à Mykonos, sur les traces des mythes qui ont façonné notre culture. Conférence exclusive à bord par M. le Professeur Dupont.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvI-o9C8DPvyUWLrzKASgiLcQO6wobkf6lBpDMFstAz_1nLpl3CJk0U0hVQodd8Drjwd1_vBc7JDI6kT_TH-oVTyNM30lFXPZbE-uA4yzlqXWKOSIak-20k9pHO2M7yqRv5dz-Ylg4oFtO8M2Qmh6WDMFKVPKa-yx3BKB_BSDpKHyDOC_aMiaR1_smGD1CviLlQolH3okb7XFEKECDRp980zzxb8jCmwhoTyRHyDI8ren6KXw3gjZJ2dN_U3qbJ0AJZABxe6kKqiw',
  },
  {
    title: 'Trésors de la Mer Égée',
    price: 'À PARTIR DE 3 890 €',
    days: '10 Jours',
    description:
      "Explorez les cités ioniennes et les ports secrets du Dodécanèse. Une immersion historique entre l'Orient et l'Occident, guidée par nos experts en archéologie.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCg41DIXDw7TjKtShmKiXn4M6LSHu2IK2dNSl6ADx4qm4pfQRWT3j4XbtWcdlkqbOAnQZmyfkZc-COUZxI9vD5UuP0Z5BYcEc7JL4b5ELUaPgCxVE6Vy1Ss56P0aB_N0bHiLb5C-YhmV2SmQqwp4SZCFXiSwlJu2oAhFHrF8hjl0VP9UnYZooufnKK0t_OYND1I03Y9pSxdEM0rPtctEkN9BxWbwWeOn50p1OBOgRGFPftc-f7xXxS51zeLexp-RZCnycT3kBE-SLQ',
  },
]

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
      <div
          className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#F9F8F6] text-[#0A1128]`}
      >
          <SiteHeader />
          <main className="flex-1">
              <Hero />
              <DestinationsClient destinations={destinations} />
              <TopItineraries />
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


function TopItineraries() {
  return (
    <section className="border-t border-[#c5a050]/5 bg-white px-6 pb-24 pt-24 lg:px-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-[#c5a050]">Sélection Premium</h4>
          <h2 className="text-4xl font-bold italic md:text-5xl">Itinéraires de la Grèce Antique</h2>
          <div className="mx-auto mt-8 h-px w-24 bg-[#c5a050]" />
        </div>
        <div className="space-y-12">
          {itineraries.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col items-start gap-8 border-b border-[#c5a050]/10 pb-12 md:flex-row"
            >
              <div className="aspect-[3/2] w-full overflow-hidden md:w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <div className="mb-4 flex items-start justify-between">
                  <h3 className="text-2xl font-bold italic transition-colors group-hover:text-[#c5a050]">{item.title}</h3>
                  <span className="text-sm font-bold tracking-widest text-[#c5a050]">{item.price}</span>
                </div>
                <p className="mb-6 leading-relaxed text-[#0A1128]/70">{item.description}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider opacity-60">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    {item.days}
                  </div>
                  <button className="ml-auto flex items-center gap-2 border-b-2 border-[#c5a050] pb-1 text-xs font-bold uppercase tracking-widest transition-all group-hover:pr-2">
                    Découvrir <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="rounded-sm border-2 border-[#c5a050] px-12 py-4 font-bold uppercase tracking-[0.2em] text-[#c5a050] transition-all hover:bg-[#c5a050] hover:text-[#0A1128]">
            Voir tous les itinéraires
          </button>
        </div>
      </div>
    </section>
  )
}
