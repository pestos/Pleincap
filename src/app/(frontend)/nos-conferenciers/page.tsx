import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getSpeakers, getDestinations } from '@/lib/payload-queries'
import ConferenciersClient from './ConferenciersClient'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "Nos Conférenciers: L'Expertise Plein Cap",
  description: "Découvrez les conférenciers Plein Cap : érudits, historiens, artistes qui enrichissent nos croisières culturelles.",
}

export default async function NosConferenciersPage() {
  const [speakers, destinations] = await Promise.all([
    getSpeakers(),
    getDestinations(),
  ])

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1b170d] dark:bg-[#1a160f] dark:text-[#F9F8F6]`}>
      <SiteHeader />
      <main className="flex-1 px-4 pb-12 pt-24 md:px-12 md:pt-28 lg:px-20 xl:px-28">
        <Hero />
        <ConferenciersClient speakers={speakers} destinations={destinations} />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="mb-12 max-w-4xl">
      <h1 className="mb-6 text-5xl font-black leading-tight tracking-[-0.02em] md:text-6xl">L'Expertise au Coeur de nos Voyages</h1>
      <p className="max-w-2xl text-xl italic leading-relaxed text-[#9a824c]">
        Découvrez les érudits, historiens et artistes qui donneront une dimension culturelle unique à votre prochaine croisière. Bien plus qu'un voyage,
        une immersion intellectuelle.
      </p>
    </section>
  )
}

function CTA() {
  return (
    <section className="mt-24 border border-primary/10 bg-primary/5 p-12 text-center">
      <h4 className="mb-4 text-2xl font-bold uppercase tracking-wider">Vous ne trouvez pas votre sujet ?</h4>
      <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[#1b170d]/60 dark:text-white/60">
        Notre équipe de conseillers culturels est à votre disposition pour vous orienter vers la croisière thématique qui correspond le mieux à vos centres
        d'intérêt.
      </p>
      <button className="bg-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-primary/90">
        Contacter un conseiller
      </button>
    </section>
  )
}
