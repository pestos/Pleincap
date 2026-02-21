'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

type GalleryImage = {
  url: string
  alt?: string
  id?: string | number
}

type Props = {
  images: GalleryImage[]
}

export default function GalleryLightbox({ images }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const isOpen = lightboxIdx !== null
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  // Reset zoom when switching images
  useEffect(() => {
    setZoomed(false)
  }, [lightboxIdx])

  const close = useCallback(() => {
    setLightboxIdx(null)
    setZoomed(false)
  }, [])

  const goNext = useCallback(() => {
    if (lightboxIdx === null) return
    setLightboxIdx((lightboxIdx + 1) % images.length)
  }, [lightboxIdx, images.length])

  const goPrev = useCallback(() => {
    if (lightboxIdx === null) return
    setLightboxIdx((lightboxIdx - 1 + images.length) % images.length)
  }, [lightboxIdx, images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close, goNext, goPrev])

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoomed) return
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }, [zoomed])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || zoomed) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    // Horizontal swipe (min 50px, mostly horizontal)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext()
      else goPrev()
    }
    // Vertical swipe down to close
    if (dy > 80 && Math.abs(dy) > Math.abs(dx) * 1.5) {
      close()
    }
  }, [zoomed, goNext, goPrev, close])

  return (
    <>
      {/* BENTO GRID */}
      <div className="grid auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[220px] md:auto-rows-[280px] md:grid-cols-4 md:gap-3">
        {images.map((img, idx) => {
          const isLarge = idx === 0 || idx === 3 || idx === 6
          return (
            <button
              key={img.id || idx}
              onClick={() => setLightboxIdx(idx)}
              className={`group overflow-hidden ${isLarge ? 'col-span-2 row-span-1' : ''}`}
            >
              <img
                src={img.url}
                alt={img.alt || `Photo ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          )
        })}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {isOpen && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-abyss/95 backdrop-blur-sm"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 md:p-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60 md:text-xs">
              {lightboxIdx + 1} / {images.length}
            </span>
            <button
              onClick={close}
              className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white"
              aria-label="Fermer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Navigation arrows — hidden on very small screens, use swipe instead */}
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white/50 transition-colors hover:text-white sm:flex md:left-6"
            aria-label="Photo precedente"
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white/50 transition-colors hover:text-white sm:flex md:right-6"
            aria-label="Photo suivante"
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>

          {/* Image */}
          <div
            className="flex h-full w-full items-center justify-center px-4 py-16 sm:px-16 md:px-24"
            onClick={(e) => {
              // Click on backdrop (not on image) to close
              if (e.target === e.currentTarget) close()
            }}
          >
            <img
              src={images[lightboxIdx].url}
              alt={images[lightboxIdx].alt || ''}
              className={`max-h-full select-none object-contain transition-transform duration-300 ${
                zoomed ? 'max-w-none cursor-zoom-out scale-150' : 'max-w-full cursor-zoom-in'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setZoomed(prev => !prev)
              }}
              draggable={false}
            />
          </div>

          {/* Bottom dots — mobile friendly */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:bottom-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    lightboxIdx === i ? 'w-5 bg-primary' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
