import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import DeckPlanViewer from '@/components/DeckPlanViewer'
import CabinSection from '@/components/CabinSection'
import GalleryLightbox from '@/components/GalleryLightbox'
import { getTrainBySlug, getTrains, getCruises } from '@/lib/payload-queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const trains = await getTrains()
  return trains.map((train) => ({
    slug: train.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const train = await getTrainBySlug(slug) as any

  if (!train) {
    return {
      title: 'Train non trouve | Plein Cap',
    }
  }

  const metaTitle = train.meta?.title || `${train.name} | Plein Cap`
  const metaDescription = train.meta?.description || `Presentation du ${train.name} : specifications, compartiments, equipements, voyages a venir.`
  const metaImageUrl = train.meta?.image?.url || train.featuredImage?.url

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: train.meta?.title || train.name,
      description: metaDescription,
      images: metaImageUrl ? [metaImageUrl] : [],
    },
  }
}

export default async function TrainDetailPage({ params }: Props) {
  const { slug } = await params
  const train = await getTrainBySlug(slug) as any

  if (!train) {
    notFound()
  }

  const gallery = Array.isArray(train.gallery) ? train.gallery.filter((img: any) => img?.url) : []
  const descriptionParagraphs = extractParagraphs(train.description)

  // Fetch cruises on this train
  const cruisesResult = await getCruises({ published: true, limit: 50 })
  const trainCruises = cruisesResult.docs.filter((c: any) => {
    const cruiseTrain = typeof c.train === 'object' ? c.train : null
    return cruiseTrain && String(cruiseTrain.id) === String(train.id)
  }).slice(0, 3)

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* HERO */}
      <section className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: train.featuredImage?.url
              ? `linear-gradient(rgba(26, 43, 60, 0.5), rgba(26, 43, 60, 0.7)), url('${train.featuredImage.url}')`
              : 'linear-gradient(rgba(26, 43, 60, 0.9), rgba(26, 43, 60, 0.9))',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Fleuron de la flotte ferroviaire
          </span>
          <h1 className="serif-heading mb-8 text-6xl md:text-8xl lg:text-9xl">{train.name}</h1>

          {/* Specs ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 md:gap-10">
            {train.capacity && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">groups</span>
                <span className="text-sm">{train.capacity} passagers</span>
              </div>
            )}
            {train.length && (
              <>
                <div className="hidden h-4 w-px bg-white/20 md:block" />
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">straighten</span>
                  <span className="text-sm">{train.length} m</span>
                </div>
              </>
            )}
            {train.builtYear && (
              <>
                <div className="hidden h-4 w-px bg-white/20 md:block" />
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="text-sm">Construit en {train.builtYear}</span>
                </div>
              </>
            )}
            {train.renovatedYear && (
              <>
                <div className="hidden h-4 w-px bg-white/20 md:block" />
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                  <span className="text-sm">Renove en {train.renovatedYear}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-2xl text-white/40">expand_more</span>
        </div>
      </section>

      {/* SPECS CARDS */}
      <section className="relative z-10 -mt-16 w-full">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: 'groups', label: 'Capacite', value: train.capacity ? `${train.capacity} passagers` : null },
              { icon: 'engineering', label: 'Equipage', value: train.crew ? `${train.crew} membres` : null },
              { icon: 'straighten', label: 'Longueur', value: train.length ? `${train.length} metres` : null },
              { icon: 'train', label: 'Compartiments', value: train.compartments?.length ? `${train.compartments.reduce((t: number, c: any) => { const daTotal = (c.deckAssignments || []).reduce((s: number, da: any) => s + (da.count || 0), 0); return t + (daTotal || c.count || 0) }, 0)} compartiments` : null },
            ].filter(s => s.value).map((spec) => (
              <div key={spec.label} className="border border-primary/20 bg-white p-6 text-center shadow-lg dark:bg-abyss">
                <span className="material-symbols-outlined mb-3 text-3xl text-primary">{spec.icon}</span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{spec.label}</p>
                <p className="mt-1 text-lg font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      {descriptionParagraphs.length > 0 && (
        <section className="w-full py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Presentation
              </span>
              <div className="space-y-6">
                {descriptionParagraphs.map((p, idx) => (
                  <p key={idx} className={`leading-relaxed ${idx === 0 ? 'serif-heading text-2xl md:text-3xl' : 'text-sm font-light opacity-70'}`}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="mx-auto mt-10 h-px w-20 bg-primary/30" />
            </div>
          </div>
        </section>
      )}

      {/* COMPARTMENTS */}
      {train.compartments && train.compartments.length > 0 && (
        <section className="w-full bg-white py-16 md:py-24 dark:bg-abyss">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-10 text-center md:mb-16">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Hebergement d'exception
              </span>
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl">Categories de compartiments</h2>
            </div>
            <CabinSection
              cabins={train.compartments.map((c: any) => ({
                id: c.id,
                category: c.category,
                color: c.color,
                size: c.size,
                capacity: c.capacity,
                count: (c.deckAssignments || []).reduce((s: number, da: any) => s + (da.count || 0), 0) || c.count || undefined,
                amenities: c.amenities,
                images: Array.isArray(c.images) ? c.images.filter((img: any) => img?.url) : [],
              }))}
            />
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="w-full py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-10 text-center md:mb-16">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                A bord
              </span>
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl">Galerie photos</h2>
            </div>
            <GalleryLightbox
              images={gallery.map((img: any) => ({
                url: img.url,
                alt: img.alt,
                id: img.id,
              }))}
            />
          </div>
        </section>
      )}

      {/* CARRIAGE PLANS */}
      {(hasCarriagePlans(train) || hasSingleCarriagePlan(train)) && (
        <section className="w-full bg-white py-16 md:py-24 dark:bg-abyss">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-16 text-center">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Vue d'ensemble
              </span>
              <h2 className="serif-heading text-4xl md:text-5xl">Plan des voitures</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm font-light opacity-50">
                Explorez les differentes voitures du train. Zoomez et naviguez pour decouvrir chaque detail.
              </p>
            </div>
            <DeckPlanViewer
              deckPlans={hasCarriagePlans(train) ? train.carriagePlans.map((cp: any) => ({
                deckName: cp.carriageName,
                deckNumber: cp.carriageNumber,
                image: cp.image,
                highlights: cp.highlights,
              })) : undefined}
              singleImage={hasSingleCarriagePlan(train) && !hasCarriagePlans(train) ? {
                url: train.carriagePlan.url,
                alt: train.carriagePlan.alt || 'Plan des voitures',
              } : undefined}
              cabins={train.compartments?.map((c: any) => {
                const da = (c.deckAssignments || []).map((da: any) => ({ deckNumber: Number(da.deckNumber), count: Number(da.count) }))
                if (da.length === 0 && c.assignedCarriages) {
                  const nums = c.assignedCarriages.split(',').map((s: string) => Number(s.trim())).filter((n: number) => !isNaN(n) && n > 0)
                  const perDeck = nums.length > 0 ? Math.ceil((c.count || 0) / nums.length) : 0
                  return { category: c.category, color: c.color, deckAssignments: nums.map((n: number) => ({ deckNumber: n, count: perDeck })) }
                }
                return { category: c.category, color: c.color, deckAssignments: da }
              })}
            />
          </div>
        </section>
      )}

      {/* CRUISES ON THIS TRAIN */}
      {trainCruises.length > 0 && (
        <section className="w-full py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row">
              <div>
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Prochains departs
                </span>
                <h2 className="serif-heading text-4xl md:text-5xl">
                  Voyagez a bord du {train.name}
                </h2>
              </div>
              <Link
                href="/catalogue?voyageType=train"
                className="border-b border-primary pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary"
              >
                Voir tous les voyages en train
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {trainCruises.map((cruise: any) => {
                const dest = typeof cruise.destination === 'object' ? cruise.destination : null
                const img = cruise.featuredImage?.url || ''
                const depDate = cruise.departureDate ? formatDate(cruise.departureDate) : ''
                const retDate = cruise.returnDate ? formatDate(cruise.returnDate) : ''

                return (
                  <Link
                    key={cruise.id}
                    href={`/catalogue/${cruise.slug}`}
                    className="group"
                  >
                    <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                      {img && (
                        <img
                          src={img}
                          alt={cruise.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
                      {dest && (
                        <div className="absolute left-6 top-6">
                          <span className="bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur">
                            {dest.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="serif-heading mb-2 text-2xl transition-colors group-hover:text-primary">
                      {cruise.title}
                    </h3>
                    {depDate && retDate && (
                      <p className="mb-3 text-xs opacity-50">{depDate} — {retDate}</p>
                    )}
                    <div className="flex items-center justify-between border-t border-primary/10 pt-4">
                      <span className="text-lg font-bold">
                        {cruise.price?.toLocaleString('fr-FR')} {'\u20AC'}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Decouvrir
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-primary/10 bg-abyss py-24 text-white">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Pret a embarquer ?
              </span>
              <h3 className="serif-heading text-3xl text-white md:text-4xl">
                Votre prochaine aventure ferroviaire commence ici
              </h3>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Link
                href="/catalogue?voyageType=train"
                className="sharp-edge bg-primary px-10 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-abyss"
              >
                Voir les voyages en train
              </Link>
              <button className="sharp-edge border border-white/30 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-abyss">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

function hasCarriagePlans(train: any): boolean {
  return Array.isArray(train.carriagePlans) && train.carriagePlans.length > 0 &&
    train.carriagePlans.some((cp: any) => cp.image?.url)
}

function hasSingleCarriagePlan(train: any): boolean {
  return train.carriagePlan && typeof train.carriagePlan === 'object' && !!train.carriagePlan.url
}

function extractParagraphs(description: any): string[] {
  if (!description || typeof description !== 'object' || !('root' in description)) return []
  const paragraphs: string[] = []
  for (const node of description.root?.children || []) {
    const text = node.children?.map((c: any) => c.text || '').join('') || ''
    if (text.trim()) paragraphs.push(text)
  }
  return paragraphs
}

function formatDate(dateString: string): string {
  const d = new Date(dateString)
  const months = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
  ]
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}
