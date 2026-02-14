import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HomeSearchBox from '@/components/HomeSearchBox'
import { getHomepageConfig, getTestimonials, getFeaturedCruises, getDestinations } from '@/lib/payload-queries'

export default async function Home() {
  const [homepageConfig, testimonials, destinations] = await Promise.all([
    getHomepageConfig(),
    getTestimonials({ featured: true }),
    getDestinations(),
  ])
  const featuredTestimonial = testimonials[0]
  const destinationOptions = destinations.map((d: any) => ({ id: d.id, name: d.name }))

  const intro = (homepageConfig as any).intro || {}
  const gridCruises = ((homepageConfig as any).gridCruises || []) as any[]
  // Use cruises selected in HomepageConfig, or fall back to cruises flagged "featured" in catalogue
  const configCruises = ((homepageConfig as any).featuredCruises || []) as any[]
  const featuredCruises = configCruises.length > 0
    ? configCruises
    : await getFeaturedCruises({ limit: 3 })
  const trustMarks = ((homepageConfig as any).trustMarks || []) as any[]
  const selectionHeading = (homepageConfig as any).selectionHeading || 'Les envies du moment'
  const categoriesHeading = (homepageConfig as any).categoriesHeading || 'Trouvez le voyage qui vous ressemble'
  const categoriesSubheading = (homepageConfig as any).categoriesSubheading || ''

  // Split grid cruises into 2 rows: first 2 on top, next 3 below
  const topRow = gridCruises.slice(0, 2)
  const bottomRow = gridCruises.slice(2, 5)

  return (
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
          <SiteHeader />

          {/* HERO */}
          <section className="relative flex h-screen w-full items-center justify-center overflow-hidden pt-20">
              <video
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
              >
                  <source
                      src="/travel%20video%20footage.mp4"
                      type="video/mp4"
                  />
              </video>

              <div
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{
                      backgroundImage:
                          "linear-gradient(rgba(26, 43, 60, 0.4), rgba(26, 43, 60, 0.4))",
                  }}
              />
          </section>

          {/* SEARCH BOX (OVERLAP HERO) */}
          <HomeSearchBox destinations={destinationOptions} />

          {/* INTRO */}
          <section className="w-full pt-[120px]">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="flex flex-col items-center border-y border-primary/20 py-12 text-center">
                      <span className="mb-12 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                          {intro.label || "L'esprit plein cap"}
                      </span>
                      <div className="max-w-5xl">
                          <p className="serif-heading drop-cap text-left text-3xl leading-relaxed text-abyss dark:text-ecru md:text-4xl">
                              {intro.body || "Tour opérateur croisiériste spécialisé dans le maritime et présent sur le marché francophone, Plein Cap vous fait voguer sur les mers du Monde depuis plus de 40 ans."}
                          </p>
                          <p className="mt-8 text-right text-sm italic opacity-70">
                              — {intro.author || 'Jean-Paul Macocco'}
                          </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* GRID CATEGORIES */}
          <main className="w-full pb-20 pt-6">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="mb-16 w-full text-center md:mb-20">
                      <h3 className="serif-heading mb-6 text-5xl md:text-5xl">
                          {categoriesHeading}
                      </h3>
                      {categoriesSubheading && (
                          <p className="text-sm font-light leading-relaxed opacity-70">
                              {categoriesSubheading}
                          </p>
                      )}
                  </div>

                  <div className="flex w-full flex-col gap-5">
                      {/* Row 1 — 2 cards */}
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          {topRow.map((item: any, idx: number) => {
                              const cruise = item.cruise
                              if (!cruise || typeof cruise !== 'object') return null
                              const imageUrl = cruise.featuredImage?.url || ''
                              const destination = typeof cruise.destination === 'object' ? cruise.destination : null
                              return (
                                  <a
                                      key={item.id || idx}
                                      href={`/catalogue/${cruise.slug}`}
                                      className="group relative h-[420px] overflow-hidden md:h-[480px]"
                                  >
                                      <div
                                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                          style={{
                                              backgroundImage: `linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('${imageUrl}')`,
                                          }}
                                      />
                                      <div className="absolute bottom-10 left-10 text-white">
                                          <h4 className="serif-heading text-3xl md:text-4xl">
                                              {cruise.title}
                                          </h4>
                                          {destination && (
                                              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                                                  {destination.name}
                                              </p>
                                          )}
                                      </div>
                                  </a>
                              )
                          })}
                      </div>

                      {/* Row 2 — 3 cards */}
                      {bottomRow.length > 0 && (
                          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                              {bottomRow.map((item: any, idx: number) => {
                                  const cruise = item.cruise
                                  if (!cruise || typeof cruise !== 'object') return null
                                  const imageUrl = cruise.featuredImage?.url || ''
                                  const destination = typeof cruise.destination === 'object' ? cruise.destination : null
                                  return (
                                      <a
                                          key={item.id || idx}
                                          href={`/catalogue/${cruise.slug}`}
                                          className="group relative h-[360px] overflow-hidden md:h-[400px]"
                                      >
                                          <div
                                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                              style={{
                                                  backgroundImage: `linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('${imageUrl}')`,
                                              }}
                                          />
                                          <div className="absolute bottom-10 left-10 text-white">
                                              <h4 className="serif-heading text-2xl md:text-3xl">
                                                  {cruise.title}
                                              </h4>
                                              {destination && (
                                                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                                                      {destination.name}
                                                  </p>
                                              )}
                                          </div>
                                      </a>
                                  )
                              })}
                          </div>
                      )}
                  </div>
              </div>
          </main>

          {/* SELECTION */}
          <section className="bg-ecru py-[120px]">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
                      <div>
                          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                              Selection
                          </span>
                          <h3 className="serif-heading text-4xl md:text-5xl">
                              {selectionHeading}
                          </h3>
                      </div>
                      <a href="/catalogue" className="border-b border-primary pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary">
                          Voir toutes les destinations
                      </a>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                      {featuredCruises.slice(0, 3).map((cruise: any) => (
                          <div key={cruise.id} className="group cursor-pointer">
                              <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                                  <img
                                      alt={cruise.title}
                                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      src={cruise.featuredImage?.url || ''}
                                  />
                                  <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                                      {cruise.season || 'Saison'}
                                  </div>
                              </div>

                              <div className="space-y-4">
                                  <div className="flex items-start justify-between border-b border-abyss/10 pb-4">
                                      <div>
                                          <h4 className="serif-heading mb-1 text-2xl">
                                              {cruise.boat?.name || 'Bateau'}
                                          </h4>
                                          <p className="text-[10px] uppercase tracking-widest opacity-60">
                                              {cruise.destination?.name || 'Destination'} | {cruise.duration || 'N/A'} Jours
                                          </p>
                                      </div>
                                      <span className="font-medium text-primary">
                                          {cruise.price ? `\u20AC${cruise.price}` : 'Prix sur demande'}
                                      </span>
                                  </div>
                                  <p className="text-xs font-light leading-relaxed opacity-70">
                                      {cruise.summary || cruise.title}
                                  </p>
                                  <a
                                      href={`/catalogue/${cruise.slug}`}
                                      className="sharp-edge block w-full border border-abyss/20 bg-transparent px-8 py-3 text-center text-[10px] font-bold uppercase tracking-widest transition-all group-hover:bg-abyss group-hover:text-white"
                                  >
                                      Découvrir
                                  </a>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          {/* TRUST MARKS */}
          <section className="border-t border-primary/10 bg-abyss py-32 text-ecru">
              <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-4 md:px-16">
                  {trustMarks.map((mark: any, idx: number) => (
                      <div key={mark.id || idx} className="flex flex-col items-center gap-6 text-center">
                          <div className="trust-mark">
                              <svg
                                  className="h-12 w-12 text-[#C5A059]"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path d={mark.iconSvg} />
                              </svg>
                          </div>
                          <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                  {mark.title}
                              </h5>
                              <p className="text-[10px] leading-loose uppercase tracking-widest opacity-60">
                                  {mark.description}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="bg-ecru py-[120px]">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="flex flex-col items-center text-center">
                      <span className="mb-16 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                          Ce que disent nos clients
                      </span>

                      {featuredTestimonial ? (
                          <div className="relative mx-auto w-full max-w-6xl px-10 md:px-20">
                              <div className="mb-12">
                                  <p className="serif-heading text-3xl leading-tight text-abyss md:text-5xl">
                                      &quot;{featuredTestimonial.content}&quot;
                                  </p>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                  <div className="mb-2 h-[1px] w-10 bg-primary" />
                                  <p className="font-serif text-sm italic opacity-70">
                                      — {featuredTestimonial.authorName}
                                  </p>
                              </div>

                              <button
                                  aria-label="Previous"
                                  className="absolute left-0 top-1/2 -translate-y-1/2 text-primary transition-transform hover:scale-110"
                              >
                                  <span className="material-symbols-outlined text-4xl">
                                      chevron_left
                                  </span>
                              </button>
                              <button
                                  aria-label="Next"
                                  className="absolute right-0 top-1/2 -translate-y-1/2 text-primary transition-transform hover:scale-110"
                              >
                                  <span className="material-symbols-outlined text-4xl">
                                      chevron_right
                                  </span>
                              </button>
                          </div>
                      ) : (
                          <div className="relative mx-auto w-full max-w-6xl px-10 md:px-20">
                              <p className="text-center text-sm opacity-60">
                                  Témoignages à venir
                              </p>
                          </div>
                      )}

                      <div className="mt-16 flex gap-4">
                          <div className="size-1.5 rounded-full bg-primary" />
                          <div className="size-1.5 rounded-full bg-primary/20" />
                          <div className="size-1.5 rounded-full bg-primary/20" />
                      </div>
                  </div>
              </div>
          </section>

          <SiteFooter />
      </div>
  );
}
