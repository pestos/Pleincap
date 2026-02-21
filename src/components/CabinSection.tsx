'use client'

import { useState, useEffect, useCallback } from 'react'

type Cabin = {
  id?: string
  category: string
  color?: string
  size?: number
  capacity?: number
  count?: number
  amenities?: string
  images?: { url: string; alt?: string }[]
}

type Props = {
  cabins: Cabin[]
}

export default function CabinSection({ cabins }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [imageIdx, setImageIdx] = useState(0)
  const isOpen = selectedIdx !== null
  const cabin = isOpen ? cabins[selectedIdx] : null
  const cabinImages = cabin?.images || []

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  // Reset image index when switching cabins
  useEffect(() => {
    setImageIdx(0)
  }, [selectedIdx])

  const close = useCallback(() => setSelectedIdx(null), [])

  // Keyboard
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight' && cabinImages.length > 1) {
        setImageIdx(prev => (prev + 1) % cabinImages.length)
      }
      if (e.key === 'ArrowLeft' && cabinImages.length > 1) {
        setImageIdx(prev => (prev - 1 + cabinImages.length) % cabinImages.length)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close, cabinImages.length])

  const amenitiesList = cabin?.amenities
    ? cabin.amenities.split('\n').filter(Boolean).map(s => s.trim())
    : []

  return (
    <>
      {/* GRID OF CABIN CARDS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {cabins.map((c, idx) => {
          const img = c.images?.[0]
          return (
            <button
              key={c.id || idx}
              onClick={() => setSelectedIdx(idx)}
              className="group text-left"
            >
              {/* Image */}
              <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-ecru dark:bg-background-dark md:mb-6">
                {img?.url ? (
                  <img
                    src={img.url}
                    alt={img.alt || c.category}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary/20">bed</span>
                  </div>
                )}
                {c.count != null && c.count > 0 && (
                  <div className="absolute right-3 top-3 bg-abyss/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur md:right-4 md:top-4 md:px-3">
                    {c.count} cabines
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-abyss/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="border-b border-primary/40 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
                    Voir les details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mb-2 flex items-center gap-2 md:mb-3">
                {c.color && (
                  <span className="h-3 w-3 flex-shrink-0 rounded-sm" style={{ backgroundColor: c.color }} />
                )}
                <h4 className="serif-heading text-xl transition-colors group-hover:text-primary md:text-2xl">
                  {c.category}
                </h4>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {c.size != null && c.size > 0 && (
                  <span className="flex items-center gap-1 text-[11px] opacity-60">
                    <span className="material-symbols-outlined text-xs text-primary">square_foot</span>
                    {c.size} m²
                  </span>
                )}
                {c.capacity != null && c.capacity > 0 && (
                  <span className="flex items-center gap-1 text-[11px] opacity-60">
                    <span className="material-symbols-outlined text-xs text-primary">person</span>
                    {c.capacity} {c.capacity > 1 ? 'pers.' : 'pers.'}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-[998] bg-abyss/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
      />

      {/* SIDEBAR DRAWER */}
      <div
        className={`fixed right-0 top-0 z-[999] flex h-full w-full flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-out dark:bg-background-dark sm:w-[480px] md:w-[540px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {cabin && (
          <>
            {/* Close button */}
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-abyss/60 text-white backdrop-blur-sm transition-colors hover:bg-primary md:right-6 md:top-6"
              aria-label="Fermer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Image carousel */}
            <div className="relative aspect-[4/3] w-full flex-shrink-0 bg-ecru dark:bg-abyss">
              {cabinImages.length > 0 ? (
                <>
                  <img
                    src={cabinImages[imageIdx]?.url}
                    alt={cabinImages[imageIdx]?.alt || cabin.category}
                    className="h-full w-full object-cover"
                  />
                  {cabinImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setImageIdx(prev => (prev - 1 + cabinImages.length) % cabinImages.length)}
                        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-abyss/60 text-white backdrop-blur-sm transition-colors hover:bg-primary"
                        aria-label="Photo precedente"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                      </button>
                      <button
                        onClick={() => setImageIdx(prev => (prev + 1) % cabinImages.length)}
                        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-abyss/60 text-white backdrop-blur-sm transition-colors hover:bg-primary"
                        aria-label="Photo suivante"
                      >
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                        {cabinImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImageIdx(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              imageIdx === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                            }`}
                            aria-label={`Photo ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary/20">bed</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Categorie de cabine
              </span>
              <div className="mb-6 flex items-center gap-3">
                {cabin.color && (
                  <span className="h-4 w-4 flex-shrink-0 rounded-sm" style={{ backgroundColor: cabin.color }} />
                )}
                <h3 className="serif-heading text-3xl md:text-4xl">{cabin.category}</h3>
              </div>

              {/* Specs row */}
              <div className="mb-8 flex flex-wrap gap-6 border-b border-primary/10 pb-8">
                {cabin.size != null && cabin.size > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center bg-primary/10">
                      <span className="material-symbols-outlined text-lg text-primary">square_foot</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Surface</p>
                      <p className="text-sm font-semibold">{cabin.size} m²</p>
                    </div>
                  </div>
                )}
                {cabin.capacity != null && cabin.capacity > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center bg-primary/10">
                      <span className="material-symbols-outlined text-lg text-primary">person</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Capacite</p>
                      <p className="text-sm font-semibold">{cabin.capacity} {cabin.capacity > 1 ? 'personnes' : 'personne'}</p>
                    </div>
                  </div>
                )}
                {cabin.count != null && cabin.count > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center bg-primary/10">
                      <span className="material-symbols-outlined text-lg text-primary">door_front</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Nombre</p>
                      <p className="text-sm font-semibold">{cabin.count} cabines</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {amenitiesList.length > 0 && (
                <div>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-primary">
                    Equipements
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {amenitiesList.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
