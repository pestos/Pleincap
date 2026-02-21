'use client'

import { useMemo } from 'react'

type Train = any

type TrainCard = {
  name: string
  slug: string
  atmosphere: string
  capacity: string
  compartments: string
  image: string
}

function convertTrainsToCards(trains: Train[]): TrainCard[] {
  return trains.map((train) => ({
    name: train.name,
    slug: train.slug,
    atmosphere: 'Voyage ferroviaire d\'exception',
    capacity: train.capacity ? `${train.capacity} Passagers` : 'N/A',
    compartments: train.compartments?.length
      ? `${train.compartments.reduce((t: number, c: any) => t + (c.count || 0), 0)} compartiments`
      : 'N/A',
    image: train.featuredImage?.url || '',
  }))
}

type TrainsClientProps = {
  trains: Train[]
}

export default function TrainsClient({ trains }: TrainsClientProps) {
  const cards = useMemo(() => convertTrainsToCards(trains), [trains])

  return (
    <>
      <TrainGrid trains={cards} />
    </>
  )
}

type TrainGridProps = {
  trains: TrainCard[]
}

function TrainGrid({ trains }: TrainGridProps) {
  return (
      <section className="mx-auto max-w-[1440px] px-6 pb-32 lg:px-[120px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {trains.map((train) => (
                  <article
                      key={train.slug}
                      className="group flex flex-col border border-[#e7e0cf] bg-white"
                  >
                      <div className="relative aspect-[4/3] overflow-hidden">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{
                                  backgroundImage: `url('${train.image}')`,
                              }}
                              aria-label={train.name}
                          />
                      </div>
                      <div className="flex flex-grow flex-col p-10">
                          <h4 className="mb-4 text-3xl font-semibold leading-tight">
                              {train.name}
                          </h4>
                          <div className="mb-6 border-l-2 border-[#c5a050] pl-4 text-base italic text-[#1A2433]/60">
                              Atmosphere : &quot;{train.atmosphere}&quot;
                          </div>
                          <div className="mb-10 grid grid-cols-2 gap-6 border-y border-[#f3f0e7] py-6">
                              <Info
                                  label="Capacite"
                                  value={train.capacity}
                                  icon="groups"
                              />
                              <Info
                                  label="Compartiments"
                                  value={train.compartments}
                                  icon="train"
                              />
                          </div>
                          <div className="mt-auto">
                              <a
                                  href={`/nos-trains/${train.slug}`}
                                  className="block w-full border border-[#c5a050] px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#1A2433] transition-all hover:bg-[#c5a050] hover:text-[#1A2433]"
                              >
                                  Decouvrir le train
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
