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
          ? 'bg-abyss/90 text-ecru dark:bg-abyss/90 dark:text-ecru'
          : 'bg-background-light/95 text-abyss dark:bg-background-dark/95 dark:text-ecru'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="flex justify-end gap-6 border-b border-primary/10 py-2 text-[10px] uppercase tracking-widest opacity-70">
          <a className="transition-colors hover:text-primary" href="#">Conférenciers</a>
          <a className="transition-colors hover:text-primary" href="#">Spécial groupes</a>
          <a className="transition-colors hover:text-primary" href="#">Visio conférences</a>
          <a className="transition-colors hover:text-primary" href="#">Newsletter</a>
          <a className="transition-colors hover:text-primary" href="#">Blog</a>
          <a className="transition-colors hover:text-primary" href="#">Livre d'or</a>
        </div>
        <div className="flex items-center justify-between py-5">
          <a className="group/logo flex items-center gap-4" href="/">
            <div className="size-9 text-primary">
              <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="serif-heading text-xl font-black tracking-[0.25em] leading-none">PLEIN CAP</h1>
              <span className="-mr-[0.45em] text-[7px] uppercase tracking-[0.45em] text-primary">Luxury Cultural Voyages</span>
            </div>
          </a>
          <div className="flex items-center gap-10">
            <nav className="hidden items-center gap-8 lg:flex">
              <a className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary" href="/catalogue">Croisières</a>
              <a className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary" href="#">Destinations</a>
              <a className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary" href="#">Nos bateaux</a>
              <a className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary" href="#">Inspiration Voyages</a>
              <a className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary" href="#">Esprit Plein Cap</a>
            </nav>
            <div className="mx-2 hidden h-8 w-[1px] bg-primary/20 lg:block" />
            <button className="sharp-edge bg-abyss px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
