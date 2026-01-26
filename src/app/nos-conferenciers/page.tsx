import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "Nos Conférenciers: L'Expertise Plein Cap",
  description: "Découvrez les conférenciers Plein Cap : érudits, historiens, artistes qui enrichissent nos croisières culturelles.",
}

type Expert = {
  name: string
  title: string
  tag: string
  topics: string[]
  desc: string
  image: string
}

const experts: Expert[] = [
  {
    name: 'Jean-Pierre Vallat',
    title: "Professeur d'Archéologie, Spécialiste Byzantin",
    tag: 'Archéologie',
    topics: ['Empire Romain', 'Mosaïques', 'Éphèse'],
    desc:
      "Membre émérite de l'Institut de France, il accompagne nos croisières en Méditerranée depuis plus de 15 ans. Ses récits font revivre les pierres des sites les plus secrets de la Grèce et de la Turquie.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_HKja76H9LT90laMnG-fGfmzCGsZRUzQFAI89ubZMVLdqG2ZYHgeIm2yvrQdMYlznE7gii56xw6BMAQXkJhmtkzEJqiSVIu6YvaTwsz4It8IncoDo-PHxgYQvpltG-Knqsto0eC6N8SCBIBsYtgih1HA7hGOJ9ZkYulyifOxH4roxkNVRjn0A1rbdYHJRYhy7TOLCsQ5rBwJrBxvs0c9Z9IQneqJoC8gXub1ZkRmm8dKVyJ2KCFazP_vRwniTnBv3lMyFoQXL7ps',
  },
  {
    name: 'Marie-Louise Bonnaire',
    title: "Historienne de l'Art, Conservatrice",
    tag: 'Art & Culture',
    topics: ['Renaissance', 'Peinture Flamande', 'Curiosités'],
    desc:
      'Spécialiste de la peinture européenne du XVIème siècle, elle partage son regard acéré sur les chefs-d\'œuvre des musées italiens et espagnols lors de nos escales culturelles.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBM--FXbjpasxEUJhcgraW8ecUsjPeYak-LP8Z55BbNtCgg1wVCce7iYNo5d6swaHnsdNI3WSu_96Q2LELoEHIXrgkKCeLaB4z4GlQa9iQQShT2H22tHF-EZkol6nlKtwYzfYUJuK-Oq940MRZIL7Q0W4wjFWfvJB4NPhvEVMbkg8dKjnMlMGhk5cJpY_znWeNdz4R-NpWkX9KBcEWcccEmtlRXUMTL2OjYzDVqdYmayuD-dAfaBqI4Xf-D4oDbQ18TLC2RwCaBtw4',
  },
  {
    name: 'Marc-Antoine Durand',
    title: 'Musicologue & Critique Musical',
    tag: 'Musique',
    topics: ['Opéra Baroque', 'Vivaldi', 'Luth'],
    desc:
      "Ancien directeur de programmation, il anime nos croisières musicales par des conférences-concerts illustrées au piano, explorant l'âme des cités de la musique.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTBLC2jMEKbiWeGEXHkBGZgePFfyelc2hChlW_sd0Jimsx8hMWJ3Yh7OSEN6gYsc4u8LvqBOFD0kEgYAgmqMBJ86LtJNJpGCGH497pk6_5dIi3MU0TpZ9wV26026yc7JqJP3vlbYMMXQ8IaGElUEfVI5k0CqNT9_iWu_aL4uFwzYv54ZdNlK0AnpgtTgBcq--M7ReyU_WTHiZ4rfmBwHx0IT3V_ENODRfUffQvC0qe4UQ0AEpS8T3Axts4z1txTxuoJKXEFbBnbbM',
  },
  {
    name: 'Hélène Girard',
    title: 'Naturaliste & Botaniste',
    tag: 'Sciences',
    topics: ['Biodiversité', 'Arctique', 'Écologie'],
    desc:
      "Docteure en sciences de l'environnement, elle apporte un éclairage scientifique sur les écosystèmes traversés, des glaces du Grand Nord aux lagons tropicaux.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRqzoVYIlXT32ZcCVVJ0X-v_wKE78HQo1GpnD3_8p-ctR9l76q8G_ri6pHM9ITxQBc3f9lrO0e-HBpj3CAqNKqdqz-ndmlkUAmUijlInF2toI3sXGB8OogSv6Q3RcthIo99FlQSUjO9j0bqIxO5q5uU0TGMKEmhcuUfjajkvFCJ5guQBMp54Ijtu_l924_CmFE1D1kDKLIq4c3FqF0CqG7F7T1uN9t_jEjxVaLgiXH3rgzOS0xbfY1FTY9_ebnh-K95oov9iSGycw',
  },
  {
    name: 'François Dupont',
    title: 'Historien de la Marine',
    tag: 'Histoire Navale',
    topics: ['Grandes Découvertes', 'Cartographie', 'Lorient'],
    desc:
      'Grand voyageur et auteur sur la Compagnie des Indes, il retrace l\'épopée des marins qui ont dessiné le monde d\'aujourd\'hui.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiJm4gCKI8c4LnmJKhHI4i5pWy2B06KnsBpevqKseJSM0SftuT062GMsVS03mAsYlejRYeK9xRK3P0FUTzjEZu_bj-xW5Bd65OjKuQQ9It-qAPuxkoqPEUMEb5HRi2ao0ZjNzDeLb276Vr8q5piClgA-nEa5CCpRyLmP-maJifWsRu6pzTlgLbp3kW6POPxxNZx2k21LWmaKQX3DY1xKyeBWtAc6JJITmAaVJEs6R_-VC2tz7x_L2iBAaxcVMGlqsZy2NAKS8BF-I',
  },
  {
    name: 'Claire Valéry',
    title: 'Conférencière en Littérature',
    tag: 'Littérature',
    topics: ['Poésie XIXème', 'Récits de Voyage', 'Proust'],
    desc:
      "Claire explore les liens entre paysages et textes qu'ils ont inspirés, offrant des lectures au crépuscule qui enchantent nos traversées.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0rO2TYlf0AS7ppd0xmFlZa-eZ-KeoMXqJJ3V2tKrW_dLifqgXEd6diOK1KPF10B1clll_yCCVzuqLZFNmzXzNIEcBcYAERAMmLa5QL3wJJuM2oU1GjfgTHczKTnNu7uLkk33IdlzesQ0WZNuJzBj-yTRRwyueE3OyYhRA-qdQX-QavcEBqxH0Uza7gs2Rk-x-NHInP4AjHizS7FMXaJPaahGVP1fTRfJCBgSMN-08AZXOpORZwp_Tq-CHuvToz2lomFqjPBa0Zng',
  },
]

export default function NosConferenciersPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1b170d] dark:bg-[#1a160f] dark:text-[#F9F8F6]`}>
      <input className="peer hidden" id="drawer-toggle" type="checkbox" />
      <Drawer />
      <SiteHeader />
      <main className="flex-1 px-4 pb-12 pt-24 md:px-12 md:pt-28 lg:px-20 xl:px-28">
        <Hero />
        <Filters />
        <ExpertsGrid />
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

function ExpertsGrid() {
  return (
    <section className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {experts.map((expert) => (
        <ExpertCard key={expert.name} expert={expert} />
      ))}
    </section>
  )
}

type ExpertCardProps = { expert: Expert }

function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="group flex cursor-default flex-col">
      <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-[#f3f0e7]">
        <div
          className="expert-card-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${expert.image}')` }}
          aria-label={expert.name}
        />
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1b170d] dark:bg-[#1b170d]/90 dark:text-white">
            {expert.tag}
          </span>
        </div>
      </div>
      <h3 className="mb-1 text-2xl font-bold transition-colors group-hover:text-primary">{expert.name}</h3>
      <p className="mb-4 text-sm italic text-[#9a824c]">{expert.title}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {expert.topics.map((topic, idx) => (
          <span key={topic} className="text-[11px] font-bold uppercase text-primary">
            {topic}
            {idx < expert.topics.length - 1 ? ' •' : ''}
          </span>
        ))}
      </div>
      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#1b170d]/70 dark:text-[#F9F8F6]/70">{expert.desc}</p>
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
