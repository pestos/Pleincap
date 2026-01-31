'use client'

import { useEffect, useState } from 'react'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
          if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
      <header
          className={`fixed left-0 top-0 z-50 w-full border-b border-primary/20 backdrop-blur-md transition-colors duration-300 ${
              scrolled
                  ? "bg-abyss/90 text-ecru dark:bg-abyss/90 dark:text-ecru"
                  : "bg-background-light/95 text-abyss dark:bg-background-dark/95 dark:text-ecru"
          }`}
      >
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
              <div className="flex justify-end gap-4 lg:gap-6 border-b border-primary/10 py-2 text-[10px] uppercase tracking-widest opacity-70 max-[650px]:hidden">
                  <a
                      className="transition-colors hover:text-primary"
                      href="/nos-conferenciers"
                  >
                      Conférenciers
                  </a>
                  <a
                      className="transition-colors hover:text-primary"
                      href="/special-groupes"
                  >
                      Spécial groupes
                  </a>
                  <a className="transition-colors hover:text-primary" href="#">
                      Visio conférences
                  </a>
                  <a className="transition-colors hover:text-primary" href="#">
                      Newsletter
                  </a>
                  <a className="transition-colors hover:text-primary" href="#">
                      Blog
                  </a>
                  <a
                      className="transition-colors hover:text-primary"
                      href="/livre-d-or"
                  >
                      Livre d'or
                  </a>
              </div>
                <div className="relative flex flex-wrap items-center justify-between gap-4 py-5 max-lg:justify-center lg:flex-nowrap lg:gap-6">
                  <a className="group/logo flex items-center gap-4" href="/">
                      <div className="size-9 text-primary">
                          <svg
                              className="h-full w-full"
                              fill="none"
                              viewBox="0 0 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                  clipRule="evenodd"
                                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                              />
                          </svg>
                      </div>
                      <div className="flex flex-col whitespace-nowrap">
                          <h1 className="serif-heading text-xl font-black tracking-[0.22em] leading-none">
                              PLEIN CAP
                          </h1>
                          <span className="-mr-[0.2em] text-[8px] uppercase tracking-[0.38em] text-primary">
                              Luxury Cultural Voyages
                          </span>
                      </div>
                  </a>
                   <div className="flex items-center gap-4 lg:gap-8 max-[1700px]:gap-2.5 max-[1400px]:gap-2 max-[1200px]:gap-1.5">
                       <nav className="hidden items-center gap-5 lg:gap-7 xl:gap-8 lg:flex whitespace-nowrap max-[1700px]:gap-3.5 max-[1500px]:gap-3 max-[1400px]:gap-2.5 max-[1200px]:gap-2 max-[960px]:hidden">
                           <a
                               className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary max-[1700px]:text-[11.2px] max-[1700px]:tracking-[0.13em] max-[1500px]:text-[10.8px] max-[1500px]:tracking-[0.12em] max-[1400px]:text-[10.6px] max-[1400px]:tracking-[0.11em] max-[1300px]:text-[10.3px] max-[1300px]:tracking-[0.1em] max-[1200px]:text-[10px] max-[1200px]:tracking-[0.095em]"
                               href="/catalogue"
                           >
                               Croisières
                           </a>
                           <a
                               className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary max-[1700px]:text-[11.2px] max-[1700px]:tracking-[0.13em] max-[1500px]:text-[10.8px] max-[1500px]:tracking-[0.12em] max-[1400px]:text-[10.6px] max-[1400px]:tracking-[0.11em] max-[1300px]:text-[10.3px] max-[1300px]:tracking-[0.1em] max-[1200px]:text-[10px] max-[1200px]:tracking-[0.095em]"
                               href="/destinations"
                           >
                               Destinations
                           </a>
                           <a
                               className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary max-[1700px]:text-[11.2px] max-[1700px]:tracking-[0.13em] max-[1500px]:text-[10.8px] max-[1500px]:tracking-[0.12em] max-[1400px]:text-[10.6px] max-[1400px]:tracking-[0.11em] max-[1300px]:text-[10.3px] max-[1300px]:tracking-[0.1em] max-[1200px]:text-[10px] max-[1200px]:tracking-[0.095em]"
                               href="/nos-bateaux"
                           >
                               Nos bateaux
                           </a>
                           <a
                               className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary max-[1700px]:text-[11.2px] max-[1700px]:tracking-[0.13em] max-[1500px]:text-[10.8px] max-[1500px]:tracking-[0.12em] max-[1400px]:text-[10.6px] max-[1400px]:tracking-[0.11em] max-[1300px]:text-[10.3px] max-[1300px]:tracking-[0.1em] max-[1200px]:text-[10px] max-[1200px]:tracking-[0.095em]"
                               href="/escapades-culturelles"
                           >
                               Inspiration Voyages
                           </a>
                           <a
                               className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary max-[1700px]:text-[11.2px] max-[1700px]:tracking-[0.13em] max-[1500px]:text-[10.8px] max-[1500px]:tracking-[0.12em] max-[1400px]:text-[10.6px] max-[1400px]:tracking-[0.11em] max-[1300px]:text-[10.3px] max-[1300px]:tracking-[0.1em] max-[1200px]:text-[10px] max-[1200px]:tracking-[0.095em]"
                               href="/voyages-en-train"
                           >
                               Voyages en train
                           </a>
                           <div className="relative group">
                               <a
                                   className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary max-[1700px]:text-[11.2px] max-[1700px]:tracking-[0.13em] max-[1500px]:text-[10.8px] max-[1500px]:tracking-[0.12em] max-[1400px]:text-[10.6px] max-[1400px]:tracking-[0.11em] max-[1300px]:text-[10.3px] max-[1300px]:tracking-[0.1em] max-[1200px]:text-[10px] max-[1200px]:tracking-[0.095em]"
                                   href="#"
                               >
                                   Esprit Plein Cap
                              </a>
                              <div className="pointer-events-none absolute left-0 top-full w-56 translate-y-2 rounded-md bg-white opacity-0 shadow-xl ring-1 ring-primary/10 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100">
                                  <div className="flex flex-col py-3 text-sm font-semibold uppercase tracking-widest text-abyss">
                                      <a
                                          className="px-4 py-2 hover:bg-primary/10"
                                          href="/notre-histoire"
                                      >
                                          Notre histoire
                                      </a>
                                      <a
                                          className="px-4 py-2 hover:bg-primary/10"
                                          href="/equipe"
                                      >
                                          Équipe Plein Cap
                                      </a>
                                      <a
                                          className="px-4 py-2 hover:bg-primary/10"
                                          href="/nos-conferenciers"
                                      >
                                          Les conférenciers
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </nav>

                       <div className="mx-2 hidden h-8 w-[1px] bg-primary/20 lg:block" />
                       <button
                           className={`sharp-edge hidden whitespace-nowrap px-10 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all max-[1700px]:px-8 max-[1700px]:text-[10.5px] max-[1700px]:tracking-[0.14em] max-[1500px]:px-7 max-[1500px]:text-[10px] max-[1500px]:tracking-[0.12em] max-[1400px]:px-6.5 max-[1400px]:text-[9.8px] max-[1400px]:tracking-[0.11em] max-[1300px]:px-6 max-[1300px]:text-[9.5px] max-[1300px]:tracking-[0.105em] max-[1200px]:px-5.5 max-[1200px]:text-[9.2px] max-[1200px]:tracking-[0.1em] ${
                               scrolled
                                   ? "bg-primary"
                                   : "bg-abyss hover:bg-primary"
                           } lg:inline-flex`}
                       >
                           Nous contacter
                       </button>

                       <button
                           aria-label={
                               menuOpen ? "Fermer le menu" : "Ouvrir le menu"
                           }
                           className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 text-abyss transition-colors hover:bg-primary/10 lg:hidden max-lg:absolute max-lg:left-0"
                           onClick={() => setMenuOpen((open) => !open)}
                       >
                          <span className="material-symbols-outlined text-2xl">
                              {menuOpen ? "close" : "menu"}
                          </span>
                      </button>
                  </div>
              </div>
          </div>

          {menuOpen && (
              <div className="border-t border-primary/10 bg-background-light/95 px-6 py-6 text-abyss shadow-lg backdrop-blur lg:hidden">
                  <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-widest">
                      <a
                          className="transition-colors hover:text-primary"
                          href="/catalogue"
                      >
                          Croisières
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="/destinations"
                      >
                          Destinations
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="/nos-bateaux"
                      >
                          Nos bateaux
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="/escapades-culturelles"
                      >
                          Inspiration Voyages
                      </a>
                       <a
                            className="transition-colors hover:text-primary"
                            href="/voyages-en-train"
                        >
                            Voyages en train
                        </a>
                        <a className="transition-colors hover:text-primary" href="/nos-conferenciers">
                            Conférenciers
                        </a>
                        <a className="transition-colors hover:text-primary" href="/special-groupes">
                            Spécial groupes
                        </a>
                        <a className="transition-colors hover:text-primary" href="#">
                            Visio conférences
                        </a>
                        <a className="transition-colors hover:text-primary" href="#">
                            Blog
                        </a>
                        <a className="transition-colors hover:text-primary" href="/livre-d-or">
                            Livre d'or
                        </a>
                        <div className="h-px w-full bg-primary/10" />
                        <a
                            className="transition-colors hover:text-primary"
                            href="/notre-histoire"
                      >
                          Notre histoire
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="/equipe"
                      >
                          Équipe Plein Cap
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="/nos-conferenciers"
                      >
                          Les conférenciers
                      </a>
                  </nav>

                  <div className="mt-6 flex flex-col gap-4">
                      <a
                          className="text-xs font-bold uppercase tracking-[0.18em] text-primary underline-offset-4 transition-colors hover:text-abyss"
                          href="/news-letter"
                      >
                          Newsletter
                      </a>
                      <button className="sharp-edge w-full bg-primary px-10 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:brightness-95">
                          Nous contacter
                      </button>
                  </div>
              </div>
          )}
      </header>
  );
}
