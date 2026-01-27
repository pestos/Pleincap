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
  {
    area: 'Amériques',
    title: 'Patagonie & Andes',
    itineraries: 7,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGEQCJ-v36Y9Sf8ywHDFmMcCJr3GIID0ETJjmfNnOLSzThzJbXfbce3lBqlM5KX33QFIxy2YAFj0QpnazhvukmDmm15IUHuBDfxVUZTMrWfIOeUa-frchlZ1Omk-9N_9ivDJbAzPkHMwMG6Rt6O7a5ozALaHG9g1__TJ37dO2qI1nH65dwaKw9IiRIG6YOCNiD9qSfHZDzhmkluU5x3lIUhdls5vG3h9yNGk28SgCdOBFftTthxODEf2z8i1qxqZ6XK3jGYddCbcg',
  },
  {
    area: 'Asie Pacifique',
    title: 'Japon & Corée',
    itineraries: 9,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMX6Z0jbcI-w0UbU_u0ZdxdOmkmruKTItptJy6ZnvoBQ5DGEn-ZEzmB6JjThpWjMuWn3JXhjGw-KBYVeGsD2LblMoz4cZVMPJg8i16-LUA_vtlX-wS9ChM2C4_P-nkjxZi9ziPOBxoECHZgUyUZblsPAgRLMBFtZpdBB_N91oqkpwiwjhQyDmhzxAnXi1xTCNuAfqe7IEJbJ5JBe3baEjA2FhIQcwPSjvh88v9JRL9vrhT3PJBa2lktjbEyd9I2d5747J6p-CNunA',
  },
  {
    area: 'Afrique Australe',
    title: 'Namibie & Cap',
    itineraries: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8njPqwi3fRZJZgttqk2WI4HWK15cZJBIIorzwoBhv7iFLfIlOgP_d3e6iKigmQWaLSfKgu0OwrHOlPhqgWBbciIN779zUehBjRpvKsjkdkJlK-htTKdiq09U2NDcdufEi-d34gMRwA_Qz9BfT64uwhPII22qq4NUO2CEzOG3KCnvqcRCPbSpWGYKMu2zQEH8DdiZYY8awG6NeI3W6Kb5tFY0hcp7eDbHolwybuXCjNn-W0-TXvSJucgBBTYT-mE3NNfp7Q1J3RKU',
  },
  {
    area: 'Océanie',
    title: 'Déserts Rouges & Top End',
    itineraries: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWTPnrfH8kjDHN344CaNdEDz8DKBdGfxNQZXMkjrtw78ejl2Lgf0SJBKmDBhkU15sHrD6C0bCM0RSvVuWd-k0MCIwdIT_8_WJmCfyXiJZby7n-hPLbOuDSAPejm5b8BT6CNbgVS0S2IndeOenwU1n1phCGcKTXuN262JIUvAF7YbGce4aaLhlwn063iXDK1PQrb_vavqnDsdZ75QZjrtm5nbNGVbbSRdA5U_2QClfUxu777ZbIVSO3N-Xt04piO8a987QY7NRsW40',
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
              <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                      backgroundImage: "url('/bannerDestination.jpg')",
                  }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/45 via-transparent to-[#F9F8F6]" />
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

function ContinentTabs() {
  return (
    <div className="sticky top-[73px] z-40 border-b border-[#c5a050]/10 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <h4 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a050]">Choisissez un continent</h4>
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
      className={`text-lg font-medium tracking-wide ${active ? 'border-b-2 border-[#c5a050] text-[#c5a050]' : 'border-b-2 border-transparent text-[#0A1128] group-hover:border-[#c5a050]'}`}
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
            <button className="rounded-full border border-[#c5a050]/30 p-2 hover:bg-[#c5a050]/10">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="rounded-full border border-[#c5a050]/30 p-2 hover:bg-[#c5a050]/10">
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
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#c5a050]">{region.area}</span>
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
