import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Destinations Culturelles | Plein Cap',
  description: 'Voyages d’exception, continents et itinéraires culturels Plein Cap.',
}

type Region = {
  area: string
  title: string
  itineraries: number
  image: string
}

type Itinerary = {
  title: string
  price: string
  days: string
  description: string
  image: string
}

const regions: Region[] = [
  {
    area: 'Méditerranée',
    title: 'Grèce & Îles',
    itineraries: 14,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMo_HmN41PISMYRq0nxhlCCENBAmgXLvzndycbKf3lzTzpNMYcq-L0MnecJcb4KBkQJM_bNyCyF8TqM7-Ip6_I3Edfj-AUGOgG9EUL1DTpc1ZsgO9zPqOPqHsf9kxnDMMpgj9pRi3FfkizMRz3F2gcsUK4uU7hkn7H3eROTHSzDpgjA0yCcUAzO6OHpnh7-YFUWVetSopNDKWjW0eyIWnwd-tr-QiOx86sgdRTQRx2DMvkvGWHXfRB-FhG1WZwC7OhM9enBAYvUSo',
  },
  {
    area: 'Méditerranée Centrale',
    title: 'Italie & Sicile',
    itineraries: 8,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkHdPyCgkyoQSEzDREtGB62rsjK_xNjmUKcQ0bCi8t5PFCmO3k17K5DpRerfPSB99NsVcq_7NPCzssgZ154qrdJMvKIUkZkjcPfpZiIsQIjWrQGM8O-DHVkZER6bE_TsrIoWBU_u7AQybSw3zH2KnXn3ONVRLxTKAzjVZvkPmCBuBNttdS0kmJlNJd4SJd6qd8OelLnqmKqgOwcffrwsBjlPB90TMhe5g3A-lkytmkxNof7m6z92UiA5J95hFSnh5ycvbyoWj-A9Q',
  },
  {
    area: 'Europe du Nord',
    title: 'Fjords Norvégiens',
    itineraries: 6,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1J_yZhAd-GR1343o0IekwbT_-B7ietBaL24lQKfghmRKPZrOEPkchBdFSm165CVV69Uszo8E-c9Vj836kTzTjERtsAqP_2g4MGPQRW1dmpAexxVxWVezqeGri-0xmshRJkZtAMnOTXhTfmyTQDiomizCKKgjlDsaCjE23cSLUy2d5sBwIMZhCqQ6_g2TxXZpmIX9u6vTTXKxArbDymG6Fo7DUuQqLxSUHjLKcPRzBGIjD8O44wDabthYGCDw0Sx5eQlNwYnffnBw',
  },
]

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

export default function DestinationsPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#F9F8F6] text-[#0A1128]`}>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ContinentTabs />
        <RegionGrid />
        <TopItineraries />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/40 via-transparent to-[#F9F8F6]" />
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACmvAEJ8OFlxx34FsfUJIpSX0VWKAQotlyBkMKG6AXG03fgYq0gah7ArSyQJ0McN_jaKjSLy49EmqoGHezC8gU8_pSydTfm9en9fHkguhlbYPsubX6ARCPtBXMS6KbT-MCFfap2DPmWAcT_DXnqqxrjs8o5AnblUoC1QJz3NJvmru_I7Si0BE6iepotdoyD8e4dN7YP4vUB0qv6tq8jEDNlQjCtWgKAbarIYQgrm6Osyz-u9p0nY_N42mzSktNt4l7AhsOfvvXu7U')",
          }}
        />
      </div>
      <div className="relative z-10 px-4 text-center">
        <span className="mb-6 block text-sm font-bold uppercase tracking-[0.4em] text-[#f4c025]">Voyages d'Exception</span>
        <h1 className="mb-8 text-5xl font-bold leading-tight text-white md:text-7xl">Explorez le Monde: Destinations Culturelles</h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-light italic text-white/90">
          L'art de la navigation au service de la culture et de la découverte.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-sm bg-[#f4c025] px-10 py-4 font-bold uppercase tracking-widest text-[#0A1128] transition-transform hover:scale-105">
            Découvrir nos continents
          </button>
        </div>
      </div>
    </section>
  )
}

function ContinentTabs() {
  return (
    <div className="sticky top-[73px] z-40 border-b border-[#f4c025]/10 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <h4 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#f4c025]">Choisissez un continent</h4>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
          <Tab label="Europe" active />
          <Tab label="Afrique" />
          <Tab label="Asie" />
          <Tab label="Amériques" />
          <Tab label="Océanie" />
        </div>
      </div>
    </div>
  )
}

function Tab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`group flex flex-col items-center ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-all'}`}
    >
      <span
        className={`text-lg font-medium tracking-wide ${active ? 'border-b-2 border-[#f4c025] text-[#f4c025]' : 'border-b-2 border-transparent text-[#0A1128] group-hover:border-[#f4c025]'}`}
      >
        {label}
      </span>
    </a>
  )
}

function RegionGrid() {
  return (
    <section className="bg-[#F9F8F6] px-6 pb-24 pt-24 lg:px-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold">L'Europe Millénaire</h3>
            <p className="mt-2 text-[#0A1128]/60">Le berceau des arts et de la civilisation.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-[#f4c025]/30 p-2 hover:bg-[#f4c025]/10">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="rounded-full border border-[#f4c025]/30 p-2 hover:bg-[#f4c025]/10">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <article key={region.title} className="luxury-grid-card relative aspect-[4/5] cursor-pointer overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="card-image h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${region.image}')` }}
                  aria-label={region.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left 0 w-full p-8 transition-transform group-hover:-translate-y-2">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#f4c025]">{region.area}</span>
                <h4 className="mb-4 text-3xl font-bold text-white">{region.title}</h4>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
                  <span className="material-symbols-outlined text-sm">sailing</span>
                  {region.itineraries} Itinéraires disponibles
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TopItineraries() {
  return (
    <section className="border-t border-[#f4c025]/5 bg-white px-6 pb-24 pt-24 lg:px-40">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-[#f4c025]">Sélection Premium</h4>
          <h2 className="text-4xl font-bold italic md:text-5xl">Itinéraires de la Grèce Antique</h2>
          <div className="mx-auto mt-8 h-px w-24 bg-[#f4c025]" />
        </div>
        <div className="space-y-12">
          {itineraries.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col items-start gap-8 border-b border-[#f4c025]/10 pb-12 md:flex-row"
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
                  <h3 className="text-2xl font-bold italic transition-colors group-hover:text-[#f4c025]">{item.title}</h3>
                  <span className="text-sm font-bold tracking-widest text-[#f4c025]">{item.price}</span>
                </div>
                <p className="mb-6 leading-relaxed text-[#0A1128]/70">{item.description}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider opacity-60">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    {item.days}
                  </div>
                  <button className="ml-auto flex items-center gap-2 border-b-2 border-[#f4c025] pb-1 text-xs font-bold uppercase tracking-widest transition-all group-hover:pr-2">
                    Découvrir <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="rounded-sm border-2 border-[#f4c025] px-12 py-4 font-bold uppercase tracking-[0.2em] text-[#f4c025] transition-all hover:bg-[#f4c025] hover:text-[#0A1128]">
            Voir tous les itinéraires
          </button>
        </div>
      </div>
    </section>
  )
}
