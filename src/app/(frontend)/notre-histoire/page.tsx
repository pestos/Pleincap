import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "Notre Histoire | Plein Cap",
  description: "Plein Cap : trois décennies de croisières culturelles, savoir-faire, héritage et modernisation.",
}

const heroBg =
  "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8ia3BlwoEkkhdkkXOT4pbLkO3yOkGJp-ISrCX3A5VPBk98yS1lWQZ32Tf4tsr4r-Qr-BmsEymCarYn5s7JmamYA4gf6IAvIIBzBMA9Gz0ELcILJie-hxauWVnPaFxEO-LUzSdJIx2faBwGL-36r4noha37Oo3BS0M3pYtI_1wztJu4bK6aOigsmFY4hB2mIT2claOMw53hnIFqNFfdE8HoMm2H7iFNVer1vRsIYpaNB3N0JfdUlRg50msbhD9xOR5w3Hk5sqyjeI')"

const timeline = [
  {
    year: '1994',
    title: 'La Genèse',
    text: 'Création de Plein Cap avec la vision de proposer des croisières culturelles francophones uniques en Méditerranée.',
    align: 'left',
  },
  {
    year: '2005',
    title: "L'Expansion",
    text: "Lancement de nouveaux itinéraires vers l'Europe du Nord et l'Adriatique, renforçant notre expertise géographique.",
    align: 'right',
  },
  {
    year: '2018',
    title: 'Modernisation',
    text: "Renouvellement de la flotte et intégration de technologies de navigation plus respectueuses de l'environnement.",
    align: 'left',
  },
  {
    year: "Aujourd'hui",
    title: "L'Héritage Vivant",
    text: 'Référence incontestée de la croisière de charme, alliant tradition maritime et luxe contemporain.',
    align: 'right',
  },
]

export default function NotreHistoirePage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f8f7f6] text-[#1b170e] dark:bg-[#211d11] dark:text-[#f8f7f6]`}>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] overflow-x-hidden">
        <Hero />
        <Intro />
        <SavoirFaire />
        <Timeline />
        <FounderNote />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="px-4 py-8 md:py-16">
      <div className="@container">
        <div
          className="relative flex min-h-[600px] flex-col items-center justify-center gap-6 overflow-hidden rounded-sm bg-cover bg-center bg-no-repeat p-8 text-center"
          style={{ backgroundImage: heroBg }}
          aria-label="Cinematic sunset at sea with luxury ship silhouette"
        >
          <div className="z-10 flex flex-col gap-4">
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-lg md:text-7xl">
              Plein Cap : Une Histoire d'Excellence
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-normal italic text-white opacity-90 md:text-xl">
              Voyagez au cœur de l'exceptionnel depuis 1994.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
      <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#dfaf20]">La Philosophie Boutique</h2>
      <p className="drop-cap text-xl font-light italic leading-relaxed text-[#1b170e] dark:text-[#f8f7f6] md:text-2xl">
        Depuis plus de trois décennies, Plein Cap redéfinit l'art de la navigation. Notre approche privilégie l'intimité et la richesse culturelle.
        Chaque voyage est une œuvre d'art, conçue pour ceux qui cherchent l'authenticité et le raffinement loin des foules. Nous ne vendons pas simplement
        des croisières ; nous ouvrons des portes vers des mondes préservés, portés par une passion inébranlable pour la mer et la connaissance.
      </p>
    </section>
  )
}

function SavoirFaire() {
  const items = [
    {
      icon: 'menu_book',
      title: 'Culture',
      text: 'Des conférences de haut vol animées par des experts passionnés, historiens et naturalistes pour éclairer chaque escale.',
    },
    {
      icon: 'group',
      title: 'Intimité',
      text: 'Des navires à taille humaine accueillant un nombre limité de passagers pour favoriser l\'échange et la sérénité.',
    },
    {
      icon: 'verified_user',
      title: 'Accompagnement',
      text: 'Une équipe dévouée, du premier appel à la fin du voyage, garantissant un service personnalisé et sans faille.',
    },
  ]

  return (
    <section className="my-16 rounded-xl bg-[#dfaf20]/10 px-6 py-16 dark:bg-[#dfaf20]/10 md:px-10">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Notre Savoir-Faire</h2>
        <div className="mx-auto h-1 w-24 bg-[#dfaf20]" />
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full border-2 border-[#dfaf20] text-[#dfaf20] transition-all duration-300 hover:bg-[#dfaf20] hover:text-[#f8f7f6]">
              <span className="material-symbols-outlined text-4xl">{item.icon}</span>
            </div>
            <h3 className="mb-3 text-xl font-bold uppercase tracking-wider">{item.title}</h3>
            <p className="text-base leading-relaxed opacity-80">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Notre Historique</h2>
        <p className="text-[#dfaf20] italic">Les grandes étapes de notre aventure</p>
      </div>
      <div className="relative mx-auto max-w-4xl py-10">
        <div className="timeline-line absolute left-1/2 hidden h-full -translate-x-1/2 bg-[#dfaf20] md:block" />
        <div className="space-y-16">
          {timeline.map((item, idx) => (
            <TimelineEvent key={item.year} item={item} isLeft={item.align === 'left'} />
          ))}
        </div>
      </div>
    </section>
  )
}

type TimelineItem = (typeof timeline)[number]

function TimelineEvent({ item, isLeft }: { item: TimelineItem; isLeft: boolean }) {
  return (
    <div className={`relative md:flex md:items-center ${isLeft ? '' : 'md:flex-row-reverse'}`}>
      <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <span className="mb-2 block text-4xl font-black text-[#dfaf20]">{item.year}</span>
        <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
        <p className="opacity-80">{item.text}</p>
      </div>
      <div className="absolute left-1/2 z-10 hidden size-4 -translate-x-1/2 rounded-full border-4 border-[#f8f7f6] bg-[#dfaf20] md:block dark:border-[#211d11]" />
      <div className="md:w-1/2" />
    </div>
  )
}

function FounderNote() {
  return (
    <section className="flex flex-col items-stretch border-y border-[#dfaf20]/20 bg-white dark:bg-[#1a170e] md:flex-row">
      <div className="h-[320px] w-full md:h-auto md:w-1/2">
        <img
          alt="Founder portrait"
          className="h-full w-full object-cover grayscale brightness-90 contrast-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAegQOP1rkohIkRjmujPymnisEOLb64kAgJ98APo53kfCiXxR2Jb68g02s_KO3eHOh3CwSKrIbktzAakFlTwzzuv5rnVuFu9EPZ0s3aPf-TSxh_8lBTyF4kSiGyEE8bMz6ZqmZ9DjWnf6bTkXdg94Olq5I2TUBtaLKCrUlzbDDJg3OCYMGMwIzT6QDs8fh10rLZziIDLahNPDfHproWXsLALkBWT8pVtZ1iANszT9mqzaPO3H1kKWIdiHc7KLZ3ixaTvjtk1zmr1MY"
        />
      </div>
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16">
        <span className="mb-6 text-4xl text-[#dfaf20] material-symbols-outlined">format_quote</span>
        <h3 className="mb-6 text-2xl font-bold italic">Un mot de notre fondateur</h3>
        <p className="mb-10 text-lg font-light leading-relaxed opacity-90">
          "Ma vision pour Plein Cap a toujours été de créer une atmosphère où chaque passager se sent comme un invité privilégié sur un yacht privé. Nous
          privilégions la qualité des rencontres à la quantité de milles parcourus. C'est cette dimension humaine qui fait battre le cœur de notre maison."
        </p>
        <div className="flex flex-col">
          <p className="mb-1 text-xl font-bold">Jean-Pierre Fleury</p>
          <p className="mb-4 text-sm uppercase tracking-widest text-[#dfaf20]">Fondateur & Directeur</p>
          <div className="h-16 w-48 opacity-70">
            <svg className="h-full w-full fill-current text-[#dfaf20]" viewBox="0 0 200 60">
              <path d="M10,40 Q30,10 50,40 T90,40 T130,20 T170,40" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-6 py-20 text-center md:px-10 md:py-24">
      <h2 className="mb-8 text-3xl font-bold">Prêt à écrire votre propre histoire avec nous ?</h2>
      <button className="inline-flex items-center gap-3 rounded-sm bg-[#dfaf20] px-10 py-5 text-sm font-bold uppercase tracking-widest text-[#1b170e] transition-transform hover:scale-105">
        Découvrir nos croisières
        <span className="material-symbols-outlined">arrow_right_alt</span>
      </button>
    </section>
  )
}
