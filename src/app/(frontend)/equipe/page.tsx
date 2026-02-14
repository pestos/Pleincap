import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getTeamMembers } from '@/lib/payload-queries'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "L'Équipe Plein Cap | Plein Cap",
  description: "Découvrez l'équipe Plein Cap : direction, accompagnateurs, conseillers et opérations.",
}

// Helper to extract plain text from richText
function extractText(richText: any): string {
  if (!richText?.root?.children) return ''
  const firstParagraph = richText.root.children[0]
  if (!firstParagraph?.children) return ''
  const firstText = firstParagraph.children[0]
  return firstText?.text || ''
}

export default async function EquipePage() {
  const members = await getTeamMembers()

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1a2b3c] dark:bg-[#1a2b3c] dark:text-[#f9f8f6]`}>
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1200px] px-6 pt-28">
        <Hero />
        <TeamGrid members={members} />
        <CTA />
      </main>

      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-[#1a2b3c] dark:text-white md:text-7xl">L'Équipe Plein Cap</h1>
        <div className="mx-auto my-8 h-[2px] w-16 bg-[#c5a059]" />
        <p className="text-lg font-medium italic leading-relaxed text-[#c5a059] md:text-xl">
          Plus de 30 ans de passion et d'expertise maritime au service de vos voyages d'exception.
        </p>
      </div>
    </section>
  )
}

function TeamGrid({ members }: { members: any[] }) {
  return (
    <section className="pb-24">
      <div className="grid grid-cols-1 gap-y-24 gap-x-12 md:grid-cols-12">
        {members.slice(0, 2).map((member, idx) => (
          <TeamCard key={member.name} member={member} className={idx === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-24'} />
        ))}

        <div className="md:col-span-12 py-8">
          <div className="divider-gold opacity-30" />
        </div>

        {members.slice(2).map((member, idx) => (
          <TeamCard
            key={member.name}
            member={member}
            className={idx < 3 ? 'md:col-span-4' : 'md:col-span-6 md:mt-12'}
          />
        ))}
      </div>
    </section>
  )
}

function TeamCard({ member, className = '' }: { member: any; className?: string }) {
  const imageUrl = member.photo?.url || member.photo?.thumbnailURL || ''
  const bioText = extractText(member.bio) || member.jobTitle

  // Determine aspect ratio based on position (first member gets tall, second gets mid, rest get square)
  const layout = member.order === 0 ? 'tall' : member.order === 1 ? 'mid' : 'square'

  return (
    <div className={`group ${className}`}>
      <div className="relative overflow-hidden bg-gray-200" style={{ aspectRatio: layout === 'tall' ? '4 / 5' : layout === 'mid' ? '3 / 4' : '1 / 1' }}>
        <div
          className="portrait-hover h-full w-full bg-cover bg-center grayscale transition duration-500 group-hover:grayscale-0"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]">{member.jobTitle}</p>
          <h3 className="text-2xl font-bold text-[#1a2b3c] dark:text-white md:text-3xl">{member.name}</h3>
        </div>
        <p className="text-base leading-snug italic text-[#1a2b3c]/70 dark:text-white/70">{/* Quote omitted - not in CMS */}</p>
        <details className="group/bio">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#c5a059] transition hover:opacity-80">
            <span className="read-more">En savoir plus +</span>
            <span className="read-less">Réduire -</span>
          </summary>
          <div className="mt-6 border-l border-[#c5a059]/30 pl-6">
            <p className="text-sm leading-relaxed text-[#1a2b3c]/80 dark:text-white/80">{bioText}</p>
          </div>
        </details>
      </div>
    </div>
  )
}

function CTA() {
  return (
    <section className="pb-24 text-center">
      <div className="divider-gold mb-24 opacity-20" />
      <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-[#c5a059]">Une question ?</h4>
      <a
        href="#"
        className="text-lg font-medium text-[#1a2b3c] underline decoration-[#c5a059]/50 underline-offset-8 transition hover:decoration-[#c5a059] dark:text-white"
      >
        Contactez-nous pour organiser votre prochain départ
      </a>
    </section>
  )
}
