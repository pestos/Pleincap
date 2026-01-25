import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'La Lettre | Plein Cap',
  description: 'Archives et actualités de la Lettre Plein Cap.',
}

const featured = {
  date: 'Édition Actuelle — Décembre 2024',
  title: "L'Éclat des Mers du Sud",
  summary:
    "Une immersion exclusive au cœur de l'archipel des Tuamotu, entre lagons turquoises et philosophie du voyage lent. Découvrez nos nouveaux itinéraires pour l'hiver 2025.",
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqT-u4OyESHG2vQSBkN-ow3MZI5L3wd8xij5SLPXwpe4gYeAtU4H16I637K4RmESFUa9RcnXjX5jo6ee66Sko8l6QseM-KX_ve3QnILyuhO4xVGdHN-TTc97pISvwZHdFIb8pe0zCbSYvum_tAkX_SHumQB80FIoWNbe-sHnhNblgJTT7Nb_7vMkKjEES4MUeRa4wAM-_Kqif7kCtiDq9wDJwSLXJJW0BBR7tc2BIkPPSrrmyrREwD-fToU4mOvKa-lG-0Yjv17k4',
}

const issues = [
  {
    month: 'Novembre 2024',
    entries: [
      {
        date: '14 Nov. 2024',
        title: 'Odyssée Arctique : Les silences du Grand Nord',
        theme: 'Croisières',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJAq-C0stQPyUH2mC9dLH5djTYQ0LCRB_j8gdwuxqRElMPgUD3rTqzFhzuQzbpeY3yEuxAKI0Dj8s_EAr_ngONPIxu5ZXEXGgZmuoEyVDC1S5b7QAMH6pBKvOF75h13H56ZlvGbNOVSXGMO_GbbTSMbr1fiGqabKKCur3n6kSIUam1FDQznhRTwfUywmVJ3DC3dgGh_IaXvpzXIuy1ZbuGOm2l-6HXa_kRCGz5TLW1pT-lpsbdJsXIQTwrV_cNGOhw0ReOJsCwI4',
      },
      {
        date: '02 Nov. 2024',
        title: "Gastronomie : Les tables flottantes de l'excellence",
        theme: 'Escapades',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBJHAhADA2Ppon3xShiQOxnVEChY0NBqMD_gjtJ80X-AzitXt_uED8x4ngRHVY9M_-y5x5AS18m95KlrHRuvSvQ7k2gLhkD1b3zKFK2EY4p9ij4ALqdAwzRc9UkQFh0HbYKZUYtbg8YcgICAtI7-IP_0MsM3rxsYpQvMrb_CjDK43VynjrAv6Ikvvfq5ud5IK0DCYoDdEz5-6oiv1mzjkQ-ijCUya84qJbIj7e32LOuXBRf0_JsE589FlRm8cjO4dSArL4Xv-9q-9I',
      },
    ],
  },
  {
    month: 'Octobre 2024',
    entries: [
      {
        date: '21 Oct. 2024',
        title: "L'Art du Rail : Traversée des Highlands",
        theme: 'Rail',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAoFEms9t55IaV23sYQoCXSbr5xA7qC0J3knqa7-zQUdJbXu2QqjiCXXxvYyxGBIKCo82Lu2pU6tSgkJ206herJRf-n8febh0uv70jiLIxq9BPEi7rNWxGGVzjOuLa_UrKdgTh2-jEiXDd-UDoBJH6C71BJde_v7Ox4wdMlnsUcSfxlsyFhRhGVFRyfnNqXO8C2jYJScgIcQ9TaQ5DFzBvgOTvvOTz4V_aS1krJPf6eJD91j8xB94NZiB3NZrUYhqmKpgbr4FRWeoo',
      },
      {
        date: '05 Oct. 2024',
        title: 'Venise secrète : Par-delà les canaux',
        theme: 'Croisières',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDeA49x-YaO7mxdYljiDzd_RBKXnE9d9yvJ_T7RIup2cW75JYu5Vbje7ceaSHSMBR6VebZBlu5csoip7h3HkgCpEeBJYt6IQWn6sFtxuQJgk6cqhRGRvXsraTYTfEAgA1caBazjHDQemc_iVqCAPe3rqdrhtELEHwodIzDeXSN_5ah-NIeyEPGKMslz9YJ2nKH1qdRxkmis8A4guSCXatn_-mSZ00DKCvc_XKlHvY4mSrjvgRAuqoz2T83x4BC-39cn1xgyq-yMDKg',
      },
    ],
  },
]

export default function NewsLetterPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1a2b3c]`}>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:pt-28">
        <Hero />
        <Featured />
        <Filters />
        <Issues />
        <Subscribe />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="flex flex-col items-center pb-12 pt-24">
      <h1 className="text-center text-6xl font-black leading-none tracking-tighter md:text-8xl">La Lettre</h1>
      <p className="mt-4 text-xl font-light italic tracking-wide text-[#ecb613] md:text-2xl">Archives & Correspondances Maritimes</p>
    </section>
  )
}

function Featured() {
  return (
    <section className="pb-28">
      <div className="group relative w-full overflow-hidden">
        <div className="grid grid-cols-1 items-center bg-white shadow-sm ring-1 ring-[#ecb613]/10 md:grid-cols-12">
          <div className="aspect-[16/9] overflow-hidden md:col-span-7">
            <img
              src={featured.image}
              alt="Featured Newsletter"
              className="h-full w-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="space-y-6 p-12 md:col-span-5 md:p-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ecb613]">{featured.date}</span>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{featured.title}</h2>
            </div>
            <p className="text-lg leading-relaxed italic text-[#1a2b3c]/70">{featured.summary}</p>
            <div className="pt-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 border-b border-[#ecb613] pb-1 text-sm font-bold uppercase tracking-widest text-[#ecb613] transition-all hover:gap-6"
              >
                Lire l'édition
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Filters() {
  return (
    <section className="border-y border-[#ecb613]/20 pb-12 pt-12">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c]/40">Filtrer par année:</span>
          <div className="flex gap-6">
            {['2024', '2023', '2022'].map((year, idx) => (
              <button
                key={year}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] border-b pb-1 transition-colors ${
                  idx === 0 ? 'border-[#ecb613] text-[#1a2b3c]' : 'border-transparent text-[#1a2b3c]/60 hover:border-[#ecb613] hover:text-[#1a2b3c]'
                }`}
                type="button"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden h-4 w-px bg-[#ecb613]/20 md:block" />
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c]/40">Thématiques:</span>
          <div className="flex gap-6">
            {['Tout', 'Croisières', 'Rail', 'Escapades'].map((theme) => (
              <button
                key={theme}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a2b3c]/60 transition-colors hover:border-b hover:border-[#ecb613] hover:text-[#1a2b3c]"
                type="button"
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
        <div className="relative ml-auto flex w-full max-w-xs items-center md:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full border-b border-[#ecb613]/10 bg-transparent py-1 pr-8 text-sm italic placeholder:text-[#1a2b3c]/30 focus:border-[#ecb613] focus:outline-none"
          />
          <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-lg text-[#ecb613]/40">search</span>
        </div>
      </div>
    </section>
  )
}

function Issues() {
  return (
    <section className="space-y-20 pb-28 pt-12">
      {issues.map((issue) => (
        <div key={issue.month}>
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-[#ecb613]">{issue.month}</h3>
          </div>
          <div className="flex flex-col">
            <div className="h-px w-full bg-[#ecb613]/30" />
            {issue.entries.map((entry) => (
              <article
                key={entry.title}
                className="group -mx-4 flex flex-col items-center gap-8 px-4 py-8 transition-colors hover:bg-white/40 md:flex-row"
              >
                <div className="aspect-[4/3] w-32 flex-shrink-0 overflow-hidden">
                  <img src={entry.image} alt={entry.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#ecb613]">{entry.date}</p>
                  <h4 className="text-2xl font-semibold leading-tight text-[#1a2b3c] transition-colors group-hover:text-[#ecb613]">
                    {entry.title}
                  </h4>
                </div>
                <div className="flex items-center gap-12 text-left md:text-right">
                  <span className="text-xs italic text-[#1a2b3c]/40">Thème: {entry.theme}</span>
                  <a
                    href="#"
                    className="text-[10px] font-bold uppercase tracking-widest text-[#ecb613] transition-all hover:border-b hover:border-[#1a2b3c] hover:text-[#1a2b3c]"
                  >
                    Lire la lettre
                  </a>
                </div>
              </article>
            ))}
            <div className="h-px w-full bg-[#ecb613]/30" />
          </div>
        </div>
      ))}
      <div className="flex justify-center pt-12">
        <button className="px-12 py-4 border border-[#ecb613] text-[10px] font-bold uppercase tracking-[0.3em] text-[#ecb613] transition-all hover:bg-[#ecb613] hover:text-white">
          Charger plus d'archives
        </button>
      </div>
    </section>
  )
}

function Subscribe() {
  return (
    <section className="-mx-6 bg-white px-6 py-28 ring-1 ring-[#ecb613]/5">
      <div className="mx-auto w-full max-w-[720px] space-y-10 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Ne manquez aucune escale</h2>
          <p className="mx-auto max-w-[500px] text-lg leading-relaxed italic text-[#1a2b3c]/70">
            Cultural insights, exclusive departures, and travel philosophy delivered monthly.
          </p>
        </div>
        <form className="group flex flex-col gap-0 border border-[#ecb613]/30 p-1 transition-all focus-within:border-[#ecb613] md:flex-row">
          <input
            type="email"
            placeholder="votre@email.com"
            className="flex-1 border-none bg-transparent px-6 py-4 text-lg italic text-[#1a2b3c] placeholder:text-[#1a2b3c]/40 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#ecb613] px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#1a2b3c] transition-all hover:bg-[#1a2b3c] hover:text-white"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </section>
  )
}
