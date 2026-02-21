'use client'

import { useState, useEffect, useCallback } from 'react'

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
  const [activeTheme, setActiveTheme] = useState<string>('all')
  const [activeDestination, setActiveDestination] = useState<string>('all')

  // Derive theme options from speakers' specialties
  const themes = Array.from(new Set(
    speakers.flatMap((s: any) =>
      (s.specialty || '').split(',').map((t: string) => t.trim()).filter(Boolean)
    )
  ))

  const destinationNames = destinations.map((d: any) => d.name).filter(Boolean)

  // Filter speakers
  const filtered = speakers.filter((s: any) => {
    if (activeTheme !== 'all') {
      const speakerThemes = (s.specialty || '').split(',').map((t: string) => t.trim())
      if (!speakerThemes.includes(activeTheme)) return false
    }
    return true
  })

  const openDrawer = useCallback((speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Escape to close drawer
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && drawerOpen) closeDrawer()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [drawerOpen, closeDrawer])

  function resetFilters() {
    setActiveTheme('all')
    setActiveDestination('all')
  }

  return (
    <>
      {/* Filters */}
      <section className="mb-10 flex flex-col gap-4 border-y border-[#e7e0cf] py-5 dark:border-white/10 sm:flex-row sm:items-end sm:gap-6 md:mb-14">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex min-w-0 flex-1 flex-col sm:max-w-[260px]">
            <label className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#9a824c]">Thematique</label>
            <div className="relative">
              <select
                className="w-full appearance-none cursor-pointer border-b border-[#e7e0cf] bg-transparent py-2 pr-8 text-sm transition-colors focus:border-primary focus:outline-none dark:border-white/20"
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}
              >
                <option value="all">Toutes les thematiques</option>
                {themes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="pointer-events-none material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-sm text-primary">expand_more</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col sm:max-w-[260px]">
            <label className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#9a824c]">Destinations</label>
            <div className="relative">
              <select
                className="w-full appearance-none cursor-pointer border-b border-[#e7e0cf] bg-transparent py-2 pr-8 text-sm transition-colors focus:border-primary focus:outline-none dark:border-white/20"
                value={activeDestination}
                onChange={(e) => setActiveDestination(e.target.value)}
              >
                <option value="all">Toutes les destinations</option>
                {destinationNames.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <span className="pointer-events-none material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-sm text-primary">expand_more</span>
            </div>
          </div>
        </div>
        {(activeTheme !== 'all' || activeDestination !== 'all') && (
          <button
            className="self-start text-xs font-bold uppercase tracking-wider text-primary underline decoration-primary/30 transition-all hover:decoration-primary sm:self-end sm:pb-2"
            onClick={resetFilters}
          >
            Reinitialiser
          </button>
        )}
      </section>

      {/* Results count */}
      {filtered.length !== speakers.length && (
        <p className="mb-6 text-sm text-[#1b170d]/50 dark:text-white/50">
          {filtered.length} conferencier{filtered.length > 1 ? 's' : ''} trouve{filtered.length > 1 ? 's' : ''}
        </p>
      )}

      {/* Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
        {filtered.map((speaker: any) => {
          const imageUrl = speaker.photo?.url || ''
          const bioText = extractText(speaker.bio)
          const tag = speaker.specialty.split(',')[0].trim()

          return (
            <article
              key={speaker.id || speaker.name}
              className="group flex cursor-pointer flex-col"
              onClick={() => openDrawer(speaker)}
            >
              {/* Photo */}
              <div className="relative mb-4 overflow-hidden bg-[#f3f0e7] sm:mb-5">
                <div className="aspect-[4/5]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={speaker.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#e7e0cf]">
                      <span className="material-symbols-outlined text-5xl text-[#9a824c]/40">person</span>
                    </div>
                  )}
                </div>
                {/* Tag badge */}
                <span className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1b170d] backdrop-blur-sm dark:bg-[#1b170d]/90 dark:text-white">
                  {tag}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-abyss/0 transition-colors duration-300 group-hover:bg-abyss/20">
                  <span className="translate-y-4 text-xs font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Voir le profil
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="mb-1 text-lg font-bold transition-colors group-hover:text-primary sm:text-xl">{speaker.name}</h3>
              <p className="mb-3 text-xs italic text-[#9a824c] sm:text-sm">{speaker.specialty}</p>

              {/* Topics pills */}
              {speaker.topics && speaker.topics.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {speaker.topics.slice(0, 3).map((t: any) => (
                    <span key={t.id || t.topic} className="bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {t.topic}
                    </span>
                  ))}
                </div>
              )}

              <p className="line-clamp-2 text-sm leading-relaxed text-[#1b170d]/60 dark:text-[#F9F8F6]/60">{bioText}</p>
            </article>
          )
        })}
      </section>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <span className="material-symbols-outlined mb-4 text-5xl text-primary/30">search_off</span>
          <p className="text-lg font-medium text-[#1b170d]/50 dark:text-white/50">
            Aucun conferencier ne correspond a vos criteres
          </p>
          <button
            className="mt-4 text-sm font-bold text-primary underline"
            onClick={resetFilters}
          >
            Reinitialiser les filtres
          </button>
        </div>
      )}

      {/* Drawer */}
      {drawerOpen && selectedSpeaker && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          {/* Panel */}
          <div className="absolute top-0 right-0 h-full w-full overflow-y-auto bg-[#f9f8f6] shadow-2xl dark:bg-[#1a160f] sm:max-w-[480px] md:max-w-[540px]">
            <div className="relative flex min-h-full flex-col">
              {/* Close button */}
              <button
                className="absolute right-4 top-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center bg-[#1b170d]/80 text-white transition-colors hover:bg-primary sm:right-6 sm:top-6"
                onClick={closeDrawer}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              {/* Speaker photo */}
              <div className="relative h-[40vh] w-full sm:h-[50vh]">
                {(selectedSpeaker.photo?.url) ? (
                  <img
                    src={selectedSpeaker.photo.url}
                    alt={selectedSpeaker.name}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#e7e0cf]">
                    <span className="material-symbols-outlined text-7xl text-[#9a824c]/30">person</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8 px-6 py-8 sm:gap-10 sm:px-10 sm:py-12">
                {/* Name & specialty */}
                <div>
                  <h2 className="mb-2 text-3xl font-bold sm:text-4xl">{selectedSpeaker.name}</h2>
                  <p className="text-base italic text-primary sm:text-lg">{selectedSpeaker.specialty}</p>
                  <div className="mt-5 border-b border-primary/20" />
                </div>

                {/* Bio */}
                <section>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary sm:mb-6">Biographie Detaillee</h3>
                  <div className="space-y-3 text-sm leading-relaxed text-[#1b170d]/80 dark:text-[#F9F8F6]/80 sm:text-base sm:space-y-4">
                    {extractText(selectedSpeaker.bio).split('\n\n').map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                {/* Topics */}
                {selectedSpeaker.topics && selectedSpeaker.topics.length > 0 && (
                  <>
                    <div className="border-b border-primary/20" />
                    <section>
                      <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Sujets de Predilection</h3>
                      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
                        {selectedSpeaker.topics.map((t: any) => (
                          <div key={t.id || t.topic} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                            <span>{t.topic}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {/* Website */}
                {selectedSpeaker.website && (
                  <>
                    <div className="border-b border-primary/20" />
                    <section className="pb-4">
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
