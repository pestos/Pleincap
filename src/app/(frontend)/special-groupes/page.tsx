import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Spécial Groupes: Voyages sur Mesure | Plein Cap',
  description: "Voyages sur mesure pour groupes : privatisation, conditions exclusives et accompagnement dédié.",
}

const advantages = [
  {
    title: 'Conditions Exclusives',
    icon: 'payments',
    text: "Tarifs préférentiels, conditions d'annulation assouplies et gratuités selon la taille du groupe.",
  },
  {
    title: 'Personnalisation',
    icon: 'auto_awesome',
    text: 'Conférences privées, excursions sur mesure, chaque escale adaptée à vos centres d’intérêt.',
  },
  {
    title: 'Accompagnement Dédié',
    icon: 'support_agent',
    text: 'Un expert unique vous suit de la genèse du projet au retour des participants.',
  },
]

const trust = [
  { label: "d'Expertise", value: '30 Ans' },
  { label: 'Devis Personnalisé', value: 'Gratuit' },
  { label: 'Conseiller Dédié', value: 'Unique' },
  { label: 'Flexibilité', value: 'Totale' },
]

export default function SpecialGroupesPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1A2B3C]`}>
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">
        <Hero />
        <Advantages />
        <Privatization />
        <InquiryForm />
        <Trust />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,43,60,0.4), rgba(26,43,60,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGL7baT4zJIzesygpfRPtiy1HcHO4p316KGtHnHE5UqAon4H-pGm9pL7fewFftX7Zkk0f12_Pel-ag3X79i7JfZtfPg0e7d4oUals7gfJhIcjsi3enkpOCnj8whXXfDkTyNtS-bswf5QSmEUm9cF_j7PZ4Vk1FXEmfeIPhF9ZnGcvLQWuBfkSvtkwM_H3tLYdY9ae86EFVAPipR4r7Nj2j21dr8DyithdEjaU0VEUKZmJnWkoy_aIyRVNjC2u4u96RNhTAiv1mJ3U')",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-16 lg:px-[120px]">
        <span className="mb-6 block text-sm font-medium uppercase tracking-[0.4em] text-[#c59f59]">Exclusivité & Excellence</span>
        <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-bold leading-[1.1] text-white md:text-7xl">
          Privilèges Groupes : <span className="italic font-normal">Le Voyage sur Mesure</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-normal leading-relaxed text-white/90 md:text-xl">
          Vivez une expérience d'exception entre mer et culture, conçue exclusivement pour l'harmonie de votre groupe.
        </p>
        <div className="flex justify-center gap-6">
          <button className="rounded-sm bg-[#c59f59] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-[1.02]">
            Découvrir nos offres
          </button>
        </div>
      </div>
    </section>
  )
}

function Advantages() {
  return (
    <section className="bg-[#f9f8f6] py-24 text-center">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16 lg:px-[120px]">
        <div className="mb-20">
          <h2 className="mb-4 text-4xl font-bold italic text-[#1A2B3C]">L'Art de Recevoir en Groupe</h2>
          <div className="mx-auto h-px w-24 bg-[#c59f59]" />
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {advantages.map((item) => (
            <div key={item.title} className="group flex flex-col items-center text-center">
              <div className="mb-8 text-[#c59f59] transition-transform duration-500 group-hover:scale-110">
                <span className="material-symbols-outlined text-5xl font-light">{item.icon}</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#1A2B3C]">{item.title}</h3>
              <p className="leading-relaxed text-[#1A2B3C]/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Privatization() {
  return (
    <section className="bg-white py-24 lg:bg-white/80">
      <div className="mx-auto flex max-w-[1440px] flex-col items-stretch gap-16 px-6 md:px-16 lg:flex-row lg:px-[120px]">
        <div className="h-full min-h-[500px] flex-1">
          <div
            className="relative h-full w-full overflow-hidden rounded-sm bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPP6EAVa9PnkPaapH_uzcJz2QqsPFPFJ_E188k97PB-qXnxO3lFkr0nj7fcR_NHNQ27dAV7fQ5_O5u2cA6YHoTImL4r33UYQmRCCOO8M7GnrddEmKahkZLw-YsNRzqbjlaCRufn3f8NKl1y7Bb-xrS2aqA7nMjm6RK51Zhc_nhUUFbVzRnmvx9w2b-EdBpM5c1MVlu8EV1eYZQjgPixgnPOpDvN84APX6vUUaF-K2bc9e-8fBUhCyAhn_SHCbHtlM61g8C6Cq0WGA')",
            }}
          >
            <div className="absolute -bottom-6 -right-6 hidden bg-[#c59f59] p-12 text-white shadow-xl xl:block">
              <p className="text-2xl font-light italic">"L'intimité d'un yacht privé"</p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center py-2 lg:py-10">
          <span className="mb-4 text-xs font-medium uppercase tracking-widest text-[#c59f59]">Privatisation Totale</span>
          <h2 className="mb-8 text-4xl font-bold leading-tight italic text-[#1A2B3C] md:text-5xl">Votre Navire, Votre Univers</h2>
          <p className="mb-8 text-lg leading-relaxed text-[#1A2B3C]/80">
            Pour une immersion absolue, Plein Cap vous offre la possibilité de privatiser l'intégralité d'un navire de petite capacité ou une voiture de train
            de prestige.
          </p>
          <div className="space-y-6">
            {[
              {
                title: 'Itinéraires Flexibles',
                text: 'Définissez vos propres escales et le rythme de votre navigation.',
              },
              {
                title: 'Identité Visuelle',
                text: "Menus, journal de bord et accueil aux couleurs de votre organisation.",
              },
              {
                title: 'Événementiel',
                text: 'Soirées de gala, séminaires ou célébrations privées en haute mer.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#c59f59]">check_circle</span>
                <p className="text-[#1A2B3C]/70">
                  <strong className="text-[#1A2B3C]">{item.title} :</strong> {item.text}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-12 w-fit border-b-2 border-[#c59f59] py-2 text-sm font-bold uppercase tracking-widest text-[#1A2B3C] transition-colors hover:text-[#c59f59]">
            En savoir plus sur l'affrètement
          </button>
        </div>
      </div>
    </section>
  )
}

function InquiryForm() {
  return (
    <section className="bg-[#f9f8f6] py-32">
      <div className="mx-auto max-w-[960px] px-6">
        <div className="border border-[#e2ddd5] bg-white p-12 shadow-sm md:p-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#1A2B3C]">Demande de Projet</h2>
            <p className="text-[#1A2B3C]/60">Décrivez-nous votre vision, nous lui donnerons vie.</p>
          </div>
          <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Field label="Nom" type="text" />
            <Field label="Prénom" type="text" />
            <Field label="Organisation / Association" type="text" full />
            <Field label="Destination souhaitée" type="text" />
            <Field label="Nombre de participants" type="number" />
            <Field label="Votre Message" textarea full />
            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full rounded-sm bg-[#c59f59] py-5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:brightness-110"
              >
                Envoyer ma demande
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', textarea = false, full = false }: { label: string; type?: string; textarea?: boolean; full?: boolean }) {
  const className = 'w-full border-0 border-b border-[#e2ddd5] bg-transparent px-0 py-3 text-[#1A2B3C] focus:border-[#c59f59] focus:ring-0 dark:border-white/20 dark:text-white'
  return (
    <div className={`${full ? 'md:col-span-2' : ''} space-y-2`}>
      <label className="text-xs font-bold uppercase tracking-widest text-[#1A2B3C]/60">{label}</label>
      {textarea ? <textarea className={className} rows={4} /> : <input className={className} type={type} />}
    </div>
  )
}

function Trust() {
  return (
    <section className="border-y border-[#e2ddd5] bg-white/50">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16 lg:px-[120px]">
        <div className="grid grid-cols-2 divide-x divide-[#e2ddd5] md:grid-cols-4">
          {trust.map((item) => (
            <div key={item.label} className="flex flex-col items-center px-6 py-12 text-center">
              <span className="mb-2 text-xl font-bold text-[#c59f59]">{item.value}</span>
              <span className="text-xs font-medium uppercase tracking-widest text-[#1A2B3C]/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
