import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default function NileExcellencePage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f8f7f5] text-[#1c170d]`}>
      <SiteHeader />
      <Hero />
      <main className="mx-auto w-full max-w-[1440px] pb-24">
        <Intro />
        <LifeOnBoard />
        <Spaces />
        <DeckPlan />
        <Experts />
        <Itineraries />
      </main>
      <FloatingCta />
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('https://nilecruisen.com/wp-content/uploads/2024/12/view-2.webp')",
        }}
      />
      <div className="absolute bottom-20 left-10 text-white lg:left-24">
        <p className="mb-4 text-sm uppercase tracking-[0.4em]">L'Art de Vivre sur le Nil</p>
        <h2 className="text-6xl font-bold leading-none tracking-tight lg:text-8xl">M/S Nile Excellence</h2>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="grid grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-12 lg:px-24">
      <div className="lg:col-span-8">
        <span className="mb-8 block text-xs font-bold uppercase tracking-widest text-[#f2a60d]">Notre Philosophie</span>
        <h3 className="mb-10 text-4xl font-bold leading-tight lg:text-5xl">A Floating Sanctuary</h3>
        <div className="text-xl leading-relaxed text-[#1c170d]/80">
          <p className="drop-cap italic">
            Éprouver l'éternité du Nil à bord d'un navire conçu pour la contemplation et le luxe absolu. Notre philosophie s'articule autour du silence, d'un
            service d'exception et de la préservation du patrimoine égyptien. Chaque détail, du lin des draps aux essences rares des boiseries, a été pensé
            pour offrir une parenthèse hors du temps, une immersion culturelle où le confort moderne rencontre la grandeur des pharaons.
          </p>
        </div>
        <div className="mt-12 h-[1px] w-32 bg-[#f2a60d]" />
      </div>
      <aside className="lg:col-span-4 border-l border-[#1c170d]/10 bg-[#f2f0eb] p-10">
        <h4 className="mb-10 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">Caractéristiques Techniques</h4>
        <ul className="space-y-8">
          {[
            { label: 'Longueur', value: '72 Mètres' },
            { label: 'Passagers', value: '44 Max' },
            { label: 'Équipage', value: '52 Membres' },
            { label: 'Rénovation', value: 'Hiver 2023' },
            { label: 'Cabines', value: '22 Suites' },
          ].map((item) => (
            <li key={item.label} className="flex items-end justify-between border-b border-[#1c170d]/10 pb-2">
              <span className="text-sm uppercase tracking-wider opacity-60">{item.label}</span>
              <span className="text-lg font-bold">{item.value}</span>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}

function LifeOnBoard() {
  return (
    <section className="py-10">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            className="aspect-square bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDu5ajNSh_Fuv2FcHcMoWTESbtqO-O18vt_XKDCyyfj9FO7mi3Y53O_FWqMvxGceLxxw2wuW_xJa3_OsaTXeW4VEfnuUUAFBjZktuLbc1sNLMsmGqZ0keA0QH5tobHWtqQbyP9GHDqY2_UMKlLJp2ZpGLfTCf3Wot3FK3xmi9Os1wGTTHjBYlR44gCKfUVDAPodA3FDBfLNAhJ1WDlBda6x_frG5D3-bhv7mGjzg74ZtX5JEu9eS0UO4kqgG2WnfOZdHI2gsaHYL0s')",
            }}
          />
          <div className="flex flex-col justify-center bg-white p-12 lg:p-24">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">Vie à Bord</h4>
            <h3 className="mb-6 text-3xl font-bold">Les Suites Panoramiques</h3>
            <p className="text-lg leading-loose opacity-80">
              Chaque cabine est une fenêtre ouverte sur les rives du Nil. Conçues avec des matériaux nobles, nos suites offrent un espace de 35m² minimum, dotées
              de balcons privés et d'une literie en coton égyptien de la plus haute qualité.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center bg-[#f2f0eb] p-12 dark:bg-white/5 lg:order-1 lg:p-24">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">L'Excellence du Service</h4>
            <h3 className="mb-6 text-3xl font-bold">Majordome &amp; Room Service</h3>
            <p className="text-lg leading-loose opacity-80">
              L'excellence ne souffre aucune attente. Un majordome dédié est à votre disposition 24h/24 pour répondre à vos moindres désirs, de la préparation de
              vos excursions au service du thé sur votre pont privé.
            </p>
          </div>
          <div
            className="order-1 aspect-square bg-cover bg-center lg:order-2"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA69eRDRcduucgMM4_c4kDpKeKoxz35iqOqeftjZ8fQYjSWEhDKLEzja4A6w-2UQaeKM1S9lbG0aMQf-QBU3wLzkHi6_3E70c8kZiuiusL-sLzhnv_QPT4LSDXWDBsXTSDe8fNEwohPz-dnsu7g-KDPlU8VzYSSXZCM7SyNxZUpJvjanatby3-gBAOHKg6jjpVKZPZMxRV2nE2jXoxcDk0IeelxzlKH4F-ZUA9ziDOlihkLtRj9MTNWrv7kRjsJ8lNfo_5gqsk0GD4')",
            }}
          />
        </div>
      </div>
    </section>
  )
}

function Spaces() {
  const items = [
    {
      title: '01. Le Sun Deck',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAvoJw-OgcSzJak7SjtXSNXQANXlZuyXA2gsOh1pZs0T7O2COfdEd7858vW-q60lGZuNwgSIJZeMnRTGaycisj-1wD_GYIlCnebWa5vszNihfLMCQryD3On6DEPOyUL_UnG1ciPXL6MBfU5y0MChIYiTQcpHcLjl4x68ZDIsvyvCE8IeKt7rJROCKIsxP5D8sD3e329ki6Qxc8tdi6cx6qBPU-tWNiakllv5MBaErjkmvAvGgEY_x3A22S2YDyTMwcoPsA4einlQ6s',
    },
    {
      title: '02. La Bibliothèque Coloniale',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCMRsf5getn6b1qoSqanykZH_CLHMFMyYaM-ce9Oh0IONnjZSPgA9Rc55jXXhJahZAyUCpj20qtrJ3ihnLExiaDHOrZm3g_-ccC3mLlJZu7CI4jmZ3YxyjBhN5OVJbNez25VB1K3yOeb87ZnAuSxn4hXr3w7iz4QWZDvrQhcjE5H5hYhz9R0eOpBbFHHWLIjyFmgNzlenTalHFDrmKyFn4bUbAGE1GyuEqw1QjpxhERmlRjKsHTddBvRWJRlFwq8paYGAKV41z8noo',
    },
    {
      title: '03. Le Restaurant Gastronomique',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBAEEKVwglfHgl_jHzmLQFvdZ7A4twnnur8f8BCNwpZEn7ZTmCrEsl7D1LVM-16SeayGyb8ERQ_oy1fdOVrYHe34Awb5OOXxif9DXJS5xd6f9duR81XS7lBgdA-3t4DjSrMF9XdjBG1c4yi_7I15sI_QA61AE94_tG_xUz-ZSp34LlBerLqjkgROyayrfMMl3yEJbXxRMKGZYFn_oMmOGcpI2raSun3cZLi4uvEQ17cGhQRyyEfOjlYOnzrUzJCCYRIbTFDK2vege0',
    },
  ]

  return (
    <section className="overflow-hidden bg-[#1c170d] py-24 text-white">
      <div className="mb-16 px-6 lg:px-24">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">Espaces Communs</h4>
        <h3 className="text-4xl font-bold">Un Palais de Bois et de Lumière</h3>
      </div>
      <div className="hide-scrollbar flex gap-4 overflow-x-auto px-6 lg:px-24">
        {items.map((item) => (
          <div key={item.title} className="group relative min-w-[80vw] lg:min-w-[600px]">
            <img src={item.image} alt={item.title} className="h-[500px] w-full object-cover" loading="lazy" />
            <div className="absolute bottom-6 left-6">
              <span className="text-xs font-bold uppercase tracking-widest">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DeckPlan() {
  return (
    <section className="bg-[#f8f7f5] py-32 px-6 dark:bg-[#1a160d] lg:px-24">
      <div className="mb-16">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">Architecture</h4>
        <h3 className="text-4xl font-bold">Plan des Ponts</h3>
      </div>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="aspect-[16/9] overflow-hidden border border-[#d4af37]/20 bg-[#0a192f] p-12 shadow-2xl">
            <svg className="h-full w-full" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
              <g className="opacity-40" fill="none" stroke="#d4af37" strokeWidth="0.5">
                <path d="M0 50h800M0 100h800M0 150h800M0 200h800M0 250h800M50 0v300M100 0v300M150 0v300M200 0v300M250 0v300M300 0v300M350 0v300M400 0v300M450 0v300M500 0v300M550 0v300M600 0v300M650 0v300M700 0v300M750 0v300" strokeDasharray="2,4" />
              </g>
              <path d="M50 220 L700 220 L750 150 L100 150 Z" fill="none" stroke="#d4af37" strokeWidth="1.5" />
              <g>
                <rect height="30" stroke="#d4af37" strokeWidth="1" width="450" x="150" y="80" />
                <text fill="#d4af37" fontSize="8" textAnchor="middle" x="375" y="100">
                  Pont Soleil
                </text>
                <rect height="40" stroke="#d4af37" strokeWidth="1" width="550" x="120" y="110" />
                <text fill="#d4af37" fontSize="8" textAnchor="middle" x="395" y="135">
                  Pont Supérieur
                </text>
                <rect height="45" stroke="#d4af37" strokeWidth="1" width="620" x="100" y="150" />
                <text fill="#d4af37" fontSize="8" textAnchor="middle" x="410" y="178">
                  Pont Principal
                </text>
              </g>
            </svg>
          </div>
          <div className="absolute left-4 top-4 bg-[#0a192f]/80 p-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            Plan Technique Ref. PC-NE-2023
          </div>
        </div>
        <div className="flex h-full flex-col lg:col-span-5">
          <div className="space-y-4">
            {[
              {
                level: 'Niveau 03',
                title: 'Pont Soleil',
                perks: ['Piscine', 'Bar Extérieur', 'Solarium', 'Espace Lounge'],
                desc: "L'espace ultime de détente sous le soleil égyptien.",
              },
              {
                level: 'Niveau 02',
                title: 'Pont Supérieur',
                perks: ['10 Suites Prestige', 'Salon Colonial', 'Bibliothèque', 'Boutique'],
                desc: 'Cœur de la vie sociale et suites d\'exception.',
              },
              {
                level: 'Niveau 01',
                title: 'Pont Principal',
                perks: ['12 Suites Signature', 'Restaurant', 'Réception', 'Espace Fitness'],
                desc: "L'excellence gastronomique et l'accueil personnalisé.",
              },
            ].map((item) => (
              <div key={item.title} className="group/item border-l-2 border-transparent transition-all duration-300 hover:border-[#d4af37]">
                <button className="flex w-full items-center justify-between bg-white p-6 text-left transition-all hover:bg-white/80 dark:bg-white/5">
                  <div>
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-[#f2a60d]">{item.level}</span>
                    <h5 className="text-2xl font-bold uppercase tracking-tight text-[#1c170d] dark:text-white">{item.title}</h5>
                  </div>
                  <span className="material-symbols-outlined text-[#d4af37] opacity-0 transition-opacity group-hover/item:opacity-100">info</span>
                </button>
                <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover/item:max-h-96">
                  <div className="border-l-2 border-[#d4af37] bg-[#0a192f] p-6 text-sm text-white">
                    <p className="italic opacity-80">{item.desc}</p>
                    <ul className="mt-4 grid grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-widest">
                      {item.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <span className="size-1.5 bg-[#d4af37]" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-12">
            <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">
              Télécharger le plan PDF complet
              <span className="material-symbols-outlined transition-transform group-hover:translate-y-1">download</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experts() {
  const experts = [
    {
      name: 'Jean-Pierre Roche',
      title: 'Égyptologue CNRS',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBsOhxqFNbj6E0twsW7143so9d1afZpfSyFx4OSxtyAK6iOGhZHmspACfVKXjdWt__ftJsrOMJwyyX8jmBGdfEnqHrIxVWhLZnEGj0mFRhqiO8OushWJu1BE5knLhnJfYBDfeYv2h9gr1V3mGltNID9uuH4CzuZTliRp_J0Pr4JF3Z4H1lHas5ETfeIO1Cjouc-dz1nFHmcHV025z-8DgzKn1_OpXoqaxR8nbn9o4F4Tnonvy-sJHAT0VSgds-V5MXtirCMLUymUsI',
      blurb:
        'Spécialiste de la XVIIIème dynastie, Jean-Pierre partage ses dernières découvertes lors de conférences exclusives au salon.',
    },
    {
      name: 'Dr. Elena Marelli',
      title: 'Historienne des Arts',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBgfVarPUP0rAeOlgbauyIDEt-e__ohWsauVhRg_crGsX195JHF4LNyY6Cr5bPgrtKoqBBl5nB00NEF8fcygw-tSEMFmxEoH7IqoqUhH95hxhPKfQn1RkVaarD2R3ZWBL_gchIOIqIEJzMudngk64q9Cjmb_2LB6vRGYSAN8d-eDFi3djr_DEoa6beH5Nam1y1GdZmD9FcVR45Zn9BzOxe7LKU7fq6idmUrvQI_f5Tp-M2YA74AHmoJKt_KWXJrSE3JGv3q2QlCCqE',
      blurb:
        "Décodez les fresques de Louxor à travers l'œil d'une experte en iconographie antique et symbolisme pharaonique.",
    },
    {
      name: 'Marc Deschamp',
      title: 'Directeur de Fouilles',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCp1AZwJdxu72apC7OsIH3p7o9IAgvjo8LIdvfrTTkqopP3y9i45xpufklYvCjQyVkus6RYyXhfi4xhOrE4b6KqxflhfGJ87rcLfJbGvSYZuhRuHr3SNFazDx0k6Z0NY9Fw-mTnyvintFtni5p6FR9U-T_jBSackKGYLnihdH9x1z9vG0a8G97CzkgWsZvIBcuo__H73F6r_CnFvgJRgZ-TxeJkyL0M9yJmPEnR8SZ4ajS6CnWo1PDB0p_S1a1-aNumZ5kaXfBmdvM',
      blurb:
        'Vivez les excursions comme une aventure archéologique, guidé par celui qui arpente les sables de la Vallée des Rois depuis 20 ans.',
    },
  ]

  return (
    <section className="bg-[#f8f7f5] py-24 px-6 dark:bg-[#1a160d] lg:px-24">
      <div className="mb-16 flex flex-col items-center">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">Érudition</h4>
        <h3 className="text-center text-4xl font-bold italic">Experts &amp; Conférenciers</h3>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {experts.map((expert) => (
          <div
            key={expert.name}
            className="flex flex-col items-center border border-[#1c170d]/5 bg-white p-8 text-center dark:border-white/5 dark:bg-white/5"
          >
            <div className="mb-6 size-48 overflow-hidden rounded-full border-4 border-[#f2a60d]/20">
              <img src={expert.image} alt={expert.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <h5 className="mb-2 text-xl font-bold">{expert.name}</h5>
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#f2a60d]">{expert.title}</span>
            <p className="text-sm italic leading-relaxed opacity-70">{expert.blurb}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Itineraries() {
  const cards = [
    {
      tag: 'Incontournable',
      duration: '12 Jours / 11 Nuits',
      title: "L'Égypte des Pharaons",
      desc: 'De Louxor à Assouan, une remontée du temps vers les sites les plus prestigieux du Haut-Nil.',
      price: 'Dès 5 450 €',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBntiUaBlQXVUVtYiUCV0UGr6k1cAC8r8g7Ti0XCjrHiJZboweOe8iv13pB_ZoqW8yopiI7qQHk1GLmrfhsxc91Tgwl-7UgjnaBpHK8lp7dWPaq0k14236-PFufiWzSUKmOpPJDxvAmyLxoH_AxUxMiZT_pJInA6oXRLhfaRoppHbmEVUgOAHaScxVae19sugCMp1Pt3DuP4sH2tS7xqi-XrWbajpFdR6Bo_ldJaN84w4MgrP9pq5gD5EYzBe8XGMQjMqyOWCGsV84',
    },
    {
      tag: 'Nouveauté',
      duration: '8 Jours / 7 Nuits',
      title: 'Odyssée sur le Nil Bleu',
      desc: 'Une exploration intimiste centrée sur les paysages nubiens et les temples moins fréquentés.',
      price: 'Dès 3 990 €',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDFB1UuDpxl2-lwmlLq2M1ctOXWgS84XsECnjn7gqHoxItxCaxLIaFBsfLKYQQg9T0YuukRFq5-SSXXDknHynNOQOKjrYL1-dZq9cr7HAF3u4dfeP3l1uSzJDYPkolUKBeuPSFcjZ2sJo7M-BYEnHNxSdiXoeuMWk5JWUYmw2RIFjWR2q0ZrgrmIoEPq5COpXlz4FJu_j4ndz_O0nMbge_xgclx8K7l267c0UtC8HbfjhvnaBwZWCMZ801B4s6l4CFgssGQY0sv238',
    },
    {
      tag: '',
      duration: '15 Jours / 14 Nuits',
      title: 'La Grande Croisière Royale',
      desc: "Le voyage ultime combinant Le Caire et une croisière intégrale jusqu'à Abou Simbel.",
      price: 'Dès 7 800 €',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAJxi06Nh5i9tMXAwyp_yc2UDFPT2AKPndjjXXVLzb4IWaKwFc8AIF1XOM4RnUVm1qmTWHUHTMy60FIbXL-d2Jtrk7v6T_PgxCbFsB6e95hNzWjVr9lBYX6x32rmk6YX1YKHkLeNIQd3CBedOJzTrOXuvpUSWHmYmsO0lWLBQH0zRKnrEW4_7EuUATNUxgibH9O58Prf6r_CnFvgJRgZ-TxeJkyL0M9yJmPEnR8SZ4ajS6CnWo1PDB0p_S1a1-aNumZ5kaXfBmdvM',
    },
  ]

  return (
    <section className="border-t border-[#1c170d]/10 px-6 py-24 lg:px-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#f2a60d]">Itinéraires</h4>
          <h3 className="text-4xl font-bold">Voyages avec le Nile Excellence</h3>
        </div>
        <div className="flex gap-4">
          <button className="flex size-10 items-center justify-center border border-[#1c170d]/10 transition-colors hover:border-[#f2a60d]">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="flex size-10 items-center justify-center border border-[#1c170d]/10 transition-colors hover:border-[#f2a60d]">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="hide-scrollbar flex gap-8 overflow-x-auto">
        {cards.map((card) => (
          <div key={card.title} className="min-w-[350px] border border-[#1c170d]/5 bg-white shadow-sm transition-colors dark:bg-white/5">
            <div className="relative h-64 overflow-hidden">
              <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              {card.tag ? (
                <div className="absolute right-4 top-4 bg-[#f2a60d] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1c170d]">
                  {card.tag}
                </div>
              ) : null}
            </div>
            <div className="p-8">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest opacity-50">{card.duration}</span>
              <h5 className="mb-4 text-xl font-bold transition-colors hover:text-[#f2a60d]">{card.title}</h5>
              <p className="mb-6 text-sm opacity-70">{card.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest">{card.price}</span>
                <span className="material-symbols-outlined text-[#f2a60d]">arrow_forward</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FloatingCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1c170d]/20 bg-[#f8f7f5] px-6 py-4 shadow-2xl dark:bg-[#1a1814] lg:px-24">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">En ce moment</span>
          <p className="text-sm font-bold">Disponibilités limitées pour l'hiver 2026</p>
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden items-center gap-2 md:flex">
            <span className="material-symbols-outlined text-[#f2a60d]">call</span>
            <span className="text-sm font-bold">04 93 20 21 20</span>
          </div>
          <button className="flex items-center gap-3 bg-[#f2a60d] px-10 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1c170d] transition-all hover:bg-[#d48800]">
            Voir les départs
            <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>
      </div>
    </div>
  )
}
