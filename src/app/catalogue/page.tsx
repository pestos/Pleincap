import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ReactNode } from 'react'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Plein Cap Cruises Catalogue - Boutique Luxury Voyages',
  description: "Catalogue des croisières d'exception Plein Cap",
}

type CruiseCard = {
  title: string
  route: string
  departure: string
  duration: string
  ship: string
  tag: string
  region: string
  type: string
  price: string
  image: string
  alt: string
  overlay: ReactNode
}

const cruises: CruiseCard[] = [
  {
    title: "L'Odyssée des Dieux : Mythes de l'Égée",
    route: 'Athènes — Rhodes — Patmos — Dubrovnik',
    departure: '14 Juin 2024',
    duration: '12 Jours',
    ship: 'MS Berlin',
    tag: 'Maritime',
    region: 'Europe',
    type: 'Croisière accompagnée',
    price: '2,490 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGEQCJ-v36Y9Sf8ywHDFmMcCJr3GIID0ETJjmfNnOLSzThzJbXfbce3lBqlM5KX33QFIxy2YAFj0QpnazhvukmDmm15IUHuBDfxVUZTMrWfIOeUa-frchlZ1Omk-9N_9ivDJbAzPkHMwMG6Rt6O7a5ozALaHG9g1__TJ37dO2qI1nH65dwaKw9IiRIG6YOCNiD9qSfHZDzhmkluU5x3lIUhdls5vG3h9yNGk28SgCdOBFftTthxODEf2z8i1qxqZ6XK3jGYddCbcg',
    alt: 'Ancient Greek ruins overlooking the turquoise Mediterranean sea',
    overlay: (
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <svg className="h-auto w-full text-primary" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,100 Q40,60 60,70 T80,30" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
          <circle cx="20" cy="100" r="2.5" fill="currentColor" />
          <circle cx="60" cy="70" r="2.5" fill="currentColor" />
          <circle cx="80" cy="30" r="2.5" fill="currentColor" />
          <circle cx="79" cy="50" r="2.5" fill="currentColor" />
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="15" y="112">Athènes</text>
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="45" y="80">Rhodes</text>
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="65" y="24">Dubrovnik</text>
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="85" y="51">Paris</text>
        </svg>
        <span className="absolute bottom-4 border-b border-primary/40 pb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">
          Voir le tracé
        </span>
      </div>
    ),
  },
  {
    title: 'Symphonie Boréale : Fjords de Norvège',
    route: 'Bergen — Geiranger — Îles Lofoten — Tromsø',
    departure: '08 Août 2024',
    duration: '10 Jours',
    ship: "MS Belle de l'Adriatique",
    tag: 'Maritime',
    region: 'Europe',
    type: 'Croisière thématique',
    price: '3,150 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAd6B3sdOAZ2jJopHEMmns2QePzvOhFKS4UKOAkxlMsjpMo2WaOzyPzV2Mn9VIkuwrxpkRLujVK_H_0Mt9IRpVZ8IgWT0dSVmbXa7kvskxc3s5jU9vQnBCdy7TSVlIHpkm8dEnkCnjS4MO7Mh2zfQ69kk9PgvoomzVUNKknlzVn0_T3B98JuesrFzzuPlHIWZH29O0AalQ5pzPur5mW9OlR9Umo_aHiMXCJLCPy1s8NsiLy_K1mod8WnhwmYpA2DPUQPCiYioSeB2U',
    alt: 'A small white cruise ship sailing through Norwegian fjords',
    overlay: (
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <svg className="h-auto w-full text-primary" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,110 L50,80 L70,40 L30,20" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
          <circle cx="50" cy="110" r="2.5" fill="currentColor" />
          <circle cx="50" cy="80" r="2.5" fill="currentColor" />
          <circle cx="70" cy="40" r="2.5" fill="currentColor" />
          <circle cx="30" cy="20" r="2.5" fill="currentColor" />
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="40" y="118">
            Bergen
          </text>
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="25" y="12">
            Tromsø
          </text>
        </svg>
        <span className="absolute bottom-4 border-b border-primary/40 pb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">
          Voir le tracé
        </span>
      </div>
    ),
  },
  {
    title: 'Le Danube Impérial : De Vienne à Belgrade',
    route: 'Vienne — Budapest — Belgrade — Portes de Fer',
    departure: '12 Septembre 2024',
    duration: '11 Jours',
    ship: 'MS Cyrano de Bergerac',
    tag: 'Fluviale',
    region: 'Europe',
    type: 'Croisière accompagnée',
    price: '2,880 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHw9tOHxEPtnK2h2J-naJD9wzXuj4S90hU35gzTfR4o-mdPyp-Pj6TPDaCz3L62KmPVdPDjlyPB_b-dk1h8cE1FdUfXS1HTSLr8AmFUCTwdoMyk1MUKUmfyXFnLKhloF4EP9XwtSZ8AhTN8LgXhu9OSGmghJ7-Schhr4iB47AbKYlWUMVWMWKzJDIQ6vYOuxzZzeSctz4ZPIoWGAKfQWbM_h5JW8RYFJ3wx_hHxccplgUl2V59q-8PN_f9eqB1eRU28joCdJXcgRk',
    alt: 'A historic city on the banks of a wide river',
    overlay: (
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <svg className="h-auto w-full text-primary" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,40 C30,30 70,60 90,50" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
          <circle cx="10" cy="40" r="2.5" fill="currentColor" />
          <circle cx="50" cy="45" r="2.5" fill="currentColor" />
          <circle cx="90" cy="50" r="2.5" fill="currentColor" />
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="5" y="32">
            Vienne
          </text>
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="35" y="60">
            Budapest
          </text>
        </svg>
        <span className="absolute bottom-4 border-b border-primary/40 pb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">
          Voir le tracé
        </span>
      </div>
    ),
  },
  {
    title: 'La Belle Époque du Nil : Voyage Intemporel',
    route: 'Louxor — Edfou — Kom Ombo — Assouan',
    departure: '22 Octobre 2024',
    duration: '12 Jours',
    ship: 'Vapeur Authentique',
    tag: 'Fluviale',
    region: 'Afrique',
    type: 'Accompagnement Expert',
    price: '4,200 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDHqvOi1bOsPannTaV89z_cEzFl9QtKfyfIxOy_FUo5Buujm2tKamLEyPXCn4LXsIVOuL9FwCDvZKnK3mvy1WTr3d2W2j4CuE7puBl26NDtwFYJ2ItuXPvckoBR4FruVqEK4WZZrw2SgYmCaVGOEO7eZPCDYyk-ZVDr8YQ2Pw7gITUlHKlnwFXZJSgBTg7SXDRNKCzMUc0B2AOfIUZ7PwV4ld0f0QNMJrqVFcyqHf0C95WYWSX1NzRbEiNMiDUD4a2KaYehv_CNoI',
    alt: 'Traditional luxury ship interior with wood and brass',
    overlay: (
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <svg className="h-auto w-full text-primary" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,20 L50,60 L50,100" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
          <circle cx="50" cy="20" r="2.5" fill="currentColor" />
          <circle cx="50" cy="60" r="2.5" fill="currentColor" />
          <circle cx="50" cy="100" r="2.5" fill="currentColor" />
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="55" y="22">
            Louxor
          </text>
          <text fill="white" fontFamily="Plus Jakarta Sans" fontSize="5" fontWeight="bold" x="55" y="102">
            Assouan
          </text>
        </svg>
        <span className="absolute bottom-4 border-b border-primary/40 pb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">
          Voir le tracé
        </span>
      </div>
    ),
  },
]

export default function Catalogue() {
  return (
    <div className={`${plusJakarta.className} relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-background-light`}>
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-24 pt-28 lg:px-12">
        <div className="mb-16">
          <h2 className="serif-heading mb-6 text-5xl text-abyss dark:text-white md:text-7xl">Catalogue des Itinéraires</h2>
          <p className="max-w-2xl font-serif text-xl italic text-abyss/60 dark:text-background-light/60">
            L'élégance du voyage à la française, des fleuves d'Europe aux horizons lointains.
          </p>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-72">
            <div className="sticky top-32 space-y-10">
              <div className="flex items-center justify-between border-b border-abyss/20 pb-4 dark:border-white/20">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Filtres Avancés</h3>
                <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Réinitialiser</button>
              </div>

              <div className="space-y-10">
                <FilterBlock title="Destination" options={['Méditerranée', 'Europe du Nord', 'Adriatique']} defaultChecked={[0]} />
                <FilterBlock title="Type de croisières" options={['Fluviale', 'Maritime']} />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-abyss dark:text-white">
                    <span className="text-xs font-bold uppercase tracking-widest">Dates</span>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full rounded-none border-abyss/20 bg-transparent p-3 text-xs font-bold uppercase tracking-widest focus:border-primary focus:ring-primary dark:border-white/20"
                      type="date"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-abyss dark:text-white">
                    <span className="text-xs font-bold uppercase tracking-widest">Bateaux</span>
                  </div>
                  <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
                    <FilterBlock title="" options={['MS Berlin', "MS Belle de l'Adriatique", 'Vapeur Authentique', 'MS Cyrano de Bergerac']} hideTitle />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-10 flex items-center justify-between border-b border-abyss/10 pb-6 dark:border-white/10">
              <span className="font-serif text-sm italic">12 voyages de prestige sélectionnés</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Trier par :</span>
                <div className="relative">
                  <div className="group flex cursor-pointer items-center gap-6 border-b border-abyss/30 pb-2">
                    <span className="font-serif text-sm text-abyss dark:text-white">Date de départ</span>
                    <span className="material-symbols-outlined text-base text-primary">expand_more</span>
                  </div>
                  <div className="absolute right-0 top-full z-50 mt-[1px] hidden w-64 border border-primary/20 bg-ecru shadow-lg transition group-hover:block dark:bg-abyss">
                    <div className="py-1">
                      {['Date de départ', 'Prix croissants', 'Prix décroissants'].map((option, idx) => (
                        <div
                          key={option}
                          className={`cursor-pointer px-8 py-5 text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-colors hover:bg-primary/5 hover:text-primary ${
                            idx === 0 ? 'text-abyss dark:text-white border-b border-abyss/5' : 'text-abyss/80 dark:text-white/80'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
              {cruises.map((cruise) => (
                <article key={cruise.title} className="group flex flex-col">
                  <div className="relative mb-8 aspect-[3/4] overflow-hidden bg-abyss/5">
                    <img
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      src={cruise.image}
                      alt={cruise.alt}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-abyss/90 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      {cruise.overlay}
                    </div>
                    <div className="absolute left-6 top-6 z-10">
                      <span className="border border-abyss/5 bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-abyss">
                        {cruise.region}
                      </span>
                    </div>
                    <div className="absolute right-6 top-6 z-10">
                      <span className="border border-abyss/10 bg-background-light/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-abyss dark:border-white/10 dark:bg-abyss/90 dark:text-white">
                        {cruise.tag}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-3 flex items-baseline gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Prochain départ</span>
                      <span className="border-b border-primary/30 text-lg font-serif italic">{cruise.departure}</span>
                    </div>
                    <h3 className="serif-heading mb-3 text-3xl leading-tight transition-colors group-hover:text-primary">{cruise.title}</h3>
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] opacity-50">{cruise.route}</p>
                  </div>

                  <div className="mb-8 flex items-center gap-6 border-l border-primary/40 pl-5 text-[11px] font-bold uppercase tracking-widest">
                    <span className="opacity-60">{cruise.duration}</span>
                    <span className="opacity-20">/</span>
                    <span className="opacity-60">{cruise.ship}</span>
                    <span className="opacity-20">/</span>
                    <span className="text-primary">{cruise.type}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-abyss/5 pt-6 dark:border-white/5">
                    <div>
                      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">À partir de</span>
                      <span className="text-2xl font-bold">{cruise.price}</span>
                      <a className="mt-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-primary hover:underline" href="#">
                        Prochaines dates
                      </a>
                    </div>
                    <button className="border border-abyss px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-abyss hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-abyss">
                      Découvrir
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-24 flex items-center justify-center gap-2">
              <button className="flex h-12 w-12 items-center justify-center border border-abyss/10 opacity-30">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="flex h-12 w-12 items-center justify-center bg-abyss text-xs font-bold text-white">01</span>
              <button className="flex h-12 w-12 items-center justify-center text-xs font-bold transition-colors hover:bg-abyss/5">02</button>
              <button className="flex h-12 w-12 items-center justify-center text-xs font-bold transition-colors hover:bg-abyss/5">03</button>
              <button className="flex h-12 w-12 items-center justify-center border border-abyss/20">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
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
