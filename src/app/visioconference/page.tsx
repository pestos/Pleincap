'use client'

import { useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

interface Visioconference {
  id: number
  title: string
  description: string
  thumbnail: string
  destination: string
  speaker: string
  date: string
  time: string
  duration: string
  type: 'live' | 'replay'
  registrationLink?: string
  viewers?: number
}

const visioconferences: Visioconference[] = [
  {
    id: 1,
    title: "Odyssée en Méditerranée : Les Trésors de la Grèce Antique",
    description: "Embarquez pour un voyage virtuel à travers les sites archéologiques les plus fascinants de Grèce. Notre conférencier vous dévoile les secrets des temples, amphithéâtres et cités perdues.",
    thumbnail: "https://www.plein-cap.com/images/2026/odyssee/entete_odyssee_2026.jpg",
    destination: "Grèce",
    speaker: "Dr. Antoine Morel, Archéologue",
    date: "5 février 2026",
    time: "18h30",
    duration: "1h30",
    type: 'live',
    viewers: 245
  },
  {
    id: 2,
    title: "L'Orient-Express : Un Siècle de Légendes sur Rails",
    description: "Découvrez l'histoire fascinante du train le plus mythique au monde. De ses origines à son renouveau contemporain, plongez dans l'univers Art déco et le luxe intemporel.",
    thumbnail: "https://www.plein-cap.com/images/2026/train-autriche/shutterstock_2063740619.jpg",
    destination: "Europe",
    speaker: "Sophie Legrand, Historienne des Transports",
    date: "15 janvier 2026",
    time: "19h00",
    duration: "1h15",
    type: 'replay',
    viewers: 892
  },
  {
    id: 3,
    title: "Croisière sur le Danube : Vienne, Budapest et les Perles du Fleuve",
    description: "Naviguez virtuellement sur le fleuve bleu et explorez les capitales impériales. Architecture baroque, cafés viennois et bains thermaux hongrois vous attendent.",
    thumbnail: "https://www.plein-cap.com/images/stories/MsLadyDiletta/Lady-Diletta_08.jpg",
    destination: "Danube",
    speaker: "Marie Dubois, Guide-Conférencière",
    date: "22 janvier 2026",
    time: "18h00",
    duration: "1h20",
    type: 'replay',
    viewers: 567
  },
  {
    id: 4,
    title: "Les Capitales Baltes : Tallinn, Riga, Vilnius",
    description: "Trois villes médiévales, trois identités culturelles uniques. Explorez les ruelles pavées, les églises gothiques et découvrez comment ces nations ont préservé leur patrimoine.",
    thumbnail: "https://www.plein-cap.com/images/2026/capitales_baltes/entete_capitales_baltes.jpg",
    destination: "Pays Baltes",
    speaker: "Thomas Bernard, Historien",
    date: "12 février 2026",
    time: "19h00",
    duration: "1h30",
    type: 'live',
    viewers: 178
  },
  {
    id: 5,
    title: "Expédition au Spitzberg : À la Découverte de l'Arctique",
    description: "Partez pour une aventure polaire exceptionnelle. Glaciers majestueux, faune arctique et phénomène des aurores boréales dans un environnement préservé.",
    thumbnail: "https://www.plein-cap.com/images/2026/spitzberg_sh_diana/Monacobreen__SS_1672-1.jpg",
    destination: "Arctique",
    speaker: "Marc Legrand, Naturaliste",
    date: "8 janvier 2026",
    time: "18h30",
    duration: "1h25",
    type: 'replay',
    viewers: 1243
  },
  {
    id: 6,
    title: "Dakar et le Sénégal : Entre Tradition et Modernité",
    description: "Immersion culturelle dans la capitale sénégalaise. Art contemporain, musique traditionnelle, architecture coloniale et marchés colorés.",
    thumbnail: "https://www.plein-cap.com/images/2026/dakar/shutterstock_597262751.jpg",
    destination: "Sénégal",
    speaker: "Isabelle Laurent, Anthropologue",
    date: "25 février 2026",
    time: "19h30",
    duration: "1h15",
    type: 'live',
    viewers: 89
  }
]

const destinations = [
  "Toutes les destinations",
  "Grèce",
  "Europe",
  "Danube",
  "Pays Baltes",
  "Arctique",
  "Sénégal"
]

export default function VisioconferencePage() {
  const [selectedDestination, setSelectedDestination] = useState("Toutes les destinations")
  const [selectedType, setSelectedType] = useState<'all' | 'live' | 'replay'>('all')

  const filteredConferences = visioconferences.filter(conf => {
    const matchesDestination = selectedDestination === "Toutes les destinations" || conf.destination === selectedDestination
    const matchesType = selectedType === 'all' || conf.type === selectedType
    return matchesDestination && matchesType
  })

  const upcomingLive = visioconferences.filter(conf => conf.type === 'live').slice(0, 2)

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(26, 43, 60, 0.7), rgba(26, 43, 60, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMDCtemCn76yZjscVkq4u5Qgo5cRM9GhYWf2ZlJL3kgJLYMpKt9wV9M9KlJMt-ghB6vH4AYI1RzB1tBHJweLEjmOCgEZjEbPHtF1mHHu7uAY5P8v-gKpOqS_AmG020A6-P8iof7MbF6GI8iMLr0jPJfHza1nCRgzgcPaTQqYg2qTd1B17-erUVunggF1tomGga-VM9O6JXCsBJ9sjwz3DrV1bivedTaCPmvsT_h2I4wutNvDVLENEDZ61KnCKRVHC7l34cbTae_aU')"
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Conférences en ligne
          </span>
          <h1 className="serif-heading mb-6 text-5xl md:text-7xl">
            Visioconférences
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-90">
            Découvrez nos itinéraires exceptionnels depuis chez vous. Nos experts vous présentent les destinations, navires et expériences culturelles en direct ou en replay.
          </p>
        </div>
      </section>

      <section className="relative z-20 -mt-12 w-full">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col items-center gap-6 border border-primary/30 bg-background-light p-6 shadow-2xl dark:bg-background-dark md:flex-row md:justify-center md:p-8">
            <div className="flex w-full flex-wrap items-center justify-center gap-4 md:w-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`sharp-edge whitespace-nowrap px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedType === 'all'
                    ? 'bg-abyss text-white'
                    : 'border border-abyss/20 bg-transparent hover:bg-abyss/10'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setSelectedType('live')}
                className={`sharp-edge whitespace-nowrap px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedType === 'live'
                    ? 'bg-primary text-white'
                    : 'border border-primary/20 bg-transparent hover:bg-primary/10'
                }`}
              >
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-current" />
                En direct
              </button>
              <button
                onClick={() => setSelectedType('replay')}
                className={`sharp-edge whitespace-nowrap px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedType === 'replay'
                    ? 'bg-abyss text-white'
                    : 'border border-abyss/20 bg-transparent hover:bg-abyss/10'
                }`}
              >
                Replay
              </button>
            </div>
            <div className="h-px w-full bg-primary/20 md:h-10 md:w-px" />
            <select
              className="sharp-edge w-full border border-primary/30 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest focus:ring-0 md:w-auto"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
            >
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {upcomingLive.length > 0 && (
        <section className="w-full py-[80px]">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-12 text-center">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Prochaines sessions
              </span>
              <h2 className="serif-heading text-4xl md:text-5xl">
                Conférences en direct
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {upcomingLive.map(conf => (
                <div key={conf.id} className="group relative overflow-hidden border border-primary/30">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={conf.thumbnail}
                      alt={conf.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute left-6 top-6 flex items-center gap-2 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                      En direct
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="material-symbols-outlined text-6xl text-white">
                        play_circle
                      </span>
                    </div>
                  </div>
                  <div className="bg-ecru p-8">
                    <div className="mb-4 flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-60">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          calendar_today
                        </span>
                        {conf.date}
                      </span>
                      <div className="h-3 w-[1px] bg-abyss/30" />
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          schedule
                        </span>
                        {conf.time}
                      </span>
                      <div className="h-3 w-[1px] bg-abyss/30" />
                      <span>{conf.duration}</span>
                    </div>
                    <h3 className="serif-heading mb-3 text-2xl leading-tight">
                      {conf.title}
                    </h3>
                    <p className="mb-4 text-xs font-light leading-relaxed opacity-70">
                      {conf.description}
                    </p>
                    <div className="mb-6 flex items-center gap-3 border-t border-primary/20 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <span className="material-symbols-outlined text-primary">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{conf.speaker}</p>
                        <p className="text-[10px] uppercase tracking-widest opacity-60">Conférencier</p>
                      </div>
                    </div>
                    <button className="sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss">
                      S'inscrire gratuitement
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full bg-ecru py-[120px]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-16 flex items-center justify-between border-b border-primary/20 pb-6">
            <div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Catalogue
              </span>
              <h3 className="serif-heading text-3xl md:text-4xl">
                Toutes nos visioconférences
              </h3>
            </div>
            <span className="text-sm opacity-60">
              {filteredConferences.length} conférence{filteredConferences.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredConferences.map(conf => (
              <div key={conf.id} className="group relative overflow-hidden border border-primary/20 bg-white transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={conf.thumbnail}
                    alt={conf.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute left-4 top-4 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white ${
                    conf.type === 'live' ? 'bg-primary' : 'bg-abyss'
                  }`}>
                    {conf.type === 'live' ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        En direct
                      </span>
                    ) : (
                      'Replay'
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-5xl text-white">
                      {conf.type === 'live' ? 'play_circle' : 'play_arrow'}
                    </span>
                  </div>
                  {conf.type === 'replay' && conf.viewers && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                      <span className="material-symbols-outlined text-sm">
                        visibility
                      </span>
                      {conf.viewers}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-[9px] uppercase tracking-widest opacity-60">
                    <span>{conf.date}</span>
                    {conf.time && (
                      <>
                        <div className="h-2 w-[1px] bg-abyss/30" />
                        <span>{conf.time}</span>
                      </>
                    )}
                    <div className="h-2 w-[1px] bg-abyss/30" />
                    <span>{conf.duration}</span>
                  </div>
                  <h4 className="serif-heading mb-3 text-xl leading-tight transition-colors group-hover:text-primary">
                    {conf.title}
                  </h4>
                  <p className="mb-4 line-clamp-2 text-xs font-light leading-relaxed opacity-70">
                    {conf.description}
                  </p>
                  <div className="mb-4 flex items-center gap-2 border-t border-primary/10 pt-4">
                    <span className="material-symbols-outlined text-sm text-primary">
                      person
                    </span>
                    <p className="text-xs font-medium">{conf.speaker}</p>
                  </div>
                  <button className={`sharp-edge w-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    conf.type === 'live'
                      ? 'bg-primary text-white hover:bg-abyss'
                      : 'border border-abyss/20 bg-transparent hover:bg-abyss hover:text-white'
                  }`}>
                    {conf.type === 'live' ? "S'inscrire" : "Regarder"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredConferences.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm opacity-60">
                Aucune conférence ne correspond à vos critères.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-primary/10 bg-abyss py-[120px] text-ecru">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Pourquoi participer
            </span>
            <h2 className="serif-heading mb-6 text-4xl md:text-5xl">
              Les avantages de nos visioconférences
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-70">
              Explorez nos destinations depuis le confort de votre foyer avec nos experts passionnés
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    videocam
                  </span>
                </div>
              </div>
              <h3 className="serif-heading mb-4 text-2xl">
                Gratuit et Accessible
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70">
                Toutes nos visioconférences sont entièrement gratuites. Participez depuis chez vous, aucun déplacement nécessaire.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    school
                  </span>
                </div>
              </div>
              <h3 className="serif-heading mb-4 text-2xl">
                Experts Passionnés
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70">
                Nos conférenciers sont des historiens, archéologues et guides professionnels qui enrichissent nos voyages.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    question_answer
                  </span>
                </div>
              </div>
              <h3 className="serif-heading mb-4 text-2xl">
                Session Questions
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70">
                Posez vos questions en direct lors des sessions live et obtenez des réponses personnalisées de nos experts.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="sharp-edge border border-primary px-12 py-4 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white">
              Recevoir le calendrier complet
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
