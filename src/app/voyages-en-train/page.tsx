import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Voyages en Trains : Réalisme & Anthologie - Plein Cap',
  description:
    'Voyages ferroviaires d’exception par Plein Cap : Orient-Express, Transsibérien, Royal Scotsman et art de vivre à bord.',
}

type Journey = {
  title: string
  subtitle: string
  badge: string
  image: string
  alt: string
  nextDeparture: string
  duration: string
  price: string
  description: string[]
}

const journeys: Journey[] = [
  {
    title: "L'Orient-Express : De Paris à Istanbul",
    subtitle: 'Itinéraire historique : La Traversée des Empires',
    badge: 'Europe / Asie',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAY_jwdquJ47VhVZL8bVh8aiGFR1IwLrPeFf-ry73zqHvs8ugtfR7DyabM3ueNb7u0gOSmvODigFUvrcIj0KUWweOTBgJxluk5_NHh97NEIE8NUaDwx-dCyRaYtK82B7fCusKZnxNnkPWU0kihs3KnAkdcgWN2aOKj8KFpvLaXHclVkoIwBWZHRkLvLZBszlpfeSpCA7bBikM80uVZXhZ8CGjcsAXzNuBd3IWATk3cP1XfMNVCkyfNufqplh5gSTKYRvBP7Xt3W-hQ',
    alt: "L'Orient Express en montagne",
    nextDeparture: '24 Mai 2025',
    duration: '12 Jours / 11 Nuits',
    price: '12,400 €',
    description: [
      "Plongez dans l'âge d'or du rail à bord du train le plus célèbre au monde. De la Ville Lumière aux rives du Bosphore, ce voyage traverse sept pays et des siècles d'histoire européenne.",
      "Chaque wagon-lit, restauré avec une précision d'orfèvre, raconte une histoire de diplomatie et de romance. Les dîners de gala et les paysages alpins qui s'effacent devant les plaines des Balkans créent une parenthèse hors du temps.",
    ],
  },
  {
    title: 'Le Transsibérien : Épopée Impériale',
    subtitle: 'Accompagné par Jean-Pierre Robin, Historien du Monde Slave',
    badge: 'Asie',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAS8FviOMHWDZiIF3wmPaMsRqn_Y3hfi9iCGTSehBPmO9kVFM6rws1w5wQIQzhV0okrkBFAM6awhyCbqqQ7TdX7Q0ck15Sa2OSif-RfLiziprRw0yn3msjeg7ZvY7JYv3dVfXXWx6HbKU6sin3SGHYqJtzvXLjGAFggzJEsJcCS2u9H240z_gky1Ps1qJMHadgbgoeZeZb93dyQvcBw1ma8y8G_vgT2njSZKdKCqFMHFk2VQuoW9mQqL_ZKzv_xC1tg_r9BlCPMVaE',
    alt: 'Train de luxe traversant la steppe sibérienne',
    nextDeparture: '15 Juin 2025',
    duration: '16 Jours / 15 Nuits',
    price: '8,950 €',
    description: [
      'Plus qu\'un voyage, une légende qui s\'étend sur deux continents. Traversez l\'immensité de la steppe, longez le lac Baïkal et découvrez les cités de la Route de la Soie à bord d\'un palace roulant.',
      "Cette version exclusive privilégie les arrêts culturels prolongés : de l'architecture impériale de Moscou aux monastères bouddhistes de Mongolie. Un cycle de conférences éclaire les enjeux géopolitiques et culturels.",
    ],
  },
  {
    title: 'Le Royal Scotsman : Terres Écossaises',
    subtitle: 'Terres de Légendes et Châteaux des Highlands',
    badge: 'Europe',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkfRuTt3_S48Dx-wTl1wSTOczbJFtDeC5FhntpgFxhWKGvg_CTeMoqSY5F_uxCpL0L3MB5Ns1esiEjvsy8SFoLj27FOm2mhaqyqyxnLXupWFARMQIvGBlWvJjcnucxt6TbNBIvVlOt0xb92yvDbkKJAZex3jRjMzxc58JR_gFuT1UXQjKnbCy9_PRSvD_tnG_Ysruj1Su9xQP4R1_Q4F_8Ul7L4dTX_jJZEH3-T9TBPzB-V06s1MyjVUNNNDZNL-4h6NGtW8bdb98',
    alt: 'The Royal Scotsman dans les Highlands',
    nextDeparture: '08 Septembre 2025',
    duration: '8 Jours / 7 Nuits',
    price: '7,600 €',
    description: [
      'Le raffinement britannique poussé à son paroxysme. Ce train de luxe ne transporte que 36 passagers, offrant une atmosphère de club privé itinérant à travers les paysages des Highlands.',
      "Au programme : visites privées de distilleries ancestrales, dîners en kilt dans la voiture-restaurant en acajou et observation des aigles depuis la plateforme panoramique.",
    ],
  },
]

const suggestions = [
  {
    title: 'Al-Andalus : Trésors Mauresques',
    price: 'À partir de 4,200 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhf3X3aWVOKgNOAH4cpCSBNg4Aoc88rzuETOSdd-CEmZ1ZJmsr3V5wlcBqMn04RuF7RHoii29JTvA1Dgq1nFGNqtnHaf7aMyH1yMpRIZPhY4sm_Vq0vRUPbyMAwBF1QwbqQNU95d2d-oFSIiSr2kA49cgaZ23XPB6L-EkU7NZ5AemxHGcoWDIry82gW55NjORa1WwBFd9EPPQ4hS_1Cqvg33lcol32Z5-GhvIqTEOcv6y1ReYlRoIUWK3EiutIr7AJdz0c6AWUlAU',
  },
  {
    title: "The Ghan : Coeur de l'Australie",
    price: 'À partir de 5,450 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWTPnrfH8kjDHN344CaNdEDz8DKBdGfxNQZXMkjrtw78ejl2Lgf0SJBKmDBhkU15sHrD6C0bCM0RSvVuWd-k0MCIwdIT_8_WJmCfyXiJZby7n-hPLbOuDSAPejm5b8BT6CNbgVS0S2IndeOenwU1n1phCGcKTXuN262JIUvAF7YbGce4aaLhlwn063iXDK1PQrb_vavqnDsdZ75QZjrtm5nbNGVbbSRdA5U_2QClfUxu777ZbIVSO3N-Xt04piO8a987QY7NRsW40',
  },
  {
    title: 'Inde : Splendeurs du Rajasthan',
    price: 'À partir de 6,120 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnP_GcdU3AhL1RZKNajLeNPa9EdsrSXzeSujhn7dcNFI2KymctBnRd9lOtEIZUBazkl2P55bLM4Z5Pl5BZkwdv9uk1kO05ZtDMydZyjjrODuMgs1GHYPxlUI0t8ZS76r8nNioSlB19bD0mZPiscTYpIHdFDcT5hpRqbRrNH4tpN95lJ5rwVv6y7rAC3QY59S1XEpe9u_F0I-H26btfSNAe44riy0i6AwGz_EdV6VtGmfwnJr20_CZPkDncmMilBPkMQYhHQwExQcY',
  },
  {
    title: 'Venice Simplon-Orient-Express',
    price: 'À partir de 9,800 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGg9DGp5J9CkOxJenhnYXpGibVruKOzO-JG2HKbxH6qqSLLeWsdwizmn01DJIYVwrgBs9k24s7XnFfPLtPEmmXVefm02y5nSivMsqb3fPWwut5LRo3kkBBtE24WGu6wKOodyEuGKKX7agtH4Fo6uMR14hLjKTrVGxXcwcOSuGo4uZcFTpbyFVf7LPeb_nHJp2HP_ma9H11CloD3K99IIiiFJ2QiMNSNg5HP5K_i370uQ5jTLMRTc6Lk13lCb4NEsbonGKKnfMibkY',
  },
]

export default function VoyagesEnTrainPage() {
  return (
    <div className={`${plusJakarta.className} min-h-screen bg-ecru text-abyss`}>
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-6 pt-32 pb-24 lg:px-12">
        <Hero />
        <Filters />
        <section className="space-y-28 md:space-y-36">
          {journeys.map((journey, index) => (
            <JourneyBlock key={journey.title} journey={journey} reverse={index % 2 === 1} />
          ))}
        </section>
        <ArtDeVivre />
        <Suggestions />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="mb-16">
      <div className="relative w-full overflow-hidden bg-abyss shadow-2xl">
        <div className="aspect-[21/9]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUwzb-u3iY47-2G60_hiwTn40vRPPOfLSqv5oD6V4Ct-FSWRQlcX94bV3V6BQ-o0aLeaMoj9tZTeEbEXugi9VTZE6aSj1XB6phd7OxG86Q8BH0IZwkaDDiKkTR9s7UZHp3LDDPLVgjlg_kNpThi37XBcndBc-V265ZCMBPawBdxWseNxGA9yFGde7DIVBcLiOauQvPSLMQYfkNLfDF-aIKgcagGyHB4F7G3hrgQZatxo5DWXy4l9q2Wn1uNN4KLzfaRQY6IJxvp50"
            alt="Train de luxe d'époque dans un paysage montagneux"
            className="h-full w-full scale-100 object-cover grayscale-[10%] transition-all duration-[2000ms] hover:scale-105 hover:grayscale-0"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss/40" />
      </div>
      <div className="mx-auto mt-14 max-w-4xl text-center">
        <span className="mb-6 block text-xs font-bold uppercase tracking-[0.4em] text-primary">Collection Journal de Bord</span>
        <h2 className="mb-10 font-serif text-5xl leading-tight italic text-abyss md:text-7xl">Voyages en Trains : Réalisme &amp; Anthologie</h2>
        <div className="mx-auto mb-10 h-px w-24 bg-primary" />
        <div className="mx-auto mb-12 max-w-3xl text-left font-serif text-xl leading-relaxed text-abyss/80 md:text-2xl">
          <p className="drop-cap">
            Retrouver le rythme lent du monde, là où le voyage devient une destination en soi. Nos épopées ferroviaires
            ressuscitent l'art de vivre des grands explorateurs, mêlant le luxe feutré des compartiments d'époque à la
            découverte intime des paysages qui défilent. À travers les continents, chaque arrêt est une porte ouverte sur
            l'histoire, chaque dîner une célébration, chaque nuit un songe bercé par le chant des rails.
          </p>
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">Édition Spéciale — Itinéraires Mythiques</p>
      </div>
    </section>
  )
}

function Filters() {
  return (
    <section className="mb-20 flex flex-col items-center justify-center gap-12 border-y border-abyss/10 py-8 md:flex-row">
      <FilterSelect label="Filtrer par destination" options={['Toutes les Destinations', 'Europe', 'Asie', 'Écosse']} />
      <FilterSelect label="Filtrer par date" options={['Toutes les Saisons', 'Printemps 2025', 'Été 2025', 'Automne 2025']} />
    </section>
  )
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="w-full max-w-[320px]">
      <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{label}</label>
      <div className="group relative">
        <select className="w-full appearance-none border-b border-abyss/20 bg-transparent px-0 py-3 font-serif text-xl transition-colors focus:border-abyss focus:outline-none">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-0 bottom-3 opacity-40 transition-opacity group-hover:opacity-100">
          keyboard_arrow_down
        </span>
      </div>
    </div>
  )
}

function JourneyBlock({ journey, reverse }: { journey: Journey; reverse: boolean }) {
  return (
    <article className="journal-entry group">
      <div className="relative mb-14 w-full overflow-hidden bg-abyss shadow-2xl">
        <div className="aspect-[21/9]">
          <img
            src={journey.image}
            alt={journey.alt}
            className="h-full w-full scale-105 object-cover grayscale-[20%] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
          />
        </div>
        <div className={`absolute top-8 z-20 ${reverse ? 'right-8' : 'left-8'}`}>
          <span className="border border-abyss/5 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-abyss">
            {journey.badge}
          </span>
        </div>
      </div>

      <div className={`journal-content flex flex-col gap-16 lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <div className="mb-8">
            <h3 className="mb-6 font-serif text-4xl leading-tight text-abyss md:text-5xl">{journey.title}</h3>
            <p className={`mb-8 text-sm font-bold uppercase tracking-[0.2em] text-primary ${reverse ? 'text-right lg:text-left' : ''}`}>
              {journey.subtitle}
            </p>
          </div>
          <div className={`prose prose-lg max-w-2xl font-serif leading-relaxed text-abyss/70 ${reverse ? 'lg:ml-auto' : ''}`}>
            {journey.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside
          className={`w-full flex-shrink-0 space-y-10 lg:w-72 ${reverse ? 'lg:border-r lg:pr-10' : 'lg:border-l lg:pl-10'} border-abyss/10`}
        >
          <div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Prochain Départ</span>
            <p className="font-serif text-lg">{journey.nextDeparture}</p>
            <p className="text-sm italic opacity-60">{journey.duration}</p>
          </div>
          <div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Tarif par personne</span>
            <p className="text-2xl font-bold text-primary">{journey.price}</p>
          </div>
          <button className="w-full border border-primary py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-ecru">
            Détails du voyage
          </button>
        </aside>
      </div>
    </article>
  )
}

function ArtDeVivre() {
  return (
    <section className="py-24">
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <span className="mb-6 block text-xs font-bold uppercase tracking-[0.4em] text-primary">L'Excellence du Rail</span>
        <h2 className="mb-10 font-serif text-4xl italic text-abyss md:text-5xl">L'Art de Vivre à Bord</h2>
        <div className="mx-auto mb-10 h-px w-24 bg-primary" />
        <p className="font-serif text-xl leading-relaxed text-abyss/70 italic">
          L'aventure ne se limite pas aux paysages qui défilent ; elle s'écrit dans l'éclat d'une argenterie polie, dans le
          silence feutré d'une suite aux boiseries d'époque et dans le murmure des conversations au salon.
        </p>
      </div>

      <div className="grid grid-cols-12 items-center gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="relative overflow-hidden shadow-xl">
            <div className="aspect-[4/5] lg:aspect-[3/2]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6eWTFPmvJAtRvUqegUcKJxCYD0W-l1arr5mlpyYfK87ObY9exTJrI6xdLAAZXbDoEfZ7C6jNdufSI86eq5LgjDO6jas2ibiHDzvRdP_8R8lmt4Dz3yN-aZGqJw1_AssUD7co_V5kHYAFt7F-FILC8gkBctv2fgYQnVAW6r8MrRaQQm9wBpJx7C4vZbk4TRaiveEo6zZTZvesDD9jEO4RViX0bCAUhWApN8lGiwPwkkFw6U61OB-9QscxF0cBtI2C2nFWM0-kHn7U"
                alt="Voiture-restaurant en acajou"
                className="h-full w-full object-cover grayscale-[10%] transition-all duration-1000 hover:grayscale-0"
              />
            </div>
            <div className="absolute bottom-6 left-6 border-l-2 border-primary bg-abyss px-6 py-4 text-ecru">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Gastronomie Nomade</p>
              <p className="font-serif italic text-lg">La table des Grands Explorateurs</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex flex-col gap-8 lg:col-span-5 lg:mt-24">
          <div className="relative overflow-hidden shadow-xl">
            <div className="aspect-square">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtUyaHFT2-_hugNC0Zib0V4WlpY2ngxUo-E9Y0MUc-e3XbsUNNqzt442EukrJZFKW04um-pRzYfg1EDmJ1zlaWMZ9qHdf5V4xnMz9-js9c3533nN9ppfB5QJYrw2_qt01mS_CtMPui8wN3CTCm4ZrvMx_Z0fEqrTOr5rWVhegi5FDQiyDrtS9lA8bq1v1ZeAAWIJf36sOtJ0MuVrfOuekKo8bPm6c0nMrljf8uqSYWLnSVusT2J7HWX80UGaE7dgnmerevlN8KWBY"
                alt="Suite de train de luxe"
                className="h-full w-full object-cover grayscale-[10%] transition-all duration-1000 hover:grayscale-0"
              />
            </div>
            <div className="absolute right-6 top-6 text-right text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Intimité</p>
              <p className="font-serif italic text-xl">Suites de Caractère</p>
            </div>
          </div>

          <div className="relative -mt-12 overflow-hidden border-t-8 border-ecru shadow-xl lg:ml-12">
            <div className="aspect-[4/3]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaqitCo6rajsilEm-1D6v9sgCoBWgLzXEljHZ9_C_Vu4OTYofRqdkdUdnZtDcgSt653Re1okWtEZCyOaSMIoNXPFibCI4ENKTg93GeyH6c3tuDIHUr_BgzgFO8iMId_pv3RBNv9_e7Wd07sYgIbs2FYfXSmAJAAVETPl_t1kOHnP2vNAoP2GotwPqwGRb1Cq-Szft7ygFqw6fY3-LA7edIXaJ_BssmS7NYDU6lG_y5_ZDf8VrR33cV2mbnDWihzi6P3j1M9AwTsqQ"
                alt="Voiture-salon avec piano"
                className="h-full w-full object-cover grayscale-[10%] transition-all duration-1000 hover:grayscale-0"
              />
            </div>
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-abyss/60 to-transparent p-8">
              <p className="font-serif text-lg italic text-ecru">L'élégance du Salon-Bar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Suggestions() {
  return (
    <section className="mt-28">
      <div className="mb-12 h-px w-full bg-primary/20" />
      <h3 className="mb-12 text-center font-serif text-3xl italic text-abyss">Autres suggestions</h3>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {suggestions.map((suggestion) => (
          <a key={suggestion.title} className="group cursor-pointer" href="#">
            <div className="mb-6 overflow-hidden">
              <div className="aspect-square">
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0"
                />
              </div>
            </div>
            <h4 className="mb-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{suggestion.title}</h4>
            <p className="mb-4 text-sm font-bold text-primary">{suggestion.price}</p>
            <span className="inline-block border-b border-abyss/20 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:border-primary">
              Découvrir
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
