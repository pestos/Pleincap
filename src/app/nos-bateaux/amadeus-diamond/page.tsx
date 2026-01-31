import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "M/S Amadeus Diamond | Plein Cap",
  description: "Présentation du M/S Amadeus Diamond : spécifications, cabines, espaces, équipements, croisières à venir.",
}

const heroImage =
  "linear-gradient(0deg, rgba(13, 18, 27, 0.6) 0%, rgba(13, 18, 27, 0.1) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0aYhxQor__wrm_apE4i91aS6W5-tP89X015662rpz0YHFx3PH_vXzTv-PKCBlypWek0XPkZ8AXRkdR5_XDY1VOBK0_2FA9tbh2S4SPdAZ4GC_dYR0NXA3xL6ZlThwWuCRX8D9EGX8aH30mjlQf-4FBHC0K7IZ2mhnpI8kTRZ346rE6wsdzDhQU_3Wv8BdfBlWIvx38Q5sGGryzuowW3_vmnWFzqXmt47ZSz_dq89hlvBENFLJLBRN-axx16xjkjpIsVhIf-6_6mM')"

const specs = [
  { label: 'Tonnage', value: '1 566 T' },
  { label: 'Vitesse Max', value: '25 km/h' },
  { label: 'Nombre de Ponts', value: '4' },
  { label: 'Rénovation', value: '2019' },
  { label: 'Stabilisateurs', value: 'Double Gyro' },
  { label: 'Alimentation', value: '220V / 50Hz' },
  { label: 'Longueur', value: '110 mètres' },
  { label: 'Largeur', value: '11,4 mètres' },
  { label: 'Équipage', value: '40 membres' },
  { label: 'Pavillon', value: 'Allemagne' },
]


const lifeBlocks = [
  {
    title: 'Suites Amadeus',
    subtitle: 'Pont Mozart',
    description:
      'Une expérience résidentielle de 22m² à 30m² alliant raffinement contemporain et confort absolu. Situées sur le pont supérieur pour une perspective inégalée.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBswP-sXaHw9saBiavofFnezhlF6XFah8QA-lQq7YM4c_NoV7UBYqgbwUDDE0yCSr3DTtN7SS4VK1cDBhB6Vw9CuqEHgZzEjHYIHuCAO3DkhwyV0KmuWYMqzCAmdCMT3fBKjuuoeqlFhUIE19XHFcEIjJSvFqEJF-uJAO_6tcsdJmIVDEEBBIy2i14SO1SaV_yRK60qpDboCoTaF4GplTOqvdi2Fcr94oRTCvoQc1KECfPbQVTIKluFwt4zDfIRaCrC2tz5JZ2zSdw',
    bulletsLeft: ['Balcon Français (baie vitrée)', 'Espace salon séparé', 'Mini-bar inclus'],
    bulletsRight: ['Service de majordome', 'Produits de soin Rituals', 'Système audio Bluetooth'],
    reverse: false,
  },
  {
    title: 'Cabines Prestige',
    subtitle: 'Pont Mozart & Strauss',
    description:
      "Espaces de 15m² conçus avec un souci du détail architectural. Le système de fenêtres panoramiques escamotables transforme votre cabine en balcon ouvert.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIYiRtAeLnDNwLFf5cP-O-_7LmJIUI_0FKWafCTo1XfheN2_FJMbzAl_G_dDGMbIpuYYiMjYOIhBsbzynTYtFTIfFkWmweHmkAYcesqq1mFVs49k8mXcBh_YwitF9envCKjWf2yz5evzyAwZkLstgXX202aYsiu05M0B1OyE0b-dtTrmpmrrhCeyzMzMVjsbYHL706lVYtP18t8ac62dm_0XFuycsDo2nM51DQu4y6l8TpZln9s8yc5IynhG-FuCg14acerJPS7yE',
    bulletsLeft: ['Baie vitrée rétractable', 'Literie king-size', 'Climatisation individuelle'],
    bulletsRight: ['TV miroir intégrée', 'Coffre-fort & Bureau', 'Wifi haut débit'],
    reverse: true,
  },
]

const spaces = [
  {
    label: 'Gastronomie',
    title: 'Restaurant Panoramique',
    description:
      'Une expérience culinaire où chaque plat est une escale. Produits locaux frais, menus reflétant les régions traversées.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqDyHfldKGOBhtFJOZGChfkWeQOo3Vw3MSLEmN7o-ESoIFRd0iV9AymIy9Ga56hXAB8VbEycXyLBbETR7Ui7BHg2pwzORPz-ejDqYsGqZ6OeokBeksdf_wNI6O2dumphpB5KGA07VDsVlqnHppGg3lkTVk1I3vtB_HYX8p5Jg6CqBQbEjjs54f_NnSaqkv0UuhdQsXRyhSuMal_Cl5ePtPgHexkTD9h6FGnkYdW6lJga2MhWQSlcSCZWZtpOPho3W15hRuB2mtgRg',
    cta: '#',
  },
  {
    label: 'Détente',
    title: 'Salon Club & Fitness',
    description:
      'Le cœur social du navire : conférences, détente, séances de réveil musculaire face au fleuve.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD39WFCF8gKQdjrAmjj6npxN0xHHb-zSHaGn-2CRjsoFDbA9k7JytepE7DcZ215RWxGZi0X_DdLAGiBm8l8KAQJYyx1s9yWiG5b_Mci8jZ4iTnEOfQdtv2JZfFTyilkrqVznWakRPQc5zRLsppBD4_tQe-oR6sP7o0N_mAM2w9nqeAYE3hGEYou_LBRaV9KgpPI2XCnnUOLvWZ0XDIvYonlwaMxB6GU5u_zSDVtCLtXxabDUCs2HiDCDaQJlrg8ojEXNL6X4DRm518',
    cta: '#',
  },
]

const services = [
  {
    icon: 'concierge',
    title: 'Conciergerie 24h/24',
    text: "Assistance personnalisée : réservations privées, conseils d'excursions sur mesure.",
  },
  {
    icon: 'wifi',
    title: 'Wi-Fi Illimité',
    text: 'Connexion haut débit dans toutes les suites et espaces communs.',
  },
  {
    icon: 'local_laundry_service',
    title: 'Service de Blanchisserie',
    text: 'Soin du linge rapide et irréprochable pour votre confort.',
  },
  {
    icon: 'menu_book',
    title: 'Bibliothèque Culturelle',
    text: 'Ouvrages littéraires et historiques sur les fleuves et régions traversées.',
  },
]

const cruises = [
  {
    title: 'La Seine Impressionniste',
    date: 'Avril - Octobre 2024',
    desc: 'De Paris à Honfleur, un voyage au cœur de la lumière.',
    price: 'À partir de 1 890 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSOp0E52B1XOsPGUdkGgxuiJD3Eii75_u_rVmBsTRXtBejDclEbkVOt03Nave7qsOfcRbeblkEVDHiUCyak0x2tK_Ggj8z7R53ImqdCptsC1OLQ4IrTjgFaU-zNekVYGRM5Wvwby86422Yoj_gwhE3ZMts9d1jOAprYhBsOQhbs2DoSIDDu0CoaxPoPC7RzGaa0J1WSU72noH0VdHakQoQeyUHSjY7sKRoqv9FNi38oN7_YT8iNrjPlZRN4-xBZpe18x4ytieW0LY',
  },
]

export default function AmadeusDiamondPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#F9F8F6] text-[#0d121b] dark:bg-[#101622] dark:text-gray-100`}>
      <SiteHeader />
      <Hero />
      <TechSpecs />
      <LifeOnBoard />
      <Spaces />
      <Services />
      <Cruises />
      <FooterCTA />
      <SiteFooter />
    </div>
  )
}


function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: heroImage }} />
      <div className="relative flex h-full flex-col justify-end px-4 pb-28 lg:px-[120px]">
        <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-white/80">Fleuron de la flotte</span>
        <h2 className="serif-title text-5xl leading-tight text-white md:text-7xl lg:text-8xl">M/S Amadeus Diamond</h2>
      </div>
    </section>
  )
}

function TechSpecs() {
  return (
    <section className="px-4 py-16 lg:px-[120px]">
      <h3 className="mb-12 text-center text-xs font-bold uppercase tracking-[0.4em] text-[#C5A059]">Spécifications Techniques</h3>
      <div className="grid grid-cols-2 border-t border-[#0d121b]/10 md:grid-cols-3 lg:grid-cols-5 dark:border-white/10">
        {specs.map((spec, idx) => (
          <div
            key={spec.label}
            className={`py-10 ${
              idx % 5 !== 4 ? 'border-r border-[#0d121b]/10 dark:border-white/10' : ''
            } ${idx < 5 ? 'border-b border-[#0d121b]/10 dark:border-white/10' : ''} px-4 md:px-6`}
          >
            <p className="mb-3 text-[10px] uppercase tracking-widest text-[#0d121b]/50 dark:text-white/50">{spec.label}</p>
            <p className="text-2xl serif-title italic">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function LifeOnBoard() {
  return (
    <section className="px-4 pb-24 lg:px-[120px]">
      <div className="mb-16 flex flex-col items-baseline justify-between gap-4 md:flex-row">
        <h3 className="serif-title text-4xl md:text-5xl">L'art de vivre à bord</h3>
        <p className="text-sm uppercase tracking-widest text-[#0d121b]/50">Hébergement d'exception</p>
      </div>
      <div className="space-y-24">
        {lifeBlocks.map((block) => (
          <LifeBlock key={block.title} block={block} />
        ))}
      </div>
    </section>
  )
}

type LifeBlock = (typeof lifeBlocks)[number]

function LifeBlock({ block }: { block: LifeBlock }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className={`${block.reverse ? 'order-2 lg:order-1 lg:col-span-5' : 'lg:col-span-7'}`}>
        <div className="aspect-[16/9] overflow-hidden">
          <img src={block.image} alt={block.title} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className={`${block.reverse ? 'order-1 lg:order-2 lg:col-span-7' : 'lg:col-span-5'}`}>
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">{block.subtitle}</span>
        <h4 className="mb-6 text-3xl serif-title">{block.title}</h4>
        <p className="mb-8 text-sm leading-relaxed text-[#0d121b]/70 dark:text-gray-400">{block.description}</p>
        <div className="grid grid-cols-2 gap-4 text-[11px] uppercase tracking-widest">
          <ul className="space-y-3 border-l border-[#C5A059] pl-6">
            {block.bulletsLeft.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <ul className="space-y-3 border-l border-[#C5A059] pl-6">
            {block.bulletsRight.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Spaces() {
  return (
    <section className="bg-[#0d121b] px-4 py-24 text-white lg:px-[120px]">
      <div className="mx-auto mb-24 max-w-4xl">
        <h3 className="mb-8 text-5xl serif-title">Espaces & Installations</h3>
        <p className="text-xl font-light italic text-white/70">
          Chaque recoin de l'Amadeus Diamond a été conçu pour offrir une perspective nouvelle sur les fleuves d'Europe.
        </p>
      </div>
      <div className="space-y-20">
        {spaces.map((space, idx) => (
          <div
            key={space.title}
            className={`grid grid-cols-1 items-center gap-16 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url('${space.image}')` }}
              aria-label={space.title}
            />
            <div className={idx % 2 === 1 ? 'order-first lg:order-none' : ''}>
              <span className="mb-4 block text-xs uppercase tracking-widest text-[#C5A059]">{space.label}</span>
              <h4 className="mb-6 text-4xl serif-title">{space.title}</h4>
              <p className="mb-8 text-white/60 leading-relaxed">{space.description}</p>
              <a
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-[#1152d4] pb-2 text-[#1152d4] transition-all hover:text-white hover:border-white"
                href={space.cta}
              >
                En savoir plus
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-[#F9F8F6] px-4 py-24 lg:px-[120px]">
      <div className="mb-16 text-center">
        <h3 className="mb-4 text-5xl serif-title">Équipements et Services</h3>
        <p className="text-xs uppercase tracking-[0.4em] text-[#0d121b]/50">L'architecture en un regard</p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-[#C5A059]/30 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {services.map((s) => (
          <div key={s.title} className="py-8 lg:py-0 lg:px-8 first:pl-0 last:pr-0">
            <div className="mb-6 text-[#C5A059]">
              <span className="material-symbols-outlined text-4xl">{s.icon}</span>
            </div>
            <h4 className="mb-4 text-xl font-bold serif-title">{s.title}</h4>
            <p className="text-sm leading-relaxed text-[#0d121b]/70 dark:text-gray-400">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cruises() {
  return (
    <section className="px-4 py-24 lg:px-[120px]">
      <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
        <h3 className="text-4xl serif-title">Prochaines Croisières</h3>
        <a className="text-xs font-bold uppercase tracking-widest text-[#1152d4]" href="#">
          Voir tout le calendrier
        </a>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {cruises.map((c) => (
          <div
            key={c.title}
            className="group border border-[#0d121b]/5 bg-white transition-all hover:border-[#0d121b]/20 dark:bg-[#111827]"
          >
            <div
              className="relative h-64 overflow-hidden"
              style={{ backgroundImage: `url('${c.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0d121b]/50 dark:text-white/50">
                <span className="material-symbols-outlined text-xs">calendar_today</span>
                {c.date}
              </div>
              <h5 className="serif-title mb-4 text-xl transition-colors group-hover:text-[#1152d4]">{c.title}</h5>
              <p className="mb-6 text-xs text-[#0d121b]/60 dark:text-gray-400">{c.desc}</p>
              <div className="flex items-center justify-between border-t border-[#0d121b]/5 pt-6">
                <span className="text-sm font-bold tracking-tight">{c.price}</span>
                <span className="material-symbols-outlined text-[#1152d4] transition-transform group-hover:translate-x-1">arrow_right_alt</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FooterCTA() {
  return (
    <section className="bg-[#101622] px-4 py-20 text-white/80 lg:px-[120px]">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Prêt à embarquer ?</p>
          <h4 className="mt-2 text-3xl font-bold text-white">Votre prochaine odyssée commence ici</h4>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <button className="bg-[#1152d4] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#1152d4]">
            Réserver
          </button>
          <button className="border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#101622]">
            Télécharger la brochure
          </button>
        </div>
      </div>
    </section>
  )
}
