import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HomeSearchBox from '@/components/HomeSearchBox'
import { getHomepageConfig, getTestimonials, getFeaturedCruises, getDestinations } from '@/lib/payload-queries'

function getSeason(dateString: string): string {
  const month = new Date(dateString).getMonth() // 0-11
  if (month >= 2 && month <= 4) return 'Printemps'
  if (month >= 5 && month <= 7) return 'Été'
  if (month >= 8 && month <= 10) return 'Automne'
  return 'Hiver'
}

export default async function Home() {
  const [homepageConfig, testimonials, destinations] = await Promise.all([
    getHomepageConfig(),
    getTestimonials({ featured: true }),
    getDestinations(),
  ])
  const featuredTestimonial = testimonials[0]
  const destinationOptions = destinations.map((d: any) => ({ id: d.id, name: d.name }))

  const intro = (homepageConfig as any).intro || {}
  const categories = ((homepageConfig as any).categories || []) as any[]
  // Use cruises selected in HomepageConfig, or fall back to cruises flagged "featured" in catalogue
  const configCruises = ((homepageConfig as any).featuredCruises || []) as any[]
  const featuredCruises = configCruises.length > 0
    ? configCruises
    : await getFeaturedCruises({ limit: 3 })
  const trustMarks = ((homepageConfig as any).trustMarks || []) as any[]
  const selectionHeading = (homepageConfig as any).selectionHeading || 'Les envies du moment'
  const categoriesHeading = (homepageConfig as any).categoriesHeading || 'Trouvez le voyage qui vous ressemble'
  const categoriesSubheading = (homepageConfig as any).categoriesSubheading || ''

  // Split categories into 2 rows: first 2 on top, next 3 below
  const topRow = categories.slice(0, 2)
  const bottomRow = categories.slice(2, 5)

  // Build category link from filter fields
  function buildCategoryLink(cat: any): string {
    const params = new URLSearchParams()
    if (cat.voyageType) params.set('voyageType', cat.voyageType)
    if (cat.destination && typeof cat.destination === 'object') {
      params.set('destination', String(cat.destination.id))
    } else if (cat.destination) {
      params.set('destination', String(cat.destination))
    }
    const qs = params.toString()
    return `/catalogue${qs ? `?${qs}` : ''}`
  }

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
          <section className="w-full pt-[120px] pb-16">
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
          <main className="w-full pb-28 pt-10">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="mb-16 flex flex-col items-end justify-between gap-6 md:mb-20 md:flex-row">
                      <div>
                          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                              Nos univers
                          </span>
                          <h3 className="serif-heading text-4xl md:text-5xl">
                              {categoriesHeading}
                          </h3>
                          {categoriesSubheading && (
                              <p className="mt-4 max-w-xl text-sm font-light leading-relaxed opacity-70">
                                  {categoriesSubheading}
                              </p>
                          )}
                      </div>
                      <a href="/catalogue" className="border-b border-primary pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary">
                          Voir tout le catalogue
                      </a>
                  </div>

                  <div className="flex w-full flex-col gap-6">
                      {/* Row 1 — 2 cards */}
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          {topRow.map((cat: any, idx: number) => {
                              const imageUrl = cat.image?.url || ''
                              return (
                                  <a
                                      key={cat.id || idx}
                                      href={buildCategoryLink(cat)}
                                      className="group relative h-[420px] overflow-hidden md:h-[520px]"
                                  >
                                      <div
                                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                          style={{
                                              backgroundImage: `url('${imageUrl}')`,
                                          }}
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/20 to-transparent" />
                                      <div className="absolute bottom-0 left-0 right-0 p-10">
                                          <div className="mb-4 h-px w-12 bg-primary" />
                                          <h4 className="serif-heading text-3xl text-white md:text-4xl">
                                              {cat.title}
                                          </h4>
                                          {cat.subtitle && (
                                              <p className="mt-3 text-[11px] font-light leading-relaxed text-white/70">
                                                  {cat.subtitle}
                                              </p>
                                          )}
                                          <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                                              Explorer
                                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                          </span>
                                      </div>
                                  </a>
                              )
                          })}
                      </div>

                      {/* Row 2 — 3 cards */}
                      {bottomRow.length > 0 && (
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                              {bottomRow.map((cat: any, idx: number) => {
                                  const imageUrl = cat.image?.url || ''
                                  return (
                                      <a
                                          key={cat.id || idx}
                                          href={buildCategoryLink(cat)}
                                          className="group relative h-[360px] overflow-hidden md:h-[440px]"
                                      >
                                          <div
                                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                              style={{
                                                  backgroundImage: `url('${imageUrl}')`,
                                              }}
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/20 to-transparent" />
                                          <div className="absolute bottom-0 left-0 right-0 p-8">
                                              <div className="mb-3 h-px w-10 bg-primary" />
                                              <h4 className="serif-heading text-2xl text-white md:text-3xl">
                                                  {cat.title}
                                              </h4>
                                              {cat.subtitle && (
                                                  <p className="mt-2 text-[11px] font-light leading-relaxed text-white/70">
                                                      {cat.subtitle}
                                                  </p>
                                              )}
                                              <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                                                  Explorer
                                                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                              </span>
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
          <section className="bg-ecru py-[140px]">
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
                                  {cruise.departureDate && (
                                      <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                                          {getSeason(cruise.departureDate)}
                                      </div>
                                  )}
                              </div>

                              <div className="space-y-4">
                                  <div className="flex items-start justify-between border-b border-abyss/10 pb-4">
                                      <div>
                                          <h4 className="serif-heading mb-1 text-2xl">
                                              {cruise.title}
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

          {/* PHILOSOPHY / ART DE VIVRE */}
          <section className="bg-abyss py-32 text-white">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="flex flex-col items-center gap-16 md:flex-row">
                      <div className="flex-1 space-y-6">
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                              Notre Art de Vivre
                          </span>
                          <h3 className="serif-heading text-4xl leading-tight md:text-5xl">
                              Plus qu&apos;une croisière, une parenthèse enchantée.
                          </h3>
                          <p className="text-lg font-light leading-relaxed text-white/70">
                              À bord de Plein Cap, chaque détail est pensé pour
                              votre confort. De la gastronomie inspirée des terroirs
                              visités aux conférences de nos experts, nous cultivons
                              une approche humaniste du voyage.
                          </p>
                          {/* Trust marks inline */}
                          {trustMarks.length > 0 && (
                              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                                  {trustMarks.slice(0, 4).map((mark: any, idx: number) => (
                                      <div key={mark.id || idx} className="flex items-start gap-3">
                                          <svg
                                              className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="1.5"
                                              viewBox="0 0 24 24"
                                          >
                                              <path d={mark.iconSvg} />
                                          </svg>
                                          <div>
                                              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                                                  {mark.title}
                                              </p>
                                              <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                                                  {mark.description}
                                              </p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          )}
                          <a
                              href="/notre-histoire"
                              className="inline-block border-b border-primary pb-1 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:border-white hover:text-white"
                          >
                              Découvrir notre histoire
                          </a>
                      </div>
                      <div className="flex-1">
                          <div className="relative aspect-[4/3] overflow-hidden">
                              <img
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXkSnuIRHgG9TI6-m4PZmR-bIQ8SzGDCSnd_f3ciai0XorRgrmpRXPEmG5Gy2nunOu6rYHFab-c11xocxMwd3Dd73x0wVJA9wu2CZu37BBMqK2XAsTlUUOz9GcjHy15zpy5R2GnTyLRbrtT5QkF6Avm90OA7f9QKWvijfp_iDL4xvj9KlhHNf0pFtgiFU3NaAkCltMUM5RsiyahdmGt5_5GwAnOBnYtBU--rdoSS_e_-m2ccPSKZcl9CJbWcwsIFBisxEa8ApNOAs"
                                  alt="Cabine avec vue panoramique sur la mer"
                                  className="h-full w-full object-cover"
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="bg-ecru py-[140px]">
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
