import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getSpeakers, getDestinations, getPagesConfig } from '@/lib/payload-queries'
import ConferenciersClient from './ConferenciersClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nos Conferenciers | Plein Cap",
  description: "Decouvrez les conferenciers Plein Cap : erudits, historiens, artistes qui enrichissent nos croisieres culturelles.",
}

export default async function NosConferenciersPage() {
  const [speakers, destinations, pagesConfig] = await Promise.all([
    getSpeakers(),
    getDestinations(),
    getPagesConfig(),
  ])

  const cfg = pagesConfig as any
  const bannerUrl = cfg.conferenciersBanner?.url || ''
  const title = cfg.conferenciersTitle || 'Nos Conferenciers'
  const subtitle = cfg.conferenciersSubtitle || 'Decouvrez les erudits, historiens et artistes qui donneront une dimension culturelle unique a votre prochaine croisiere.'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* HERO */}
      <section className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden pt-20 md:h-[60vh]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: bannerUrl
              ? `linear-gradient(rgba(26, 43, 60, 0.7), rgba(26, 43, 60, 0.7)), url('${bannerUrl}')`
              : 'linear-gradient(rgba(26, 43, 60, 0.9), rgba(26, 43, 60, 0.9))',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            L&apos;expertise Plein Cap
          </span>
          <h1 className="serif-heading mb-6 text-4xl md:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-90">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-[1600px] px-6 py-12 md:px-16 md:py-20">
        <ConferenciersClient speakers={speakers} destinations={destinations} />
      </div>

      {/* CTA */}
      <section className="border-t border-primary/10 bg-abyss py-16 text-ecru md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 text-center md:px-16">
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Besoin de conseil
          </span>
          <h2 className="serif-heading mb-4 text-3xl md:text-4xl lg:text-5xl">
            Vous ne trouvez pas votre sujet ?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm font-light leading-relaxed opacity-70">
            Notre equipe de conseillers culturels est a votre disposition pour vous orienter vers la croisiere thematique
            qui correspond le mieux a vos centres d&apos;interet.
          </p>
          <a
            href="/contact"
            className="inline-block border border-primary bg-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-primary"
          >
            Contacter un conseiller
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
