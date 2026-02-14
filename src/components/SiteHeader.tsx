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
                  <a
                      className="transition-colors hover:text-primary"
                      href="/visioconference"
                  >
                      Visio conférences
                  </a>
                  <a
                      className="transition-colors hover:text-primary"
                      href="/news-letter"
                  >
                      Newsletter
                  </a>
                  <a
                      className="transition-colors hover:text-primary"
                      href="/blog"
                  >
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
                      <div className="size-12 text-primary">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 375 375"
                              className="h-full w-full"
                              role="img"
                              aria-label="Plein Cap"
                          >
                              <defs>
                                  <clipPath id="pc-logo-a">
                                      <path
                                          d="M 0 0 L 375 0 L 375 276 L 0 276 Z M 0 0 "
                                          clipRule="nonzero"
                                      />
                                  </clipPath>
                                  <clipPath id="pc-logo-b">
                                      <path
                                          d="M 0 322.089844 L 375 322.089844 L 375 372.976562 L 0 372.976562 Z M 0 322.089844 "
                                          clipRule="nonzero"
                                      />
                                  </clipPath>
                                  <clipPath id="pc-logo-c">
                                      <path
                                          d="M 29.550781 29.582031 L 345 29.582031 L 345 345 L 29.550781 345 Z M 29.550781 29.582031 "
                                          clipRule="nonzero"
                                      />
                                  </clipPath>
                              </defs>
                              <g clipPath="url(#pc-logo-a)">
                                  <path
                                      fill="#c5a059"
                                      d="M 187.4375 375 C 84.136719 375 0 290.863281 0 187.4375 C 0 84.011719 84.136719 0 187.4375 0 C 290.734375 0 374.875 84.136719 374.875 187.4375 C 375 290.863281 290.863281 375 187.4375 375 Z M 187.4375 3.171875 C 85.785156 3.171875 3.171875 85.785156 3.171875 187.4375 C 3.171875 289.085938 85.914062 371.828125 187.4375 371.828125 C 288.960938 371.828125 371.828125 289.085938 371.828125 187.4375 C 371.828125 85.785156 289.085938 3.171875 187.4375 3.171875 Z"
                                  />
                              </g>
                              <g clipPath="url(#pc-logo-b)">
                                  <path
                                      fill="#c5a059"
                                      d="M 187.4375 372.976562 C 84.136719 372.976562 0 288.839844 0 185.410156 C 0 81.984375 84.136719 -2.023438 187.4375 -2.023438 C 290.734375 -2.023438 374.875 82.113281 374.875 185.410156 C 375 288.839844 290.863281 372.976562 187.4375 372.976562 Z M 187.4375 1.148438 C 85.785156 1.148438 3.171875 83.761719 3.171875 185.410156 C 3.171875 287.0625 85.914062 369.800781 187.4375 369.800781 C 288.960938 369.800781 371.828125 287.0625 371.828125 185.410156 C 371.828125 83.761719 289.085938 1.148438 187.4375 1.148438 Z"
                                  />
                              </g>
                              <g clipPath="url(#pc-logo-c)">
                                  <path
                                      fill="#c5a059"
                                      d="M 188.40625 344.089844 C 103.152344 344.089844 33.714844 275.171875 32.808594 190.113281 L 49.792969 190.113281 C 50.648438 266.054688 112.457031 327.171875 188.40625 327.164062 C 189.300781 327.164062 190.027344 326.4375 190.027344 325.546875 C 190.027344 324.648438 189.300781 323.925781 188.40625 323.925781 C 114.300781 323.925781 53.878906 264.082031 53.035156 190.113281 L 173.882812 190.113281 C 174.632812 196.902344 179.992188 202.261719 186.785156 203.011719 L 186.785156 254.425781 L 167.660156 273.484375 C 166.941406 274.019531 166.796875 275.035156 167.335938 275.753906 C 167.871094 276.46875 168.886719 276.613281 169.605469 276.078125 C 169.726562 275.988281 169.835938 275.878906 169.929688 275.753906 L 186.71875 258.964844 L 186.71875 272.316406 L 167.660156 291.441406 C 166.941406 291.980469 166.796875 292.996094 167.335938 293.710938 C 167.871094 294.429688 168.886719 294.574219 169.605469 294.035156 C 169.726562 293.945312 169.835938 293.835938 169.929688 293.710938 L 186.71875 276.921875 L 186.71875 290.277344 L 167.660156 309.335938 C 166.941406 309.875 166.796875 310.890625 167.335938 311.605469 C 167.871094 312.324219 168.886719 312.46875 169.605469 311.929688 C 169.726562 311.839844 169.835938 311.726562 169.929688 311.605469 L 186.71875 294.816406 L 186.71875 303.957031 C 186.71875 304.847656 187.445312 305.578125 188.339844 305.578125 C 189.234375 305.578125 189.960938 304.847656 189.960938 303.957031 L 189.960938 294.878906 L 206.816406 311.671875 C 207.535156 312.207031 208.550781 312.0625 209.085938 311.347656 C 209.519531 310.769531 209.519531 309.976562 209.085938 309.402344 L 190.027344 290.277344 L 190.027344 276.921875 L 206.816406 293.710938 C 207.535156 294.25 208.550781 294.105469 209.085938 293.386719 C 209.519531 292.8125 209.519531 292.019531 209.085938 291.441406 L 189.960938 272.316406 L 189.960938 258.964844 L 206.753906 275.753906 C 207.46875 276.289062 208.484375 276.144531 209.023438 275.429688 C 209.453125 274.855469 209.453125 274.0625 209.023438 273.484375 L 189.898438 254.359375 L 189.898438 203.011719 C 192.886719 202.664062 195.695312 201.398438 197.933594 199.382812 L 262.574219 257.539062 C 255.625 265.035156 247.578125 271.441406 238.714844 276.53125 C 237.898438 276.902344 237.535156 277.859375 237.90625 278.675781 C 238.277344 279.492188 239.234375 279.855469 240.050781 279.488281 C 240.148438 279.441406 240.246094 279.386719 240.335938 279.320312 C 249.496094 274.054688 257.796875 267.433594 264.972656 259.675781 L 302.769531 293.710938 C 273.390625 325.785156 231.902344 344.0625 188.40625 344.089844 Z M 202.925781 190.113281 L 289.867188 190.113281 C 289.457031 214.050781 280.617188 237.074219 264.90625 255.136719 L 200.269531 196.984375 C 201.730469 194.960938 202.648438 192.589844 202.925781 190.113281 Z M 190.027344 177.273438 C 196.222656 178.21875 200.476562 184.007812 199.53125 190.199219 C 198.785156 195.105469 194.933594 198.957031 190.027344 199.707031 Z M 188.40625 100.253906 C 187.507812 100.253906 186.785156 100.976562 186.785156 101.875 L 186.785156 137.597656 L 172.585938 119.378906 L 188.40625 73.996094 L 204.222656 119.445312 L 190.027344 137.660156 L 190.027344 101.875 C 190.027344 100.976562 189.300781 100.253906 188.40625 100.253906 Z M 186.785156 177.273438 L 186.785156 199.707031 C 180.589844 198.761719 176.335938 192.972656 177.28125 186.777344 C 178.027344 181.875 181.878906 178.023438 186.785156 177.273438 Z M 32.808594 186.871094 C 33.164062 149.550781 46.976562 113.617188 71.707031 85.667969 L 109.503906 119.703125 C 93.265625 138.355469 84.128906 162.140625 83.703125 186.871094 Z M 86.945312 186.871094 C 87.351562 162.929688 96.191406 139.90625 111.902344 121.84375 L 176.539062 179.996094 C 175.078125 182.019531 174.164062 184.386719 173.882812 186.871094 Z M 305.101562 291.3125 L 267.304688 257.277344 C 283.5625 238.605469 292.699219 214.796875 293.109375 190.046875 L 344.003906 190.046875 C 343.664062 227.386719 329.847656 263.347656 305.101562 291.3125 Z M 188.40625 32.894531 C 273.660156 32.894531 343.097656 101.808594 344.003906 186.871094 L 327.015625 186.871094 C 326.164062 110.925781 264.355469 49.808594 188.40625 49.8125 C 187.507812 49.8125 186.785156 50.539062 186.785156 51.433594 C 186.785156 52.328125 187.507812 53.054688 188.40625 53.054688 C 262.507812 53.054688 322.933594 112.894531 323.773438 186.871094 L 202.925781 186.871094 C 202.179688 180.078125 196.820312 174.71875 190.027344 173.96875 L 190.027344 142.847656 L 207.273438 120.675781 C 207.621094 120.238281 207.722656 119.648438 207.53125 119.121094 L 189.960938 68.484375 C 189.65625 67.644531 188.726562 67.210938 187.882812 67.515625 C 187.433594 67.679688 187.078125 68.035156 186.914062 68.484375 L 169.28125 119.183594 C 169.089844 119.714844 169.1875 120.300781 169.539062 120.742188 L 186.785156 142.914062 L 186.785156 174.03125 C 183.792969 174.378906 180.984375 175.648438 178.746094 177.664062 L 114.105469 119.507812 C 121.054688 112.007812 129.097656 105.605469 137.964844 100.511719 C 138.78125 100.144531 139.144531 99.183594 138.777344 98.367188 C 138.40625 97.550781 137.445312 97.191406 136.632812 97.558594 C 136.53125 97.605469 136.4375 97.660156 136.34375 97.726562 C 127.1875 102.992188 118.882812 109.613281 111.707031 117.367188 L 73.910156 83.269531 C 103.320312 51.160156 144.863281 32.882812 188.40625 32.894531 Z M 188.40625 29.652344 C 100.683594 29.679688 29.589844 100.820312 29.621094 188.542969 C 29.636719 230.636719 46.359375 271.003906 76.117188 300.78125 C 139.484375 361.441406 240.03125 359.25 300.695312 295.882812 C 359.496094 234.457031 359.496094 137.625 300.695312 76.199219 C 270.984375 46.3125 230.550781 29.550781 188.40625 29.652344"
                                  />
                              </g>
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
                      <a
                          className="transition-colors hover:text-primary"
                          href="#"
                      >
                          Visio conférences
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="#"
                      >
                          Blog
                      </a>
                      <a
                          className="transition-colors hover:text-primary"
                          href="/livre-d-or"
                      >
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
