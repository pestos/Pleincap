import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: "Escapade Culturelle - Plein Cap Croisières d'Exception",
  description: "Escapades culturelles Plein Cap : carnets de voyage et conférences",
}

const suggestions = [
  {
    title: "Odyssée Grecque : Le Péloponnèse oublié",
    price: 'À partir de 2,490 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-7MMRU8JVljyowyR0rptCbJD7NjHzfr9zZBDqHLwfw4N7A-jGrC9r__fJsMOct6fjewo-ZmBXL3jEhT98asOSWUbkmMMVbEgFfu9trga9oaVkPPHUP04P7quIcGGLBf6gVEnv1CjWRen2icAip_0eWn0ZnoniYNPG5YEah5BogPLaOjCeQacouUV7yvqa2yfVI95BuknPgBfFsXq58Z2GHxQMQXEg8QsGatNH5RwkSwSeNg6G1Tl1m1GL72-ob0mo81j4afddNAA',
  },
  {
    title: "Soleil d'Hiver en Mer Rouge",
    price: 'À partir de 1,850 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8JYwTiBSftuAbubOO0wAIMgQKpfNFv1zGb5ns1qXRARH7p99HxfRGN_jCm1WifFSZVPAa2TTDqBRTo0ZxwOzbVcbTYaMg1AiVI9-lAYVsETEFEFs-jgn0y3E5U0p6GbPER_CVMIfokHCrnBRNUDo6uw2sFA143uDfC6-9_rT5FbodsFu_-dR33jsctTHSQKFumano0yqnrBzJ-ND2xg55GEAu03wCaU0hM98WGHpbcmgpHNDbh1gD21_cSxdW7ik_9s9olgf3K54',
  },
  {
    title: 'Archipels Japonais : Art et Zen',
    price: 'À partir de 6,120 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMX6Z0jbcI-w0UbU_u0ZdxdOmkmruKTItptJy6ZnvoBQ5DGEn-ZEzmB6JjThpWjMuWn3JXhjGw-KBYVeGsD2LblMoz4cZVMPJg8i16-LUA_vtlX-wS9ChM2C4_P-nkjxZi9ziPOBxoECHZgUyUZblsPAgRLMBFtZpdBB_N91oqkpwiwjhQyDmhzxAnXi1xTCNuAfqe7IEJbJ5JBe3baEjA2FhIQcwPSjvh88v9JRL9vrhT3PJBa2lktjbEyd9I2d5747J6p-CNunA',
  },
  {
    title: 'Douceur de la Loire : Châteaux et Vignes',
    price: 'À partir de 1,200 €',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxix9O5-iQK7UYSvAH6AlnEcznGF5UCEm1e5UJJKmh9oLpMt8DH8UaSAcnl_hBFj4zWpYFS4Vb8hDCDmS4ascR7MplQem1YG46WfmIzR704MP-TD7tMSKMm95EDTWMrz3ZNDMPL7vIzbbxltHo_Y2IO5WG_ANY9u3uPUDy9RzQbJqIrbYP6IVmVBh4WTNEOzOTwBJzKx41ssMkhiJNFvs6AtX8frJBwd3meFgVo_l89oIoLoN8f0pPNERU7rB191GZc4n5kX-A6cg',
  },
]

export default function EscapadesCulturelles() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#F9F8F6] text-abyss">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-40">
        <section className="mx-auto mb-20 max-w-4xl text-center">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.4em] text-primary">Collection Journal de Bord</span>
          <h2 className="serif-heading mb-10 text-6xl italic text-abyss md:text-8xl">Escapade Culturelle</h2>
          <div className="mx-auto mb-10 h-px w-24 bg-primary" />
          <p className="mb-8 text-xl font-serif italic leading-relaxed text-abyss/80 md:text-2xl">
            "Le voyage n'est pas seulement un déplacement dans l'espace, mais une immersion dans le temps et l'esprit des civilisations. Chez Plein Cap, nous concevons chaque itinéraire comme une conférence à ciel ouvert, où le paysage dialogue avec l'histoire."
          </p>
          <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">Édition 2024 — 2025</p>
        </section>

        <section className="mb-24 flex flex-col items-center justify-center gap-12 border-y border-abyss/10 py-8 md:flex-row">
          <div className="relative w-full max-w-[300px]">
            <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Filtrer par destination</label>
            <div className="group relative">
              <select className="w-full appearance-none rounded-none border-none border-b border-abyss/20 bg-transparent px-0 py-2 text-xl font-serif focus:border-abyss focus:ring-0">
                <option>Toutes les Destinations</option>
                <option>Amérique du Sud</option>
                <option>Europe du Nord</option>
                <option>Europe Centrale</option>
                <option>Méditerranée</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-0 bottom-3 opacity-40 transition-opacity group-hover:opacity-100">
                keyboard_arrow_down
              </span>
              <div className="absolute bottom-0 left-0 h-px w-full bg-abyss/20 transition-colors group-hover:bg-abyss" />
            </div>
          </div>
          <div className="relative w-full max-w-[300px]">
            <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Filtrer par date</label>
            <div className="group relative">
              <select className="w-full appearance-none rounded-none border-none border-b border-abyss/20 bg-transparent px-0 py-2 text-xl font-serif focus:border-abyss focus:ring-0">
                <option>Toutes les Dates</option>
                <option>Automne 2024</option>
                <option>Hiver 2024</option>
                <option>Printemps 2025</option>
                <option>Été 2025</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-0 bottom-3 opacity-40 transition-opacity group-hover:opacity-100">
                keyboard_arrow_down
              </span>
              <div className="absolute bottom-0 left-0 h-px w-full bg-abyss/20 transition-colors group-hover:bg-abyss" />
            </div>
          </div>
        </section>

        <div className="space-y-40">
          <article className="journal-entry group">
            <div className="relative mb-16 w-full overflow-hidden bg-abyss shadow-2xl">
              <div className="aspect-[21/9]">
                <img
                  alt="Pérou, Machu Picchu"
                  className="h-full w-full scale-105 object-cover transition-all duration-1000 grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGEQCJ-v36Y9Sf8ywHDFmMcCJr3GIID0ETJjmfNnOLSzThzJbXfbce3lBqlM5KX33QFIxy2YAFj0QpnazhvukmDmm15IUHuBDfxVUZTMrWfIOeUa-frchlZ1Omk-9N_9ivDJbAzPkHMwMG6Rt6O7a5ozALaHG9g1__TJ37dO2qI1nH65dwaKw9IiRIG6YOCNiD9qSfHZDzhmkluU5x3lIUhdls5vG3h9yNGk28SgCdOBFftTthxODEf2z8i1qxqZ6XK3jGYddCbcg"
                />
                <div className="itinerary-overlay absolute inset-0 flex items-center justify-center bg-abyss/85 p-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex w-full max-w-6xl items-center gap-16">

                    <div className="relative h-64 flex-1">
                      <svg className="h-full w-full text-primary" fill="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 100C70 80 150 40 200 40C250 40 330 80 350 150" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5" />
                        <circle cx="50" cy="100" r="4" fill="currentColor" />
                        <circle cx="120" cy="65" r="4" fill="currentColor" />
                        <circle cx="200" cy="40" r="4" fill="currentColor" />
                        <circle cx="280" cy="70" r="4" fill="currentColor" />
                        <circle cx="350" cy="150" r="4" fill="currentColor" />
                      </svg>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="text-[80px] font-serif uppercase tracking-widest text-white opacity-5">Itinéraire</span>
                      </div>
                    </div>
                    <div className="w-72 font-inter text-[11px] leading-loose text-ecru/90">
                      <h5 className="mb-6 border-b border-primary/30 pb-2 text-primary font-bold uppercase tracking-[0.2em]">Sommaire des escales</h5>
                      <ul className="space-y-3">
                        <li><span className="font-bold text-primary">Jour 1-2 :</span> Reykjavik & Lagon Bleu</li>
                        <li><span className="font-bold text-primary">Jour 3-4 :</span> Fjords de l'Ouest</li>
                        <li><span className="font-bold text-primary">Jour 5-7 :</span> Akureyri & Terres du Nord</li>
                        <li><span className="font-bold text-primary">Jour 8-9 :</span> Lagunes Glaciaires</li>
                        <li><span className="font-bold text-primary">Jour 10-11 :</span> Côte Sud & Reykjavik</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-8 z-20 transition-opacity duration-500 group-hover:opacity-0">
                  <span className="border border-abyss/5 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-abyss">Europe</span>
                </div>
              </div>
            </div>

            <div className="journal-content flex flex-col items-start gap-16 lg:flex-row">
              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="serif-heading mb-6 text-5xl leading-tight text-abyss">Sagas Islandaises : Terres de Feu et d'Espace</h3>
                  <p className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-primary">Invitée d'honneur : Elsa Magnusdottir, Spécialiste de la Littérature Nordique</p>
                </div>
                <div className="prose prose-lg max-w-2xl space-y-6 font-serif leading-relaxed text-abyss/70">
                  <p>Une épopée maritime autour de l'Islande, où la géologie spectaculaire rencontre les récits légendaires du Moyen Âge. Découvrez comment ce paysage tourmenté a façonné l'une des littératures les plus riches d'Europe.</p>
                  <p>Le cycle "Voix de Glace" explore l'héritage des Eddas et des Sagas à travers des lectures quotidiennes et des conférences sur le terrain, au pied des glaciers ou sur les champs de lave, pour une résonance totale entre texte et territoire.</p>
                </div>
              </div>
              <aside className="flex-shrink-0 space-y-10 border-l border-abyss/10 pl-10 lg:w-72">
                <div>
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Dates & Durée</span>
                  <p className="font-serif text-lg">04 Juillet 2025</p>
                  <p className="text-sm italic opacity-60">11 Jours / 10 Nuits</p>
                </div>
                <div>
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Tarif Excellence</span>
                  <p className="text-2xl font-bold text-abyss">4,990 €</p>
                  <p className="mt-2 text-[10px] uppercase tracking-widest">Par personne</p>
                </div>
                <button className="w-full border border-abyss py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-abyss hover:text-ecru">
                  Détails du voyage
                </button>
              </aside>
            </div>
          </article>

          <article className="journal-entry group">
            <div className="relative mb-16 w-full overflow-hidden bg-abyss shadow-2xl">
              <div className="aspect-[21/9]">
                <img
                  alt="Danube, Architecture Impériale"
                  className="h-full w-full scale-105 object-cover transition-all duration-1000 grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDHqvOi1bOsPannTaV89z_cEzFl9QtKfyfIxOy_FUo5Buujm2tKamLEyPXCn4LXsIVOuL9FwCDvZKnK3mvy1WTr3d2W2j4CuE7puBl26NDtwFYJ2ItuXPvckoBR4FruVqEK4WZZrw2SgYmCaVGOEO7eZPCDYyk-ZVDr8YQ2Pw7gITUlHKlnwFXZJSgBTg7SXDRNKCzMUc0B2AOfIUZ7PwV4ld0f0QNMJrqVFcyqHf0C95WYWSX1NzRbEiNMiDUD4a2KaYehv_CNoI"
                />
                <div className="itinerary-overlay absolute inset-0 flex items-center justify-center bg-abyss/85 p-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex w-full max-w-6xl items-center gap-16">
                    <div className="relative h-64 flex-1">
                      <svg className="h-full w-full text-primary" fill="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 100 Q 150 150, 250 100 T 350 100" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5" />
                        <circle cx="50" cy="100" r="4" fill="currentColor" />
                        <circle cx="125" cy="115" r="4" fill="currentColor" />
                        <circle cx="200" cy="120" r="4" fill="currentColor" />
                        <circle cx="275" cy="108" r="4" fill="currentColor" />
                        <circle cx="350" cy="100" r="4" fill="currentColor" />
                      </svg>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="text-[80px] font-serif uppercase tracking-widest text-white opacity-5">Itinéraire</span>
                      </div>
                    </div>
                    <div className="w-72 font-inter text-[11px] leading-loose text-ecru/90">
                      <h5 className="mb-6 border-b border-primary/30 pb-2 text-primary font-bold uppercase tracking-[0.2em]">Sommaire des escales</h5>
                      <ul className="space-y-3">
                        <li><span className="font-bold text-primary">Jour 1 :</span> Vienne, Cité de la Musique</li>
                        <li><span className="font-bold text-primary">Jour 2-3 :</span> Melk & La Wachau</li>
                        <li><span className="font-bold text-primary">Jour 4 :</span> Bratislava Royale</li>
                        <li><span className="font-bold text-primary">Jour 5-7 :</span> Budapest, Perle du Danube</li>
                        <li><span className="font-bold text-primary">Jour 8 :</span> Esztergom & Débarquement</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 top-8 z-20 transition-opacity duration-500 group-hover:opacity-0">
                  <span className="border border-abyss/5 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-abyss">Europe</span>
                </div>
              </div>
            </div>

            <div className="journal-content flex flex-col items-start gap-16 lg:flex-row">
              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="serif-heading mb-6 text-5xl leading-tight text-abyss">Le Danube Impérial : Musique et Architecture</h3>
                  <p className="mb-8 text-sm font-bold uppercase tracking-[0.2em] text-primary">Conférencier : Pierre-Etienne Durand, Musicologue & Historien de l'Art</p>
                </div>
                <div className="prose prose-lg max-w-2xl space-y-6 font-serif leading-relaxed text-abyss/70">
                  <p>De Vienne à Budapest, cette croisière fluviale célèbre le faste de l'Empire austro-hongrois. Un voyage rythmé par les accords de Mozart et de Liszt dans les décors baroques et Art Nouveau qui bordent le fleuve bleu.</p>
                  <p>Le cycle de conférences "L'Harmonie du Danube" déchiffrera les liens étroits entre les courants architecturaux de la Sécession et l'évolution de la musique symphonique européenne, complété par des escales privées dans des salles de concert historiques.</p>
                </div>
              </div>
              <aside className="flex-shrink-0 space-y-10 border-l border-abyss/10 pl-10 lg:w-72">
                <div>
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Dates & Durée</span>
                  <p className="font-serif text-lg">15 Mai 2025</p>
                  <p className="text-sm italic opacity-60">8 Jours / 7 Nuits</p>
                </div>
                <div>
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Tarif Excellence</span>
                  <p className="text-2xl font-bold text-abyss">3,250 €</p>
                  <p className="mt-2 text-[10px] uppercase tracking-widest">Par personne</p>
                </div>
                <button className="w-full border border-abyss py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-abyss hover:text-ecru">
                  Détails du voyage
                </button>
              </aside>
            </div>
          </article>
        </div>

        <div className="mt-32 flex items-center justify-between border-t border-abyss/10 pt-20">
          <div className="flex items-center gap-12">
            <button className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 transition-opacity hover:opacity-100">
              <span className="material-symbols-outlined">west</span> Précédent
            </button>
            <div className="flex gap-8">
              <span className="border-b border-primary pb-1 text-[10px] font-bold">01</span>
              <span className="cursor-pointer text-[10px] font-bold opacity-30 transition-opacity hover:opacity-100">02</span>
              <span className="cursor-pointer text-[10px] font-bold opacity-30 transition-opacity hover:opacity-100">03</span>
            </div>
            <button className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors hover:text-primary">
              Suivant <span className="material-symbols-outlined">east</span>
            </button>
          </div>
          <span className="font-serif text-sm italic opacity-40">Découvrir la suite de la collection</span>
        </div>

        <section className="mt-40">
          <div className="mb-20 h-px w-full bg-primary/20" />
          <h3 className="serif-heading mb-12 text-center text-3xl italic">Autres suggestions</h3>
          <div className="grid grid-cols-1 gap-12 px-4 md:grid-cols-4">
            {suggestions.map((sugg) => (
              <div key={sugg.title} className="group cursor-pointer">
                <div className="mb-6 aspect-square overflow-hidden">
                  <img
                    alt={sugg.title}
                    className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0"
                    src={sugg.image}
                  />
                </div>
                <h4 className="mb-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">{sugg.title}</h4>
                <p className="mb-4 text-sm font-bold text-primary">{sugg.price}</p>
                <a className="inline-block border-b border-abyss/20 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:border-primary" href="#">
                  Découvrir
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
