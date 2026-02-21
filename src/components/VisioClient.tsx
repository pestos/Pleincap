'use client'

import { useState, useCallback, useEffect } from 'react'

type Visio = {
  id: string | number
  title: string
  description: string
  thumbnail?: { url: string; alt?: string }
  type: 'live' | 'replay'
  destination?: { id: string | number; name: string }
  speaker?: { name: string; specialty?: string }
  speakerOverride?: string
  date: string
  time?: string
  duration?: string
  youtubeUrl?: string
  youtubeLiveUrl?: string
  registrationOpen?: boolean
  viewers?: number
}

type Props = {
  visioconferences: Visio[]
  destinations: string[]
}

function formatDate(dateString: string): string {
  const d = new Date(dateString)
  const months = [
    'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
  ]
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null
  // Handle youtu.be/ID, youtube.com/watch?v=ID, youtube.com/live/ID
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([a-zA-Z0-9_-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default function VisioClient({ visioconferences, destinations }: Props) {
  const [selectedDest, setSelectedDest] = useState('all')
  const [selectedType, setSelectedType] = useState<'all' | 'live' | 'replay'>('all')
  const [registrationModal, setRegistrationModal] = useState<Visio | null>(null)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const filtered = visioconferences.filter(v => {
    const matchDest = selectedDest === 'all' || v.destination?.name === selectedDest
    const matchType = selectedType === 'all' || v.type === selectedType
    return matchDest && matchType
  })

  const upcomingLive = visioconferences.filter(v => v.type === 'live').slice(0, 2)

  const getSpeakerName = (v: Visio) => {
    if (v.speakerOverride) return v.speakerOverride
    if (v.speaker) return v.speaker.name
    return ''
  }

  const openRegistration = useCallback((visio: Visio) => {
    setRegistrationModal(visio)
    setFormState({ name: '', email: '', phone: '' })
    setSubmitStatus('idle')
    setErrorMsg('')
  }, [])

  const closeRegistration = useCallback(() => {
    setRegistrationModal(null)
  }, [])

  // Lock scroll when modal is open
  useEffect(() => {
    if (registrationModal) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [registrationModal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registrationModal) return
    setSubmitStatus('loading')

    try {
      const res = await fetch('/api/live-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visioconferenceId: registrationModal.id,
          name: formState.name,
          email: formState.email,
          phone: formState.phone || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitStatus('error')
        setErrorMsg(data.error || 'Une erreur est survenue')
      } else {
        setSubmitStatus('success')
      }
    } catch {
      setSubmitStatus('error')
      setErrorMsg('Erreur de connexion')
    }
  }

  const handleVideoClick = (visio: Visio) => {
    const url = visio.type === 'replay' ? visio.youtubeUrl : visio.youtubeLiveUrl
    if (url) window.open(url, '_blank')
  }

  return (
    <>
      {/* FILTER BAR */}
      <section className="relative z-20 -mt-12 w-full">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col items-center gap-4 border border-primary/30 bg-background-light p-5 shadow-2xl dark:bg-background-dark sm:gap-6 md:flex-row md:justify-center md:p-8">
            <div className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:gap-4">
              <button
                onClick={() => setSelectedType('all')}
                className={`sharp-edge whitespace-nowrap px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all md:px-8 md:py-3 md:text-xs ${
                  selectedType === 'all' ? 'bg-abyss text-white' : 'border border-abyss/20 bg-transparent hover:bg-abyss/10'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setSelectedType('live')}
                className={`sharp-edge whitespace-nowrap px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all md:px-8 md:py-3 md:text-xs ${
                  selectedType === 'live' ? 'bg-primary text-white' : 'border border-primary/20 bg-transparent hover:bg-primary/10'
                }`}
              >
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-current" />
                En direct
              </button>
              <button
                onClick={() => setSelectedType('replay')}
                className={`sharp-edge whitespace-nowrap px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all md:px-8 md:py-3 md:text-xs ${
                  selectedType === 'replay' ? 'bg-abyss text-white' : 'border border-abyss/20 bg-transparent hover:bg-abyss/10'
                }`}
              >
                Replay
              </button>
            </div>
            <div className="h-px w-full bg-primary/20 md:h-10 md:w-px" />
            <select
              className="sharp-edge w-full border border-primary/30 bg-transparent px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest focus:ring-0 md:w-auto md:px-6 md:py-3 md:text-xs"
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
            >
              <option value="all">Toutes les destinations</option>
              {destinations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* UPCOMING LIVE */}
      {upcomingLive.length > 0 && (
        <section className="w-full py-16 md:py-20">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-10 text-center md:mb-12">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Prochaines sessions
              </span>
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl">
                Conferences en direct
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {upcomingLive.map(conf => {
                const embedUrl = getYoutubeEmbedUrl(conf.youtubeLiveUrl || '')
                const speakerName = getSpeakerName(conf)
                return (
                  <div key={conf.id} className="group relative overflow-hidden border border-primary/30">
                    {/* Video / thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={conf.title}
                        />
                      ) : (
                        <>
                          <img
                            src={conf.thumbnail?.url || ''}
                            alt={conf.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {conf.youtubeLiveUrl && (
                            <button
                              onClick={() => handleVideoClick(conf)}
                              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            >
                              <span className="material-symbols-outlined text-6xl text-white">play_circle</span>
                            </button>
                          )}
                        </>
                      )}
                      <div className="absolute left-4 top-4 flex items-center gap-2 bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white md:left-6 md:top-6 md:px-4 md:py-2 md:text-xs">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                        En direct
                      </div>
                    </div>
                    <div className="bg-ecru p-5 md:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest opacity-60 md:mb-4 md:gap-4">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          {formatDate(conf.date)}
                        </span>
                        {conf.time && (
                          <>
                            <div className="h-3 w-px bg-abyss/30" />
                            <span className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-sm">schedule</span>
                              {conf.time}
                            </span>
                          </>
                        )}
                        {conf.duration && (
                          <>
                            <div className="h-3 w-px bg-abyss/30" />
                            <span>{conf.duration}</span>
                          </>
                        )}
                      </div>
                      <h3 className="serif-heading mb-2 text-xl leading-tight md:mb-3 md:text-2xl">{conf.title}</h3>
                      <p className="mb-4 text-xs font-light leading-relaxed opacity-70">{conf.description}</p>
                      {speakerName && (
                        <div className="mb-5 flex items-center gap-3 border-t border-primary/20 pt-4 md:mb-6">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 md:h-10 md:w-10">
                            <span className="material-symbols-outlined text-primary">person</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{speakerName}</p>
                            <p className="text-[10px] uppercase tracking-widest opacity-60">Conferencier</p>
                          </div>
                        </div>
                      )}
                      {conf.registrationOpen ? (
                        <button
                          onClick={() => openRegistration(conf)}
                          className="sharp-edge w-full bg-primary px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss md:py-4 md:text-xs"
                        >
                          S'inscrire gratuitement
                        </button>
                      ) : conf.youtubeLiveUrl ? (
                        <button
                          onClick={() => handleVideoClick(conf)}
                          className="sharp-edge w-full border border-primary px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white md:py-4 md:text-xs"
                        >
                          Acceder au live
                        </button>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ALL CONFERENCES GRID */}
      <section className="w-full bg-ecru py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-primary/20 pb-6 md:mb-16 md:flex-row md:items-center">
            <div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Catalogue
              </span>
              <h3 className="serif-heading text-2xl md:text-3xl lg:text-4xl">
                Toutes nos visioconferences
              </h3>
            </div>
            <span className="text-sm opacity-60">
              {filtered.length} conference{filtered.length > 1 ? 's' : ''}
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {filtered.map(conf => {
                const speakerName = getSpeakerName(conf)
                return (
                  <div key={conf.id} className="group relative overflow-hidden border border-primary/20 bg-white transition-all duration-300 hover:shadow-xl">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={conf.thumbnail?.url || ''}
                        alt={conf.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute left-3 top-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white md:left-4 md:top-4 md:px-3 md:py-1.5 ${
                        conf.type === 'live' ? 'bg-primary' : 'bg-abyss'
                      }`}>
                        {conf.type === 'live' ? (
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            En direct
                          </span>
                        ) : 'Replay'}
                      </div>
                      <button
                        onClick={() => handleVideoClick(conf)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-5xl text-white">
                          {conf.type === 'live' ? 'play_circle' : 'play_arrow'}
                        </span>
                      </button>
                      {conf.type === 'replay' && conf.viewers != null && conf.viewers > 0 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm md:bottom-4 md:right-4 md:px-3">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          {conf.viewers}
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-widest opacity-60 md:mb-3 md:gap-3">
                        <span>{formatDate(conf.date)}</span>
                        {conf.time && (
                          <>
                            <div className="h-2 w-px bg-abyss/30" />
                            <span>{conf.time}</span>
                          </>
                        )}
                        {conf.duration && (
                          <>
                            <div className="h-2 w-px bg-abyss/30" />
                            <span>{conf.duration}</span>
                          </>
                        )}
                      </div>
                      <h4 className="serif-heading mb-2 text-lg leading-tight transition-colors group-hover:text-primary md:mb-3 md:text-xl">
                        {conf.title}
                      </h4>
                      <p className="mb-3 line-clamp-2 text-xs font-light leading-relaxed opacity-70 md:mb-4">
                        {conf.description}
                      </p>
                      {speakerName && (
                        <div className="mb-3 flex items-center gap-2 border-t border-primary/10 pt-3 md:mb-4 md:pt-4">
                          <span className="material-symbols-outlined text-sm text-primary">person</span>
                          <p className="text-xs font-medium">{speakerName}</p>
                        </div>
                      )}
                      {conf.type === 'live' && conf.registrationOpen ? (
                        <button
                          onClick={() => openRegistration(conf)}
                          className="sharp-edge w-full bg-primary px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss md:py-3"
                        >
                          S'inscrire
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVideoClick(conf)}
                          className="sharp-edge w-full border border-abyss/20 bg-transparent px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white md:py-3"
                        >
                          {conf.type === 'live' ? 'Acceder au live' : 'Regarder'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-16 text-center md:py-20">
              <p className="text-sm opacity-60">Aucune conference ne correspond a vos criteres.</p>
            </div>
          )}
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {registrationModal && (
        <>
          <div
            className="fixed inset-0 z-[998] bg-abyss/60 backdrop-blur-sm"
            onClick={closeRegistration}
          />
          <div className="fixed inset-x-4 top-1/2 z-[999] mx-auto max-w-lg -translate-y-1/2 bg-white p-6 shadow-2xl dark:bg-background-dark sm:inset-x-auto md:p-10">
            <button
              onClick={closeRegistration}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-abyss/50 hover:text-abyss"
              aria-label="Fermer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {submitStatus === 'success' ? (
              <div className="py-8 text-center">
                <span className="material-symbols-outlined mb-4 text-5xl text-primary">check_circle</span>
                <h3 className="serif-heading mb-3 text-2xl">Inscription confirmee !</h3>
                <p className="mb-2 text-sm opacity-70">
                  Vous recevrez le lien du live a l'adresse indiquee.
                </p>
                <p className="text-xs font-bold text-primary">{registrationModal.title}</p>
                <p className="mt-1 text-xs opacity-50">{formatDate(registrationModal.date)} {registrationModal.time && `a ${registrationModal.time}`}</p>
                <button
                  onClick={closeRegistration}
                  className="sharp-edge mt-8 bg-primary px-10 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 md:mb-8">
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                    Inscription gratuite
                  </span>
                  <h3 className="serif-heading mb-2 text-xl md:text-2xl">{registrationModal.title}</h3>
                  <p className="text-xs opacity-50">
                    {formatDate(registrationModal.date)} {registrationModal.time && `a ${registrationModal.time}`}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full border border-abyss/20 bg-transparent px-4 py-3 text-sm focus:border-primary focus:ring-0"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full border border-abyss/20 bg-transparent px-4 py-3 text-sm focus:border-primary focus:ring-0"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest">
                      Telephone <span className="opacity-40">(optionnel)</span>
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                      className="w-full border border-abyss/20 bg-transparent px-4 py-3 text-sm focus:border-primary focus:ring-0"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-xs font-medium text-red-600">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="sharp-edge w-full bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-abyss disabled:opacity-50 md:py-4"
                  >
                    {submitStatus === 'loading' ? 'Inscription en cours...' : 'Confirmer mon inscription'}
                  </button>
                  <p className="text-center text-[10px] opacity-40">
                    Vos donnees sont utilisees uniquement pour l'envoi du lien de la conference.
                  </p>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
