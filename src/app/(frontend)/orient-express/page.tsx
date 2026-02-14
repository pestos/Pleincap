import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "L'Orient-Express : De Paris à Istanbul | Plein Cap",
  description: "Voyage d'exception sur le Venice Simplon-Orient-Express de Paris à Istanbul, par Plein Cap.",
}

const heroBg =
  "linear-gradient(rgba(26, 43, 60, 0.4) 0%, rgba(26, 43, 60, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhkADAyetVo6kgTLINxD-F7cuhH_2ftk8CWxUCoS2ks4Gbx4J-YWUn5WKjXIp68fP9PP7YHiRkAqpu4CX7DpRt29fePZ3Weje8Y4bKoQkp2S5yQdxE_P0VRGnxvMgHLfSQ15Ckx_oDzEaN4xTTTHczf7hDDcCzV6ELV0NRVS20rLCsRnDDWS3B4w2ybdcBIgB-Gjns5cPWtIw_WSMlepjk4qV-qb2XeiUxeqxhWU5JIhZlcUah7C6DJCQSBh_STigLyLHu5uigtiQ')"

const palaceImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXLqTRpxRi5VdukxPMo0jnjPAPVRlB7vjeFsKJjTL6T-Xzq0bU_pEVMUu6--JE4vKKOOuiDG7DpptSWLetp_nsAaK7gbjwVSvxUJdByBVrExExhv2DiBAD3tLlnPxXWOGQLOanThFkpYGkjNdXteqMmuKxXYpfcmWsgBKBpRQ0pHgq0iVHKVj4gjo_ghTrfHuQ6gAULPmyXn_y6uwVH-PW6kucRR6rukB8AEnioS8TS5bOagxXPVidz_pco8KNEWHVilOB4k5Igb0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBpf-WANKJt36j56C3mimh7aSQJkdAsnno1aNncWeRi5qZdTK1cO8J6FBApz0P6NfVGE_mTii_bepwjYcMHEHhXfpkcvxM-yIzueSe3uo9VKog4mKIidKGKdOVoOrFuUvjF7xjRPSVmnM2Cw6VnhmgHa5I1pD1k0IVDkQl-DtFrNGjmOAPjLBfxL39sONhZGrfHzii-lJnF7hZYAtWNWC3P91l6SrgREe1f7Sp15EsUW_Ww35tR3zV9hxbOha5-E80KppuNPijGjEM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDo58gI1K_XNeKEeW8vh-kax_u3br21l8SEsthrperfl9tD6asLAblRJeEebufunqFPU8oYsWt3cjreNuYwHVdF6I08JuM9_czvzOCeJqytguFplAa4AM_-_chtDfSctDaO1kPLalHXUoHc1xRBlsBidiSijkuGg77oHoKjjoY-RjqvpbGTALGNCd1G-r1kMUoQiphlNBvN3Td9QPwmcceM2X7rtpu1-fd3JMEUS5cgDHnd7IU49Xi4nrOOiZFAiSO7_xuujUNxTVY',
]

const itinerary = [
  {
    day: 'Jour 1',
    title: "Paris — Gare de l'Est",
    summary:
      "Accueil privilégié, installation dans les cabines, dîner de gala à bord alors que le train s'élance vers l'Est.",
    details:
      "Première soirée à bord : voiture-bar, voiture-restaurant, stewart personnel qui transforme votre salon en chambre, immersion dans l'âge d'or ferroviaire.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD55Km4TCUtL-i_yAVyUxibKcqcwRW2l22KkT_tGcpvmTULV1vTAT_9IeXMU2zv02I64_KfD7tFoSjVtMuzrvOJu0efZTVHRHPKLuy9MJ49ABwYuvnvEY1Rt0o0G8bcvaFVcUZKvjWxHHshd6Q-2934V-wPcGpjbDtVOezm2Gy-RFv4LPFqtX3mIW37sGsak7J7xy0QMvxtCtnqHkkYSi2B0JvvMJSeayobWJfL5TRtOF65RCZpo4DJoDGu6madlzpNgwVcT0v4Aes',
    align: 'right',
  },
  {
    day: 'Jour 3',
    title: 'Budapest — La Perle du Danube',
    summary:
      "Arrivée à Budapest, visite privée du Parlement et croisière privatisée sur le Danube à la nuit tombante.",
    details:
      "Soirée dans un palace, thermes historiques, avenues haussmanniennes ; reprise du train le lendemain vers les Balkans.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB48ktG-8p8C-6p3w1WBHOdHjh2-I3kU9Ao1n-xhWArFfZDqwisA0ncfa34RCTliHbuPI-e8gLeskFggeD5H2xviPWemjUYjthmAeZdsfISKrkUT_N7FQ7MN7jtxu6ouLl83iKQR-bv4akyLWvc1hGH509GxUvJdnZq8NiecFtBX7cYUSEDV3ub9ISk3aCDwZBqFvTjgn3YfMH3d04kzy7gRCe62dTTLFmPN4q3RjtmJqyjn3w1LhLxNqk--DE8MBwsWh6NdNxaQzQ',
    align: 'left',
  },
  {
    day: 'Jour 5',
    title: 'Bucarest & Sinaia',
    summary:
      'Traversée des Carpates, visite privilégiée du Château de Peles, découverte de Bucarest, le Petit Paris des Balkans.',
    details:
      'Château néo-Renaissance, boiseries, armes anciennes ; soirée et dîner raffiné avant reprise du train vers le sud.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQtrNcAZmOqfJHoch1lL4YP6YSZat_glVPxkgWRS3yxJlmKgNtXtsIc5F14IBSeAuY_ZiY2sDXM7zEtzdJRJcPNdc8aze1WGzy-LE0aDZXuN--5lTvjGcqg49C8EHnWPsDUyG8onvZz-whGfUFExCY9dgjWtCl9MNdn3t00Agb2fs2R7FsBuLLFTkEdZR-tmyCvYiD5a0t81uNOqE0Rjsz94g_jw9J6dvS0jhuKq93CVf8Wp0vidZxJWB4i8MwZIxEN6Z1lYsULFI',
    align: 'right',
  },
  {
    day: 'Jour 7',
    title: "Istanbul — La Corne d'Or",
    summary:
      "Arrivée à Sirkeci, immersion dans l'effervescence du Bosphore : Sainte-Sophie, Mosquée Bleue, Grand Bazar.",
    details:
      'Transition douce du luxe feutré du train vers la vitalité stambouliote, accompagnement vers la résidence pour prolonger la découverte.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4yCxGMjolvsJOjq3JJuxLErDtWU3jlUPAjA9t6EsWBzZAFC4KOyi8xP5kTWjB5lgGgD1PptVbbXygtfdbO_8imnk19A2YDgCjAwnqtOiQ8UI9b0uqiV0fa-W75dCLmdhwqGYetItkrdSypT5BVldmrwNE9xsb43zacTnkXdiKomNBkj529esD_CT1l3V-3yZuBTztlgOSoQyyx_2OglGohoda8umjyfAZEXQV9HsriOOlGl19Rh4NPQPne735lqKC86Ysdl5edLQ',
    align: 'left',
  },
]

const suggestions = [
  {
    label: 'Grand Train de Luxe',
    title: "L'Andalousie Royale",
    price: 'À partir de 4 800 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2pt3So0ANto0qIDjfqWBmNoh2o8EvpWIJr_zMOVy0nSRD_u4TT86qalOcAW1TWfcnppuQfCDOPaUfckbN-g_xX5c2WzmZmrilS0kh0KQlpkiG4tNPvrsZp2CltrPc7ZMmzvIwGENeUmgV_fexCmeXym4vJfRz1gXhvPjNjOdAA6Tg937Bbufem74vCm7y5wgyneV1r9e78OkjhqjcevxWcj4ye2PKjMpN75I-wrvjhNl-bVKtRZHnQfJgM0OJ3kZWYgV3gDe53d0',
  },
  {
    label: 'Croisière Culturelle',
    title: "Splendeurs de l'Adriatique",
    price: 'À partir de 3 200 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb0-yBbImYlE8icof8IRGJ1yyoV_9hBMMq1pTBXXVBfnLP07j2WIWGg7yL-snXcLZ4nGVaVjzrBztUHpC3z46KXfdOzZyrDcrJCeWMXGMH27QXnvh2Do4WFPYLjYIFDgHsVWTVkktSyMrllFLsuvxlx5-lNh61YjNFTOUVOfMF2TUFijZA-oF0jDerxIHKxl2NQbrrZIXDuYwndW1GrZFZqn6otx417gI5pqIX2TdA51NVYoHdvGKXqMQWgJm4FszDeC7pO40vJ64',
  },
  {
    label: 'Rail & Safari',
    title: 'La Traversée Africaine',
    price: 'À partir de 12 500 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8njPqwi3fRZJZgttqk2WI4HWK15cZJBIIorzwoBhv7iFLfIlOgP_d3e6iKigmQWaLSfKgu0OwrHOlPhqgWBbciIN779zUehBjRpvKsjkdkJlK-htTKdiq09U2NDcdufEi-d34gMRwA_Qz9BfT64uwhPII22qq4NUO2CEzOG3KCnvqcRCPbSpWGYKMu2zQEH8DdiZYY8awG6NeI3W6Kb5tFY0hcp7eDbHolwybuXCjNn-W0-TXvSJucgBBTYT-mE3NNfp7Q1J3RKU',
  },
]

export default function OrientExpressPage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1a2b3c] dark:bg-[#1a2b3c] dark:text-white`}>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Intro />
        <Palace />
        <Itinerary />
        <MapSection />
        <Suggestions />
      </main>
      <SiteFooter />
      <StickyBar />
    </div>
  )
}

function Hero() {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: heroBg }} />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-6">
          <span className="mb-4 inline-block border border-[#c59f59] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#c59f59]">Voyage d'Exception</span>
          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            L'Orient-Express : <br />
            <span className="text-[#c59f59]">De Paris à Istanbul</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg tracking-wide text-white md:text-xl">15 — 22 Septembre 2024</p>
          <div className="h-12 w-px bg-[#c59f59]/60" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c59f59]">Tarif par personne à partir de 8 500 €</p>
          <a
            href="#itinerary"
            className="mt-8 bg-[#c59f59] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#1a2b3c] transition-colors duration-300 hover:bg-white"
          >
            Découvrir le voyage
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
      </div>
    </header>
  )
}

function Intro() {
  return (
    <section className="mx-auto max-w-[960px] px-4 py-16 text-center sm:px-6 md:py-24">
      <div className="mb-8 flex justify-center">
        <div className="flex h-8 items-center justify-center gap-x-2 rounded border border-[#c59f59]/30 bg-[#c59f59]/20 px-6">
          <span className="material-symbols-outlined text-sm text-[#c59f59]">train</span>
          <p className="text-xs font-bold uppercase tracking-widest leading-normal text-[#1a2b3c] dark:text-[#c59f59]">Croisière Train Accompagnée</p>
        </div>
      </div>
      <h2 className="mb-8 text-4xl font-bold leading-tight text-[#1a2b3c] dark:text-white">Une épopée ferroviaire légendaire</h2>
      <p className="mx-auto max-w-3xl text-xl leading-relaxed italic text-[#1a2b3c]/80 dark:text-white/80">
        "Le roi des trains, le train des rois". Plongez dans l'élégance intemporelle du Venice Simplon-Orient-Express. Un voyage culturel unique reliant le cœur de l'Europe à la Corne d'Or, sublimé par l'expertise historique exclusive de Plein Cap.
      </p>
    </section>
  )
}

function Palace() {
  return (
    <section className="bg-[#f0ede9] py-16 dark:bg-[#152331] sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c59f59]">Le Palais sur Rails</h3>
            <h2 className="mb-8 text-3xl font-bold text-[#1a2b3c] dark:text-white sm:mb-12">Le Venice Simplon-Orient-Express</h2>
          </div>
        </div>

        <div className="grid h-[520px] grid-cols-1 gap-4 md:h-[640px] md:grid-cols-12">
          <div className="h-full overflow-hidden md:col-span-7">
            <img
              className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
              src={palaceImages[0]}
              alt="Voiture principale"
            />
          </div>
          <div className="grid h-full grid-rows-2 gap-4 md:col-span-5">
            <div className="overflow-hidden">
              <img
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                src={palaceImages[1]}
                alt="Salle à manger"
              />
            </div>
            <div className="overflow-hidden">
              <img
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                src={palaceImages[2]}
                alt="Cabine"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <Feature title="Art Déco Originel" text="Voitures restaurées des années 1920, marqueteries et cristaux, ambiance d'époque." />
          <Feature title="Gastronomie Fine" text="Cuisine raffinée à bord, décors somptueux des voitures-restaurants." />
          <Feature title="Service Gants Blancs" text="Stewart personnel, soin des cabines et service de minuit, confort absolu." />
        </div>
      </div>
    </section>
  )
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h4 className="mb-2 font-bold text-[#c59f59]">{title}</h4>
      <p className="text-sm leading-relaxed text-[#1a2b3c] dark:text-white/70">{text}</p>
    </div>
  )
}

function Itinerary() {
  return (
    <section id="itinerary" className="mx-auto max-w-[960px] px-4 py-16 sm:px-6 md:py-24">
      <h2 className="mb-16 text-center text-3xl font-bold uppercase tracking-widest text-[#1a2b3c] dark:text-white">L'Itinéraire Culturel</h2>
      <div className="relative space-y-24">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#c59f59] md:block" />
        {itinerary.map((item, idx) => (
          <ItineraryBlock key={item.day} item={item} isEven={idx % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

type ItineraryItem = (typeof itinerary)[number]

function ItineraryBlock({ item, isEven }: { item: ItineraryItem; isEven: boolean }) {
  const alignRight = isEven
  return (
    <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
      {alignRight ? (
        <div className="hidden md:block pr-8">
          <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
        </div>
      ) : null}

      <div className={alignRight ? 'md:pl-8 md:text-right' : 'md:pr-8'}>
        <h3 className="mb-2 text-xl font-bold text-[#c59f59]">{item.day}</h3>
        <h4 className="mb-4 text-2xl font-bold text-[#1a2b3c] dark:text-white">{item.title}</h4>
        <ToggleCard summary={item.summary} details={item.details} />
      </div>

      {!alignRight ? (
        <div className="hidden md:block pl-8">
          <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
        </div>
      ) : null}

      <div className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#f9f8f6] bg-[#c59f59] dark:border-[#1a2b3c] md:block" />
    </div>
  )
}

function ToggleCard({ summary, details }: { summary: string; details: string }) {
  return (
    <div className="relative">
      <input className="peer hidden" id={summary} type="checkbox" />
      <p className="mb-1 text-sm leading-relaxed text-[#1a2b3c]/80 dark:text-white/70">{summary}</p>
      <div className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-500 peer-checked:grid-rows-[1fr]">
        <div className="min-h-0 pt-2">
          <p className="mb-4 text-sm leading-relaxed text-[#1a2b3c]/80 dark:text-white/70">{details}</p>
        </div>
      </div>
      <div className="fade-overlay pointer-events-none absolute bottom-0 left-0 hidden h-8 w-full bg-gradient-to-t from-[#f9f8f6] to-transparent transition-opacity duration-300 dark:from-[#1a2b3c] md:block" />
      <label
        htmlFor={summary}
        className="mt-4 inline-flex items-center gap-2 border-b border-[#c59f59]/30 pb-1 text-[10px] font-bold uppercase tracking-widest text-[#c59f59] transition hover:opacity-80"
      >
        <span className="group-open:hidden">En savoir plus</span>
        <span className="hidden group-open:inline">Fermer</span>
        <span className="material-symbols-outlined text-sm transition-transform duration-300">expand_more</span>
      </label>
    </div>
  )
}

function MapSection() {
  return (
    <section className="relative h-96 w-full bg-[#e5e7eb]">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <div className="text-center opacity-50">
          <span className="material-symbols-outlined mb-2 text-6xl text-[#1a2b3c]">map</span>
          <p className="text-xs font-bold uppercase tracking-widest">Carte interactive de l'itinéraire Paris — Istanbul</p>
        </div>
      </div>
      <img
        className="h-full w-full object-cover grayscale mix-blend-multiply"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFVMBUHoul-fNuv12EjDSZWvZ6xAF9MxqszzqbHQHt5Kqm6i3a1Ct-iHJCS1tPCvrSwop_yWTbXKxyfpvVzaFtMxvdIOnbjjxsXH1JOoScwVq-FN9MSFM6oGTiozIvNRBAeKuRMkGzmdQAiJS0B55PFTB41t5ezpaBZSQlbYUvz7QEMvaZSs3hsjyTxdSSJhdZviO4QzvFz1OKw6ddNGhWVM6AEPN9sn06ltkte8emnydoDrm6uJeGelu0Q13ZPrTLzcMQ6MqKmDY"
        alt="Carte Paris Istanbul"
      />
    </section>
  )
}

function Suggestions() {
  return (
    <section className="border-t border-gray-100 bg-[#f9f8f6] px-4 py-16 dark:bg-[#1a2b3c] sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-12 text-center text-3xl font-bold italic text-[#1a2b3c] dark:text-white">Suggestions de Voyages</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {suggestions.map((s) => (
            <a key={s.title} className="card-hover-effect group" href="#">
              <div className="mb-6 aspect-[4/5] overflow-hidden">
                <img
                  alt={s.title}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  src={s.image}
                />
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#c59f59]">{s.label}</p>
              <h4 className="mb-4 text-xl font-bold text-[#1a2b3c] dark:text-white">{s.title}</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-[#1a2b3c]/60 dark:text-white/60">{s.price}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function StickyBar() {
  return (
    <div className="sticky-bar fixed bottom-0 left-0 z-50 w-full border-t border-gray-100 bg-white text-[#1a2b3c] transition-transform duration-500 dark:border-white/5 dark:bg-[#1a2b3c]">
      <div className="mx-auto flex h-24 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <div className="flex flex-col">
          <h5 className="text-sm font-bold text-[#1a2b3c] dark:text-white">Venice Simplon-Orient-Express</h5>
          <p className="text-xs font-bold uppercase tracking-widest text-[#c59f59]">7 Jours • 6 Nuits</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <div className="hidden flex-col items-end lg:flex">
            <p className="text-[10px] font-bold uppercase tracking-tight text-[#1a2b3c]/50 dark:text-white/50">Prix par passager</p>
            <p className="text-xl font-bold text-[#1a2b3c] dark:text-white">8 500 €</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="border border-[#1a2b3c] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] transition-all duration-300 hover:bg-[#1a2b3c] hover:text-white dark:border-[#c59f59] dark:text-[#c59f59] dark:hover:bg-[#c59f59] dark:hover:text-[#1a2b3c]">
              Télécharger la brochure
            </button>
            <button className="border border-[#c59f59] bg-[#c59f59] px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] transition-all duration-300 hover:bg-[#1a2b3c] hover:text-white">
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
