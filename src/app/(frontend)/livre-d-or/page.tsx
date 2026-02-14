import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getTestimonials, getLivreDOrConfig } from '@/lib/payload-queries'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "Livre d'Or | Plein Cap - Témoignages Clients",
  description: "Témoignages clients Plein Cap : retours d'expérience de croisières culturelles et voyages d'exception.",
}

// Map gallery size to CSS classes
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

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#fbfaf9] text-[#1A2B3C] dark:bg-[#1e1a14] dark:text-[#F9F8F6]`}>
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">
        <Hero />
        {gallery.length > 0 && <Gallery items={gallery} />}
        <Testimonials testimonials={testimonials} />
        {inspiredCruises.length > 0 && <Inspired cruises={inspiredCruises} />}
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="px-6 py-12 md:px-20 lg:px-40 md:py-20">
      <div className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
        <h1 className="mb-6 text-4xl font-bold leading-tight italic md:text-6xl">L'Âme de nos Voyages : Votre Livre d'Or</h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed opacity-80 md:text-xl">
          Chaque sillage laissé sur l'onde est une histoire que nous écrivons ensemble. Découvrez les récits de ceux qui ont fait de nos traversées un
          moment d'exception, entre ciel et mer.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-px w-12 bg-[#c59f59]" />
        </div>
      </div>
    </section>
  )
}

function Gallery({ items }: { items: any[] }) {
  return (
    <section className="px-6 pb-16 md:px-20 lg:px-40">
      <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-4">
        {items.map((item: any, idx: number) => {
          const imageUrl = item.image?.url || ''
          const className = sizeToClass[item.size] || sizeToClass.normal
          return (
            <div key={item.id || idx} className={`overflow-hidden ${className}`}>
              {imageUrl && (
                <img
                  alt={item.image?.alt || ''}
                  src={imageUrl}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Testimonials({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="px-6 pb-24 md:px-20 lg:px-40">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {testimonials.map((t, idx) => {
          const imageUrl = t.authorPhoto?.url || t.authorPhoto?.thumbnailURL || ''

          return (
            <div
              key={t.id}
              className={`mb-6 break-inside-avoid border border-primary/10 bg-white p-8 shadow-sm transition dark:bg-[#1e1a14]/50 ${idx === 4 ? 'bg-primary/5 dark:bg-primary/10 border-primary/20' : ''}`}
            >
              <span className="quote-mark mb-2 block text-5xl text-primary leading-none">"</span>
              <input className="peer hidden" id={`testimonial-${t.id}`} type="checkbox" />
              <div className="relative max-h-40 overflow-hidden transition-[max-height] duration-500 peer-checked:max-h-[2000px]">
                <p className="mb-4 text-xl italic leading-relaxed">{t.content}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 peer-checked:opacity-0 dark:from-[#1e1a14]" />
              </div>
              <div className="mb-8 flex items-center gap-4">
                {imageUrl ? (
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-primary/20">
                    <img alt={t.authorName} src={imageUrl} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex flex-col gap-1 text-sm font-bold uppercase tracking-widest">
                  <p className="text-[#1A2B3C] dark:text-primary">{t.authorName}</p>
                  <p className="text-xs uppercase tracking-wider opacity-60">{t.cruiseName || ''}</p>
                </div>
              </div>
              <label
                className="toggle-label inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#C5A059] transition-opacity hover:opacity-80"
                htmlFor={`testimonial-${t.id}`}
              >
                <span className="read-more">Lire l'avis en entier</span>
                <span className="read-less">Fermer</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </label>
            </div>
          )
        })}
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="h-16 w-px bg-primary/30" />
        <h3 className="text-2xl italic font-medium">Votre histoire reste à écrire...</h3>
        <div className="flex justify-center px-4 py-3">
          <button className="flex min-w-[280px] cursor-pointer items-center justify-center gap-2 border-2 border-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-white">
            Partager votre expérience
          </button>
        </div>
      </div>
    </section>
  )
}

function Inspired({ cruises }: { cruises: any[] }) {
  return (
    <section className="border-t border-primary/10 bg-[#F9F8F6] px-6 py-24 dark:bg-[#1e1a14] md:px-20 lg:px-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-light italic md:text-4xl">Itinéraires Inspirés</h2>
            <p className="text-sm uppercase tracking-widest opacity-60">Poursuivez le voyage à travers les escales citées par nos passagers</p>
          </div>
          <div className="mx-12 hidden h-px flex-1 bg-primary/20 md:block" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-20">
          {cruises.map((cruise: any) => {
            const imageUrl = cruise.featuredImage?.url || ''
            return (
              <a key={cruise.id} className="group flex flex-row items-center gap-6" href={`/catalogue/${cruise.slug}`}>
                <div className="h-20 w-20 shrink-0 overflow-hidden">
                  {imageUrl && (
                    <img
                      alt={cruise.title}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                      src={imageUrl}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-medium tracking-tight transition-colors group-hover:text-primary">{cruise.title}</h4>
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                    Découvrir <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
