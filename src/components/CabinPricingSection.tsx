'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import DeckPlanViewer from './DeckPlanViewer'

type MergedCabin = {
  id?: string
  cabinCategory: string
  price: number
  color: string
  size: number | null
  capacity: number | null
  amenities: string | null
  images: { url?: string; alt?: string }[]
  deckAssignments: { deckNumber: number; count: number }[]
}

type DeckPlanData = {
  deckName: string
  deckNumber?: number
  image: { url: string; alt?: string }
  highlights?: string
}

type CruiseInfo = {
  id: string
  title: string
  departureDate: string
  returnDate: string
  destination?: string
  vehicleName?: string
  vehicleType?: 'bateau' | 'train'
  featuredImage?: string
  price: number
}

type Props = {
  mergedCabins: MergedCabin[]
  boatName?: string
  deckPlans?: DeckPlanData[]
  singleDeckPlan?: { url: string; alt?: string }
  hasDeckPlans: boolean
  hasSingleDeckPlan: boolean
  cruise: CruiseInfo
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

function formatDateFr(date: string) {
  const d = new Date(date)
  const months = ['Jan.', 'Fev.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function CabinPricingSection({
  mergedCabins,
  boatName,
  deckPlans,
  singleDeckPlan,
  hasDeckPlans,
  hasSingleDeckPlan,
  cruise,
}: Props) {
  const initialDeckNumber = hasDeckPlans && deckPlans?.[0]?.deckNumber != null
    ? deckPlans[0].deckNumber
    : null
  const [activeDeckNumber, setActiveDeckNumber] = useState<number | null>(initialDeckNumber)

  const filteredCabins = useMemo(() => {
    if (activeDeckNumber == null) return mergedCabins
    return mergedCabins.filter((cabin) => {
      if (!cabin.deckAssignments || cabin.deckAssignments.length === 0) return false
      return cabin.deckAssignments.some((da) => da.deckNumber === activeDeckNumber)
    })
  }, [mergedCabins, activeDeckNumber])

  // Drawer state
  const [selectedCabinIdx, setSelectedCabinIdx] = useState<number | null>(null)
  const [imageIdx, setImageIdx] = useState(0)
  const isDrawerOpen = selectedCabinIdx !== null
  const selectedCabin = isDrawerOpen ? filteredCabins[selectedCabinIdx] : null

  // Reservation form state
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [formState, setFormState] = useState({
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'France',
    adults: 2,
    children: 0,
    childrenAges: '',
    cabinsRequested: 1,
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const defaultForm = {
    civility: '', firstName: '', lastName: '', email: '', phone: '',
    address: '', postalCode: '', city: '', country: 'France',
    adults: 2, children: 0, childrenAges: '', cabinsRequested: 1, message: '',
  }

  const closeDrawer = useCallback(() => {
    setSelectedCabinIdx(null)
    setShowReservationForm(false)
    setSubmitStatus('idle')
    setFormState(defaultForm)
  }, [])

  const closeModal = useCallback(() => {
    setShowReservationForm(false)
    setSubmitStatus('idle')
    setFormState(defaultForm)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isDrawerOpen])

  // Reset image index when switching cabins
  useEffect(() => {
    setImageIdx(0)
  }, [selectedCabinIdx])

  // Keyboard navigation
  const cabinImages = selectedCabin?.images || []
  useEffect(() => {
    if (!isDrawerOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showReservationForm) {
          closeModal()
        } else {
          closeDrawer()
        }
      }
      if (!showReservationForm && cabinImages.length > 1) {
        if (e.key === 'ArrowRight') setImageIdx(prev => (prev + 1) % cabinImages.length)
        if (e.key === 'ArrowLeft') setImageIdx(prev => (prev - 1 + cabinImages.length) % cabinImages.length)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isDrawerOpen, showReservationForm, closeDrawer, closeModal, cabinImages.length])

  const amenitiesList = selectedCabin?.amenities
    ? selectedCabin.amenities.split('\n').filter(Boolean).map(s => s.trim())
    : []

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedCabin) return

    setSubmitStatus('loading')
    try {
      const res = await fetch('/api/reservation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cruiseId: cruise.id,
          cruiseTitle: cruise.title,
          cabinCategory: selectedCabin.cabinCategory,
          civility: formState.civility || undefined,
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          phone: formState.phone || undefined,
          address: formState.address || undefined,
          postalCode: formState.postalCode || undefined,
          city: formState.city || undefined,
          country: formState.country || undefined,
          adults: formState.adults,
          children: formState.children,
          childrenAges: formState.childrenAges || undefined,
          cabinsRequested: formState.cabinsRequested,
          message: formState.message || undefined,
        }),
      })

      if (res.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <>
      {/* Cartes cabines */}
      <div className="mx-auto mb-16 grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2">
        {filteredCabins.map((cabin, idx) => {
          const cabinImage = cabin.images?.[0]?.url || ''
          const amenities = cabin.amenities
            ? cabin.amenities.split('\n').map((a) => a.trim()).filter(Boolean)
            : []
          const isOnActiveDeck = !activeDeckNumber || !cabin.deckAssignments?.length ||
            cabin.deckAssignments.some((da) => da.deckNumber === activeDeckNumber)
          return (
            <button
              key={cabin.id || cabin.cabinCategory}
              onClick={() => setSelectedCabinIdx(idx)}
              className={`group flex flex-col overflow-hidden border border-primary/20 bg-white text-left shadow-lg transition-all dark:bg-abyss/60 md:flex-row ${
                isOnActiveDeck ? 'opacity-100' : 'opacity-40'
              } hover:border-primary/40 hover:shadow-xl`}
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary/5 md:aspect-auto md:w-[45%] md:shrink-0">
                {cabinImage ? (
                  <img src={cabinImage} alt={cabin.cabinCategory} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                ) : (
                  <div className="flex h-full min-h-[200px] w-full items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary/20">bed</span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-abyss/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="border-b border-primary/40 pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
                    Voir les details
                  </span>
                </div>
              </div>
              {/* Infos */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: cabin.color }}
                  />
                  <h4 className="text-sm font-bold uppercase tracking-widest">{cabin.cabinCategory}</h4>
                </div>
                <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-60">
                  {cabin.size && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">square_foot</span>
                      {cabin.size} m²
                    </span>
                  )}
                  {cabin.capacity && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {cabin.capacity} pers.
                    </span>
                  )}
                </div>
                {amenities.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="border border-primary/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider opacity-60">
                        {amenity}
                      </span>
                    ))}
                    {amenities.length > 4 && (
                      <span className="px-1 text-[10px] opacity-40">+{amenities.length - 4}</span>
                    )}
                  </div>
                )}
                <div className="mt-auto border-t border-primary/10 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">A partir de</p>
                  <p className="text-2xl font-bold">{cabin.price.toLocaleString('fr-FR')} &euro;<span className="text-xs font-normal opacity-50"> /pers.</span></p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Plan de pont */}
      {(hasDeckPlans || hasSingleDeckPlan) && (
        <div>
          <div className="mb-10 text-center">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              {boatName}
            </span>
            <h4 className="serif-heading text-2xl md:text-3xl">Plan des ponts</h4>
          </div>
          <DeckPlanViewer
            deckPlans={hasDeckPlans ? deckPlans : undefined}
            singleImage={hasSingleDeckPlan && !hasDeckPlans ? singleDeckPlan : undefined}
            cabins={mergedCabins.map((c) => ({
              category: c.cabinCategory,
              color: c.color,
              deckAssignments: c.deckAssignments.map((d) => ({ deckNumber: Number(d.deckNumber), count: Number(d.count) })),
            }))}
            onDeckChange={(deckNum) => setActiveDeckNumber(deckNum)}
          />
        </div>
      )}

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-[998] bg-abyss/60 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
      />

      {/* SIDEBAR DRAWER */}
      <div
        className={`fixed right-0 top-0 z-[999] flex h-full w-full flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-out dark:bg-background-dark sm:w-[480px] md:w-[540px] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedCabin && (
          <>
            {/* Close button */}
            <button
              onClick={closeDrawer}
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
                    alt={cabinImages[imageIdx]?.alt || selectedCabin.cabinCategory}
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
                <span className="h-4 w-4 flex-shrink-0 rounded-sm" style={{ backgroundColor: selectedCabin.color }} />
                <h3 className="serif-heading text-3xl md:text-4xl">{selectedCabin.cabinCategory}</h3>
              </div>

              {/* Specs row */}
              <div className="mb-8 flex flex-wrap gap-6 border-b border-primary/10 pb-8">
                {selectedCabin.size != null && selectedCabin.size > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center bg-primary/10">
                      <span className="material-symbols-outlined text-lg text-primary">square_foot</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Surface</p>
                      <p className="text-sm font-semibold">{selectedCabin.size} m²</p>
                    </div>
                  </div>
                )}
                {selectedCabin.capacity != null && selectedCabin.capacity > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center bg-primary/10">
                      <span className="material-symbols-outlined text-lg text-primary">person</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Capacite</p>
                      <p className="text-sm font-semibold">{selectedCabin.capacity} {selectedCabin.capacity > 1 ? 'personnes' : 'personne'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {amenitiesList.length > 0 && (
                <div className="mb-8">
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

              {/* Price block */}
              <div className="mb-8 border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">A partir de</p>
                <p className="text-3xl font-bold">{selectedCabin.price.toLocaleString('fr-FR')} &euro;</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">par personne</p>
              </div>

              {/* Reservation button */}
              <button
                onClick={() => setShowReservationForm(true)}
                className="sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss"
              >
                Faire une demande de reservation
              </button>
            </div>
          </>
        )}
      </div>

      {/* RESERVATION FORM MODAL */}
      {showReservationForm && selectedCabin && (
        <>
          {/* Modal backdrop */}
          <div
            className="fixed inset-0 z-[1000] bg-abyss/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl dark:bg-background-dark md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center text-abyss/60 transition-colors hover:text-primary dark:text-ecru/60"
                aria-label="Fermer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {submitStatus === 'success' ? (
                /* Success state */
                <div className="py-8 text-center">
                  <span className="material-symbols-outlined mb-4 text-5xl text-primary">check_circle</span>
                  <h3 className="serif-heading mb-3 text-2xl">Demande envoyee !</h3>
                  <p className="mb-2 text-sm opacity-70">
                    Merci {formState.firstName}, votre demande pour la croisiere <strong>{cruise.title}</strong> — cabine <strong>{selectedCabin.cabinCategory}</strong> a ete enregistree.
                  </p>
                  <p className="mb-6 text-sm opacity-70">
                    Notre equipe vous contactera sous 48h.
                  </p>
                  <button
                    onClick={closeModal}
                    className="sharp-edge bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                /* Form */
                <>
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Demande de reservation
                  </span>
                  <h3 className="serif-heading mb-6 text-2xl">Contactez-nous</h3>

                  {/* Cruise + cabin recap */}
                  <div className="mb-6 overflow-hidden border border-primary/20">
                    {/* Cruise image + title */}
                    <div className="relative flex gap-3 bg-abyss p-3 text-white">
                      {cruise.featuredImage && (
                        <img
                          src={cruise.featuredImage}
                          alt={cruise.title}
                          className="h-16 w-24 flex-shrink-0 object-cover"
                        />
                      )}
                      <div className="flex flex-col justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Votre croisiere</p>
                        <p className="text-sm font-semibold leading-tight">{cruise.title}</p>
                      </div>
                    </div>
                    {/* Cruise details */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 bg-primary/5 px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-primary">calendar_today</span>
                        <span className="text-[11px]">{formatDateFr(cruise.departureDate)} — {formatDateFr(cruise.returnDate)}</span>
                      </div>
                      {cruise.destination && (
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                          <span className="text-[11px]">{cruise.destination}</span>
                        </div>
                      )}
                      {cruise.vehicleName && (
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-xs text-primary">{cruise.vehicleType === 'train' ? 'train' : 'sailing'}</span>
                          <span className="text-[11px]">{cruise.vehicleName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-primary">payments</span>
                        <span className="text-[11px]">A partir de {cruise.price.toLocaleString('fr-FR')} &euro;</span>
                      </div>
                    </div>
                    {/* Selected cabin */}
                    <div className="flex items-center gap-2 border-t border-primary/10 bg-white px-3 py-2 dark:bg-background-dark">
                      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedCabin.color }} />
                      <span className="text-xs font-semibold">{selectedCabin.cabinCategory}</span>
                      <span className="ml-auto text-xs font-bold text-primary">{selectedCabin.price.toLocaleString('fr-FR')} &euro;/pers.</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Civilite */}
                    <div>
                      <label htmlFor="res-civility" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Civilite
                      </label>
                      <select
                        id="res-civility"
                        value={formState.civility}
                        onChange={(e) => setFormState(prev => ({ ...prev, civility: e.target.value }))}
                        className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      >
                        <option value="">--</option>
                        <option value="M.">M.</option>
                        <option value="Mme">Mme</option>
                      </select>
                    </div>

                    {/* Prenom / Nom */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="res-firstName" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Prenom *
                        </label>
                        <input
                          id="res-firstName"
                          type="text"
                          required
                          value={formState.firstName}
                          onChange={(e) => setFormState(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <label htmlFor="res-lastName" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Nom *
                        </label>
                        <input
                          id="res-lastName"
                          type="text"
                          required
                          value={formState.lastName}
                          onChange={(e) => setFormState(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="Dupont"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="res-email" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Email *
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="jean@exemple.fr"
                      />
                    </div>

                    {/* Telephone */}
                    <div>
                      <label htmlFor="res-phone" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Telephone *
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    {/* Separator */}
                    <div className="border-t border-primary/10 pt-2">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">Adresse</p>
                    </div>

                    {/* Adresse */}
                    <div>
                      <label htmlFor="res-address" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Adresse
                      </label>
                      <input
                        id="res-address"
                        type="text"
                        value={formState.address}
                        onChange={(e) => setFormState(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="12 rue de la Paix"
                      />
                    </div>

                    {/* CP / Ville */}
                    <div className="grid grid-cols-[120px_1fr] gap-3">
                      <div>
                        <label htmlFor="res-postalCode" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Code postal
                        </label>
                        <input
                          id="res-postalCode"
                          type="text"
                          value={formState.postalCode}
                          onChange={(e) => setFormState(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="75001"
                        />
                      </div>
                      <div>
                        <label htmlFor="res-city" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Ville
                        </label>
                        <input
                          id="res-city"
                          type="text"
                          value={formState.city}
                          onChange={(e) => setFormState(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="Paris"
                        />
                      </div>
                    </div>

                    {/* Pays */}
                    <div>
                      <label htmlFor="res-country" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Pays
                      </label>
                      <input
                        id="res-country"
                        type="text"
                        value={formState.country}
                        onChange={(e) => setFormState(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="France"
                      />
                    </div>

                    {/* Separator */}
                    <div className="border-t border-primary/10 pt-2">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-primary">Voyageurs</p>
                    </div>

                    {/* Nombre d'adultes / enfants */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="res-adults" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Adultes *
                        </label>
                        <div className="flex items-center border border-primary/20">
                          <button
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/10"
                          >
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <span className="flex-1 text-center text-sm font-semibold">{formState.adults}</span>
                          <button
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, adults: Math.min(20, prev.adults + 1) }))}
                            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/10"
                          >
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="res-children" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Enfants (-18 ans)
                        </label>
                        <div className="flex items-center border border-primary/20">
                          <button
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/10"
                          >
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <span className="flex-1 text-center text-sm font-semibold">{formState.children}</span>
                          <button
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, children: Math.min(10, prev.children + 1) }))}
                            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/10"
                          >
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Ages enfants */}
                    {formState.children > 0 && (
                      <div>
                        <label htmlFor="res-childrenAges" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                          Ages des enfants
                        </label>
                        <input
                          id="res-childrenAges"
                          type="text"
                          value={formState.childrenAges}
                          onChange={(e) => setFormState(prev => ({ ...prev, childrenAges: e.target.value }))}
                          className="w-full border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          placeholder="ex: 8 ans, 12 ans"
                        />
                      </div>
                    )}

                    {/* Nombre de cabines */}
                    <div>
                      <label htmlFor="res-cabins" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Nombre de cabines souhaitees
                      </label>
                      <div className="flex items-center border border-primary/20" style={{ width: 'fit-content' }}>
                        <button
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, cabinsRequested: Math.max(1, prev.cabinsRequested - 1) }))}
                          className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/10"
                        >
                          <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <span className="w-12 text-center text-sm font-semibold">{formState.cabinsRequested}</span>
                        <button
                          type="button"
                          onClick={() => setFormState(prev => ({ ...prev, cabinsRequested: Math.min(10, prev.cabinsRequested + 1) }))}
                          className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:bg-primary/10"
                        >
                          <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-primary/10 pt-2">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">Votre message</p>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="res-message" className="mb-1 block text-[10px] font-bold uppercase tracking-widest opacity-60">
                        Demandes particulieres
                      </label>
                      <textarea
                        id="res-message"
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full resize-none border border-primary/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="Regime alimentaire, accessibilite, occasion speciale..."
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <p className="text-xs text-red-600">Une erreur est survenue. Veuillez reessayer.</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="sharp-edge w-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss disabled:opacity-50"
                    >
                      {submitStatus === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Envoi en cours...
                        </span>
                      ) : (
                        'Envoyer ma demande'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
