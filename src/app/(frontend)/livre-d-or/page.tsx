import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getTestimonials, getLivreDOrConfig } from '@/lib/payload-queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Livre d'Or | Plein Cap - Témoignages Clients",
  description:
    "Témoignages clients Plein Cap : retours d'expérience de croisières culturelles et voyages d'exception.",
}

const sizeToClass: Record<string, string> = {
  normal: 'md:col-span-1 md:row-span-1',
  large: 'md:col-span-2 md:row-span-2',
  wide: 'md:col-span-2 md:row-span-1',
  tall: 'md:col-span-1 md:row-span-2',
}

export default async function LivreDOrPage() {
  const [testimonials, livreDOrConfig] = await Promise.all([
    getTestimonials(),
    getLivreDOrConfig(),
  ])

  const gallery = ((livreDOrConfig as any).gallery || []) as any[]
  const inspiredCruises = ((livreDOrConfig as any).inspiredCruises || []) as any[]

  // Compute average rating
  const ratings = testimonials.filter((t: any) => t.rating).map((t: any) => t.rating)
  const avgRating = ratings.length > 0 ? (ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length).toFixed(1) : null

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* HERO */}
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-abyss">
        <div className="absolute inset-0 opacity-20">
          {gallery[0]?.image?.url && (
            <img
              src={gallery[0].image.url}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/80 to-abyss" />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Livre d&apos;Or
          </span>
          <h1 className="serif-heading mb-8 text-5xl md:text-7xl lg:text-8xl">
            Vos Récits d&apos;Exception
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Chaque sillage laissé sur l&apos;onde est une histoire que nous écrivons ensemble.
            Découvrez les récits de ceux qui ont fait de nos traversées un moment inoubliable.
          </p>

          {/* Stats ribbon */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-primary">{testimonials.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                Témoignages
              </span>
            </div>
            {avgRating && (
              <>
                <div className="hidden h-8 w-px bg-white/10 md:block" />
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold text-primary">{avgRating}</span>
                    <span className="text-primary">/5</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Note moyenne
                  </span>
                </div>
              </>
            )}
            <div className="hidden h-8 w-px bg-white/10 md:block" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-primary">30+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                Années d&apos;expérience
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-2xl text-white/40">expand_more</span>
        </div>
      </section>

      {/* GALLERY MOSAIC */}
      {gallery.length > 0 && (
        <section className="w-full py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-16 text-center">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Souvenirs
              </span>
              <h2 className="serif-heading text-3xl md:text-4xl">Moments Capturés</h2>
            </div>
            <div className="grid auto-rows-[220px] grid-cols-1 gap-3 md:grid-cols-4">
              {gallery.map((item: any, idx: number) => {
                const imageUrl = item.image?.url || ''
                const className = sizeToClass[item.size] || sizeToClass.normal
                return (
                  <div key={item.id || idx} className={`group overflow-hidden ${className}`}>
                    {imageUrl && (
                      <img
                        alt={item.image?.alt || ''}
                        src={imageUrl}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="w-full bg-white py-24 dark:bg-abyss">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Témoignages
            </span>
            <h2 className="serif-heading text-3xl md:text-4xl">Ce que disent nos passagers</h2>
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {testimonials.map((t: any) => {
              const imageUrl = t.authorPhoto?.url || t.authorPhoto?.thumbnailURL || ''
              return (
                <div
                  key={t.id}
                  className="mb-6 break-inside-avoid border border-primary/10 bg-background-light p-8 transition-shadow duration-300 hover:shadow-lg dark:bg-background-dark"
                >
                  {/* Stars */}
                  {t.rating && (
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-lg ${
                            i < t.rating ? 'text-primary' : 'text-primary/20'
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quote */}
                  <input className="peer hidden" id={`t-${t.id}`} type="checkbox" />
                  <div className="relative max-h-36 overflow-hidden transition-[max-height] duration-500 peer-checked:max-h-[2000px]">
                    <p className="text-base font-light italic leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-light to-transparent peer-checked:opacity-0 dark:from-background-dark" />
                  </div>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-4 border-t border-primary/10 pt-6">
                    {imageUrl ? (
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                        <img
                          alt={t.authorName}
                          src={imageUrl}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="material-symbols-outlined text-primary">person</span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold">{t.authorName}</p>
                      {t.cruiseName && (
                        <p className="text-[11px] text-primary">{t.cruiseName}</p>
                      )}
                    </div>
                  </div>

                  {/* Read more toggle */}
                  <label
                    className="mt-4 inline-flex cursor-pointer items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-70"
                    htmlFor={`t-${t.id}`}
                  >
                    <span className="read-more">Lire la suite</span>
                    <span className="read-less">Fermer</span>
                    <span className="material-symbols-outlined text-xs">expand_more</span>
                  </label>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 flex flex-col items-center gap-8 text-center">
            <div className="mx-auto h-px w-20 bg-primary/30" />
            <h3 className="serif-heading text-2xl md:text-3xl">
              Votre histoire reste à écrire...
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-primary px-10 py-4 text-[10px] font-bold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Partager votre expérience
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* INSPIRED CRUISES */}
      {inspiredCruises.length > 0 && (
        <section className="w-full py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">
              <div>
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Inspirations
                </span>
                <h2 className="serif-heading text-3xl md:text-4xl">
                  Itinéraires Inspirés
                </h2>
                <p className="mt-3 max-w-xl text-sm font-light opacity-60">
                  Poursuivez le voyage à travers les escales citées par nos passagers
                </p>
              </div>
              <Link
                href="/catalogue"
                className="border-b border-primary pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary"
              >
                Voir tout le catalogue
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {inspiredCruises.map((cruise: any) => {
                const imageUrl = cruise.featuredImage?.url || ''
                return (
                  <Link
                    key={cruise.id}
                    href={`/catalogue/${cruise.slug}`}
                    className="group"
                  >
                    <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                      {imageUrl && (
                        <img
                          alt={cruise.title}
                          src={imageUrl}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
                    </div>
                    <h4 className="serif-heading mb-2 text-2xl transition-colors group-hover:text-primary">
                      {cruise.title}
                    </h4>
                    {cruise.excerpt && (
                      <p className="mb-4 text-xs font-light leading-relaxed opacity-60">
                        {cruise.excerpt.substring(0, 120)}...
                      </p>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Découvrir
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="border-t border-primary/10 bg-abyss py-24 text-white">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Prêt à embarquer ?
              </span>
              <h3 className="serif-heading text-3xl text-white md:text-4xl">
                Votre prochaine odyssée commence ici
              </h3>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Link
                href="/catalogue"
                className="bg-primary px-10 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-abyss"
              >
                Voir les croisières
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 px-10 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-abyss"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
