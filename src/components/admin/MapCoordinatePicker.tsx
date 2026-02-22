'use client'

import { useField } from '@payloadcms/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

// Dynamically import Leaflet to avoid SSR issues
let L: typeof import('leaflet') | null = null

export default function MapCoordinatePicker({ path }: { path: string }) {
  // path is like "itinerary.0.mapPicker" — derive lat/lng paths
  const basePath = path.replace(/\.mapPicker$/, '')
  const latPath = `${basePath}.latitude`
  const lngPath = `${basePath}.longitude`

  const { value: latitude, setValue: setLatitude } = useField<number>({ path: latPath })
  const { value: longitude, setValue: setLongitude } = useField<number>({ path: lngPath })

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [leafletReady, setLeafletReady] = useState(false)

  const hasCoords = typeof latitude === 'number' && typeof longitude === 'number'

  const updateCoords = useCallback(
    (lat: number, lng: number) => {
      const roundedLat = Math.round(lat * 10000) / 10000
      const roundedLng = Math.round(lng * 10000) / 10000
      setLatitude(roundedLat)
      setLongitude(roundedLng)
    },
    [setLatitude, setLongitude],
  )

  // Load Leaflet dynamically
  useEffect(() => {
    import('leaflet').then((leaflet) => {
      L = leaflet.default || leaflet
      // Fix default icon paths (webpack breaks them)
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
      setLeafletReady(true)
    })
  }, [])

  // Initialize map
  useEffect(() => {
    if (!leafletReady || !L || !mapContainerRef.current || mapRef.current) return

    const defaultLat = hasCoords ? latitude! : 48
    const defaultLng = hasCoords ? longitude! : 5
    const defaultZoom = hasCoords ? 10 : 4

    const map = L.map(mapContainerRef.current).setView([defaultLat, defaultLng], defaultZoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
    }).addTo(map)

    if (hasCoords) {
      markerRef.current = L.marker([latitude!, longitude!], { draggable: true }).addTo(map)
      markerRef.current.on('dragend', () => {
        const pos = markerRef.current.getLatLng()
        updateCoords(pos.lat, pos.lng)
      })
    }

    map.on('click', (e: any) => {
      const { lat, lng } = e.latlng
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng])
      } else if (L) {
        markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(map)
        markerRef.current.on('dragend', () => {
          const pos = markerRef.current.getLatLng()
          updateCoords(pos.lat, pos.lng)
        })
      }
      updateCoords(lat, lng)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafletReady])

  // Sync marker position when lat/lng change externally
  useEffect(() => {
    if (!mapRef.current || !L) return
    if (hasCoords && markerRef.current) {
      const currentPos = markerRef.current.getLatLng()
      if (
        Math.abs(currentPos.lat - latitude!) > 0.0001 ||
        Math.abs(currentPos.lng - longitude!) > 0.0001
      ) {
        markerRef.current.setLatLng([latitude!, longitude!])
      }
    }
  }, [latitude, longitude, hasCoords])

  // Search handler
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim() || !mapRef.current || !L) return
    setSearching(true)
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`,
      )
      const results = await resp.json()
      if (results.length > 0) {
        const { lat, lon } = results[0]
        const parsedLat = parseFloat(lat)
        const parsedLng = parseFloat(lon)

        if (markerRef.current) {
          markerRef.current.setLatLng([parsedLat, parsedLng])
        } else {
          markerRef.current = L.marker([parsedLat, parsedLng], { draggable: true }).addTo(
            mapRef.current,
          )
          markerRef.current.on('dragend', () => {
            const pos = markerRef.current.getLatLng()
            updateCoords(pos.lat, pos.lng)
          })
        }

        mapRef.current.setView([parsedLat, parsedLng], 12)
        updateCoords(parsedLat, parsedLng)
      }
    } catch {
      // Silently fail on network errors
    } finally {
      setSearching(false)
    }
  }, [searchQuery, updateCoords])

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        Position sur la carte
      </label>

      {/* Search bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSearch()
            }
          }}
          placeholder="Rechercher un lieu (ex: Hambourg, Athènes...)"
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid var(--theme-elevation-150, #ddd)',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: 'var(--theme-input-bg, #fff)',
            color: 'var(--theme-text, #333)',
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searching}
          style={{
            padding: '8px 16px',
            border: '1px solid var(--theme-elevation-150, #ddd)',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: 'var(--theme-elevation-100, #f5f5f5)',
            color: 'var(--theme-text, #333)',
            cursor: searching ? 'wait' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {searching ? '...' : 'Rechercher'}
        </button>
      </div>

      {/* Map container */}
      <div
        ref={mapContainerRef}
        style={{
          height: '300px',
          width: '100%',
          borderRadius: '4px',
          border: '1px solid var(--theme-elevation-150, #ddd)',
          zIndex: 0,
        }}
      />

      {/* Current coordinates display */}
      <div
        style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'var(--theme-elevation-500, #888)',
          fontFamily: 'monospace',
        }}
      >
        {hasCoords ? (
          <>
            Lat: <strong>{latitude}</strong> — Lng: <strong>{longitude}</strong>
          </>
        ) : (
          'Cliquez sur la carte pour placer un point'
        )}
      </div>
    </div>
  )
}
