'use client'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import EscapadesIntro from '@/components/EscapadesIntro'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useMemo, useState } from 'react'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

type Ship = {
  name: string
  tag: 'Fluvial' | 'Maritime'
  atmosphere: string
  capacity: string
  decks: string
  image: string
}

const ships: Ship[] = [
    {
        name: "M/S Amadeus Diamond",
        tag: "Fluvial",
        atmosphere:
            "Un bijou d'élégance sur les rives de la Seine, alliant raffinement autrichien et art de vivre à la française.",
        capacity: "144 Passagers",
        decks: "4 Ponts passagers",
        image: "https://www.taoticket.fr/assets/images/navi/luftner-cruises-ms-amadeus-diamond-01-VQuun-6.webp",
    },
    {
        name: "M/S Nile Excellence",
        tag: "Fluvial",
        atmosphere:
            "Le privilège de naviguer sur le Nil à bord d'une unité de grand luxe, conçue pour l'immersion historique.",
        capacity: "60 Passagers",
        decks: "5 Ponts",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3YGeIf8cqI0uTrdiAUiF_kLU-TtWs4haeWdAKQbtZ5BGNkVFZ96FOJjleHPw7WEMR8NLUldDpoWiGtrMJioNyMKkQPAShXEFebnm6Em-DdGEAH1W74W8d9E6bryB0tM05bYcSP6WrWsOohf8hHOkkG8-MgT4bsK_byM7M985jq2MChRx5S_NvItSSjuakxiAavOxiMP4vgmnPqJm02u5aOghsJiG1Ufr-gm43nTrA9OaNFPFr6JOiojJk39l303tI8aPykNESDzQ",
    },
    {
        name: "SH Diana",
        tag: "Maritime",
        atmosphere:
            "Un yacht de charme pour explorer l'Adriatique, privilégiant la proximité avec la mer et les escales inédites.",
        capacity: "50 Passagers",
        decks: "3 Ponts",
        image: "https://www.plein-cap.com/images/stories/ShDiana/sh_diana_01.jpg",
    },
    {
        name: "M/S Hamburg",
        tag: "Fluvial",
        atmosphere:
            "Le Douro révélé avec majesté. Un navire aux finitions précieuses pour une navigation contemplative.",
        capacity: "118 Passagers",
        decks: "4 Ponts",
        image: "https://www.plein-cap.com/images/stories/MsHamburg/ms-hamburg.jpg",
    },
];

export default function NosBateauxPage() {
  const [activeTag, setActiveTag] = useState<'Fluvial' | 'Maritime' | 'Tous'>('Tous')
  const filteredShips = useMemo(() => {
    if (activeTag === 'Tous') return ships
    return ships.filter((ship) => ship.tag === activeTag)
  }, [activeTag])

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f8f7f6] text-[#1A2433]`}>
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">
        <EscapadesIntro
          eyebrow="L'Exclusivité des Petits Navires"
          title="Nos bateaux"
          description="Nos navires à taille humaine vous ouvrent les portes de ports confidentiels et de paysages grandioses inaccessibles aux géants des mers. À bord de la flotte Plein Cap, chaque traversée est une invitation à la sérénité, portée par un service d'exception et une atmosphère feutrée."
          edition=""
        />
        <CategoryTabs activeTag={activeTag} onSelect={setActiveTag} />
        <ShipGrid ships={filteredShips} />
        <Philosophy />
      </main>
      <SiteFooter />
    </div>
  )
}


type CategoryTabsProps = {
  activeTag: 'Tous' | 'Fluvial' | 'Maritime'
  onSelect: (tag: 'Tous' | 'Fluvial' | 'Maritime') => void
}

function CategoryTabs({ activeTag, onSelect }: CategoryTabsProps) {
  const tabs: Array<{ label: string; value: 'Tous' | 'Fluvial' | 'Maritime' }> = [
    { label: 'Tous', value: 'Tous' },
    { label: 'Croisières Fluviales', value: 'Fluvial' },
    { label: 'Croisières Maritimes', value: 'Maritime' },
  ]

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-[120px]">
      <div className="flex justify-center border-b border-[#e7e0cf]">
        <div className="flex gap-8 md:gap-12">
          {tabs.map((tab) => {
            const active = activeTag === tab.value
            return (
                <button
                    key={tab.value}
                    type="button"
                    onClick={() => onSelect(tab.value)}
                    className={`flex flex-col items-center border-b-2 pb-4 transition-all ${
                        active
                            ? "border-[#c5a050]"
                            : "border-transparent hover:border-[#c5a050]/50"
                    }`}
                >
                    <span
                        className={`text-sm font-bold uppercase tracking-widest ${
                            active ? "text-[#1A2433]" : "text-[#1A2433]/50"
                        }`}
                    >
                        {tab.label}
                    </span>
                </button>
            );
          })}
        </div>
      </div>
    </section>
  )
}

type ShipGridProps = {
  ships: Ship[]
}

function ShipGrid({ ships }: ShipGridProps) {
  return (
      <section className="mx-auto max-w-[1440px] px-6 pb-32 lg:px-[120px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {ships.map((ship) => (
                  <article
                      key={ship.name}
                      className="group flex flex-col border border-[#e7e0cf] bg-white"
                  >
                      <div className="relative aspect-[4/3] overflow-hidden">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage: `url('${ship.image}')`,
                              }}
                              aria-label={ship.name}
                          />
                          <div className="absolute left-4 top-4 bg-[white] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1A2433]">
                              {ship.tag}
                          </div>
                      </div>
                      <div className="flex flex-grow flex-col p-10">
                          <h4 className="mb-4 text-3xl font-semibold leading-tight">
                              {ship.name}
                          </h4>
                          <div className="mb-6 border-l-2 border-[#c5a050] pl-4 text-base italic text-[#1A2433]/60">
                              Atmosphère : "{ship.atmosphere}"
                          </div>
                          <div className="mb-10 grid grid-cols-2 gap-6 border-y border-[#f3f0e7] py-6">
                              <Info
                                  label="Capacité"
                                  value={ship.capacity}
                                  icon="groups"
                              />
                              <Info
                                  label="Ponts"
                                  value={ship.decks}
                                  icon="layers"
                              />
                          </div>
                          <div className="mt-auto">
                              <a
                                  href={`/nos-bateaux/${ship.name
                                      .toLowerCase()
                                      .replace(/[^a-z0-9]+/g, "-")
                                      .replace(/^-+|-+$/g, "")
                                      .replace(/^(m-s-|ms-)/, "")}`}
                                  className="block w-full border border-[#c5a050] px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#1A2433] transition-all hover:bg-[#c5a050] hover:text-[#1A2433]"
                              >
                                  Découvrir le navire
                              </a>
                          </div>
                      </div>
                  </article>
              ))}
          </div>
      </section>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
      <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#c5a050]">
              {icon}
          </span>
          <div>
              <p className="text-[10px] uppercase tracking-widest text-[#1A2433]/50">
                  {label}
              </p>
              <p className="text-sm font-bold">{value}</p>
          </div>
      </div>
  );
}

function Philosophy() {
  return (
      <section className="bg-[#1A2433] py-24 text-white">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-[120px]">
              <div className="flex flex-col items-center gap-16 md:flex-row">
                  <div className="flex-1 space-y-4">
                      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a050]">
                          Notre Art de Vivre
                      </h2>
                      <h3 className="text-4xl font-semibold leading-tight">
                          Plus qu'une croisière, une parenthèse enchantée.
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                          À bord de Plein Cap, chaque détail est pensé pour
                          votre confort. De la gastronomie inspirée des terroirs
                          visités aux conférences de nos experts, nous cultivons
                          une approche humaniste du voyage.
                      </p>
                      <a
                          href="#"
                          className="inline-block border-b border-[#c5a050] pb-1 text-sm font-bold uppercase tracking-widest text-[#c5a050] transition-all hover:border-white hover:text-white"
                      >
                          En savoir plus sur notre philosophie
                      </a>
                  </div>
                  <div className="flex-1">
                      <div
                          className="relative aspect-video overflow-hidden border border-white/10"
                          style={{
                              backgroundImage:
                                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXkSnuIRHgG9TI6-m4PZmR-bIQ8SzGDCSnd_f3ciai0XorRgrmpRXPEmG5Gy2nunOu6rYHFab-c11xocxMwd3Dd73x0wVJA9wu2CZu37BBMqK2XAsTlUUOz9GcjHy15zpy5R2GnTyLRbrtT5QkF6Avm90OA7f9QKWvijfp_iDL4xvj9KlhHNf0pFtgiFU3NaAkCltMUM5RsiyahdmGt5_5GwAnOBnYtBU--rdoSS_e_-m2ccPSKZcl9CJbWcwsIFBisxEa8ApNOAs')",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                          }}
                          aria-label="Cabine avec vue panoramique sur la mer"
                      />
                  </div>
              </div>
          </div>
      </section>
  );
}
