import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "L'Équipe Plein Cap | Plein Cap",
  description: "Découvrez l'équipe Plein Cap : direction, accompagnateurs, conseillers et opérations.",
}

const team = [
  {
    name: 'Jean-Marc Lefevre',
    role: 'Directeur',
    quote: 'Parcourir le monde est une vocation.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPOk81184LJWhGf6m18VIsq4SnoEjSlatNscF8JDeJPfIOfXkA2-HNSBnfQ7on74Uic00DxP6ElfMmn9lYknYUQBxXj_rJA331ZXr5jmrncnJ2hgRI9SqttJ0Bq__gNm0WyFn_XlxLksgbnfxg4alKwHSNi2NmFUdcKAzYDaUohHRQhzBXgsTCuL0ruMCABnIUMm-UIYo_KU3esbe469cUjlSO_MPHHHn66KUoEeU7qlWVdTS60LcKJTQnYqYYLecXQDBItSYEamw',
    longBio: 'Vision culturelle, rigueur, selection des navires et itineraires.',
    layout: 'tall',
  },
  {
    name: 'Helene Dubois',
    role: 'Responsable Destinations',
    quote: 'Curiosite et reperage despaces confidentiels.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhfuPH8Tz3rl0o8F1i36-hHyuR_VmwK1_Mwpz5A2c8ZpH-msMb55mAgf-jw47eiIasDKeRln6CXsZkbTY0x3lGxxMR3oE1zFEcATKZCj_TVGtvY8NfcmlcTClaP_6ghrD2nos7Su6hWcl6GGc6x71BbQNPmRmXolUmhbkgjA-26JIiifYINbc3DkMJDp2JJrzmuoyjZbsky63NEt8JURtGaEFAf3ynNJ4VcIb7SZS5wgD9X8AzD5FBCzW_y6u2Fh0LO5SYjxVQ7aU',
    longBio: 'Geographe, programmes exclusifs Mediterranee et Europe du Nord.',
    layout: 'mid',
  },
  {
    name: 'Antoine Moreau',
    role: 'Accompagnateur Senior',
    quote: 'Partager lhistoire des cotes lointaines.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLP-Rk-tCX85VCO9Yjeeoi0N36Sg3S9jI7okoFqUxRoRysMzTfuFIR7bjJc5QIl3HGt9iybwmd24I-qLp41eF6l1K386X6S7wsZGDLiKYXhhDKH9gNM6cq2BOyPkPxgqfahEThP6J5NOgIl_HId1x0xybdlneX0VgfJI6iHk4JsodIAxjt06cKOldRL0twhlZ5gH7W9pk523uL49o3KxE-_7TEwwHFkA-giALV2DJ08T9xmuAXSWyBu5-TJZTr-apmE4Leuciuh4',
    longBio: 'Ancien professeur dhistoire, narration et pedagogie.',
  },
  {
    name: 'Sophie Laurent',
    role: 'Accompagnateur Senior',
    quote: 'Lexcellence du detail distingue un voyage.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB222vnm6uq7rYmajCJ_bkUSa5Jo9iwSb9BRXRIGYcbVxbSz5NFjFb-zyKFV_-d7b_AMG6_HIUEmmMZEOOL7eJG-vAVmli4vs1Hh0zPLFras0DgSdiUrj3pqJTbXSg3QT-RSWQ6oUyEX0dPyJ7uhJjRSe6ZzRAx5nI5Z3m0jlANElh7f2JKrrzmUXy5CuSfJu220_5IEs5EQwWBeSX8xB_Woo779nci0CttsFIYe1DVk3AiOqtQZicWZjiQ0LU6ljTX-dCnqz3SLc0',
    longBio: 'Logistique de luxe et botanique, precision des excursions.',
  },
  {
    name: 'Marc-Antoine Girard',
    role: 'Conseiller Voyage',
    quote: 'Votre confort commence par une ecoute.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMgJToiVs0Du_P6NglumcEwcT3u3aJ8Zntj5pkXyuZJ0sw7f1iIARBQWzPacFCvx6ZMdm20giL7eM1XitDLxRN-D9o6Q3ncsoM2sSzB7EGltmk0kFHtpDOYJnXrEOiHAmEvf8Pw3dheBoxjGMdIzhxorFxiwmTLYywlFu8xXhGiLCoM6a1Zgod0GjR1eauCh8JfqU9IJB8iHzz9niP4iVM3BCHJ-FJs2TgFegFElVelgTg3cgTdS_HdHEBK-mMuX4kmANkUJeI7xc',
    longBio: 'Premier point de contact, conseil cabines et ponts.',
  },
  {
    name: 'Isabelle Mercier',
    role: 'Conseillere Voyage',
    quote: 'Chaque escale est une page que nous ecrivons.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbp8rslkj291KG51ex5HtsVf6fh38Yxgd3-2ikl_j3UixzOyivHLUY6RAqaZdONnxk8lZLeweSqP0ctsVniX1GjZPlkRS6_WG8j9-yy0a1DXlbw7r68SQeg5HtVNpdbmuDXa7KH825ck8pCwo10LKfzuqaEH0FY_s_DCHTbrHSRC0JrZWRIpwhBMghnPI0lPhngn3qZS_VfPlOFf3xYM_mCPUkF8hHgY3Yy_PlLSZgErNP3kYHFjTBVkdckxgWHSWav6dCDkwOo98',
    longBio: 'Conseillere experimentee, personnalisation des reservations.',
  },
  {
    name: 'Franck Vallet',
    role: 'Logistique & Operations',
    quote: 'La navigation exige precision constante.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFE0JHyVkjaO9UjuGhTHGLX6srqdyL9w6ILl86CPclRSDcrE8zgicq1xRIWvsm1KECDRCnyGAQQErCfAl6XIs8AbfJHvI06PwH781MNwg216k7yzzHxqUw1HWiddrnAlPPp8lGzvwkU24EtVq2EVGXkvO1y1AKwM1rtCdOu0-NbAIETm0CUzu9SSiOvC2VOMTHKJE8MyA7BqVLS3NAUk6btq1nx3TOnH2Gz9mg8WnwEV68tKa-jXCuHpUHNmwFbEkW5ImfTXZouyk',
    longBio: 'Coordination ports, armateurs et equipes pour une experience fluide.',
  },
]

export default function EquipePage() {
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f9f8f6] text-[#1a2b3c] dark:bg-[#1a2b3c] dark:text-[#f9f8f6]`}>
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1200px] px-6 pt-28">
        <Hero />
        <TeamGrid />
        <CTA />
      </main>

      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="py-24 text-center">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-[#1a2b3c] dark:text-white md:text-7xl">L'Équipe Plein Cap</h1>
        <div className="mx-auto my-8 h-[2px] w-16 bg-[#c5a059]" />
        <p className="text-lg font-medium italic leading-relaxed text-[#c5a059] md:text-xl">
          Plus de 30 ans de passion et d'expertise maritime au service de vos voyages d'exception.
        </p>
      </div>
    </section>
  )
}

function TeamGrid() {
  return (
    <section className="pb-24">
      <div className="grid grid-cols-1 gap-y-24 gap-x-12 md:grid-cols-12">
        {team.slice(0, 2).map((member, idx) => (
          <TeamCard key={member.name} member={member} className={idx === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-24'} />
        ))}

        <div className="md:col-span-12 py-8">
          <div className="divider-gold opacity-30" />
        </div>

        {team.slice(2).map((member, idx) => (
          <TeamCard
            key={member.name}
            member={member}
            className={idx < 3 ? 'md:col-span-4' : 'md:col-span-6 md:mt-12'}
          />
        ))}
      </div>
    </section>
  )
}

type TeamMember = (typeof team)[number]

function TeamCard({ member, className = '' }: { member: TeamMember; className?: string }) {
  return (
    <div className={`group ${className}`}>
      <div className="relative overflow-hidden bg-gray-200" style={{ aspectRatio: member.layout === 'tall' ? '4 / 5' : member.layout === 'mid' ? '3 / 4' : '1 / 1' }}>
        <div
          className="portrait-hover h-full w-full bg-cover bg-center grayscale transition duration-500 group-hover:grayscale-0"
          style={{ backgroundImage: `url('${member.image}')` }}
        />
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c5a059]">{member.role}</p>
          <h3 className="text-2xl font-bold text-[#1a2b3c] dark:text-white md:text-3xl">{member.name}</h3>
        </div>
        <p className="text-base leading-snug italic text-[#1a2b3c]/70 dark:text-white/70">{member.quote}</p>
        <details className="group/bio">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#c5a059] transition hover:opacity-80">
            <span className="group-open:hidden">En savoir plus +</span>
            <span className="hidden group-open:inline">Réduire -</span>
          </summary>
          <div className="mt-6 border-l border-[#c5a059]/30 pl-6">
            <p className="text-sm leading-relaxed text-[#1a2b3c]/80 dark:text-white/80">{member.longBio}</p>
          </div>
        </details>
      </div>
    </div>
  )
}

function CTA() {
  return (
    <section className="pb-24 text-center">
      <div className="divider-gold mb-24 opacity-20" />
      <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-[#c5a059]">Une question ?</h4>
      <a
        href="#"
        className="text-lg font-medium text-[#1a2b3c] underline decoration-[#c5a059]/50 underline-offset-8 transition hover:decoration-[#c5a059] dark:text-white"
      >
        Contactez-nous pour organiser votre prochain départ
      </a>
    </section>
  )
}
