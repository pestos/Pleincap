import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getBoatBySlug, getBoats } from '@/lib/payload-queries'
import { notFound } from 'next/navigation'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const boats = await getBoats()
  return boats.map((boat) => ({
    slug: boat.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const boat = await getBoatBySlug(slug) as any

  if (!boat) {
    return {
      title: 'Bateau non trouvé | Plein Cap',
    }
  }

  const metaTitle = boat.meta?.title || `${boat.name} | Plein Cap`
  const metaDescription = boat.meta?.description || `Présentation du ${boat.name} : spécifications, cabines, espaces, équipements, croisières à venir.`
  const metaImageUrl = boat.meta?.image?.url || boat.featuredImage?.url

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: boat.meta?.title || boat.name,
      description: metaDescription,
      images: metaImageUrl ? [metaImageUrl] : [],
    },
  }
}

export default async function BoatDetailPage({ params }: Props) {
  const { slug } = await params
  const boat = await getBoatBySlug(slug)

  if (!boat) {
    notFound()
  }

  const heroImage = boat.featuredImage?.url
    ? `linear-gradient(0deg, rgba(13, 18, 27, 0.6) 0%, rgba(13, 18, 27, 0.1) 100%), url('${boat.featuredImage.url}')`
    : undefined

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#F9F8F6] text-[#0d121b] dark:bg-[#101622] dark:text-gray-100`}>
      <SiteHeader />
      <Hero name={boat.name} heroImage={heroImage} />
      <TechSpecs
        capacity={boat.capacity}
        crew={boat.crew}
        length={boat.length}
        builtYear={boat.builtYear}
        renovatedYear={boat.renovatedYear}
      />
      {boat.cabins && boat.cabins.length > 0 && <CabinCategories cabins={boat.cabins} />}
      <FooterCTA />
      <SiteFooter />
    </div>
  )
}

function Hero({ name, heroImage }: { name: string; heroImage?: string }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: heroImage || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      />
      <div className="relative flex h-full flex-col justify-end px-4 pb-28 lg:px-[120px]">
        <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-white/80">Fleuron de la flotte</span>
        <h2 className="serif-title text-5xl leading-tight text-white md:text-7xl lg:text-8xl">{name}</h2>
      </div>
    </section>
  )
}

function TechSpecs({
  capacity,
  crew,
  length,
  builtYear,
  renovatedYear
}: {
  capacity?: number
  crew?: number
  length?: number
  builtYear?: number
  renovatedYear?: number
}) {
  const specs = [
    { label: 'Capacité', value: capacity ? `${capacity} Passagers` : 'N/A' },
    { label: 'Équipage', value: crew ? `${crew} membres` : 'N/A' },
    { label: 'Longueur', value: length ? `${length} mètres` : 'N/A' },
    { label: 'Année de construction', value: builtYear || 'N/A' },
    { label: 'Rénovation', value: renovatedYear || 'N/A' },
  ].filter(spec => spec.value !== 'N/A')

  if (specs.length === 0) return null

  return (
    <section className="px-4 py-16 lg:px-[120px]">
      <h3 className="mb-12 text-center text-xs font-bold uppercase tracking-[0.4em] text-[#C5A059]">Spécifications Techniques</h3>
      <div className="grid grid-cols-2 border-t border-[#0d121b]/10 md:grid-cols-3 lg:grid-cols-5 dark:border-white/10">
        {specs.map((spec, idx) => (
          <div
            key={spec.label}
            className={`py-10 ${
              idx % 5 !== 4 ? 'border-r border-[#0d121b]/10 dark:border-white/10' : ''
            } ${idx < 5 ? 'border-b border-[#0d121b]/10 dark:border-white/10' : ''} px-4 md:px-6`}
          >
            <p className="mb-3 text-[10px] uppercase tracking-widest text-[#0d121b]/50 dark:text-white/50">{spec.label}</p>
            <p className="text-2xl serif-title italic">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

type Cabin = any

function CabinCategories({ cabins }: { cabins: Cabin[] }) {
  return (
    <section className="px-4 pb-24 lg:px-[120px]">
      <div className="mb-16 flex flex-col items-baseline justify-between gap-4 md:flex-row">
        <h3 className="serif-title text-4xl md:text-5xl">Catégories de cabines</h3>
        <p className="text-sm uppercase tracking-widest text-[#0d121b]/50">Hébergement d'exception</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cabins.map((cabin, idx) => (
          <div
            key={cabin.id || idx}
            className="border border-[#0d121b]/10 bg-white p-8 dark:bg-[#101622] dark:border-white/10"
          >
            <h4 className="mb-4 text-2xl serif-title">{cabin.name}</h4>
            {cabin.area && (
              <p className="mb-2 text-sm text-[#0d121b]/70 dark:text-gray-400">
                Surface : {cabin.area}m²
              </p>
            )}
            {cabin.occupancy && (
              <p className="mb-4 text-sm text-[#0d121b]/70 dark:text-gray-400">
                Capacité : {cabin.occupancy} {cabin.occupancy > 1 ? 'personnes' : 'personne'}
              </p>
            )}
            {cabin.amenities && typeof cabin.amenities === 'string' && (
              <div className="mt-4 border-t border-[#0d121b]/10 pt-4 text-xs dark:border-white/10">
                <p>{cabin.amenities}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function FooterCTA() {
  return (
    <section className="bg-[#101622] px-4 py-20 text-white/80 lg:px-[120px]">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Prêt à embarquer ?</p>
          <h4 className="mt-2 text-3xl font-bold text-white">Votre prochaine odyssée commence ici</h4>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <button className="bg-[#1152d4] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#1152d4]">
            Réserver
          </button>
          <button className="border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-[#101622]">
            Télécharger la brochure
          </button>
        </div>
      </div>
    </section>
  )
}
