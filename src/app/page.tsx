import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function Home() {
  return (
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
          <SiteHeader />

          {/* HERO */}
          <section className="relative flex h-screen w-full items-center justify-center overflow-hidden pt-20">
              <video
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://lh3.googleusercontent.com/aida-public/AB6AXuDkwXMqr9VAa6Kx29S1C5RuKoJl1XTOwEej31rQExdkmwztO7KkXwbVZPq8HuSP680oozhoCWAT7nlkY_qbyavo9GBLSTeeTuGSOgegazLsoLZq879rrQqRPfUlBqTZMTZh1U19nWkwccIH_a-7vxbDvmSawqW37npr4p-yNM4O7A3Dd4WHvpCCHOHvOut7FekRioDoD98VowzqNIB3wM577-59bE4mfdWlh8__Gv8bVDnbjqYsSWPNpBU6gYsrbyEay6sF8U5pRPA"
              >
                  <source
                      src="/travel%20video%20footage.mp4"
                      type="video/mp4"
                  />
              </video>

              <div
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{
                      backgroundImage:
                          "linear-gradient(rgba(26, 43, 60, 0.4), rgba(26, 43, 60, 0.4))",
                  }}
              />
          </section>

          {/* SEARCH BOX (OVERLAP HERO) */}
          <section className="relative z-20 -mt-12 w-full">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="flex flex-col items-end justify-between gap-8 border border-primary/30 bg-background-light p-6 shadow-2xl dark:bg-background-dark md:flex-row md:p-8">
                      <div className="grid w-full flex-1 grid-cols-1 gap-12 md:grid-cols-2">
                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                  Destination
                              </label>
                              <div className="flex items-center gap-3 border-b border-abyss/20 py-2">
                                  <span className="material-symbols-outlined text-sm">
                                      map
                                  </span>
                                  <input
                                      className="w-full border-none bg-transparent p-0 text-sm text-abyss focus:ring-0 dark:text-ecru"
                                      type="text"
                                      placeholder="Trouvez votre prochaine destination?"
                                  />
                              </div>
                          </div>

                          <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                  Dates
                              </label>
                              <div className="flex items-center gap-3 border-b border-abyss/20 py-2">
                                  <span className="material-symbols-outlined text-sm">
                                      calendar_month
                                  </span>
                                  <input
                                      className="w-full border-none bg-transparent p-0 text-sm text-abyss focus:ring-0 dark:text-ecru"
                                      type="text"
                                      placeholder="choisissez votre période"
                                  />
                              </div>
                          </div>
                      </div>

                      <div className="flex w-full items-center gap-8 md:w-auto">
                          <a
                              className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-abyss transition-colors hover:text-primary"
                              href="/catalogue"
                          >
                              Recherche avancée
                          </a>
                          <button className="sharp-edge w-full bg-abyss px-12 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 dark:bg-primary dark:text-white md:w-auto">
                              Rechercher
                          </button>
                      </div>
                  </div>
              </div>
          </section>

          {/* INTRO */}
          <section className="w-full pt-[120px]">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="flex flex-col items-center border-y border-primary/20 py-12 text-center">
                      <span className="mb-12 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                          L'esprit plein cap
                      </span>
                      <div className="max-w-5xl">
                          <p className="serif-heading drop-cap text-left text-3xl leading-relaxed text-abyss dark:text-ecru md:text-4xl">
                              Tour opérateur croisiériste spécialisé dans le
                              maritime et présent sur le marché francophone,
                              Plein Cap vous fait voguer sur les mers du Monde
                              depuis plus de 40 ans.
                          </p>
                          <p className="mt-8 text-right text-sm italic opacity-70">
                              — Jean-Paul Macocco
                          </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* GRID CATEGORIES */}
          <main className="w-full pb-20 pt-6">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="mb-16 w-full text-center md:mb-20">
                      <h3 className="serif-heading mb-6 text-5xl md:text-5xl">
                          Trouvez le voyage qui vous ressemble
                      </h3>
                      <p className="text-sm font-light leading-relaxed opacity-70">
                          Curated experiences across the world's most evocative
                          waterways. From the majestic Rhine to the hidden gems
                          of the Adriatic.
                      </p>
                  </div>

                  <div className="grid h-[800px] w-full grid-cols-12 gap-6">
                      <div className="group relative col-span-12 overflow-hidden md:col-span-7">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage:
                                      "linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('https://www.plein-cap.com/images/2026/celtique/shutterstock_1240921069.jpg')",
                              }}
                          />
                          <div className="absolute bottom-10 left-10 text-white">
                              <h4 className="serif-heading text-3xl">
                                  Croisiéres Maritimes
                              </h4>
                          </div>
                      </div>

                      <div className="group relative col-span-12 overflow-hidden md:col-span-5">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage:
                                      "linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('https://www.plein-cap.com/images/2026/train-autriche/shutterstock_2063740619.jpg')",
                              }}
                          />
                          <div className="absolute bottom-10 left-10 text-white">
                              <h4 className="serif-heading text-3xl">
                                  Voyages en train
                              </h4>
                          </div>
                      </div>

                      <div className="group relative col-span-12 overflow-hidden md:col-span-4">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage:
                                      "linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('https://www.plein-cap.com/images/stories/MsLadyDiletta/Lady-Diletta_08.jpg')",
                              }}
                          />
                          <div className="absolute bottom-10 left-10 text-white">
                              <h4 className="serif-heading text-3xl">
                                  Croisiéres fluviales
                              </h4>
                          </div>
                      </div>

                      <div className="group relative col-span-12 overflow-hidden md:col-span-4">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage:
                                      "linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('https://www.plein-cap.com/images/2026/dakar/shutterstock_597262751.jpg')",
                              }}
                          />
                          <div className="absolute bottom-10 left-10 text-white">
                              <h4 className="serif-heading text-3xl">
                                  Escapades culturelles
                              </h4>
                          </div>
                      </div>

                      <div className="group relative col-span-12 overflow-hidden md:col-span-4">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage:
                                      "linear-gradient(0deg, rgba(26, 43, 60, 0.7) 0%, transparent 40%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMDCtemCn76yZjscVkq4u5Qgo5cRM9GhYWf2ZlJL3kgJLYMpKt9wV9M9KlJMt-ghB6vH4AYI1RzB1tBHJweLEjmOCgEZjEbPHtF1mHHu7uAY5P8v-gKpOqS_AmG020A6-P8iof7MbF6GI8iMLr0jPJfHza1nCRgzgcPaTQqYg2qTd1B17-erUVunggF1tomGga-VM9O6JXCsBJ9sjwz3DrV1bivedTaCPmvsT_h2I4wutNvDVLENEDZ61KnCKRVHC7l34cbTae_aU')",
                              }}
                          />
                          <div className="absolute bottom-10 left-10 text-white">
                              <h4 className="serif-heading text-3xl">
                                  Conférenciers
                              </h4>
                          </div>
                      </div>
                  </div>
              </div>
          </main>

          {/* SELECTION */}
          <section className="bg-ecru py-[120px]">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
                      <div>
                          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                              Selection
                          </span>
                          <h3 className="serif-heading text-4xl md:text-5xl">
                              Les envies du moment
                          </h3>
                      </div>
                      <button className="border-b border-primary pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary">
                          Voir toutes les destinations
                      </button>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                      <div className="group cursor-pointer">
                          <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                              <img
                                  alt="Aegean Odyssey"
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  src="https://www.plein-cap.com/images/2026/odyssee/entete_odyssee_2026.jpg"
                              />
                              <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                                  printemps 2026
                              </div>
                          </div>

                          <div className="space-y-4">
                              <div className="flex items-start justify-between border-b border-abyss/10 pb-4">
                                  <div>
                                      <h4 className="serif-heading mb-1 text-2xl">
                                          Ms Hambourg
                                      </h4>
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">
                                          Athens to Istanbul | 12 Days
                                      </p>
                                  </div>
                                  <span className="font-medium text-primary">
                                      €8,450
                                  </span>
                              </div>
                              <p className="text-xs font-light leading-relaxed opacity-70">
                                  A deep dive into the cradle of civilization,
                                  exploring hidden bays and ancient ruins under
                                  the Mediterranean sun.
                              </p>
                              <button className="sharp-edge w-full border border-abyss/20 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all group-hover:bg-abyss group-hover:text-white">
                                  Decouvrir
                              </button>
                          </div>
                      </div>

                      <div className="group cursor-pointer">
                          <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                              <img
                                  alt="Baltic Heritage"
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  src="https://www.plein-cap.com/images/2026/capitales_baltes/entete_capitales_baltes.jpg"
                              />
                              <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                                  Été 2026
                              </div>
                          </div>

                          <div className="space-y-4">
                              <div className="flex items-start justify-between border-b border-abyss/10 pb-4">
                                  <div>
                                      <h4 className="serif-heading mb-1 text-2xl">
                                          Adriana
                                      </h4>
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">
                                          Stockholm to St. Petersburg | 10 Days
                                      </p>
                                  </div>
                                  <span className="font-medium text-primary">
                                      €7,900
                                  </span>
                              </div>
                              <p className="text-xs font-light leading-relaxed opacity-70">
                                  Witness the architecture of the Hanseatic
                                  League and the artistic splendor of the
                                  Northern capitals.
                              </p>
                              <button className="sharp-edge w-full border border-abyss/20 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all group-hover:bg-abyss group-hover:text-white">
                                  Découvrir
                              </button>
                          </div>
                      </div>

                      <div className="group cursor-pointer">
                          <div className="relative mb-6 aspect-[3/4] overflow-hidden">
                              <img
                                  alt="Nile Serenity"
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  src="https://www.plein-cap.com/images/2026/spitzberg_sh_diana/Monacobreen__SS_1672-1.jpg"
                              />
                              <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                                  Automne 2026
                              </div>
                          </div>

                          <div className="space-y-4">
                              <div className="flex items-start justify-between border-b border-abyss/10 pb-4">
                                  <div>
                                      <h4 className="serif-heading mb-1 text-2xl">
                                          SH Diana
                                      </h4>
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">
                                          Luxor to Aswan | 8 Days
                                      </p>
                                  </div>
                                  <span className="font-medium text-primary">
                                      €6,200
                                  </span>
                              </div>
                              <p className="text-xs font-light leading-relaxed opacity-70">
                                  Sail the timeless river on a private dahabiya,
                                  visiting temples at sunset and starlit desert
                                  camps.
                              </p>
                              <button className="sharp-edge w-full border border-abyss/20 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all group-hover:bg-abyss group-hover:text-white">
                                  Découvrir
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* TRUST MARKS */}
          <section className="border-t border-primary/10 bg-abyss py-32 text-ecru">
              <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-4 md:px-16">
                  <div className="flex flex-col items-center gap-6 text-center">
                      <div className="trust-mark">
                          <svg
                              className="h-12 w-12 text-[#C5A059]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                      </div>
                      <div className="space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                              Conférenciers
                          </h5>
                          <p className="text-[10px] leading-loose uppercase tracking-widest opacity-60">
                              à bord historiens et spécialistes culturels*
                          </p>
                      </div>
                  </div>

                  <div className="flex flex-col items-center gap-6 text-center">
                      <div className="trust-mark">
                          <svg
                              className="h-12 w-12 text-[#C5A059]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M12 5V1m0 0a4 4 0 014 4m-4-4a4 4 0 00-4 4m4 15v4m0 0a4 4 0 01-4-4m4 4a4 4 0 004-4m-4-11a3 3 0 110 6 3 3 0 010-6zM5 12H1m0 0a4 4 0 014 4m-4-4a4 4 0 004-4m14 4h4m0 0a4 4 0 01-4-4m4 4a4 4 0 00-4 4" />
                          </svg>
                      </div>
                      <div className="space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                              Petits Bateaux
                          </h5>
                          <p className="text-[10px] leading-loose uppercase tracking-widest opacity-60">
                              Max 500 guests for an intimate atmosphere
                          </p>
                      </div>
                  </div>

                  <div className="flex flex-col items-center gap-6 text-center">
                      <div className="trust-mark">
                          <svg
                              className="h-12 w-12 text-[#C5A059]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M18 8a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h10a3 3 0 013 3v1zm4 11a3 3 0 01-3 3H5a3 3 0 01-3-3v-1a3 3 0 013-3h14a3 3 0 013 3v1z" />
                              <path d="M7 11v6m5-6v6m5-6v6" />
                          </svg>
                      </div>
                      <div className="space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                              Cuisine du Monde
                          </h5>
                          <p className="text-[10px] leading-loose uppercase tracking-widest opacity-60">
                              Gourmet cuisine inspirée des saveurs locales
                          </p>
                      </div>
                  </div>

                  <div className="flex flex-col items-center gap-6 text-center">
                      <div className="trust-mark">
                          <svg
                              className="h-12 w-12 text-[#C5A059]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                      </div>
                      <div className="space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                              40 ans d'expérience
                          </h5>
                          <p className="text-[10px] leading-loose uppercase tracking-widest opacity-60">
                              Crafting extraordinary journeys since 1994
                          </p>
                      </div>
                  </div>
              </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="bg-ecru py-[120px]">
              <div className="mx-auto max-w-[1600px] px-6 md:px-16">
                  <div className="flex flex-col items-center text-center">
                      <span className="mb-16 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                          Ce que disent nos clients
                      </span>

                      <div className="relative mx-auto w-full max-w-6xl px-10 md:px-20">
                          <div className="mb-12">
                              <p className="serif-heading text-3xl leading-tight text-abyss md:text-5xl">
                                  "Un voyages exceptionnel qui a équilibré une
                                  profondeur culturelle enrichissante avec les
                                  plus raffinés niveaux de confort. Chaque port
                                  a ressemblé à une découverte privée."
                              </p>
                          </div>

                          <div className="flex flex-col items-center gap-2">
                              <div className="mb-2 h-[1px] w-10 bg-primary" />
                              <p className="font-serif text-sm italic opacity-70">
                                  — Madame Hélène de V., Paris
                              </p>
                          </div>

                          <button
                              aria-label="Previous"
                              className="absolute left-0 top-1/2 -translate-y-1/2 text-primary transition-transform hover:scale-110"
                          >
                              <span className="material-symbols-outlined text-4xl">
                                  chevron_left
                              </span>
                          </button>
                          <button
                              aria-label="Next"
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-primary transition-transform hover:scale-110"
                          >
                              <span className="material-symbols-outlined text-4xl">
                                  chevron_right
                              </span>
                          </button>
                      </div>

                      <div className="mt-16 flex gap-4">
                          <div className="size-1.5 rounded-full bg-primary" />
                          <div className="size-1.5 rounded-full bg-primary/20" />
                          <div className="size-1.5 rounded-full bg-primary/20" />
                      </div>
                  </div>
              </div>
          </section>

          <SiteFooter />
      </div>
  );
}
