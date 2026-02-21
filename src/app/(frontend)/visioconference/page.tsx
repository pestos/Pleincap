import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import VisioClient from '@/components/VisioClient'
import { getVisioconferences, getPagesConfig } from '@/lib/payload-queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Visioconferences | Plein Cap',
  description: 'Conferences en ligne et replays : decouvrez nos destinations depuis chez vous avec nos experts.',
}

export default async function VisioconferencePage() {
  const [allVisios, pagesConfig] = await Promise.all([
    getVisioconferences(),
    getPagesConfig(),
  ])

  const cfg = pagesConfig as any
  const bannerUrl = cfg.visioBanner?.url || ''
  const title = cfg.visioTitle || 'Visioconferences'
  const subtitle = cfg.visioSubtitle || 'Decouvrez nos itineraires exceptionnels depuis chez vous. Nos experts vous presentent les destinations, navires et experiences culturelles en direct ou en replay.'

  // Map to client-friendly shape
  const visios = (allVisios as any[]).map(v => ({
    id: v.id,
    title: v.title,
    description: v.description,
    thumbnail: v.thumbnail ? { url: v.thumbnail.url, alt: v.thumbnail.alt } : undefined,
    type: v.type as 'live' | 'replay',
    destination: typeof v.destination === 'object' && v.destination ? { id: v.destination.id, name: v.destination.name } : undefined,
    speaker: typeof v.speaker === 'object' && v.speaker ? { name: v.speaker.name, specialty: v.speaker.specialty } : undefined,
    speakerOverride: v.speakerOverride || undefined,
    date: v.date,
    time: v.time || undefined,
    duration: v.duration || undefined,
    youtubeUrl: v.youtubeUrl || undefined,
    youtubeLiveUrl: v.youtubeLiveUrl || undefined,
    registrationOpen: v.registrationOpen ?? false,
    viewers: v.viewers ?? undefined,
  }))

  // Extract unique destination names for filter
  const destNames = Array.from(new Set(visios.map(v => v.destination?.name).filter(Boolean))) as string[]

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* HERO */}
      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden pt-20">
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
            Conferences en ligne
          </span>
          <h1 className="serif-heading mb-6 text-4xl md:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-90">
            {subtitle}
          </p>
        </div>
      </section>

      <VisioClient visioconferences={visios} destinations={destNames} />

      {/* AVANTAGES */}
      <section className="border-t border-primary/10 bg-abyss py-16 text-ecru md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-10 text-center md:mb-16">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Pourquoi participer
            </span>
            <h2 className="serif-heading mb-4 text-3xl md:text-4xl lg:text-5xl">
              Les avantages de nos visioconferences
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-70">
              Explorez nos destinations depuis le confort de votre foyer avec nos experts passionnes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {[
              { icon: 'videocam', title: 'Gratuit et Accessible', desc: 'Toutes nos visioconferences sont entierement gratuites. Participez depuis chez vous, aucun deplacement necessaire.' },
              { icon: 'school', title: 'Experts Passionnes', desc: 'Nos conferenciers sont des historiens, archeologues et guides professionnels qui enrichissent nos voyages.' },
              { icon: 'question_answer', title: 'Session Questions', desc: 'Posez vos questions en direct lors des sessions live et obtenez des reponses personnalisees de nos experts.' },
            ].map(item => (
              <div key={item.icon} className="text-center">
                <div className="mb-5 flex justify-center md:mb-6">
                  <div className="flex h-14 w-14 items-center justify-center border border-primary/30 md:h-16 md:w-16">
                    <span className="material-symbols-outlined text-3xl text-primary md:text-4xl">{item.icon}</span>
                  </div>
                </div>
                <h3 className="serif-heading mb-3 text-xl md:mb-4 md:text-2xl">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
