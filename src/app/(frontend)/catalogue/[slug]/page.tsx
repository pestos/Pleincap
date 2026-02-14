import { getCruiseBySlug } from '@/lib/payload-queries'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

// Types inferred from Payload
type Media = { url?: string; alt?: string; id?: number | string }

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'cruises',
    where: { _status: { equals: 'published' } },
    select: { slug: true },
    pagination: false,
  })
  return docs.map((doc) => ({ slug: doc.slug as string }))
}

export default async function CruisePage({ params }: { params: { slug: string } }) {
  const cruise = await getCruiseBySlug(params.slug)

  if (!cruise) {
    notFound()
  }

  const featuredImage = cruise.featuredImage as Media | undefined
  const boat = typeof cruise.boat === 'object' ? cruise.boat : null
  const destination = typeof cruise.destination === 'object' ? cruise.destination : null

  // Format date helper
  const formatDate = (date: string) => {
    const d = new Date(date)
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ]
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: featuredImage?.url
              ? `linear-gradient(rgba(26, 43, 60, 0.6), rgba(26, 43, 60, 0.6)), url('${featuredImage.url}')`
              : 'linear-gradient(rgba(26, 43, 60, 0.9), rgba(26, 43, 60, 0.9))',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Voyage Culturel d'Exception
          </span>
          <h1 className="serif-heading mb-6 text-6xl md:text-8xl">{cruise.title}</h1>
          <div className="flex flex-col items-center gap-4 text-white/90 md:flex-row md:justify-center md:gap-8">
            <span className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              {formatDate(cruise.departureDate)} - {formatDate(cruise.returnDate)}
            </span>
            <div className="hidden h-4 w-[1px] bg-white/30 md:block" />
            <span className="text-xl font-semibold text-primary">
              À partir de {cruise.price.toLocaleString('fr-FR')} €
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="grid grid-cols-1 gap-12 py-[120px] lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-[120px]">
              {/* Overview */}
              <section id="apercu">
                <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Aperçu du voyage
                </span>
                <h2 className="serif-heading mb-8 text-4xl md:text-5xl">Éveil Culturel au Fil de l'Eau</h2>
                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-sm font-light leading-relaxed opacity-70">{cruise.excerpt}</p>

                  <div className="grid grid-cols-2 gap-8 border-t border-primary/20 pt-8 md:grid-cols-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Navigation
                      </span>
                      <p className="text-sm font-semibold">{destination?.name || 'Destination'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Bateau
                      </span>
                      <p className="text-sm font-semibold">{boat?.name || 'À confirmer'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Langue
                      </span>
                      <p className="text-sm font-semibold">Français</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Accompagnement
                      </span>
                      <p className="text-sm font-semibold text-primary">Permanent</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Itinerary */}
              {cruise.itinerary && cruise.itinerary.length > 0 && (
                <section id="programme">
                  <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Programme
                  </span>
                  <h3 className="serif-heading mb-12 text-4xl">Programme Quotidien</h3>
                  <div className="relative space-y-16 pl-12">
                    <div className="absolute left-5 top-0 h-full w-px bg-primary/30" />
                    {cruise.itinerary.map((day: any) => {
                      const dayImages = (Array.isArray(day.images) ? day.images : [day.images].filter(Boolean)) as Media[]
                      const dayImage = dayImages[0]

                      return (
                        <div key={day.id} className="group relative">
                          <div className="absolute -left-[52px] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                            {day.day}
                          </div>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="md:col-span-2">
                              <h4 className="serif-heading mb-3 text-2xl leading-tight">{day.title}</h4>
                              <div className="mb-4 text-sm font-light leading-relaxed opacity-70">
                                {/* Extract plain text from richText description */}
                                {typeof day.description === 'object' &&
                                  day.description &&
                                  'root' in day.description &&
                                  day.description.root?.children?.[0]?.children?.[0]?.text}
                              </div>
                              {day.highlights && (
                                <div className="flex flex-wrap gap-2">
                                  {day.highlights.split('\n').map((highlight: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="border border-primary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary"
                                    >
                                      {highlight}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            {dayImage?.url && (
                              <div className="aspect-[4/3] overflow-hidden">
                                <img
                                  src={dayImage.url}
                                  alt={dayImage.alt || day.title}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar - Reservation */}
            <aside id="reservation" className="lg:sticky lg:top-40 lg:h-fit">
              <div className="border border-primary/20 bg-white p-8 shadow-lg">
                <h4 className="serif-heading mb-6 text-2xl">Informations & Réservation</h4>

                <div className="mb-8 border border-primary/20 bg-primary/5 p-4 text-center">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    Prix à partir de
                  </p>
                  <p className="text-3xl font-bold text-abyss">{cruise.price.toLocaleString('fr-FR')} €</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">par personne</p>
                </div>

                <div className="mb-6 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Le prix comprend
                  </span>
                  <ul className="space-y-2 text-xs">
                    {['Hébergement en cabine de luxe', 'Accompagnement Plein Cap permanent', 'Pension complète & Boissons', 'Excursions mentionnées', 'Wi-Fi gratuit à bord'].map(
                      (item, idx) => (
                        <li key={item} className={`flex items-start gap-2 ${idx === 1 ? 'font-semibold' : ''}`}>
                          <span
                            className={`material-symbols-outlined text-sm text-primary ${idx === 1 ? 'fill-current' : ''}`}
                          >
                            {idx === 1 ? 'stars' : 'check_circle'}
                          </span>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="space-y-3">
                  <button className="sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss">
                    Réserver maintenant
                  </button>
                  <button className="sharp-edge w-full border border-abyss/20 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white">
                    Télécharger la brochure
                  </button>
                  <button className="sharp-edge w-full border border-primary/30 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white">
                    Demander un devis
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
