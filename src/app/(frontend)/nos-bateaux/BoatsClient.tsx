'use client'

import { useMemo, useState } from 'react'

type Boat = any

type Ship = {
  name: string
  slug: string
  atmosphere: string
  capacity: string
  decks: string
  image: string
}

// Convert CMS boats to Ship format
function convertBoatsToShips(boats: Boat[]): Ship[] {
  return boats.map((boat) => ({
    name: boat.name,
    slug: boat.slug,
    atmosphere: 'Navigation d\'exception', // Placeholder since description is richText
    capacity: boat.capacity ? `${boat.capacity} Passagers` : 'N/A',
    decks: 'N/A', // Not available in CMS
    image: boat.featuredImage?.url || '',
  }))
}

type BoatsClientProps = {
  boats: Boat[]
}

export default function BoatsClient({ boats }: BoatsClientProps) {
  const ships = useMemo(() => convertBoatsToShips(boats), [boats])

  return (
    <>
      <ShipGrid ships={ships} />
    </>
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
                      key={ship.slug}
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
                                  href={`/nos-bateaux/${ship.slug}`}
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
