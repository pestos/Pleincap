'use client'

import { useState } from 'react'

function extractText(richText: any): string {
  if (!richText?.root?.children) return ''
  return richText.root.children
    .map((node: any) => {
      if (!node?.children) return ''
      return node.children.map((child: any) => child?.text || '').join('')
    })
    .join('\n\n')
}

type Speaker = any

export default function ConferenciersClient({
  speakers,
  destinations,
}: {
  speakers: Speaker[]
  destinations: any[]
}) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Derive theme options from speakers' specialties
  const themes = Array.from(new Set(
    speakers.flatMap((s: any) =>
      (s.specialty || '').split(',').map((t: string) => t.trim()).filter(Boolean)
    )
  ))

  const destinationNames = destinations.map((d: any) => d.name).filter(Boolean)

  function openDrawer(speaker: Speaker) {
    setSelectedSpeaker(speaker)
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
  }

  return (
    <>
      {/* Filters */}
      <section className="mb-12 flex flex-col gap-6 border-y border-[#e7e0cf] py-6 dark:border-white/10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-6">
          <SelectBlock
            label="Thématique"
            options={['Toutes les thématiques', ...themes]}
          />
          <SelectBlock
            label="Destinations"
            options={['Toutes les destinations', ...destinationNames]}
          />
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

      {/* Grid */}
      <section className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker: any) => {
          const imageUrl = speaker.photo?.url || speaker.photo?.thumbnailURL || ''
          const bioText = extractText(speaker.bio)
          const tag = speaker.specialty.split(',')[0].trim()

          return (
            <div key={speaker.id || speaker.name} className="group flex cursor-default flex-col">
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
                {(speaker.topics || []).slice(0, 3).map((t: any) => (
                  <span key={t.id || t.topic} className="bg-primary/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {t.topic}
                  </span>
                ))}
              </div>
              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-[#1b170d]/70 dark:text-[#F9F8F6]/70">{bioText}</p>
              <div className="mt-auto flex flex-col gap-3">
                <button
                  className="flex w-fit cursor-pointer items-center border-b border-primary/20 pb-1 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:border-primary"
                  onClick={() => openDrawer(speaker)}
                >
                  <span>Voir le profil complet</span>
                  <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )
        })}
      </section>

      {/* Drawer */}
      {drawerOpen && selectedSpeaker && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={closeDrawer} />
          <div className="absolute top-0 right-0 h-full w-full max-w-[480px] overflow-y-auto border-l border-[#e7e0cf] bg-[#f9f8f6] shadow-2xl dark:bg-[#1a160f]">
            <div className="relative flex min-h-screen flex-col">
              <button
                className="absolute right-6 top-6 z-50 cursor-pointer bg-[#1b170d] p-2 text-white transition-colors hover:bg-primary"
                onClick={closeDrawer}
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
              <div className="h-[50vh] w-full overflow-hidden">
                <img
                  alt={selectedSpeaker.name}
                  className="h-full w-full object-cover"
                  src={selectedSpeaker.photo?.url || selectedSpeaker.photo?.thumbnailURL || ''}
                />
              </div>
              <div className="flex flex-col gap-10 px-10 py-12">
                <div>
                  <h2 className="mb-2 text-4xl font-bold">{selectedSpeaker.name}</h2>
                  <p className="text-lg italic text-primary">{selectedSpeaker.specialty}</p>
                  <div className="mt-6 border-b border-primary/20" />
                </div>
                <section className="font-sans">
                  <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Biographie Détaillée</h3>
                  <div className="space-y-4 text-base leading-relaxed text-[#1b170d]/80 dark:text-[#F9F8F6]/80">
                    {extractText(selectedSpeaker.bio).split('\n\n').map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
                {selectedSpeaker.topics && selectedSpeaker.topics.length > 0 && (
                  <>
                    <div className="border-b border-primary/20" />
                    <section>
                      <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Sujets de Prédilection</h3>
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm font-sans">
                        {selectedSpeaker.topics.map((t: any) => (
                          <div key={t.id || t.topic} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span>{t.topic}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}
                {selectedSpeaker.website && (
                  <>
                    <div className="border-b border-primary/20" />
                    <section className="pb-6">
                      <a
                        href={selectedSpeaker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">language</span>
                        Visiter le site web
                      </a>
                    </section>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
