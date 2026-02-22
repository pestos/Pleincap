'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

type DeckPlan = {
  deckName: string
  deckNumber?: number
  image: { url: string; alt?: string }
  highlights?: string
}

type Props = {
  deckPlans?: DeckPlan[]
  singleImage?: { url: string; alt?: string }
  cabins?: { category: string; color?: string; deckAssignments?: { deckNumber: number; count: number }[] }[]
  onDeckChange?: (deckNumber: number | null) => void
}

export default function DeckPlanViewer({ deckPlans, singleImage, cabins, onDeckChange }: Props) {
  const hasMultipleDecks = deckPlans && deckPlans.length > 0
  const [activeDeck, setActiveDeck] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const panStart = useRef({ x: 0, y: 0 })
  const pinchStartDist = useRef(0)
  const pinchStartZoom = useRef(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const currentImage = hasMultipleDecks
    ? deckPlans[activeDeck]?.image
    : singleImage

  const currentHighlights = hasMultipleDecks
    ? deckPlans[activeDeck]?.highlights
    : undefined

  const highlightItems = currentHighlights
    ? currentHighlights.split('\n').filter(Boolean).map(s => s.trim())
    : []

  const switchDeck = useCallback((idx: number) => {
    setActiveDeck(idx)
    setZoom(1)
    setPan({ x: 0, y: 0 })
    if (onDeckChange && hasMultipleDecks && deckPlans) {
      onDeckChange(deckPlans[idx]?.deckNumber ?? null)
    }
  }, [onDeckChange, hasMultipleDecks, deckPlans])

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.5, 5))
  }, [])

  const zoomOut = useCallback(() => {
    setZoom(prev => {
      const next = Math.max(prev - 0.5, 1)
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
  }, [])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  // Mouse wheel zoom (desktop only)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.25 : 0.25
    setZoom(prev => {
      const next = Math.min(Math.max(prev + delta, 1), 5)
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
  }, [])

  // Mouse drag pan (desktop)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    panStart.current = { ...pan }
  }, [zoom, pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPan({
      x: panStart.current.x + dx,
      y: panStart.current.y + dy,
    })
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch: single-finger pan + two-finger pinch-to-zoom
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDist.current = Math.sqrt(dx * dx + dy * dy)
      pinchStartZoom.current = zoom
    } else if (e.touches.length === 1 && zoom > 1) {
      // Single finger pan (only when zoomed)
      setIsDragging(true)
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      panStart.current = { ...pan }
    }
  }, [zoom, pan])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const scale = dist / pinchStartDist.current
      const newZoom = Math.min(Math.max(pinchStartZoom.current * scale, 1), 5)
      setZoom(newZoom)
      if (newZoom === 1) setPan({ x: 0, y: 0 })
    } else if (e.touches.length === 1 && isDragging) {
      // Single finger pan
      const dx = e.touches[0].clientX - dragStart.current.x
      const dy = e.touches[0].clientY - dragStart.current.y
      setPan({
        x: panStart.current.x + dx,
        y: panStart.current.y + dy,
      })
    }
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Fullscreen — native API + iOS fallback (fixed overlay)
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else {
        // iOS fallback: use state-driven overlay
        setIsFullscreen(true)
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        setIsFullscreen(false)
      }
    }
  }, [isFullscreen])

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setIsFullscreen(false)
      else setIsFullscreen(true)
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Lock body scroll in fullscreen (iOS fallback)
  useEffect(() => {
    if (isFullscreen && !document.fullscreenElement) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isFullscreen])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isFullscreen) return
      if (e.key === 'Escape') {
        if (document.fullscreenElement) document.exitFullscreen()
        else setIsFullscreen(false)
      } else if (e.key === '+' || e.key === '=') {
        zoomIn()
      } else if (e.key === '-') {
        zoomOut()
      } else if (e.key === '0') {
        resetView()
      } else if (e.key === 'ArrowLeft' && hasMultipleDecks) {
        switchDeck(Math.max(0, activeDeck - 1))
      } else if (e.key === 'ArrowRight' && hasMultipleDecks) {
        switchDeck(Math.min((deckPlans?.length || 1) - 1, activeDeck + 1))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isFullscreen, activeDeck, hasMultipleDecks, deckPlans?.length, zoomIn, zoomOut, resetView, switchDeck])

  // Fire onDeckChange on initial mount
  useEffect(() => {
    if (onDeckChange && hasMultipleDecks && deckPlans) {
      onDeckChange(deckPlans[0]?.deckNumber ?? null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeDeckNumber = hasMultipleDecks ? deckPlans[activeDeck]?.deckNumber : undefined
  const filteredCabins = cabins?.map((cabin) => {
    if (!activeDeckNumber || !cabin.deckAssignments || cabin.deckAssignments.length === 0) {
      const totalCount = cabin.deckAssignments?.reduce((sum, da) => sum + (da.count || 0), 0) || 0
      return { ...cabin, count: totalCount || undefined }
    }
    const match = cabin.deckAssignments.find(da => Number(da.deckNumber) === Number(activeDeckNumber))
    if (!match) return null
    return { ...cabin, count: match.count }
  }).filter(Boolean) as { category: string; color?: string; count?: number }[] | undefined

  if (!currentImage?.url) return null

  // iOS fullscreen fallback: fixed overlay that covers the entire screen
  const fullscreenClasses = isFullscreen && !document.fullscreenElement
    ? 'fixed inset-0 z-[9999] bg-abyss p-4 md:p-8'
    : isFullscreen
      ? 'bg-abyss p-4 md:p-8'
      : ''

  return (
    <div ref={containerRef} className={fullscreenClasses}>
      {/* Mobile layout: stacked. Desktop: side by side */}
      <div className={`flex flex-col gap-6 lg:gap-8 ${isFullscreen ? '' : 'lg:flex-row'}`}>

        {/* SIDEBAR — deck tabs + legend */}
        {!isFullscreen && (
          <aside className="w-full flex-shrink-0 lg:w-56">
            {/* Deck tabs — horizontal scroll on mobile, vertical on desktop */}
            {hasMultipleDecks && (
              <div className="mb-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Niveaux
                </p>
                <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0">
                  {deckPlans.map((deck, idx) => (
                    <button
                      key={idx}
                      onClick={() => switchDeck(idx)}
                      className={`flex min-w-[140px] flex-shrink-0 snap-start items-center gap-2.5 border px-3 py-2.5 text-left transition-all lg:min-w-0 lg:w-full ${
                        activeDeck === idx
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-abyss/10 hover:border-primary/30 dark:border-white/10'
                      }`}
                    >
                      <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center text-[11px] font-bold ${
                        activeDeck === idx
                          ? 'bg-primary text-white'
                          : 'bg-abyss/5 dark:bg-white/10'
                      }`}>
                        {deck.deckNumber || idx + 1}
                      </span>
                      <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wide">
                        {deck.deckName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights — inline on mobile, stacked on desktop */}
            {highlightItems.length > 0 && (
              <div className="mb-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Points d'interet
                </p>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
                  {highlightItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                      <span className="text-[11px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cabin legend — 2-col grid on mobile, single col on desktop */}
            {filteredCabins && filteredCabins.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Cabines
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 lg:grid-cols-1">
                  {filteredCabins.map((cabin, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                          style={{ backgroundColor: cabin.color || fallbackColors[idx % fallbackColors.length] }}
                        />
                        <span className="text-[11px]">{cabin.category}</span>
                      </div>
                      {cabin.count != null && cabin.count > 0 && (
                        <span className="text-[10px] font-bold opacity-40">{cabin.count}x</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* VIEWER */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-3 flex items-center justify-between gap-2">
            {/* Zoom controls */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={zoomOut}
                disabled={zoom <= 1}
                className="flex h-8 w-8 items-center justify-center border border-abyss/10 text-sm transition-colors hover:bg-primary hover:text-white disabled:opacity-30 dark:border-white/10 md:h-9 md:w-9"
                aria-label="Zoom arriere"
              >
                <span className="material-symbols-outlined text-base">remove</span>
              </button>
              <button
                onClick={resetView}
                className="flex h-8 items-center justify-center border border-abyss/10 px-2 text-[10px] font-bold tabular-nums tracking-widest transition-colors hover:bg-primary hover:text-white dark:border-white/10 md:h-9 md:px-3"
                aria-label="Reinitialiser le zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={zoomIn}
                disabled={zoom >= 5}
                className="flex h-8 w-8 items-center justify-center border border-abyss/10 text-sm transition-colors hover:bg-primary hover:text-white disabled:opacity-30 dark:border-white/10 md:h-9 md:w-9"
                aria-label="Zoom avant"
              >
                <span className="material-symbols-outlined text-base">add</span>
              </button>
            </div>

            {/* Right side: hint + fullscreen */}
            <div className="flex items-center gap-2">
              {zoom > 1 && (
                <span className="hidden text-[10px] font-bold uppercase tracking-widest opacity-40 md:block">
                  {isMobile ? 'Glissez pour naviguer' : 'Cliquer-glisser pour naviguer'}
                </span>
              )}
              <button
                onClick={toggleFullscreen}
                className="flex h-8 w-8 items-center justify-center border border-abyss/10 transition-colors hover:bg-primary hover:text-white dark:border-white/10 md:h-9 md:w-9"
                aria-label={isFullscreen ? 'Quitter le plein ecran' : 'Plein ecran'}
              >
                <span className="material-symbols-outlined text-base">
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>
          </div>

          {/* Image container */}
          <div
            ref={viewerRef}
            className={`relative overflow-hidden border border-primary/10 bg-ecru dark:bg-background-dark ${
              isFullscreen
                ? 'h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]'
                : 'h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px]'
            } ${zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
            style={{ touchAction: 'none' }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Decorative corner accents */}
            <div className="pointer-events-none absolute left-2 top-2 z-20 h-4 w-4 border-l-2 border-t-2 border-primary/30 md:left-3 md:top-3 md:h-6 md:w-6" />
            <div className="pointer-events-none absolute right-2 top-2 z-20 h-4 w-4 border-r-2 border-t-2 border-primary/30 md:right-3 md:top-3 md:h-6 md:w-6" />
            <div className="pointer-events-none absolute bottom-2 left-2 z-20 h-4 w-4 border-b-2 border-l-2 border-primary/30 md:bottom-3 md:left-3 md:h-6 md:w-6" />
            <div className="pointer-events-none absolute bottom-2 right-2 z-20 h-4 w-4 border-b-2 border-r-2 border-primary/30 md:bottom-3 md:right-3 md:h-6 md:w-6" />

            {/* The image */}
            <div
              className="flex h-full w-full items-center justify-center p-4 transition-transform ease-out md:p-8"
              style={{
                transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                transitionDuration: isDragging ? '0ms' : '300ms',
              }}
            >
              <img
                src={currentImage.url}
                alt={currentImage.alt || 'Plan des ponts'}
                className="max-h-full max-w-full select-none object-contain"
                draggable={false}
              />
            </div>

            {/* Zoom hint — adapts to mobile/desktop */}
            {zoom === 1 && (
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4 md:pb-6">
                <div className="flex items-center gap-1.5 rounded-full bg-abyss/60 px-3 py-1.5 text-white backdrop-blur-sm md:gap-2 md:px-4 md:py-2">
                  <span className="material-symbols-outlined text-xs md:text-sm">
                    {isMobile ? 'pinch_zoom_in' : 'search'}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest md:text-[10px]">
                    {isMobile ? 'Pincez pour zoomer' : 'Scrollez pour zoomer'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Deck navigation — prev/next with swipe-friendly sizing */}
          {hasMultipleDecks && (
            <div className="mt-3 flex items-center justify-between md:mt-4">
              <button
                onClick={() => switchDeck(Math.max(0, activeDeck - 1))}
                disabled={activeDeck === 0}
                className="flex items-center gap-1 py-2 text-[11px] font-bold uppercase tracking-widest text-primary transition-opacity disabled:opacity-20 md:text-xs"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
                <span className="hidden sm:inline">Precedent</span>
              </button>
              <div className="flex items-center gap-1.5">
                {deckPlans.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => switchDeck(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeDeck === idx ? 'w-6 bg-primary' : 'w-2 bg-abyss/20 dark:bg-white/20'
                    }`}
                    aria-label={`Pont ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => switchDeck(Math.min(deckPlans.length - 1, activeDeck + 1))}
                disabled={activeDeck === deckPlans.length - 1}
                className="flex items-center gap-1 py-2 text-[11px] font-bold uppercase tracking-widest text-primary transition-opacity disabled:opacity-20 md:text-xs"
              >
                <span className="hidden sm:inline">Suivant</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}

          {/* Fullscreen: inline deck tabs + close button */}
          {isFullscreen && hasMultipleDecks && (
            <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto">
              {deckPlans.map((deck, idx) => (
                <button
                  key={idx}
                  onClick={() => switchDeck(idx)}
                  className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeDeck === idx
                      ? 'bg-primary text-white'
                      : 'border border-white/20 text-white/60 hover:text-white'
                  }`}
                >
                  {deck.deckName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const fallbackColors = [
  '#C5A059',
  '#1a2b3c',
  '#7B9EA8',
  '#D4A76A',
  '#5C7A8A',
  '#A0785A',
  '#6B8E7B',
  '#8B6F5C',
]
