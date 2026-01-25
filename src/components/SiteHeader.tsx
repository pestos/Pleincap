'use client'

import { useEffect, useState } from 'react'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
      <header
          className={`fixed left-0 top-0 z-50 w-full border-b border-primary/20 backdrop-blur-md transition-colors duration-300 ${
              scrolled
                  ? "bg-abyss/90 text-ecru dark:bg-abyss/90 dark:text-ecru"
                  : "bg-background-light/95 text-abyss dark:bg-background-dark/95 dark:text-ecru"
          }`}
      >
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
              <div className="flex justify-end gap-4 lg:gap-6 border-b border-primary/10 py-2 text-[10px] uppercase tracking-widest opacity-70">
                  <a
                      className="transition-colors hover:text-primary"
                      href="/nos-conferenciers"
                  >
                      Conférenciers
                  </a>
                  <a className="transition-colors hover:text-primary" href="#">
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
              <div className="flex items-center justify-between py-5 gap-6">
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
                      <div className="flex flex-col">
                          <h1 className="serif-heading text-xl font-black tracking-[0.25em] leading-none">
                              PLEIN CAP
                          </h1>
                          <span className="-mr-[0.45em] text-[7px] uppercase tracking-[0.45em] text-primary">
                              Luxury Cultural Voyages
                          </span>
                      </div>
                  </a>
                  <div className="flex items-center gap-6 lg:gap-10">
                      <nav className="hidden items-center gap-6 lg:gap-8 xl:gap-10 lg:flex">
                          <a
                              className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary"
                              href="/catalogue"
                          >
                              Croisières
                          </a>
                          <a
                              className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary"
                              href="/destinations"
                          >
                              Destinations
                          </a>
                          <a
                              className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary"
                              href="/nos-bateaux"
                          >
                              Nos bateaux
                          </a>
                          <a
                              className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary"
                              href="/escapades-culturelles"
                          >
                              Inspiration Voyages
                          </a>
                          <a
                              className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary"
                              href="#"
                          >
                              Voyages en train
                          </a>
                           <div className="relative group">
                               <a
                                   className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary"
                                   href="#"
                               >
                                   Esprit Plein Cap
                               </a>
                               <div className="pointer-events-none absolute left-0 top-full w-56 translate-y-2 rounded-md bg-white opacity-0 shadow-xl ring-1 ring-primary/10 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100">
                                   <div className="flex flex-col py-3 text-sm font-semibold uppercase tracking-widest text-abyss">
                                       <a className="px-4 py-2 hover:bg-primary/10" href="/notre-histoire">
                                           Notre histoire
                                       </a>
                                       <a className="px-4 py-2 hover:bg-primary/10" href="/equipe">
                                           Équipe Plein Cap
                                       </a>
                                       <a className="px-4 py-2 hover:bg-primary/10" href="/nos-conferenciers">
                                           Les conférenciers
                                       </a>
                                   </div>
                               </div>
                           </div>

                      </nav>
                      <div className="mx-2 hidden h-8 w-[1px] bg-primary/20 lg:block" />
                      <button className="sharp-edge bg-abyss px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary">
                          Nous contacter
                      </button>
                  </div>
              </div>
          </div>
      </header>
  );
}
