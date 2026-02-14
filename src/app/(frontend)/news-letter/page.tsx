'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

interface NewsletterEntry {
  date: string
  title: string
  theme: string
  image: string
  excerpt?: string
}

interface NewsletterIssue {
  month: string
  entries: NewsletterEntry[]
}

const featured = {
  date: 'Édition Actuelle — Janvier 2026',
  title: "L'Éclat des Mers du Sud",
  summary: "Une immersion exclusive au cœur de l'archipel des Tuamotu, entre lagons turquoises et philosophie du voyage lent. Découvrez nos nouveaux itinéraires pour l'hiver 2026.",
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqT-u4OyESHG2vQSBkN-ow3MZI5L3wd8xij5SLPXwpe4gYeAtU4H16I637K4RmESFUa9RcnXjX5jo6ee66Sko8l6QseM-KX_ve3QnILyuhO4xVGdHN-TTc97pISvwZHdFIb8pe0zCbSYvum_tAkX_SHumQB80FIoWNbe-sHnhNblgJTT7Nb_7vMkKjEES4MUeRa4wAM-_Kqif7kCtiDq9wDJwSLXJJW0BBR7tc2BIkPPSrrmyrREwD-fToU4mOvKa-lG-0Yjv17k4',
}

const issues: NewsletterIssue[] = [
  {
    month: 'Décembre 2025',
    entries: [
      {
        date: '18 Déc. 2025',
        title: 'Odyssée Arctique : Les silences du Grand Nord',
        theme: 'Croisières',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJAq-C0stQPyUH2mC9dLH5djTYQ0LCRB_j8gdwuxqRElMPgUD3rTqzFhzuQzbpeY3yEuxAKI0Dj8s_EAr_ngONPIxu5ZXEXGgZmuoEyVDC1S5b7QAMH6pBKvOF75h13H56ZlvGbNOVSXGMO_GbbTSMbr1fiGqabKKCur3n6kSIUam1FDQznhRTwfUywmVJ3DC3dgGh_IaXvpzXIuy1ZbuGOm2l-6HXa_kRCGz5TLW1pT-lpsbdJsXIQTwrV_cNGOhw0ReOJsCwI4',
        excerpt: 'Partez à la découverte des paysages glacés du Spitzberg et rencontrez la faune arctique dans son habitat naturel.'
      },
      {
        date: '05 Déc. 2025',
        title: "Gastronomie : Les tables flottantes de l'excellence",
        theme: 'Escapades',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJHAhADA2Ppon3xShiQOxnVEChY0NBqMD_gjtJ80X-AzitXt_uED8x4ngRHVY9M_-y5x5AS18m95KlrHRuvSvQ7k2gLhkD1b3zKFK2EY4p9ij4ALqdAwzRc9UkQFh0HbYKZUYtbg8YcgICAtI7-IP_0MsM3rxsYpQvMrb_CjDK43VynjrAv6Ikvvfq5ud5IK0DCYoDdEz5-6oiv1mzjkQ-ijCUya84qJbIj7e32LOuXBRf0_JsE589FlRm8cjO4dSArL4Xv-9q-9I',
        excerpt: 'Nos chefs étoilés vous invitent à une expérience culinaire unique inspirée des saveurs locales.'
      },
    ],
  },
  {
    month: 'Novembre 2025',
    entries: [
      {
        date: '22 Nov. 2025',
        title: "L'Art du Rail : Traversée des Highlands",
        theme: 'Rail',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoFEms9t55IaV23sYQoCXSbr5xA7qC0J3knqa7-zQUdJbXu2QqjiCXXxvYyxGBIKCo82Lu2pU6tSgkJ206herJRf-n8febh0uv70jiLIxq9BPEi7rNWxGGVzjOuLa_UrKdgTh2-jEiXDd-UDoBJH6C71BJde_v7Ox4wdMlnsUcSfxlsyFhRhGVFRyfnNqXO8C2jYJScgIcQ9TaQ5DFzBvgOTvvOTz4V_aS1krJPf6eJD91j8xB94NZiB3NZrUYhqmKpgbr4FRWeoo',
        excerpt: 'Traversez les paysages spectaculaires des Highlands écossaises à bord du train le plus pittoresque d\'Europe.'
      },
      {
        date: '08 Nov. 2025',
        title: 'Venise secrète : Par-delà les canaux',
        theme: 'Croisières',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeA49x-YaO7mxdYljiDzd_RBKXnE9d9yvJ_T7RIup2cW75JYu5Vbje7ceaSHSMBR6VebZBlu5csoip7h3HkgCpEeBJYt6IQWn6sFtxuQJgk6cqhRGRvXsraTYTfEAgA1caBazjHDQemc_iVqCAPe3rqdrhtELEHwodIzDeXSN_5ah-NIeyEPGKMslz9YJ2nKH1qdRxkmis8A4guSCXatn_-mSZ00DKCvc_XKlHvY4mSrjvgRAuqoz2T83x4BC-39cn1xgyq-yMDKg',
        excerpt: 'Explorez les quartiers méconnus de la Sérénissime et découvrez ses ateliers d\'artisans traditionnels.'
      },
    ],
  },
  {
    month: 'Octobre 2025',
    entries: [
      {
        date: '15 Oct. 2025',
        title: 'Capitales Baltes : Trésors médiévaux préservés',
        theme: 'Croisières',
        image: 'https://www.plein-cap.com/images/2026/capitales_baltes/entete_capitales_baltes.jpg',
        excerpt: 'De Tallinn à Vilnius, découvrez trois perles architecturales au patrimoine exceptionnel.'
      },
      {
        date: '03 Oct. 2025',
        title: 'Orient-Express : Renaissance d\'une légende',
        theme: 'Rail',
        image: 'https://www.plein-cap.com/images/2026/train-autriche/shutterstock_2063740619.jpg',
        excerpt: 'Le train mythique reprend vie avec un luxe contemporain inspiré des années folles.'
      },
    ],
  },
]

const years = ['2026', '2025', '2024', '2023']
const themes = ['Tout', 'Croisières', 'Rail', 'Escapades']

function StatusBanner() {
  const searchParams = useSearchParams()
  const confirmed = searchParams.get('confirmed')
  const unsubscribed = searchParams.get('unsubscribed')

  if (confirmed === 'true') {
    return (
      <div className="w-full border-b border-primary bg-primary/10 py-4">
        <div className="mx-auto max-w-[1600px] px-6 text-center md:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            ✓ Inscription confirmée ! Bienvenue dans la communauté PleinCap.
          </p>
        </div>
      </div>
    )
  }

  if (unsubscribed === 'true') {
    return (
      <div className="w-full border-b border-primary/30 bg-abyss/5 py-4">
        <div className="mx-auto max-w-[1600px] px-6 text-center md:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-abyss/70">
            Désinscription confirmée. Vous ne recevrez plus nos communications.
          </p>
        </div>
      </div>
    )
  }

  return null
}

function NewsLetterContent() {
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedTheme, setSelectedTheme] = useState('Tout')
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setMessage({ type: 'success', text: data.message })
        setEmail('')
      } else {
        setMessage({ type: 'error', text: data.error || 'Une erreur est survenue' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur de connexion. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredIssues = issues.filter(issue => {
    return issue.entries.some(entry => {
      const matchesTheme = selectedTheme === 'Tout' || entry.theme === selectedTheme
      const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTheme && matchesSearch
    })
  })

  return (
    <>
      <SiteHeader />

      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(26, 43, 60, 0.7), rgba(26, 43, 60, 0.7)), url('https://www.plein-cap.com/images/2026/celtique/shutterstock_1240921069.jpg')"
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Archives & Correspondances Maritimes
          </span>
          <h1 className="serif-heading mb-6 text-6xl md:text-8xl">
            La Lettre Plein Cap
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-90">
            Découvrez nos éditions mensuelles, récits de voyage, conseils d'experts et actualités exclusives de l'univers du voyage culturel de luxe
          </p>
        </div>
      </section>

      <section className="w-full py-[80px]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Édition en cours
          </span>
          <div className="group grid grid-cols-1 gap-8 overflow-hidden border border-primary/20 bg-white shadow-lg md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6 p-8 md:p-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                {featured.date}
              </span>
              <h2 className="serif-heading text-4xl leading-tight md:text-5xl">
                {featured.title}
              </h2>
              <p className="text-sm font-light leading-relaxed opacity-70">
                {featured.summary}
              </p>
              <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border-b border-primary pb-1 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                >
                  Lire l'édition complète
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-primary/20 bg-ecru py-8">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                Année:
              </span>
              <div className="flex flex-wrap gap-4">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`sharp-edge border px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                      selectedYear === year
                        ? 'border-primary bg-primary text-white'
                        : 'border-abyss/20 bg-transparent hover:border-primary'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-primary/20 md:h-10 md:w-px" />

            <div className="flex flex-wrap items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                Thématique:
              </span>
              <div className="flex flex-wrap gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme)}
                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                      selectedTheme === theme
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-abyss/60 hover:text-primary'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-abyss/20 bg-transparent py-2 pr-8 text-sm focus:border-primary focus:outline-none"
              />
              <span className="material-symbols-outlined absolute right-0 text-lg text-primary/60">
                search
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-[120px]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-16">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Archives
            </span>
            <h3 className="serif-heading text-4xl md:text-5xl">
              Toutes nos éditions
            </h3>
          </div>

          <div className="space-y-20">
            {filteredIssues.map((issue) => (
              <div key={issue.month}>
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                    {issue.month}
                  </h4>
                </div>
                <div className="border-y border-primary/20">
                  {issue.entries
                    .filter(entry => {
                      const matchesTheme = selectedTheme === 'Tout' || entry.theme === selectedTheme
                      const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase())
                      return matchesTheme && matchesSearch
                    })
                    .map((entry) => (
                      <article
                        key={entry.title}
                        className="group grid grid-cols-1 gap-6 border-b border-primary/10 py-8 transition-colors last:border-0 hover:bg-white/40 md:grid-cols-12 md:items-center"
                      >
                        <div className="md:col-span-2">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={entry.image}
                              alt={entry.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-6">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                            {entry.date}
                          </p>
                          <h5 className="serif-heading mb-2 text-2xl leading-tight transition-colors group-hover:text-primary md:text-3xl">
                            {entry.title}
                          </h5>
                          {entry.excerpt && (
                            <p className="text-sm font-light leading-relaxed opacity-70">
                              {entry.excerpt}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between md:col-span-4 md:justify-end md:gap-8">
                          <span className="inline-flex items-center gap-2 border border-primary/30 px-4 py-2 text-[9px] font-bold uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm text-primary">
                              category
                            </span>
                            {entry.theme}
                          </span>
                          <a
                            href="#"
                            className="sharp-edge border border-abyss/20 bg-transparent px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white"
                          >
                            Lire
                          </a>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm opacity-60">
                Aucune édition ne correspond à vos critères.
              </p>
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <button className="sharp-edge border border-primary px-12 py-4 text-xs font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white">
              Charger plus d'archives
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-primary/10 bg-abyss py-[120px] text-ecru">
        <div className="mx-auto max-w-[1600px] px-6 text-center md:px-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="mb-12">
              <span className="material-symbols-outlined mb-6 text-6xl text-primary">
                mail
              </span>
              <h2 className="serif-heading mb-4 text-4xl md:text-5xl">
                Ne manquez aucune édition
              </h2>
              <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-70">
                Recevez chaque mois notre lettre exclusive : récits de voyage, nouveaux itinéraires, conseils d'experts et inspirations culturelles
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mx-auto flex max-w-2xl flex-col gap-0 border border-primary/30 transition-all focus-within:border-primary md:flex-row">
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-none bg-transparent px-6 py-4 text-sm text-ecru placeholder:text-ecru/40 focus:outline-none"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="sharp-edge bg-primary px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-ecru hover:text-abyss disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : "S'inscrire gratuitement"}
              </button>
            </form>

            {message && (
              <div className={`mt-4 text-center text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message.text}
              </div>
            )}

            <p className="text-[10px] uppercase tracking-widest opacity-40">
              Vos données sont protégées. Désinscription possible à tout moment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ecru py-[120px]">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-16 text-center">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Avantages abonnés
            </span>
            <h2 className="serif-heading text-4xl md:text-5xl">
              Pourquoi s'abonner
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    auto_stories
                  </span>
                </div>
              </div>
              <h3 className="serif-heading mb-4 text-2xl">
                Contenu Exclusif
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70">
                Accédez en avant-première à nos nouveaux itinéraires et offres spéciales réservées aux abonnés
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    explore
                  </span>
                </div>
              </div>
              <h3 className="serif-heading mb-4 text-2xl">
                Inspiration Voyage
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70">
                Découvrez chaque mois des destinations fascinantes et des récits de voyage enrichissants
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center border border-primary/30">
                  <span className="material-symbols-outlined text-4xl text-primary">
                    workspace_premium
                  </span>
                </div>
              </div>
              <h3 className="serif-heading mb-4 text-2xl">
                Expertise Culturelle
              </h3>
              <p className="text-sm font-light leading-relaxed opacity-70">
                Profitez des conseils de nos conférenciers et experts pour enrichir vos futures aventures
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

export default function NewsLetterPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <Suspense fallback={null}>
        <StatusBanner />
      </Suspense>
      <NewsLetterContent />
    </div>
  )
}
