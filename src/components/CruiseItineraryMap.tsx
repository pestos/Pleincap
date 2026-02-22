'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import type { GeoPermissibleObjects } from 'd3-geo'

type ItineraryStop = {
  id?: string
  day: number | string
  title: string
  description?: any
  highlights?: string
  images?: { url?: string; alt?: string }[] | any[]
  latitude?: number | null
  longitude?: number | null
  stopType?: 'departure' | 'stop' | 'sailing' | 'arrival'
  duration?: string
}

type Props = {
  itinerary: ItineraryStop[]
  className?: string
}

type GeoStop = ItineraryStop & { latitude: number; longitude: number }

export default function CruiseItineraryMap({ itinerary, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [geoData, setGeoData] = useState<any>(null)
  const [activeStop, setActiveStop] = useState<GeoStop | null>(null)
  const [popupPos, setPopupPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Sort itinerary by day number
  const sortedItinerary = useMemo(
    () => [...itinerary].sort((a, b) => Number(a.day) - Number(b.day)),
    [itinerary],
  )

  // Filter stops that have coordinates (excluding sailing days)
  const geoStops = useMemo<GeoStop[]>(
    () =>
      sortedItinerary.filter(
        (s): s is GeoStop =>
          typeof s.latitude === 'number' &&
          typeof s.longitude === 'number' &&
          s.stopType !== 'sailing',
      ),
    [sortedItinerary],
  )

  // All stops with coords (including sailing) for route drawing
  const routeStops = useMemo<GeoStop[]>(
    () =>
      sortedItinerary.filter(
        (s): s is GeoStop =>
          typeof s.latitude === 'number' && typeof s.longitude === 'number',
      ),
    [sortedItinerary],
  )

  // Don't render if fewer than 2 geo stops
  const shouldRender = geoStops.length >= 2

  // ResizeObserver for responsive dimensions
  useEffect(() => {
    if (!shouldRender || !containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect
      const height = Math.round(width * 1.25)
      setDimensions({ width, height })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [shouldRender])

  // Fetch GeoJSON
  useEffect(() => {
    if (!shouldRender) return
    fetch('/data/world-coastlines-110m.json')
      .then((r) => r.json())
      .then(setGeoData)
      .catch(() => {})
  }, [shouldRender])

  // Projection
  const projection = useMemo(() => {
    if (!dimensions.width || geoStops.length < 2) return null
    const padding = Math.max(60, dimensions.width * 0.08)
    const coords = geoStops.map((s) => [s.longitude, s.latitude] as [number, number])
    // Create a small GeoJSON to fit the projection to
    const bboxFeature: GeoPermissibleObjects = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'MultiPoint',
        coordinates: coords,
      },
    }
    return geoMercator().fitExtent(
      [
        [padding, padding],
        [dimensions.width - padding, dimensions.height - padding],
      ],
      bboxFeature,
    )
  }, [dimensions, geoStops])

  // Path generator
  const pathGenerator = useMemo(() => {
    if (!projection) return null
    return geoPath().projection(projection)
  }, [projection])

  // Route path
  const routePath = useMemo(() => {
    if (!projection || routeStops.length < 2) return ''
    const points = routeStops.map((s) => projection([s.longitude, s.latitude]))
    const validPoints = points.filter((p): p is [number, number] => p !== null)
    if (validPoints.length < 2) return ''

    // Build smooth cubic bezier curve
    let d = `M ${validPoints[0][0]} ${validPoints[0][1]}`
    for (let i = 1; i < validPoints.length; i++) {
      const prev = validPoints[i - 1]
      const curr = validPoints[i]
      const mx = (prev[0] + curr[0]) / 2
      const my = (prev[1] + curr[1]) / 2
      // Quadratic bezier through midpoint
      d += ` Q ${prev[0]} ${my}, ${mx} ${my}`
      d += ` Q ${curr[0]} ${my}, ${curr[0]} ${curr[1]}`
    }
    return d
  }, [projection, routeStops])

  // Land paths
  const landPaths = useMemo(() => {
    if (!geoData || !pathGenerator) return []
    if (geoData.type === 'FeatureCollection') {
      return geoData.features.map((f: any) => pathGenerator(f) || '')
    }
    return [pathGenerator(geoData) || '']
  }, [geoData, pathGenerator])

  // Handle marker click
  const handleMarkerClick = useCallback(
    (stop: GeoStop, e: React.MouseEvent) => {
      e.stopPropagation()
      if (!projection) return
      const pt = projection([stop.longitude, stop.latitude])
      if (!pt) return
      setActiveStop(stop)
      setPopupPos({ x: pt[0], y: pt[1] })
    },
    [projection],
  )

  // Close popup
  const closePopup = useCallback(() => setActiveStop(null), [])

  // Keyboard handler
  useEffect(() => {
    if (!activeStop) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeStop, closePopup])

  if (!shouldRender) return null

  const stopTypeLabel = (type?: string) => {
    switch (type) {
      case 'departure':
        return 'Depart'
      case 'arrival':
        return 'Arrivee'
      case 'stop':
        return 'Escale'
      default:
        return 'Escale'
    }
  }

  // Get first image from stop
  const getStopImage = (stop: GeoStop) => {
    if (!stop.images || !Array.isArray(stop.images) || stop.images.length === 0) return null
    const img = stop.images[0]
    if (typeof img === 'object' && img !== null) {
      return { url: img.url, alt: img.alt || stop.title }
    }
    return null
  }

  // Parse highlights
  const getHighlights = (stop: GeoStop): string[] => {
    if (!stop.highlights) return []
    return stop.highlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean)
  }

  // Popup positioning
  const popupWidth = 320
  const popupFlipped = popupPos.x + popupWidth / 2 > dimensions.width - 20
  const isMobile = dimensions.width < 640

  return (
    <div className={className}>
      <div className="mb-8">
        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          Itineraire
        </span>
        <h2 className="serif-heading text-3xl md:text-4xl">Carte du Voyage</h2>
      </div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden border border-primary/20"
        style={{ backgroundColor: '#1a2b3c' }}
      >
          {dimensions.width > 0 && projection && (
            <>
              <svg
                width={dimensions.width}
                height={dimensions.height}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                className="block"
              >
                <defs>
                  <style>{`
                    @keyframes dash-travel { to { stroke-dashoffset: 0; } }
                    .route-line {
                      stroke-dasharray: 8 4;
                      stroke-dashoffset: 1000;
                      animation: dash-travel 3s ease-out forwards 0.5s;
                    }
                    @keyframes pulse-halo {
                      0% { r: 14; opacity: 0.6; }
                      100% { r: 24; opacity: 0; }
                    }
                  `}</style>
                </defs>

                {/* Background - click to close popup */}
                <rect
                  x={0}
                  y={0}
                  width={dimensions.width}
                  height={dimensions.height}
                  fill="#1a2b3c"
                  onClick={closePopup}
                />

                {/* Land masses */}
                {landPaths.map((d: string, i: number) => (
                  <path key={`land-${i}`} d={d} fill="#253d50" stroke="#2e4a60" strokeWidth={0.5} />
                ))}

                {/* Route line */}
                {routePath && (
                  <path
                    d={routePath}
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="route-line"
                    opacity={0.8}
                  />
                )}

                {/* Markers */}
                {geoStops.map((stop) => {
                  const pt = projection([stop.longitude, stop.latitude])
                  if (!pt) return null
                  const isDepartureOrArrival =
                    stop.stopType === 'departure' || stop.stopType === 'arrival'
                  const isActive = activeStop?.id === stop.id && activeStop?.day === stop.day

                  return (
                    <g
                      key={`marker-${stop.id || stop.day}`}
                      transform={`translate(${pt[0]}, ${pt[1]})`}
                      onClick={(e) => handleMarkerClick(stop, e)}
                      style={{ cursor: 'pointer' }}
                    >
                      {isDepartureOrArrival ? (
                        <>
                          {/* Pulsing halo */}
                          <circle r={14} fill="#C5A059" opacity={0}>
                            <animate
                              attributeName="r"
                              values="14;24"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.5;0"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          {/* Main circle */}
                          <circle
                            r={14}
                            fill="#C5A059"
                            stroke={isActive ? '#F9F8F6' : '#C5A059'}
                            strokeWidth={isActive ? 3 : 2}
                          />
                          {/* Anchor icon */}
                          <g transform="translate(-8, -8) scale(0.67)">
                            <path
                              d="M12 2C10.34 2 9 3.34 9 5c0 1.3.84 2.4 2 2.82V11H9v2h2v6.72C8.36 19.38 6 17.12 6 14.5V13H4v1.5C4 18.57 7.36 22 12 22s8-3.43 8-8.5V13h-2v1.5c0 2.62-2.36 4.88-5 5.22V13h2v-2h-2V7.82c1.16-.42 2-1.52 2-2.82 0-1.66-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                              fill="#1a2b3c"
                            />
                          </g>
                        </>
                      ) : (
                        <>
                          {/* Stop marker */}
                          <circle
                            r={12}
                            fill="#1a2b3c"
                            stroke={isActive ? '#F9F8F6' : '#C5A059'}
                            strokeWidth={isActive ? 3 : 2}
                          />
                          {/* Day number */}
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#F9F8F6"
                            fontSize={11}
                            fontWeight={700}
                            fontFamily="sans-serif"
                          >
                            {stop.day}
                          </text>
                        </>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Popup overlay */}
              {activeStop && (
                <>
                  {isMobile ? (
                    /* Mobile: bottom sheet */
                    <div
                      className="absolute inset-x-0 bottom-0 z-20 border-t border-primary/20 bg-[#1a2b3c] p-4 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={closePopup}
                        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center text-[#F9F8F6]/60 hover:text-[#F9F8F6]"
                        aria-label="Fermer"
                      >
                        <svg width={14} height={14} viewBox="0 0 14 14">
                          <path
                            d="M1 1l12 12M13 1L1 13"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <PopupContent stop={activeStop} getStopImage={getStopImage} getHighlights={getHighlights} stopTypeLabel={stopTypeLabel} />
                    </div>
                  ) : (
                    /* Desktop: positioned popup */
                    <div
                      className="absolute z-20 w-[320px] border border-primary/20 bg-[#1a2b3c] shadow-2xl"
                      style={{
                        left: popupFlipped
                          ? Math.max(8, popupPos.x - popupWidth - 16)
                          : Math.min(popupPos.x + 16, dimensions.width - popupWidth - 8),
                        top: Math.max(8, Math.min(popupPos.y - 40, dimensions.height - 260)),
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={closePopup}
                        className="absolute right-3 top-3 z-30 flex h-6 w-6 items-center justify-center text-[#F9F8F6]/60 hover:text-[#F9F8F6]"
                        aria-label="Fermer"
                      >
                        <svg width={14} height={14} viewBox="0 0 14 14">
                          <path
                            d="M1 1l12 12M13 1L1 13"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <PopupContent stop={activeStop} getStopImage={getStopImage} getHighlights={getHighlights} stopTypeLabel={stopTypeLabel} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
      </div>
    </div>
  )
}

function PopupContent({
  stop,
  getStopImage,
  getHighlights,
  stopTypeLabel,
}: {
  stop: GeoStop
  getStopImage: (s: GeoStop) => { url?: string; alt: string } | null
  getHighlights: (s: GeoStop) => string[]
  stopTypeLabel: (type?: string) => string
}) {
  const image = getStopImage(stop)
  const highlights = getHighlights(stop)

  return (
    <div>
      {image?.url && (
        <div className="relative h-[140px] w-full overflow-hidden">
          <img
            src={image.url}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block bg-[#C5A059]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
            Jour {stop.day}
          </span>
          <span className="inline-block border border-[#C5A059]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
            {stopTypeLabel(stop.stopType)}
          </span>
          {stop.duration && (
            <span className="text-[10px] text-[#F9F8F6]/50">{stop.duration}</span>
          )}
        </div>
        <h4 className="serif-heading mb-2 text-lg text-[#F9F8F6]">{stop.title}</h4>
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {highlights.map((h, i) => (
              <span
                key={i}
                className="border border-[#C5A059]/30 px-2 py-0.5 text-[10px] text-[#F9F8F6]/70"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
