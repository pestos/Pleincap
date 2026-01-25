import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Danube Impérial: Expertise & Demeures | Plein Cap',
  description: "Voyage culturel d'exception de Vienne à Bucarest avec Plein Cap",
}

const itinerary = [
  {
    day: '01',
    title: "Vienne - Embarquement",
    desc:
      "Accueil à bord de votre navire à partir de 16h. Cocktail de bienvenue et présentation de l'équipage. Dîner de gala impérial pour débuter votre séjour.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCnFCuj0j_-t0AC90skvOY0bnMAwpTy9wu_Y6XyVozNt2NwSwZbJZOmxw7oZrLX61h9lMwkcv5_wtHGy4lqoyg4zHDa2Rnmsd-5LaXyLTjgjSDLYLPT7V1qaZD5_lR-A3DO9EyiN_jq7AG2qKxPS1A8fDeBlnj8BOlAlyTgfs_WCQ9DUGM8QfaVUe5E-OWd0MzeT35RTCGuhIfWgb5j1sOeamYXDq20AVWU-SYyGYmWX5zUFSXqPzlAXCUqZcf6RwuEwCbaSJsRAY',
  },
  {
    day: '02',
    title: 'Dürnstein & Vallée de la Wachau',
    desc:
      "Escale dans le plus charmant village de la vallée. Visite de l'abbaye baroque de Melk, surplombant le fleuve, véritable chef-d'œuvre de l'architecture autrichienne.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeXOI8F29nwuSuLEcC_y4z2YyNPQUtR8cohNPIQ34o-6Qz-tNEgW8NhdbdGNXxtKX53Sr1G6KOsDIapOi22rPLXpooeOoAv6EoFEINsjBb89CrLqhBmfBCjcpnMxCwjLmoYAT2rW_ZACw2Xgzhr7pFxYG2r0DzzQLQtkZ9n_To10wBHQK8ICbtGSVjV7SfXySnijq9V-bqa517hCwuLc0MvwLFSqLdWcTaicDmiyWdhQDHVf8AwKKOExjqo7hRPnGRj5TsAJSSA0w',
  },
  {
    day: '03',
    title: 'Bratislava - La Perle du Danube',
    desc:
      'Découverte de la capitale slovaque : la vieille ville, la cathédrale Saint-Martin et le château offrant une vue panoramique sur trois pays.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsWx5JatNxZoCIurUSek3FArtCXYbHx6nhYLP0o2NZfm7zq1QtWUuqO-WSQn4COMX8Ney2gb6ri90XApI8YUuAy6pt8Ig-7NerA4gJ5N4xlD-WK5NAgegAlGqTCPl_NPWRWpUdXJBYZ9vHJBt1HUYLmGkJ8mIhdbeGEjBMc_QwbTyYxN76qv84wJzihYi7zaFCubEbup0DY1GOxO-A32rbQFBpDAXKJRJimowtbZFY0_nBPevflOpHPCQK3_NXsPmcR2ec2ycXssk',
  },
]

const experts = [
  {
    name: 'Dr. Jean-Pierre Bastide',
    role: 'Historien & Conférencier',
    quote:
      '"Comprendre le Danube, c\'est décrypter les strates de l\'histoire européenne. Mon rôle est de faire revivre les empires à travers les pierres que nous croisons."',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjkrsy8jXh5aZzTmXBCTau7w45qv6Lc9JeN_4XUHXg4xN1VOO-XAdhUlRR3xIpI86ktaZchB6MesFkK9V4GUtVDRvRgl6bk1c55JQlSF9Gc2Ukat7XV_hSfBNse3c3hF8P7r8hRoQaKbnhrOfYXQ5-DOSwEGmoU4D5accQutScYB4WJuR0KptlZJ4vVSS46uf9STCSjQn-oHpjG7-WFtLoDwhzf5Xf2wNquExgxtGPA85D1F0LR_Og3H8eqU3DR_LTtaK-nrT8Jyk',
  },
  {
    name: 'Hélène de Vogué',
    role: 'Spécialiste en Histoire de l\'Art',
    quote:
      '"De la rigueur baroque à la fantaisie rococo, j\'accompagne nos voyageurs dans la lecture sensible des chefs-d\'œuvre qui jalonnent ce fleuve mythique."',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDo4fk0Veaw49i_P98tF5j8cY6QojmAIVSmvmHpEgKubV9MuaK79sLDNGnv1qdGIgivE8hVoLtiCH0zD4iuCsvzNrPbJTn00kuYEp3-KjzapgoBBetDb-9bP7wlGz3xDrKI1En8GlMnQyubBMH90-KGCoOgd3YT7YCS_PshEvcwqbmO4RAs6pt22DvEtCUQ48fMzc1K1SvfLmwTNsbo85VSb7DAlmj8Qm7dg_5MyTFw-K39lVv221rI_zjrpZqN-y3cu-rVmkv5DS8',
  },
]

const demeures = [
  {
    city: 'Lima',
    name: 'Hotel B Barranco',
    desc: 'Une escale artistique dans un palais Belle Époque.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCq2no0WzxaC9Y3DvGd5nd3saC_7pxh91t837JQtSqmEvuagD9gMCzsFlOZ3aUg74rx3qM1UiI7zdxoYcniWO3vIbxOjKBl6Pxwt6FLCs0QMyYOle6Ymh49XoTNhVS0yK_VdWD7oorRzu10kTftZcaaeM7LOuYuSGssG8CHLze2DN80Wwuwisbvtpq1hqcNUFDZ6ZNJBqbjTLUP0apZ9dk82LKpo_LFRf6Vfvdz-OQc4xK05KlPlNQrdtJKiQXQyezF2Vdrhev1CT4',
  },
  {
    city: 'Vallée Sacrée',
    name: 'Belmond Rio Sagrado',
    desc: "L'harmonie parfaite entre luxe et nature mystique.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjEq5OFZKqh9IjyKjChivs-gBmrubfTQUQCg-NA6el2HQNvL56TdTKj5taB76YcSfe2AaiSpOHZ_ijmKLjPOZigS9XxU_wBSsFIutAKYnalyX_JUNXjKM8tbWZKKOZTbRNv1vaxhGeu755hh3XfQ8fSrQ3kbV9HEKVERR29qplAsRB13GxDjv7E6DFAs5z0EXJRbRRSfxUzikeS7DB5Ug3e46dd3zwJT443Y4jJWu1uqA0Z5efEa3u2f0zt6Yk_NZe9LLQQCgp70o',
  },
  {
    city: 'Cusco',
    name: 'Palacio del Inka',
    desc: 'Un voyage immobile au cœur des siècles passés.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGErSux7NquGFpVza4qXXXIR2L6Tl3MpqRr3QexNhqJeFt2cQhvsWo2ERVJvH32Y7kSbm9c12IF_jGQAKA1XWh39_srceT7v3XuVZCeqG1Om4IPro_pXh-MC-yGEyzcZ_-w45H5WguaoT4tQg8pZwOW1XasoWR9kfy36-q--tcDMA3f5-OUbOELmMevWzn4FhWj4oalaNiiVXRB6JAsqVoyYyD6ZOHy3IKvry3JQak4WnjtxRYw_ZWTY-xmIUBFDaE8IVtcXwBMYY',
  },
]

const gallery = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmTemJMIkB7Q-HwFHO9IOQt8WPr8VdbUqYpPf62rt-ELjNSeODvWEcX7iu7Dd_Y5iFRAi7snyeCBNi4Rdp01IBCSsk-wWtS7FQe_sv691LRkMhb-ww1DTgtdvQScZtM4VOWwaxJtXwUNy12T2z5ZK1l9-EQ2nF9XyPIP3LY2CzjRO3h4K-jqDXGD--BFpVnmsWR1Zf5zoMAddKGrydHN1UW_yCMAwaMI2ArmSS-spRKBVYzJJtaDK4rI19L3fZEeokY7svU7KtY2A',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCgIq-o2uIG-J2oTsChTf3rAi4zTocoAwmebgaC5Zqls_IOWnWBSNR_oc7mmGvt-1vMKyhW9iq0Fafx3-0yJvWUxiiTLDJ4bxpW0Hbs1s2OvFvsZu8eKELL9KwS5YRtFI9yFlEdIrHxIwH18BqF12Mpn8y2-HU9XSHpGXEW8KohAR3kaMD7gFQkhMaDe4Sr7-_tWADaWPLFFGJU-U1prvVsYg1uS_zev144UCnAzr0y1P5sG1HC-hmSP-33CVO9dxqh-z0b7cedEfo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXV-VvgzljdC3y-n7KIMgCW00N8clZnH7Z9fm_v0xqNp_yIDyPKhFVTgZYN-9gJr2cXtS0iyTtapYVgRIhSLuFb9Jaca9RBL_mv9Oq6Efyu3z-G2nujjaQSswYPiDSiSSMAkPP5Ao0D9Z-pXwd1-73KvVpiLFLUtM1Wt-e8Cwb5D0SOvh3CveTsvWP6POGDuYbyi-aFxUsA6Of8GFDt0rOogeGRbsGPZ-Vnka3kfgwiX4m5MBw6EEmqM692Gy6hLaqhtlO4gPb8c',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCKQUs-DRR-pP2H0t2S8PZQxeunFAwz_Pbs98bD3qjKNKU1enzl0yI6BdJqT3Y0arAltQFp7xUF2l5wwdEU0bz8J-cdy9dG1-kYNZEKgYMsCt6mTj8DIEawJmLiXQISM_2kiRIQ8AwGqIylYFfQv5e65pakDZDEvR6-JcNxF59G-dWZnuI8YmNwi23XM0QH3nQPyiF5oaNaRoe90wD_NvAb8yKzAHRo4pO7n98vUn16Z3mR0g2_MBbSD9cdQtpFCQLnWL5wLSvKSBs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmG6Tmpv-pWrNKyPAOaJ_ztHCHtKBpqX_98HKygizBSk9Gg9p5_irUc3vXrv1JvAR6Mipp5pss0BmNMYJNc2zHlXUiqccOdMFDrc0UTSjIcEQHAcDoIOQFaN-0monjcBXBaf2657LNhkzro5XYvDFK8j_ct2e0qfKTnBwL-Vyvq58g5os-802AdpV_ewZETSomguRiTAlRWZ1mUoxCkpF6hM_QsowteN-X5rzLG1Qc-mrt8K8AWTa-STzu4yH6Qkz-0t29NRe87M',
]

export default function DanubeImperialPage() {
  return (
    <div
      className={`${plusJakarta.className} relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fcfbf8] text-[#1A2B3C] dark:bg-[#1b180d] dark:text-white`}
    >
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Subnav />

        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:gap-12 lg:grid-cols-12 lg:px-10 xl:px-16 xl:gap-16">
          <div className="space-y-16 md:space-y-20 lg:space-y-24 lg:col-span-8">
            <Overview />
            <Ship />
            <Itinerary />
          </div>

          <aside id="practical" className="h-fit lg:sticky lg:top-40 lg:col-span-4">
            <Practical />
          </aside>
        </div>

        <Expertise />
        <Demeures />
        <Gallery />
      </main>

      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden md:h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(26,43,60,0.3), rgba(26,43,60,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZyCP5gv5N4t5Ej4NZTbUXJshRgWLYlHPaVrYV_FoGE1A5IjEFBMz-82onVUgmJlSi1CEA7EJ1uWyS-29fHaRa8fZvtFM-h6ecJsKu0JI9iuN5DfVhb5O4v_rK-GhgsuuS-WNJC-jRKyVFKyr_IAzuAbcTo3QZkE9zZMYq-XCfDkTsi1SUzKkIhvq2rLAkLFzl3xRIY85sBORIU1fceBSELfFTcGssQ6UOsi54FFXM0Dm9y4bKx3z0OpT2pd_1Y_mslMtzfF3QGgo')",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#e2ae12]">Voyage Culturel d'Exception</p>
        <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight text-white md:text-7xl">Le Danube Impérial</h1>
        <div className="flex flex-col items-center gap-6 text-white/90 md:flex-row">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e2ae12]">calendar_today</span> Vienne à Bucarest | 15 - 22 Mai 2024
          </span>
          <span className="hidden opacity-30 md:block">|</span>
          <span className="text-xl font-semibold text-[#e2ae12]">Tarif par personne à partir de 2 450 €</span>
        </div>
      </div>
    </section>
  )
}

function Subnav() {
  return (
    <div className="sticky top-[73px] z-40 hidden bg-white/80 backdrop-blur border-b border-[#e2ae12]/5 dark:bg-[#1b180d]/80 lg:block">
      <div className="mx-auto flex max-w-[1200px] justify-center gap-6 py-4 px-4 sm:gap-10 md:gap-12 md:px-6">
        {[
          { href: '#overview', label: 'Aperçu' },
          { href: '#ship', label: 'Le Navire' },
          { href: '#itinerary', label: 'Programme' },
          { href: '#expertise', label: "L'Expertise" },
          { href: '#demeures', label: 'Demeures' },
          { href: '#gallery', label: 'Galerie' },
          { href: '#practical', label: 'Infos & Réservation' },
        ].map((link) => (
          <a key={link.href} href={link.href} className="text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#e2ae12]">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function Overview() {
  return (
    <section id="overview" className="scroll-mt-32">
      <div className="mb-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <h2 className="mb-6 text-3xl font-bold">Éveil Culturel au Fil de l'Eau</h2>
          <p className="text-lg leading-relaxed opacity-80">
            Naviguez au cœur de l'histoire européenne. De la majesté de Vienne aux rives sauvages de la Mer Noire, ce périple à bord du M/S Amadeus
            Diamond est une invitation à la contemplation et à la découverte des splendeurs baroques, des capitales impériales et des paysages
            préservés du Danube.
          </p>
        </div>
        <div className="signature-badge border-l-4 border-l-[#e2ae12] bg-gradient-to-br from-[#fcfbf8] to-[#f3f0e7] p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-[#e2ae12]">verified</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2ae12]">Signature Plein Cap</p>
          </div>
          <h3 className="mb-2 text-sm font-bold">Croisière accompagnée</h3>
          <p className="text-xs italic leading-relaxed opacity-70">
            Un membre de l'équipe Plein Cap vous accompagne tout au long de votre séjour pour assurer votre confort et enrichir votre expérience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t border-[#e2ae12]/10 pt-8 md:grid-cols-4">
        {[
          { label: 'Durée', value: '8 Jours / 7 Nuits' },
          { label: 'Navigation', value: 'Le Danube Bleu' },
          { label: 'Langue', value: 'Français' },
          { label: 'Accompagnement', value: 'Permanent', highlight: true },
        ].map((item) => (
          <div key={item.label}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2ae12]">{item.label}</p>
            <p className={`font-semibold ${item.highlight ? 'text-[#e2ae12]' : ''}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Ship() {
  return (
    <section id="ship" className="scroll-mt-32">
      <div className="overflow-hidden rounded-sm border border-[#e2ae12]/10 bg-white shadow-sm dark:bg-[#12110a]">
        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <span className="rounded bg-[#e2ae12]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2ae12]">Le Navire</span>
            <h3 className="mt-4 mb-2 text-2xl font-bold">M/S Amadeus Diamond</h3>
            <p className="mb-6 text-sm leading-relaxed opacity-70">
              Entièrement rénové, ce bijou de la flotte offre un cadre intimiste et luxueux. Ses larges baies vitrées permettent une immersion totale
              dans les paysages traversés.
            </p>
            <ul className="space-y-3 text-sm">
              {["60 Cabines Extérieures de Prestige", 'Restaurant Gastronomique Panoramique', 'Salon Club & Fitness'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg text-[#e2ae12]">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-full min-h-[300px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1X6IYczeNOIskSHAswcvpVkHqJFkb-xP-IOVU_Hx4GO3RK0at89E-DSKrjvF_nJXn2kejg32xx4IMudLT3StapsOiGnY8oduhwZO4oEif30-27iBCzomPXqHhGTOdwwmSTulw2uY9gzEZSE8KH7Pi7H3YZy9z53vZJzAkkth5tyKLK5sROsQfBGYoIkQRPnyfD6SxXCNmAFpIn0MR8X1X0yCAgY1di0Jhr07ELs2vPaJu7qA0yOyuZnNiCkAqXBx7t7D8r4ejG7M"
              alt="M/S Amadeus Diamond"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Itinerary() {
  return (
    <section id="itinerary" className="scroll-mt-32">
      <h3 className="mb-12 text-3xl font-bold">Programme Quotidien</h3>
      <div className="relative space-y-16 pl-12">
        <div className="absolute left-5 top-0 h-full w-px bg-[#e2ae12]/30" />
        {itinerary.map((step) => (
          <div key={step.day} className="relative">
            <div className="absolute -left-[52px] top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#fcfbf8] bg-[#e2ae12] text-[11px] font-bold text-[#1A2B3C] dark:border-[#1b180d]">
              {step.day}
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="flex-1">
                <h4 className="mb-3 text-xl font-bold uppercase tracking-tight">{step.title}</h4>
                <p className="mb-4 text-sm leading-relaxed opacity-70">{step.desc}</p>
              </div>
              <div className="aspect-video w-full flex-shrink-0 overflow-hidden rounded-sm md:w-48">
                <img src={step.image} alt={step.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e2ae12] transition-opacity hover:opacity-70">
        Voir le reste du programme <span className="material-symbols-outlined">expand_more</span>
      </button>
    </section>
  )
}

function Practical() {
  return (
    <div className="rounded-sm border border-[#e2ae12]/20 bg-white p-8 shadow-xl dark:bg-[#12110a]">
      <h4 className="mb-6 border-b border-[#e2ae12]/10 pb-4 text-xl font-bold">Informations & Réservation</h4>
      <div className="mb-8 space-y-6">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2ae12]">Le prix comprend</p>
          <ul className="space-y-2 text-xs opacity-80">
            {[
              'Hébergement en cabine de luxe',
              'Accompagnement Plein Cap permanent',
              'Pension complète & Boissons',
              'Excursions mentionnées',
              'Wi-Fi gratuit à bord',
            ].map((item, idx) => (
              <li key={item} className={`flex items-start gap-2 ${idx === 1 ? 'font-bold text-[#1A2B3C] dark:text-white' : ''}`}>
                <span className={`material-symbols-outlined text-[16px] text-[#e2ae12] ${idx === 1 ? 'fill-current' : ''}`}>
                  {idx === 1 ? 'stars' : 'done'}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-8 rounded-sm border border-[#e2ae12]/10 bg-[#e2ae12]/5 p-4 text-center">
        <p className="mb-1 text-[10px] font-bold uppercase text-[#e2ae12]">À partir de</p>
        <p className="text-3xl font-bold text-[#1A2B3C] dark:text-white">2 450 €</p>
        <p className="text-[10px] opacity-60">par passager</p>
      </div>
      <button className="w-full rounded-sm bg-[#e2ae12] py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#1A2B3C] shadow-lg shadow-[#e2ae12]/20 transition hover:bg-[#e2ae12]/90">
        Réserver
      </button>
      <button className="mt-4 w-full rounded-sm border border-[#1A2B3C]/20 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1A2B3C] transition hover:border-[#e2ae12] dark:border-white/20 dark:text-white">
        Télécharger la brochure
      </button>
    </div>
  )
}

function Expertise() {
  return (
    <section id="expertise" className="w-full bg-[#f3f0e7] py-24 dark:bg-[#f3f0e7]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">

        <div className="mb-16 text-center">
          <h3 className="text-4xl font-serif italic text-[#1A2B3C]">L'Expertise Plein Cap</h3>
          <div className="mt-6 h-px w-24 bg-[#e2ae12] mx-auto" />
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
          {experts.map((expert) => (
            <div key={expert.name} className="expert-card group flex flex-col items-center text-center">
              <div className="mb-8 h-64 w-64 overflow-hidden bg-gray-200">
                <img src={expert.image} alt={expert.name} className="expert-portrait h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
              </div>
              <h4 className="mb-2 text-xl font-bold uppercase tracking-[0.2em]">{expert.name}</h4>
              <p className="mb-6 text-sm font-semibold uppercase tracking-tight text-[#e2ae12]">{expert.role}</p>
              <p className="px-4 text-lg font-serif italic leading-relaxed text-[#1A2B3C]/70">{expert.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Demeures() {
  return (
    <section id="demeures" className="mx-auto mb-24 max-w-[1200px] px-4 py-12 sm:px-6">
      <div className="mb-12 flex items-center justify-between">
        <h3 className="text-3xl font-bold uppercase tracking-tight">Demeures d'Exception</h3>
        <div className="flex gap-4">
          {[ 'chevron_left', 'chevron_right' ].map((icon) => (
            <button
              key={icon}
              className="flex h-12 w-12 items-center justify-center border border-[#1A2B3C]/10 transition hover:border-[#e2ae12] hover:bg-[#e2ae12]"
            >
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {demeures.map((d) => (
          <div key={d.name} className="group relative h-[500px] overflow-hidden">
            <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C]/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e2ae12]">{d.city}</p>
              <h4 className="mb-2 text-xl font-bold text-white">{d.name}</h4>
              <p className="text-sm font-serif italic text-white/70">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section id="gallery" className="mx-auto mb-24 max-w-[1200px] px-4 sm:px-6">
      <h3 className="mb-8 text-3xl font-bold uppercase tracking-tight">Souvenirs de Voyage</h3>
      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {gallery.map((src, idx) => (
          <div
            key={src}
            className={`${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${idx === 2 ? 'md:row-span-2' : ''} ${idx === 5 ? 'md:col-span-2' : ''} overflow-hidden rounded-sm`}
          >
            <img src={src} alt="Souvenir" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  )
}
