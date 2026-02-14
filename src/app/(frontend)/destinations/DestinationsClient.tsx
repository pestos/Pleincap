'use client'

import { useMemo, useState } from 'react'

type Continent = 'Europe' | 'Afrique' | 'Asie' | 'Amériques' | 'Océanie'

type Region = {
  area: string
  title: string
  itineraries: number
  image: string
  continent: Continent
}

const continents: Continent[] = ['Europe', 'Afrique', 'Asie', 'Amériques', 'Océanie']

const continentCopy: Record<Continent, { title: string; description: string }> = {
  Europe: {
    title: "L'Europe Millénaire",
    description: 'Le berceau des arts et de la civilisation.',
  },
  Afrique: {
    title: "L'Afrique Originelle",
    description: 'Terres de légendes, de cultures et de paysages majestueux.',
  },
  Asie: {
    title: "L'Asie Impériale",
    description: 'Rituels ancestraux et capitales vibrantes à découvrir.',
  },
  Amériques: {
    title: 'Les Amériques Sauvages',
    description: 'Des fjords polaires aux déserts mythiques, l’aventure grandeur nature.',
  },
  Océanie: {
    title: "L'Océanie Infinie",
    description: 'Archipels secrets et horizons sans fin entre mer et désert.',
  },
}

const regions: Region[] = [
  {
    area: 'Méditerranée',
    title: 'Grèce & Îles',
    itineraries: 14,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMo_HmN41PISMYRq0nxhlCCENBAmgXLvzndycbKf3lzTzpNMYcq-L0MnecJcb4KBkQJM_bNyCyF8TqM7-Ip6_I3Edfj-AUGOgG9EUL1DTpc1ZsgO9zPqOPqHsf9kxnDMMpgj9pRi3FfkizMRz3F2gcsUK4uU7hkn7H3eROTHSzDpgjA0yCcUAzO6OHpnh7-YFUWVetSopNDKWjW0eyIWnwd-tr-QiOx86sgdRTQRx2DMvkvGWHXfRB-FhG1WZwC7OhM9enBAYvUSo',
    continent: 'Europe',
  },
  {
    area: 'Méditerranée Centrale',
    title: 'Italie & Sicile',
    itineraries: 8,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkHdPyCgkyoQSEzDREtGB62rsjK_xNjmUKcQ0bCi8t5PFCmO3k17K5DpRerfPSB99NsVcq_7NPCzssgZ154qrdJMvKIUkZkjcPfpZiIsQIjWrQGM8O-DHVkZER6bE_TsrIoWBU_u7AQybSw3zH2KnXn3ONVRLxTKAzjVZvkPmCBuBNttdS0kmJlNJd4SJd6qd8OelLnqmKqgOwcffrwsBjlPB90TMhe5g3A-lkytmkxNof7m6z92UiA5J95hFSnh5ycvbyoWj-A9Q',
    continent: 'Europe',
  },
  {
    area: 'Europe du Nord',
    title: 'Fjords Norvégiens',
    itineraries: 6,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1J_yZhAd-GR1343o0IekwbT_-B7ietBaL24lQKfghmRKPZrOEPkchBdFSm165CVV69Uszo8E-c9Vj836kTzTjERtsAqP_2g4MGPQRW1dmpAexxVxWVezqeGri-0xmshRJkZtAMnOTXhTfmyTQDiomizCKKgjlDsaCjE23cSLUy2d5sBwIMZhCqQ6_g2TxXZpmIX9u6vTTXKxArbDymG6Fo7DUuQqLxSUHjLKcPRzBGIjD8O44wDabthYGCDw0Sx5eQlNwYnffnBw',
    continent: 'Europe',
  },
  {
    area: 'Amériques',
    title: 'Patagonie & Andes',
    itineraries: 7,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGEQCJ-v36Y9Sf8ywHDFmMcCJr3GIID0ETJjmfNnOLSzThzJbXfbce3lBqlM5KX33QFIxy2YAFj0QpnazhvukmDmm15IUHuBDfxVUZTMrWfIOeUa-frchlZ1Omk-9N_9ivDJbAzPkHMwMG6Rt6O7a5ozALaHG9g1__TJ37dO2qI1nH65dwaKw9IiRIG6YOCNiD9qSfHZDzhmkluU5x3lIUhdls5vG3h9yNGk28SgCdOBFftTthxODEf2z8i1qxqZ6XK3jGYddCbcg',
    continent: 'Amériques',
  },
  {
    area: 'Asie Pacifique',
    title: 'Japon & Corée',
    itineraries: 9,
    image:
      'https://static.service-voyages.com/mobile/croisiere/images/fr/escales/escale,hong%20kong-hong%20kong_zoom,HK,HKG,38652.jpg',
    continent: 'Asie',
  },
  {
    area: 'Afrique Australe',
    title: 'Namibie & Cap',
    itineraries: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8njPqwi3fRZJZgttqk2WI4HWK15cZJBIIorzwoBhv7iFLfIlOgP_d3e6iKigmQWaLSfKgu0OwrHOlPhqgWBbciIN779zUehBjRpvKsjkdkJlK-htTKdiq09U2NDcdufEi-d34gMRwA_Qz9BfT64uwhPII22qq4NUO2CEzOG3KCnvqcRCPbSpWGYKMu2zQEH8DdiZYY8awG6NeI3W6Kb5tFY0hcp7eDbHolwybuXCjNn-W0-TXvSJucgBBTYT-mE3NNfp7Q1J3RKU',
    continent: 'Afrique',
  },
  {
    area: 'Océanie',
    title: 'Déserts Rouges & Top End',
    itineraries: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWTPnrfH8kjDHN344CaNdEDz8DKBdGfxNQZXMkjrtw78ejl2Lgf0SJBKmDBhkU15sHrD6C0bCM0RSvVuWd-k0MCIwdIT_8_WJmCfyXiJZby7n-hPLbOuDSAPejm5b8BT6CNbgVS0S2IndeOenwU1n1phCGcKTXuN262JIUvAF7YbGce4aaLhlwn063iXDK1PQrb_vavqnDsdZ75QZjrtm5nbNGVbbSRdA5U_2QClfUxu777ZbIVSO3N-Xt04piO8a987QY7NRsW40',
    continent: 'Océanie',
  },
]

export default function DestinationsClient() {
  const [activeContinent, setActiveContinent] = useState<Continent>('Europe')
  const filteredRegions = useMemo(
    () => regions.filter((region) => region.continent === activeContinent),
    [activeContinent]
  )
  const continentDetails = continentCopy[activeContinent]

  return (
    <>
      <div className="sticky top-[73px] z-40 border-b border-[#c5a050]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-[1440px] px-4 py-8">
          <h4 className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a050]">
            Choisissez un continent
          </h4>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
            {continents.map((continent) => (
              <Tab
                key={continent}
                label={continent}
                active={continent === activeContinent}
                onClick={() => setActiveContinent(continent)}
              />
            ))}
          </div>
        </div>
      </div>
      <section className="bg-[#F9F8F6] px-6 pb-24 pt-24 lg:px-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold">{continentDetails.title}</h3>
              <p className="mt-2 text-[#0A1128]/60">{continentDetails.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-[#c5a050]/30 p-2 hover:bg-[#c5a050]/10">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="rounded-full border border-[#c5a050]/30 p-2 hover:bg-[#c5a050]/10">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredRegions.map((region) => (
              <article key={region.title} className="luxury-grid-card group relative aspect-[4/5] cursor-pointer overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="card-image h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${region.image}')` }}
                    aria-label={region.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform group-hover:-translate-y-2">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#c5a050]">
                    {region.area}
                  </span>
                  <h4 className="mb-4 text-3xl font-bold text-white">{region.title}</h4>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
                    <span className="material-symbols-outlined text-sm">sailing</span>
                    {region.itineraries} Itinéraires disponibles
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredRegions.length === 0 ? (
            <p className="mt-8 text-center text-sm text-[#0A1128]/60">
              Aucun itinéraire disponible pour cette sélection.
            </p>
          ) : null}
        </div>
      </section>
    </>
  )
}

function Tab({
  label,
  active = false,
  onClick,
}: {
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex flex-col items-center transition-all ${
        active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
      }`}
    >
      <span
        className={`text-lg font-medium tracking-wide ${
          active
            ? 'border-b-2 border-[#c5a050] text-[#c5a050]'
            : 'border-b-2 border-transparent text-[#0A1128] group-hover:border-[#c5a050]'
        }`}
      >
        {label}
      </span>
    </button>
  )
}
