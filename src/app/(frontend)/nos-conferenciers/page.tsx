import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getSpeakers } from '@/lib/payload-queries'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "Nos Conférenciers: L'Expertise Plein Cap",
  description: "Découvrez les conférenciers Plein Cap : érudits, historiens, artistes qui enrichissent nos croisières culturelles.",
}

// Helper to extract plain text from richText
function extractText(richText: any): string {
  if (!richText?.root?.children) return ''
  const firstParagraph = richText.root.children[0]
  if (!firstParagraph?.children) return ''
  const firstText = firstParagraph.children[0]
  return firstText?.text || ''
}

export default async function NosConferenciersPage() {
  const speakers = await getSpeakers()
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1b170d] dark:bg-[#1a160f] dark:text-[#F9F8F6]`}>
      <input className="peer hidden" id="drawer-toggle" type="checkbox" />
      <Drawer />
      <SiteHeader />
      <main className="flex-1 px-4 pb-12 pt-24 md:px-12 md:pt-28 lg:px-20 xl:px-28">
        <Hero />
        <Filters />
        <ExpertsGrid speakers={speakers} />
        <CTA />
      </main>
      <SiteFooter />

    </div>
  )
}

function Hero() {
  return (
    <section className="mb-12 max-w-4xl">
      <h1 className="mb-6 text-5xl font-black leading-tight tracking-[-0.02em] md:text-6xl">L'Expertise au Cœur de nos Voyages</h1>
      <p className="max-w-2xl text-xl italic leading-relaxed text-[#9a824c]">
        Découvrez les érudits, historiens et artistes qui donneront une dimension culturelle unique à votre prochaine croisière. Bien plus qu'un voyage,
        une immersion intellectuelle.
      </p>
    </section>
  )
}

function Filters() {
  return (
    <section className="mb-12 flex flex-col gap-6 border-y border-[#e7e0cf] py-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-6">
        <SelectBlock label="Thématique" options={['Toutes les thématiques', 'Archéologie & Histoire Antique', 'Arts & Culture Renaissance', 'Musique Classique & Opéra', 'Géopolitique Contemporaine', 'Naturalisme & Botanique']} />
        <SelectBlock label="Destinations" options={['Toutes les destinations', 'Méditerranée Orientale', 'Fjords de Norvège', 'Asie du Sud-Est', 'Antarctique']} />
      </div>
      <div className="flex gap-2">
        <button className="bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-tighter text-primary transition-all hover:bg-primary hover:text-white">
          Filtrer
        </button>
        <button className="px-4 py-2 text-xs font-bold uppercase tracking-tighter text-[#1b170d] underline decoration-primary/30 transition-all hover:text-primary dark:text-white/60">
          Réinitialiser
        </button>
      </div>
    </section>
  )
}

function SelectBlock({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex min-w-[220px] flex-col">
      <label className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#9a824c]">{label}</label>
      <div className="group relative">
        <select className="w-full appearance-none cursor-pointer border-b border-[#e7e0cf] bg-transparent py-2 pr-10 text-sm transition-colors focus:border-primary focus:ring-0 dark:border-white/20">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <span className="pointer-events-none material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-primary">expand_more</span>
      </div>
    </div>
  )
}

function ExpertsGrid({ speakers }: { speakers: any[] }) {
  return (
    <section className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {speakers.map((speaker) => (
        <ExpertCard key={speaker.name} speaker={speaker} />
      ))}
    </section>
  )
}

type ExpertCardProps = { speaker: any }

function ExpertCard({ speaker }: ExpertCardProps) {
  const imageUrl = speaker.photo?.url || speaker.photo?.thumbnailURL || ''
  const bioText = extractText(speaker.bio)

  // Derive tag from specialty (simplified version)
  const tag = speaker.specialty.split(',')[0].trim()

  return (
    <div className="group flex cursor-default flex-col">
      <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-[#f3f0e7]">
        <div
          className="expert-card-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          aria-label={speaker.name}
        />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1b170d] dark:bg-[#1b170d]/90 dark:text-white">
            {tag}
          </span>
        </div>
      </div>
      <h3 className="mb-1 text-2xl font-bold transition-colors group-hover:text-primary">{speaker.name}</h3>
      <p className="mb-4 text-sm italic text-[#9a824c]">{speaker.specialty}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {/* Topics omitted - not in CMS schema */}
      </div>
      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#1b170d]/70 dark:text-[#F9F8F6]/70">{bioText}</p>
      <div className="mt-auto flex flex-col gap-3">
        <label
          className="flex w-fit cursor-pointer items-center border-b border-primary/20 pb-1 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:border-primary"
          htmlFor="drawer-toggle"
        >
          <span>Voir le profil complet</span>
          <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
        </label>
      </div>
    </div>
  )
}

function CTA() {
  return (
    <section className="mt-24 border border-primary/10 bg-primary/5 p-12 text-center">
      <h4 className="mb-4 text-2xl font-bold uppercase tracking-wider">Vous ne trouvez pas votre sujet ?</h4>
      <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[#1b170d]/60 dark:text-white/60">
        Notre équipe de conseillers culturels est à votre disposition pour vous orienter vers la croisière thématique qui correspond le mieux à vos centres
        d'intérêt.
      </p>
      <button className="bg-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-primary/90">
        Contacter un conseiller
      </button>
    </section>
  )
}

function Drawer() {
  return (
    <div className="drawer-transition fixed top-0 right-0 z-50 h-full w-full max-w-[480px] translate-x-full overflow-y-auto border-l border-[#e7e0cf] bg-[#f9f8f6] shadow-2xl transition-transform duration-400 peer-checked:translate-x-0 dark:bg-[#1a160f]">
      <div className="relative flex min-h-screen flex-col">
        <label
          className="absolute right-6 top-6 z-50 cursor-pointer bg-[#1b170d] p-2 text-white transition-colors hover:bg-primary"
          htmlFor="drawer-toggle"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </label>
        <div className="h-[50vh] w-full overflow-hidden">
          <img
            alt="Expert Portrait"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_HKja76H9LT90laMnG-fGfmzCGsZRUzQFAI89ubZMVLdqG2ZYHgeIm2yvrQdMYlznE7gii56xw6BMAQXkJhmtkzEJqiSVIu6YvaTwsz4It8IncoDo-PHxgYQvpltG-Knqsto0eC6N8SCBIBsYtgih1HA7hGOJ9ZkYulyifOxH4roxkNVRjn0A1rbdYHJRYhy7TOLCsQ5rBwJrBxvs0c9Z9IQneqJoC8gXub1ZkRmm8dKVyJ2KCFazP_vRwniTnBv3lMyFoQXL7ps"
          />
        </div>
        <div className="flex flex-col gap-10 px-10 py-12">
          <div>
            <h2 className="mb-2 text-4xl font-bold">Jean-Pierre Vallat</h2>
            <p className="text-lg italic text-primary">Professeur d'Archéologie, Spécialiste Byzantin</p>
            <div className="mt-6 border-b border-primary/20" />
          </div>
          <section className="font-sans">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Biographie Détaillée</h3>
            <div className="space-y-4 text-base leading-relaxed text-[#1b170d]/80 dark:text-[#F9F8F6]/80">
              <p>
                Membre émérite de l'Institut de France et chercheur associé au CNRS, Jean-Pierre Vallat consacre sa carrière à l'étude des structures
                agraires et urbaines du monde méditerranéen antique. Ses travaux font autorité sur la période byzantine et les transitions de l'Antiquité
                tardive.
              </p>
              <p>
                Depuis plus de 15 ans, il met son érudition au service des voyageurs de Plein Cap. Son approche lie rigueur scientifique et narration
                vivante, redonnant souffle aux ruines de l'Égée ou aux cités d'Anatolie.
              </p>
              <p>
                Auteur d'ouvrages de référence sur la Méditerranée orientale, il partage lors de nos croisières des clés de lecture uniques sur
                l'évolution des civilisations.
              </p>
            </div>
          </section>
          <div className="border-b border-primary/20" />
          <section>
            <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Sujets de Prédilection</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm font-sans">
              {[
                'Empire Romain',
                'Mosaïques',
                "Sites de l'Égée",
                'Épigraphie Latine',
              ].map((topic) => (
                <div key={topic} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </section>
          <div className="border-b border-primary/20" />
          <section className="pb-6">
            <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Retrouvez-le à bord</h3>
            <div className="flex flex-col gap-6">
              {[
                { date: '12 Mai — 24 Mai 2024', title: "Trésors de l'Égée" },
                { date: '03 Sept — 15 Sept 2024', title: 'Routes Impériales' },
              ].map((cruise) => (
                <div key={cruise.title} className="flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="mb-1 text-[10px] font-bold uppercase text-primary">{cruise.date}</span>
                    <span className="text-lg font-bold">{cruise.title}</span>
                  </div>
                  <a
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1b170d] transition-colors hover:text-primary dark:text-white"
                    href="#"
                  >
                    Découvrir <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
