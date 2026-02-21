import { getCruiseBySlug } from '@/lib/payload-queries'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ProgrammeSection from '@/components/ProgrammeSection'
import GalleryLightbox from '@/components/GalleryLightbox'
import type { Metadata } from 'next'

// Types inferred from Payload
type Media = { url?: string; alt?: string; id?: number | string }

type Props = {
  params: Promise<{ slug: string }>
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cruise = await getCruiseBySlug(slug) as any

  if (!cruise) {
    return { title: 'Croisiere non trouvee | Plein Cap' }
  }

  const featuredImage = cruise.featuredImage as Media | undefined
  const metaTitle = cruise.meta?.title || `${cruise.title} | Plein Cap Croisieres`
  const metaDescription = cruise.meta?.description || cruise.excerpt || ''
  const metaImageUrl = cruise.meta?.image?.url || featuredImage?.url

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: cruise.meta?.title || cruise.title,
      description: cruise.meta?.description || cruise.excerpt || '',
      images: metaImageUrl ? [metaImageUrl] : [],
    },
  }
}

export default async function CruisePage({ params }: Props) {
  const { slug } = await params
  const cruise = await getCruiseBySlug(slug)

  if (!cruise) {
    notFound()
  }

  const featuredImage = cruise.featuredImage as Media | undefined
  const boat = typeof cruise.boat === 'object' ? cruise.boat : null
  const train = typeof (cruise as any).train === 'object' ? (cruise as any).train : null
  const vehicle = (cruise as any).voyageType === 'train' && train ? train : boat
  const isTrain = (cruise as any).voyageType === 'train' && !!train
  const destination = typeof cruise.destination === 'object' ? cruise.destination : null
  const speakers = Array.isArray((cruise as any).speakers)
    ? (cruise as any).speakers.filter((s: any) => typeof s === 'object' && s !== null)
    : []
  const gallery = Array.isArray((cruise as any).gallery)
    ? (cruise as any).gallery.filter((img: any) => img?.url)
    : []

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

      {/* --- APERCU + SIDEBAR (ecru / light) --- */}
      <section className="w-full bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Apercu du voyage
              </span>
              <h2 className="serif-heading mb-8 text-4xl md:text-5xl">Eveil Culturel au Fil de l&apos;Eau</h2>
              <p className="mb-8 text-sm font-light leading-relaxed opacity-70">{cruise.excerpt}</p>

              <div className="grid grid-cols-2 gap-8 border-t border-primary/20 pt-8 md:grid-cols-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Navigation</span>
                  <p className="text-sm font-semibold">{destination?.name || 'Destination'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{isTrain ? 'Train' : 'Bateau'}</span>
                  <p className="text-sm font-semibold">{vehicle?.name || boat?.name || 'A confirmer'}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Langue</span>
                  <p className="text-sm font-semibold">Francais</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Accompagnement</span>
                  <p className="text-sm font-semibold text-primary">Permanent</p>
                </div>
              </div>

              {/* Navire / Train */}
              {vehicle && (() => {
                const b = vehicle as any
                const photoUrl = b.featuredImage?.url || ''
                const cabinsOrCompartments = isTrain ? b.compartments : b.cabins
                const cabinCount = cabinsOrCompartments?.reduce((sum: number, c: any) => sum + (c.count || 0), 0) || 0
                const vehicleLink = isTrain ? `/nos-trains/${b.slug}` : `/nos-bateaux/${b.slug}`

                return (
                  <div className="mt-12 border-t border-primary/20 pt-12">
                    <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                      {isTrain ? 'Votre train' : 'Votre navire'}
                    </span>
                    <h3 className="serif-heading mb-8 text-3xl">{b.name}</h3>

                    <div className="flex flex-col overflow-hidden border border-primary/20 bg-white shadow-lg dark:bg-abyss/60 md:flex-row">
                      {/* Photo */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary/5 md:aspect-auto md:w-[45%] md:shrink-0">
                        {photoUrl ? (
                          <img src={photoUrl} alt={b.name} className="h-full w-full object-cover" loading="lazy" />
                        ) : (
                          <div className="flex h-full min-h-[240px] w-full items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-primary/20">{isTrain ? 'train' : 'sailing'}</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col p-6 md:p-8">
                        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {b.capacity && (
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-base">group</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Passagers</span>
                              </div>
                              <p className="text-sm font-semibold">{b.capacity}</p>
                            </div>
                          )}
                          {b.crew && (
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-base">engineering</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Equipage</span>
                              </div>
                              <p className="text-sm font-semibold">{b.crew}</p>
                            </div>
                          )}
                          {b.length && (
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-base">straighten</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Longueur</span>
                              </div>
                              <p className="text-sm font-semibold">{b.length} m</p>
                            </div>
                          )}
                          {b.builtYear && (
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-base">calendar_month</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Construction</span>
                              </div>
                              <p className="text-sm font-semibold">{b.builtYear}</p>
                            </div>
                          )}
                          {b.renovatedYear && (
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-base">auto_fix_high</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Renovation</span>
                              </div>
                              <p className="text-sm font-semibold">{b.renovatedYear}</p>
                            </div>
                          )}
                          {cabinCount > 0 && (
                            <div>
                              <div className="mb-1 flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-base">bed</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{isTrain ? 'Compartiments' : 'Cabines'}</span>
                              </div>
                              <p className="text-sm font-semibold">{cabinCount}</p>
                            </div>
                          )}
                        </div>

                        {cabinsOrCompartments && cabinsOrCompartments.length > 0 && (
                          <div className="mb-6 border-t border-primary/20 pt-4">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                              {isTrain ? 'Categories de compartiments' : 'Categories de cabines'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {cabinsOrCompartments.map((cabin: any) => (
                                <span
                                  key={cabin.id || cabin.category}
                                  className="inline-flex items-center gap-1.5 border border-primary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                                >
                                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cabin.color || '#C5A059' }} />
                                  {cabin.category}
                                  {cabin.size ? ` (${cabin.size}m\u00B2)` : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <a
                          href={vehicleLink}
                          className="mt-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-abyss"
                        >
                          <span>Decouvrir {isTrain ? 'le train' : 'le navire'} en detail</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Sidebar - Reservation */}
            <aside className="lg:sticky lg:top-32 lg:h-fit">
              <div className="border border-primary/20 bg-white p-6 shadow-lg dark:bg-abyss/60 md:p-8">
                <h4 className="serif-heading mb-6 text-2xl">Informations & Reservation</h4>

                <div className="mb-8 border border-primary/20 bg-primary/5 p-4 text-center">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">Prix a partir de</p>
                  <p className="text-3xl font-bold">{cruise.price.toLocaleString('fr-FR')} &euro;</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">par personne</p>
                </div>

                {(cruise as any).priceIncludes && (cruise as any).priceIncludes.length > 0 && (
                  <div className="mb-6 space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Le prix comprend</span>
                    <ul className="space-y-2 text-xs">
                      {(cruise as any).priceIncludes.map((inc: any) => (
                        <li key={inc.id || inc.item} className={`flex items-start gap-2 ${inc.highlight ? 'font-semibold' : ''}`}>
                          <span className={`material-symbols-outlined text-sm text-primary ${inc.highlight ? 'fill-current' : ''}`}>
                            {inc.highlight ? 'stars' : 'check_circle'}
                          </span>
                          {inc.item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3">
                  <button className="sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss">
                    Reserver maintenant
                  </button>
                  {(cruise as any).brochure?.url ? (
                    <a
                      href={(cruise as any).brochure.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sharp-edge flex w-full items-center justify-center gap-2 border border-abyss/20 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      Telecharger la brochure
                    </a>
                  ) : null}
                  <button className="sharp-edge w-full border border-primary/30 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white">
                    Demander un devis
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* --- GALERIE PHOTOS --- */}
      {gallery.length > 0 && (
        <section className="border-t border-primary/10 bg-background-light py-16 text-abyss dark:bg-background-dark dark:text-ecru md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-10 text-center md:mb-16">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                En images
              </span>
              <h3 className="serif-heading text-3xl md:text-4xl lg:text-5xl">Galerie photos</h3>
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

      {/* --- PROGRAMME (ecru / light) --- */}
      {cruise.itinerary && cruise.itinerary.length > 0 && (
        <section className="border-t border-primary/10 bg-background-light py-16 text-abyss dark:bg-background-dark dark:text-ecru md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 md:px-16">
            <ProgrammeSection itinerary={cruise.itinerary} />
          </div>
        </section>
      )}

      {/* --- CONFERENCIERS (dore / primary) --- */}
      {speakers.length > 0 && (
        <section className="border-t border-primary/10 bg-[#EDEBE4] py-16 text-abyss md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-10 text-center md:mb-14">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                {speakers.length > 1 ? 'Vos conferenciers a bord' : 'Votre conferencier a bord'}
              </span>
              <h3 className="serif-heading text-3xl md:text-4xl lg:text-5xl">
                {speakers.length > 1 ? 'Les Experts qui vous Accompagnent' : "L'Expert qui vous Accompagne"}
              </h3>
            </div>
            <div className={`mx-auto grid gap-8 ${speakers.length === 1 ? 'max-w-[800px] grid-cols-1' : 'max-w-[1100px] grid-cols-1 md:grid-cols-2'}`}>
              {speakers.map((speaker: any) => {
                const photoUrl = speaker.photo?.url || ''
                const bioText = speaker.bio?.root?.children
                  ?.map((node: any) => node.children?.map((child: any) => child?.text || '').join(''))
                  .join(' ') || ''

                return (
                  <div
                    key={speaker.id}
                    className={`group overflow-hidden border border-abyss/20 bg-abyss text-ecru ${
                      speakers.length === 1 ? 'flex flex-col md:flex-row' : 'flex flex-col'
                    }`}
                  >
                    <div className={`relative overflow-hidden bg-white/10 ${
                      speakers.length === 1
                        ? 'aspect-[4/5] w-full md:aspect-auto md:w-[280px] md:shrink-0'
                        : 'aspect-[4/5]'
                    }`}>
                      {photoUrl ? (
                        <img src={photoUrl} alt={speaker.name} className="h-full w-full object-cover object-top" loading="lazy" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="material-symbols-outlined text-5xl text-white/30">person</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-8">
                      <h4 className="serif-heading mb-1 text-2xl">{speaker.name}</h4>
                      <p className="mb-4 text-sm italic text-white/80">{speaker.specialty}</p>

                      {speaker.topics && speaker.topics.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {speaker.topics.slice(0, 4).map((t: any) => (
                            <span key={t.id || t.topic} className="border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                              {t.topic}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className={`text-sm font-light leading-relaxed text-white/70 ${speakers.length === 1 ? 'line-clamp-4' : 'line-clamp-3'}`}>
                        {bioText}
                      </p>

                      <a
                        href="/nos-conferenciers"
                        className="mt-auto flex items-center gap-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-white"
                      >
                        <span>Voir le profil complet</span>
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* --- CONDITIONS ET FORMALITES --- */}
      {(() => {
        const sections = [
          { key: 'conditionsGenerales', title: 'Conditions et Formalités', icon: 'gavel' },
          { key: 'prixComprend', title: 'Notre prix comprend', icon: 'check_circle' },
          { key: 'nonInclus', title: 'Ne sont pas inclus', icon: 'block' },
          { key: 'formalitesPolice', title: 'Formalités de police pour les ressortissants français', icon: 'badge' },
          { key: 'conditionsAnnulation', title: "Conditions spécifiques d'annulation pour cette croisière", icon: 'event_busy' },
          { key: 'notaBene', title: 'Nota Bene', icon: 'info' },
        ]
        const filled = sections.filter(s => hasRichTextContent((cruise as any)[s.key]))
        if (filled.length === 0) return null
        return (
          <section className="border-t border-primary/10 bg-background-light py-16 text-abyss dark:bg-background-dark dark:text-ecru md:py-24">
            <div className="mx-auto max-w-[1100px] px-6 md:px-16">
              <div className="mb-10 text-center md:mb-14">
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Informations pratiques
                </span>
                <h3 className="serif-heading text-3xl md:text-4xl lg:text-5xl">Conditions et Formalités</h3>
              </div>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {filled.map(({ key, title, icon }) => {
                  const blocks = extractRichBlocks((cruise as any)[key])
                  return (
                    <div key={key} className="border-l-2 border-primary/30 pl-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-primary">{icon}</span>
                        <h4 className="text-sm font-bold uppercase tracking-widest">{title}</h4>
                      </div>
                      <div className="space-y-3">
                        {blocks.map((block, i) => {
                          if (block.type === 'list') {
                            return (
                              <ul key={i} className="list-inside list-disc space-y-1 text-sm font-light leading-relaxed opacity-70">
                                {block.items.map((item, j) => (
                                  <li key={j}>{item}</li>
                                ))}
                              </ul>
                            )
                          }
                          if (block.type === 'heading') {
                            return <p key={i} className="text-sm font-semibold">{block.text}</p>
                          }
                          return <p key={i} className="text-sm font-light leading-relaxed opacity-70">{block.text}</p>
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })()}

      <SiteFooter />
    </div>
  )
}

function extractTextFromNode(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) {
    return node.children.map((c: any) => extractTextFromNode(c)).join(node.type === 'list' ? '\n' : '')
  }
  return ''
}

function hasRichTextContent(description: any): boolean {
  if (!description || typeof description !== 'object' || !('root' in description)) return false
  const children = description.root?.children || []
  return children.some((node: any) => extractTextFromNode(node).trim().length > 0)
}

type RichTextBlock = { type: 'paragraph' | 'heading'; text: string } | { type: 'list'; items: string[] }

function extractRichBlocks(description: any): RichTextBlock[] {
  if (!description || typeof description !== 'object' || !('root' in description)) return []
  const blocks: RichTextBlock[] = []
  for (const node of description.root?.children || []) {
    if (node.type === 'list') {
      const items = (node.children || [])
        .map((li: any) => extractTextFromNode(li).trim())
        .filter((t: string) => t.length > 0)
      if (items.length > 0) blocks.push({ type: 'list', items })
    } else if (node.type === 'heading') {
      const text = extractTextFromNode(node).trim()
      if (text) blocks.push({ type: 'heading', text })
    } else {
      const text = extractTextFromNode(node).trim()
      if (text) blocks.push({ type: 'paragraph', text })
    }
  }
  return blocks
}
