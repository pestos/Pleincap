import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getPagesConfig } from '@/lib/payload-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata: Metadata = {
  title: "Notre Histoire | Plein Cap",
  description: "Plein Cap : trois décennies de croisières culturelles, savoir-faire, héritage et modernisation.",
}

// Fallback data when CMS is empty
const defaultSavoirFaire = [
  {
    icon: 'menu_book',
    title: 'Culture',
    text: 'Des conférences de haut vol animées par des experts passionnés, historiens et naturalistes pour éclairer chaque escale.',
  },
  {
    icon: 'group',
    title: 'Intimité',
    text: "Des navires à taille humaine accueillant un nombre limité de passagers pour favoriser l'échange et la sérénité.",
  },
  {
    icon: 'verified_user',
    title: 'Accompagnement',
    text: 'Une équipe dévouée, du premier appel à la fin du voyage, garantissant un service personnalisé et sans faille.',
  },
]

const defaultTimeline = [
  {
    year: '1994',
    title: 'La Genèse',
    text: 'Création de Plein Cap avec la vision de proposer des croisières culturelles francophones uniques en Méditerranée.',
  },
  {
    year: '2005',
    title: "L'Expansion",
    text: "Lancement de nouveaux itinéraires vers l'Europe du Nord et l'Adriatique, renforçant notre expertise géographique.",
  },
  {
    year: '2018',
    title: 'Modernisation',
    text: "Renouvellement de la flotte et intégration de technologies de navigation plus respectueuses de l'environnement.",
  },
  {
    year: "Aujourd'hui",
    title: "L'Héritage Vivant",
    text: 'Référence incontestée de la croisière de charme, alliant tradition maritime et luxe contemporain.',
  },
]

export default async function NotreHistoirePage() {
  const config = await getPagesConfig()

  const bannerUrl =
    typeof config.histoireBanner === 'object' && config.histoireBanner?.url
      ? config.histoireBanner.url
      : null
  const title = config.histoireTitle || "Plein Cap : Une Histoire d'Excellence"
  const subtitle = config.histoireSubtitle || "Voyagez au cœur de l'exceptionnel depuis 1994."
  const introTitle = config.histoireIntroTitle || 'La Philosophie Boutique'
  const introText =
    config.histoireIntroText ||
    "Depuis plus de trois décennies, Plein Cap redéfinit l'art de la navigation. Notre approche privilégie l'intimité et la richesse culturelle. Chaque voyage est une œuvre d'art, conçue pour ceux qui cherchent l'authenticité et le raffinement loin des foules. Nous ne vendons pas simplement des croisières ; nous ouvrons des portes vers des mondes préservés, portés par une passion inébranlable pour la mer et la connaissance."
  const savoirFaire =
    config.histoireSavoirFaire && (config.histoireSavoirFaire as any[]).length > 0
      ? (config.histoireSavoirFaire as any[])
      : defaultSavoirFaire
  const timelineTitle = config.histoireTimelineTitle || 'Notre Historique'
  const timelineSubtitle = config.histoireTimelineSubtitle || 'Les grandes étapes de notre aventure'
  const timeline =
    config.histoireTimeline && (config.histoireTimeline as any[]).length > 0
      ? (config.histoireTimeline as any[])
      : defaultTimeline
  const founderImageUrl =
    typeof config.histoireFounderImage === 'object' && config.histoireFounderImage?.url
      ? config.histoireFounderImage.url
      : null
  const founderQuote =
    config.histoireFounderQuote ||
    "Ma vision pour Plein Cap a toujours été de créer une atmosphère où chaque passager se sent comme un invité privilégié sur un yacht privé. Nous privilégions la qualité des rencontres à la quantité de milles parcourus. C'est cette dimension humaine qui fait battre le cœur de notre maison."
  const founderName = config.histoireFounderName || 'Jean-Pierre Fleury'
  const founderRole = config.histoireFounderRole || 'Fondateur & Directeur'
  const ctaText = config.histoireCtaText || 'Prêt à écrire votre propre histoire avec nous ?'
  const ctaButton = config.histoireCtaButton || 'Découvrir nos croisières'
  const ctaLink = config.histoireCtaLink || '/catalogue'

  const heroBg = bannerUrl
    ? `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url('${bannerUrl}')`
    : "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8ia3BlwoEkkhdkkXOT4pbLkO3yOkGJp-ISrCX3A5VPBk98yS1lWQZ32Tf4tsr4r-Qr-BmsEymCarYn5s7JmamYA4gf6IAvIIBzBMA9Gz0ELcILJie-hxauWVnPaFxEO-LUzSdJIx2faBwGL-36r4noha37Oo3BS0M3pYtI_1wztJu4bK6aOigsmFY4hB2mIT2claOMw53hnIFqNFfdE8HoMm2H7iFNVer1vRsIYpaNB3N0JfdUlRg50msbhD9xOR5w3Hk5sqyjeI')"

  return (
    <div
      className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f8f7f6] text-[#1b170e] dark:bg-[#211d11] dark:text-[#f8f7f6]`}
    >
      <SiteHeader />
      <main className="w-full overflow-x-hidden">
        {/* Hero — full width */}
        <section
          className="relative flex min-h-[80vh] flex-col items-center justify-center gap-6 bg-cover bg-center bg-no-repeat p-8 text-center"
          style={{ backgroundImage: heroBg }}
          aria-label="Bannière Notre Histoire"
        >
          <div className="z-10 flex flex-col gap-4">
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-lg md:text-7xl">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-normal italic text-white opacity-90 md:text-xl">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="mb-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#dfaf20]">
            {introTitle}
          </h2>
          <p className="drop-cap text-xl font-light italic leading-relaxed text-[#1b170e] dark:text-[#f8f7f6] md:text-2xl">
            {introText}
          </p>
        </section>

        {/* Savoir-Faire */}
        <section className="mx-auto max-w-[1200px] my-16 rounded-xl bg-[#dfaf20]/10 px-6 py-16 dark:bg-[#dfaf20]/10 md:px-10">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Notre Savoir-Faire</h2>
            <div className="mx-auto h-1 w-24 bg-[#dfaf20]" />
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {savoirFaire.map((item: any) => (
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

        {/* Timeline */}
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 md:py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{timelineTitle}</h2>
            <p className="italic text-[#dfaf20]">{timelineSubtitle}</p>
          </div>
          <div className="relative mx-auto max-w-4xl py-10">
            <div className="timeline-line absolute left-1/2 hidden h-full -translate-x-1/2 bg-[#dfaf20] md:block" />
            <div className="space-y-16">
              {timeline.map((item: any, idx: number) => {
                const isLeft = idx % 2 === 0
                const imageUrl =
                  typeof item.image === 'object' && item.image?.url ? item.image.url : null
                return (
                  <div
                    key={item.year}
                    className={`relative md:flex md:items-center ${isLeft ? '' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="mb-2 block text-4xl font-black text-[#dfaf20]">
                        {item.year}
                      </span>
                      <h4 className="mb-2 text-xl font-bold">{item.title}</h4>
                      <p className="opacity-80">{item.text}</p>
                    </div>
                    <div className="absolute left-1/2 z-10 hidden size-4 -translate-x-1/2 rounded-full border-4 border-[#f8f7f6] bg-[#dfaf20] md:block dark:border-[#211d11]" />
                    <div className={`mt-4 md:mt-0 md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                      {imageUrl && (
                        <div className="overflow-hidden rounded-lg shadow-lg">
                          <img
                            src={imageUrl}
                            alt={item.title}
                            className="h-[200px] w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Founder Note */}
        <section className="mx-auto my-16 max-w-[1200px] overflow-hidden rounded-xl border border-[#dfaf20]/20 bg-white shadow-lg dark:bg-[#1a170e] md:flex md:flex-row">
          <div className="h-[360px] w-full md:h-auto md:w-1/2">
            {founderImageUrl ? (
              <img
                alt="Founder portrait"
                className="h-full w-full object-cover grayscale brightness-90 contrast-110"
                src={founderImageUrl}
              />
            ) : (
              <img
                alt="Founder portrait"
                className="h-full w-full object-cover grayscale brightness-90 contrast-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAegQOP1rkohIkRjmujPymnisEOLb64kAgJ98APo53kfCiXxR2Jb68g02s_KO3eHOh3CwSKrIbktzAakFlTwzzuv5rnVuFu9EPZ0s3aPf-TSxh_8lBTyF4kSiGyEE8bMz6ZqmZ9DjWnf6bTkXdg94Olq5I2TUBtaLKCrUlzbDDJg3OCYMGMwIzT6QDs8fh10rLZziIDLahNPDfHproWXsLALkBWT8pVtZ1iANszT9mqzaPO3H1kKWIdiHc7KLZ3ixaTvjtk1zmr1MY"
              />
            )}
          </div>
          <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16">
            <span className="material-symbols-outlined mb-6 text-4xl text-[#dfaf20]">
              format_quote
            </span>
            <h3 className="mb-6 text-2xl font-bold italic">Un mot de notre fondateur</h3>
            <p className="mb-10 text-lg font-light leading-relaxed opacity-90">
              &ldquo;{founderQuote}&rdquo;
            </p>
            <div className="flex flex-col">
              <p className="mb-1 text-xl font-bold">{founderName}</p>
              <p className="mb-4 text-sm uppercase tracking-widest text-[#dfaf20]">
                {founderRole}
              </p>
              <div className="h-16 w-48 opacity-70">
                <svg
                  className="h-full w-full fill-current text-[#dfaf20]"
                  viewBox="0 0 200 60"
                >
                  <path
                    d="M10,40 Q30,10 50,40 T90,40 T130,20 T170,40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 text-center md:px-10 md:py-24">
          <h2 className="mb-8 text-3xl font-bold">{ctaText}</h2>
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-3 rounded-sm bg-[#dfaf20] px-10 py-5 text-sm font-bold uppercase tracking-widest text-[#1b170e] transition-transform hover:scale-105"
          >
            {ctaButton}
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
