import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { getCruises, getPagesConfig } from '@/lib/payload-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voyages en Trains d\'Exception | Plein Cap',
  description:
    'Voyages ferroviaires d\'exception par Plein Cap : découvrez nos itinéraires mythiques à travers le monde.',
}

function formatDate(dateString: string): string {
  const d = new Date(dateString)
  const months = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
  ]
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function calculateDuration(departure: string, returnDate: string): number {
  const start = new Date(departure)
  const end = new Date(returnDate)
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

export default async function VoyagesEnTrainPage() {
  const [cruisesResult, pagesConfig] = await Promise.all([
    getCruises({ published: true, voyageType: 'train', limit: 50 }),
    getPagesConfig(),
  ])
  const trainVoyages = cruisesResult.docs as any[]
  const cfg = pagesConfig as any

  const bannerUrl = cfg.trainBanner?.url || trainVoyages[0]?.featuredImage?.url || ''
  const heroTitle = cfg.trainTitle || 'Voyages en Train'
  const heroSubtitle = cfg.trainSubtitle || 'Retrouver le rythme lent du monde, la ou le voyage devient une destination en soi.'
  const introText = cfg.trainIntro || 'Nos epopees ferroviaires ressuscitent l\'art de vivre des grands explorateurs, melant le luxe feutre des compartiments d\'epoque a la decouverte intime des paysages qui defilent.'

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* HERO */}
      <section className="relative flex h-[70vh] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: bannerUrl
              ? `linear-gradient(rgba(26, 43, 60, 0.6), rgba(26, 43, 60, 0.7)), url('${bannerUrl}')`
              : 'linear-gradient(rgba(26, 43, 60, 0.9), rgba(26, 43, 60, 0.9))',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Collection Journal de Bord
          </span>
          <h1 className="serif-heading mb-6 text-5xl leading-tight md:text-7xl lg:text-8xl">
            {heroTitle}
          </h1>
          <div className="mx-auto h-px w-20 bg-primary" />
          <p className="mx-auto mt-8 max-w-2xl font-serif text-lg italic leading-relaxed text-white/80">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="w-full py-[100px]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="serif-heading text-2xl leading-relaxed md:text-3xl">
              {introText}
            </p>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] opacity-40">
              Edition Speciale — Itineraires Mythiques
            </p>
          </div>
        </div>
      </section>

      {/* JOURNEYS */}
      {trainVoyages.length > 0 ? (
        <section className="w-full pb-[100px]">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="space-y-[120px]">
              {trainVoyages.map((cruise: any, index: number) => {
                const reverse = index % 2 === 1
                const featuredImage = cruise.featuredImage?.url || ''
                const destination = typeof cruise.destination === 'object' ? cruise.destination : null
                const days = cruise.departureDate && cruise.returnDate
                  ? calculateDuration(cruise.departureDate, cruise.returnDate)
                  : null

                return (
                  <article key={cruise.id} className="group">
                    {/* Wide image */}
                    <div className="relative mb-14 w-full overflow-hidden">
                      <div className="aspect-[21/9]">
                        {featuredImage && (
                          <img
                            src={featuredImage}
                            alt={cruise.title}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        )}
                      </div>
                      {destination && (
                        <div className={`absolute top-8 z-20 ${reverse ? 'right-8' : 'left-8'}`}>
                          <span className="bg-white/90 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-abyss backdrop-blur">
                            {destination.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content + sidebar */}
                    <div className={`flex flex-col gap-16 lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="flex-1">
                        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                          Voyage accompagne
                        </span>
                        <h3 className="serif-heading mb-6 text-4xl leading-tight md:text-5xl">
                          {cruise.title}
                        </h3>
                        <p className="max-w-2xl text-sm font-light leading-relaxed opacity-70">
                          {cruise.excerpt}
                        </p>

                        <Link
                          href={`/catalogue/${cruise.slug}`}
                          className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-2 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                        >
                          Decouvrir l'itineraire
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>

                      <aside
                        className={`w-full flex-shrink-0 space-y-8 lg:w-72 ${reverse ? 'lg:border-r lg:border-primary/10 lg:pr-10' : 'lg:border-l lg:border-primary/10 lg:pl-10'}`}
                      >
                        {cruise.departureDate && (
                          <div>
                            <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-primary">
                              Prochain depart
                            </span>
                            <p className="serif-heading text-lg">{formatDate(cruise.departureDate)}</p>
                            {days && (
                              <p className="mt-1 text-xs opacity-50">{days} jours / {days - 1} nuits</p>
                            )}
                          </div>
                        )}
                        <div>
                          <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-primary">
                            Tarif par personne
                          </span>
                          <p className="text-3xl font-bold">{cruise.price?.toLocaleString('fr-FR')} {'\u20AC'}</p>
                        </div>
                        <Link
                          href={`/catalogue/${cruise.slug}`}
                          className="sharp-edge block w-full border border-primary py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-primary transition-all hover:bg-primary hover:text-white"
                        >
                          Details du voyage
                        </Link>
                      </aside>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full pb-[100px]">
          <div className="mx-auto max-w-[1600px] px-6 text-center md:px-16">
            <span className="material-symbols-outlined mb-4 text-5xl text-primary/30">train</span>
            <p className="serif-heading mb-2 text-2xl">Aucun voyage en train disponible</p>
            <p className="text-sm opacity-50">De nouveaux itineraires arrivent bientot.</p>
          </div>
        </section>
      )}

      {/* ART DE VIVRE / CTA */}
      <section className="bg-abyss py-32 text-white">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="flex-1 space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                L&apos;Art du Voyage Ferroviaire
              </span>
              <h3 className="serif-heading text-4xl leading-tight md:text-5xl">
                Le train, une invitation au voyage contemplatif.
              </h3>
              <p className="text-lg font-light leading-relaxed text-white/70">
                Redécouvrez le plaisir de voir défiler les paysages depuis le confort feutré
                d&apos;un wagon d&apos;exception. Nos itinéraires ferroviaires sont pensés pour ceux
                qui préfèrent savourer chaque kilomètre plutôt que de simplement arriver.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-primary">train</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Trains mythiques</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/50">Les plus beaux trains du monde</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-primary">landscape</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Panoramas uniques</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/50">Des paysages inaccessibles autrement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-primary">restaurant</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Gastronomie à bord</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/50">Cuisine raffinée et terroirs locaux</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-primary">groups</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Voyage accompagné</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/50">Guides et conférenciers experts</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 md:flex-row">
                <Link
                  href="/catalogue?voyageType=train"
                  className="bg-primary px-10 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-abyss"
                >
                  Voir les voyages en train
                </Link>
                <Link
                  href="/catalogue"
                  className="border border-white/30 px-10 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-abyss"
                >
                  Tout le catalogue
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXkSnuIRHgG9TI6-m4PZmR-bIQ8SzGDCSnd_f3ciai0XorRgrmpRXPEmG5Gy2nunOu6rYHFab-c11xocxMwd3Dd73x0wVJA9wu2CZu37BBMqK2XAsTlUUOz9GcjHy15zpy5R2GnTyLRbrtT5QkF6Avm90OA7f9QKWvijfp_iDL4xvj9KlhHNf0pFtgiFU3NaAkCltMUM5RsiyahdmGt5_5GwAnOBnYtBU--rdoSS_e_-m2ccPSKZcl9CJbWcwsIFBisxEa8ApNOAs"
                  alt="Vue panoramique depuis un train d'exception"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
