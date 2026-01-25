import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Notre Flotte: Les Navires Plein Cap',
  description: "La flotte Plein Cap : navires fluviaux et maritimes d'exception.",
}

type Ship = {
  name: string
  tag: 'Fluvial' | 'Maritime'
  atmosphere: string
  capacity: string
  decks: string
  image: string
}

const ships: Ship[] = [
  {
    name: 'M/S Amadeus Diamond',
    tag: 'Fluvial',
    atmosphere: "Un bijou d'élégance sur les rives de la Seine, alliant raffinement autrichien et art de vivre à la française.",
    capacity: '144 Passagers',
    decks: '4 Ponts passagers',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6xT7Q8LvU02vTHZTS6izBqXwC3qzAC5M6-EtBxb_lsB673TMTSEqKr-eNWyfV81jX-dlviQHIRyyTwXBCVHaQ9u-OeMPPgT5AS4_Szk67ntNEu903nyIUfapIcaX719TH2IixmkX2D2JCmoaSIhe_B65zLZ2n1i35NgWSGFC47n8-ZveMo49gEPl8YJnjC5i-vyqYOCfWpsg-oKKkCYgiUeKyc5QhI2ef4HkkHIEUADeJ4eWVbmaK7ASvQTRBIsYn9VMQjhCD8RQ',
  },
  {
    name: 'M/S Nile Excellence',
    tag: 'Fluvial',
    atmosphere: "Le privilège de naviguer sur le Nil à bord d'une unité de grand luxe, conçue pour l'immersion historique.",
    capacity: '60 Passagers',
    decks: '5 Ponts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3YGeIf8cqI0uTrdiAUiF_kLU-TtWs4haeWdAKQbtZ5BGNkVFZ96FOJjleHPw7WEMR8NLUldDpoWiGtrMJioNyMKkQPAShXEFebnm6Em-DdGEAH1W74W8d9E6bryB0tM05bYcSP6WrWsOohf8hHOkkG8-MgT4bsK_byM7M985jq2MChRx5S_NvItSSjuakxiAavOxiMP4vgmnPqJm02u5aOghsJiG1Ufr-gm43nTrA9OaNFPFr6JOiojJk39l303tI8aPykNESDzQ',
  },
  {
    name: 'M/V Monet',
    tag: 'Maritime',
    atmosphere: "Un yacht de charme pour explorer l'Adriatique, privilégiant la proximité avec la mer et les escales inédites.",
    capacity: '50 Passagers',
    decks: '3 Ponts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCncjeRYmk0WyvhBw587Zt_kSEBhCWGVycp1T83UVwMLXUgyDIDf51n-Nic2JrJJfCvEbxKxOtME4VGjt4fS3nns8MRo3LfzM_PTrZWlkekA5X-vnZSXqV39-w7TqQh2_a8lmwEMkH1lpdUZQSna9UmGej5oTZAxFYx2vbeLaa9pmHYLsrfSgOEKEZuinpAX-BpEIRIft5TkqYDIhMN5Un0cms7S26hckMX3jEbRsXWdd827g-UtCpQxPHhemaOEqvrxlouT-9FiNk',
  },
  {
    name: 'M/S Queen Isabel',
    tag: 'Fluvial',
    atmosphere: 'Le Douro révélé avec majesté. Un navire aux finitions précieuses pour une navigation contemplative.',
    capacity: '118 Passagers',
    decks: '4 Ponts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOL1x-gSQnsST4TetgHmt1wD1nZCIzQ1UXmdLJ8cXzd7X1t4miQxIekQkUaq8nGN3R95rp6gYLi-81rIYGS34wgWpnG3FaLP-HQVBZBFqAIqvfXi3lZ2sFmxxdRw_up8iijyokXyH0B42L1WZk4aRoI-KnwUDJ7KPfeDLP_h3NzQ5tzvcNEeKoQIdPlWY4A8TQXZOSXabWXQwPFrZlCFlxhWwStXtHUJp1zFH6DHIP6z5r1-LDWV0ZRJN6xdLClfVoPQ52TmJ_zxk',
  },
]

export default function NosBateauxPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f8f7f6] text-[#1A2433]`}>
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">
        <Hero />
        <Intro />
        <CategoryTabs />
        <ShipGrid />
        <Philosophy />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHIK-EjZk004aEYHvkoT1XKjsw8qMQhM2jyAmuifBF4zGU7GnocT412WvKzktGqP0hZSzis9bHwVINlz6U0rEZbaEArsYcXrWs9gwLYNa6pNvuCrTtFOYETH3krKB2jXGUZNptAdzuDZYTsgNpTVxgVm1yKYfWWR9QWK9WDqu0461ioUi3wQWzN2r5rKNbaU6afEzoPTQHE0Y6Zjjv13KQaPc1N6gkDp46_B8f86XiJZdaHHshMdz_QVHJkPVEW94OfHYBVVDwIEc')",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight text-white md:text-7xl">La Flotte Plein Cap : Sanctuaires Flottants</h1>
        <p className="max-w-2xl text-lg font-normal italic text-white/90 md:text-xl">
          L'intimité d'une croisière d'exception sur les plus beaux fleuves et mers du monde.
        </p>
        <div className="mt-12 text-4xl text-white">
          <span className="material-symbols-outlined animate-bounce">keyboard_double_arrow_down</span>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 text-center lg:px-[120px]">
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#eeb32b]">L'Exclusivité des Petits Navires</h2>
        <h3 className="text-3xl font-semibold leading-relaxed md:text-4xl">
          Découvrez une nouvelle dimension du voyage où le luxe se mesure à l'espace, au silence et à la personnalisation.
        </h3>
        <p className="text-lg leading-relaxed text-[#1A2433]/70">
          Nos navires à taille humaine vous ouvrent les portes de ports confidentiels et de paysages grandioses inaccessibles aux géants des mers. À bord de la
          flotte Plein Cap, chaque traversée est une invitation à la sérénité, portée par un service d'exception et une atmosphère feutrée.
        </p>
      </div>
    </section>
  )
}

function CategoryTabs() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-[120px]">
      <div className="flex justify-center border-b border-[#e7e0cf]">
        <div className="flex gap-12">
          <button className="flex flex-col items-center border-b-2 border-[#eeb32b] pb-4">
            <span className="text-sm font-bold uppercase tracking-widest text-[#1A2433]">Croisières Fluviales</span>
          </button>
          <button className="flex flex-col items-center border-b-2 border-transparent pb-4 transition-all hover:border-[#eeb32b]/50">
            <span className="text-sm font-bold uppercase tracking-widest text-[#1A2433]/50">Croisières Maritimes</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function ShipGrid() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-32 lg:px-[120px]">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {ships.map((ship) => (
          <article key={ship.name} className="group flex flex-col border border-[#e7e0cf] bg-white">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${ship.image}')` }}
                aria-label={ship.name}
              />
              <div className="absolute left-4 top-4 bg-[#eeb32b] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1A2433]">
                {ship.tag}
              </div>
            </div>
            <div className="flex flex-grow flex-col p-10">
              <h4 className="mb-4 text-3xl font-semibold leading-tight">{ship.name}</h4>
              <div className="mb-6 border-l-2 border-[#eeb32b] pl-4 text-base italic text-[#1A2433]/60">
                Atmosphère : "{ship.atmosphere}"
              </div>
              <div className="mb-10 grid grid-cols-2 gap-6 border-y border-[#f3f0e7] py-6">
                <Info label="Capacité" value={ship.capacity} icon="groups" />
                <Info label="Ponts" value={ship.decks} icon="layers" />
              </div>
              <div className="mt-auto">
                <button className="w-full border border-[#eeb32b] px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#1A2433] transition-all hover:bg-[#eeb32b] hover:text-[#1A2433]">
                  Découvrir le navire
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Info({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="material-symbols-outlined text-[#eeb32b]">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#1A2433]/50">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  )
}

function Philosophy() {
  return (
    <section className="bg-[#1A2433] py-24 text-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          <div className="flex-1 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#eeb32b]">Notre Art de Vivre</h2>
            <h3 className="text-4xl font-semibold leading-tight">Plus qu'une croisière, une parenthèse enchantée.</h3>
            <p className="text-lg leading-relaxed text-white/70">
              À bord de Plein Cap, chaque détail est pensé pour votre confort. De la gastronomie inspirée des terroirs visités aux conférences de nos experts,
              nous cultivons une approche humaniste du voyage.
            </p>
            <a
              href="#"
              className="inline-block border-b border-[#eeb32b] pb-1 text-sm font-bold uppercase tracking-widest text-[#eeb32b] transition-all hover:border-white hover:text-white"
            >
              En savoir plus sur notre philosophie
            </a>
          </div>
          <div className="flex-1">
            <div
              className="relative aspect-video overflow-hidden border border-white/10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXkSnuIRHgG9TI6-m4PZmR-bIQ8SzGDCSnd_f3ciai0XorRgrmpRXPEmG5Gy2nunOu6rYHFab-c11xocxMwd3Dd73x0wVJA9wu2CZu37BBMqK2XAsTlUUOz9GcjHy15zpy5R2GnTyLRbrtT5QkF6Avm90OA7f9QKWvijfp_iDL4xvj9KlhHNf0pFtgiFU3NaAkCltMUM5RsiyahdmGt5_5GwAnOBnYtBU--rdoSS_e_-m2ccPSKZcl9CJbWcwsIFBisxEa8ApNOAs')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-label="Cabine avec vue panoramique sur la mer"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
