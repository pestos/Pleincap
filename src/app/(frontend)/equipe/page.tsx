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
        name: "Jean-Paul Macocco",
        role: "Directeur",
        quote: "Parcourir le monde est une vocation.",
        image: "https://www.plein-cap.com/images/stories/pc/photo-direction.jpg",
        longBio:
            "Vision culturelle, rigueur, selection des navires et itineraires.",
        layout: "tall",
    },
    {
        name: "Karine",
        role: "Responsable Financier",
        quote: "Curiosite et reperage despaces confidentiels.",
        image: "https://www.plein-cap.com/images/stories/pc/karine.jpg",
        longBio:
            "« Lorsqu’en 1996 j’intègre la société d’autocars TVL, je n’imaginais pas que tant d’opportunités professionnelles s’offriraient à moi. Mes débuts m’ont permis de me familiariser au secteur du transport. Puis, entre 1997 et 2010, j’ai eu la chance de vivre l’aventure Adriana et de remplir de nombreuses tâches : approvisionnement du navire, gestion de l’équipage, réservations des ports, escales, comptabilité… Forte de cette solide expérience et de mes compétences financières antérieures, en 2010 je rejoins la section voyages et tout naturellement prend en charge le département financier. Mes multiples casquettes m’ont permis de devenir responsable des brochures et des newsletters ainsi que du secteur aérien . Mon moment croisière préféré ? Le coucher de soleil en navigation. Même si j’ai eu le privilège d’en voir des milliers, je ne me suis jamais lassée de les admirer.»",
        layout: "mid",
    },
    {
        name: "Magali",
        role: "Accompagnateur Senior",
        quote: "Partager lhistoire des cotes lointaines.",
        image: "https://www.plein-cap.com/images/stories/pc/magali.jpg",
        longBio:
            "« Déjà 24 ans que j’ai rejoint Plein Cap et pourtant, j’ai l’impression que c’était hier ! Mes 10 premières années furent entièrement consacrées à la navigation. Du nord au sud, de l’Asie à l’Arctique en passant par la mer Rouge, c’est en tant que Responsable Excursions et Directrice de croisières sur les bateaux affrétés par Plein Cap que j’ai sillonné mers et océans. Depuis 2011 j’ai posé mes bagages au siège, même si je continue ponctuellement à vous accompagner dans vos croisières. Cette expertise du terrain me sert au quotidien à créer des programmes captivants que cela soit pour une croisière maritime ou fluviale, une escapade terrestre ou encore un circuit ferroviaire. Ma destination croisière préférée ? Je dirais la navigation dans les fjords de Norvège dont la beauté est à couper le souffle.»",
    },
    {
        name: "Williams",
        role: "Accompagnateur Senior",
        quote: "Lexcellence du detail distingue un voyage.",
        image: "https://www.plein-cap.com/images/stories/pc/williams.jpg",
        longBio:
            "« Mon entrée dans le monde maritime ? Elle remonte à 2003, lorsque j’ai intégré la Marina Cruises Company qui gérait alors le MS Adriana. En tant qu’aide-comptable, j’ai pu effectuer diverses missions : achats, salaires ou encore comptabilité et c’est en 2010 que je rejoins l’équipe Plein Cap. Véritable couteau suisse, je m’occupe aussi bien de la PAO (programmes, brochures, dépliants…) que de l’administratif, de la billetterie ou de l’envoi des carnets de voyage. J’ai par ailleurs eu l’occasion d’être l’interlocuteur privilégié des passagers du MS Berlin à destination de la Corse et de la Sardaigne. Touche à tout passionné, j’ai également été amené à gérer l’assistance aéroport [accueil, bagages, accompagnement en vol. Mon coup de cœur croisières? Le cabotage en Croatie sur la sublime Adriatique.»",
    },
    {
        name: "Guillaume",
        role: "Conseiller Voyage",
        quote: "Votre confort commence par une ecoute.",
        image: "https://www.plein-cap.com/images/stories/pc/guillaume.jpg",
        longBio:
            "« Véritable globe-trotter des mers, ma rencontre avec Plein Cap remonte à 2005. J’ai pleinement vécu l’aventure de l’Adriana pour y avoir pris mes quartiers pendant de nombreuses années et ainsi découvert l’Europe du Nord, la Lybie, l’Egypte, la Jordanie, la Syrie, la Turquie ou d’autres destinations plus classiques comme la Grèce, la Croatie, l’Italie ou la Corse. Chaque croisière m’a permis de renforcer ma connaissance du terrain,mais aussi de tester ma réactivité dans l’action. Depuis plusieurs années je navigue entre le bureau et les démarches administratives à préparer en amont des voyages. Passionné par la Croatie, je vous la ferai découvrir là où elle se révèle le mieux en yachting. Mon coup de cœur croisières ? Je dirais plutôt les rencontres-surprises en mer avec les baleines, les dauphins ou encore les oiseaux marins.»",
    },
    {
        name: "Isabelle Mercier",
        role: "Conseillere Voyage",
        quote: "Chaque escale est une page que nous ecrivons.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbp8rslkj291KG51ex5HtsVf6fh38Yxgd3-2ikl_j3UixzOyivHLUY6RAqaZdONnxk8lZLeweSqP0ctsVniX1GjZPlkRS6_WG8j9-yy0a1DXlbw7r68SQeg5HtVNpdbmuDXa7KH825ck8pCwo10LKfzuqaEH0FY_s_DCHTbrHSRC0JrZWRIpwhBMghnPI0lPhngn3qZS_VfPlOFf3xYM_mCPUkF8hHgY3Yy_PlLSZgErNP3kYHFjTBVkdckxgWHSWav6dCDkwOo98",
        longBio: "Conseillere experimentee, personnalisation des reservations.",
    },
    {
        name: "Franck Vallet",
        role: "Logistique & Operations",
        quote: "La navigation exige precision constante.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFE0JHyVkjaO9UjuGhTHGLX6srqdyL9w6ILl86CPclRSDcrE8zgicq1xRIWvsm1KECDRCnyGAQQErCfAl6XIs8AbfJHvI06PwH781MNwg216k7yzzHxqUw1HWiddrnAlPPp8lGzvwkU24EtVq2EVGXkvO1y1AKwM1rtCdOu0-NbAIETm0CUzu9SSiOvC2VOMTHKJE8MyA7BqVLS3NAUk6btq1nx3TOnH2Gz9mg8WnwEV68tKa-jXCuHpUHNmwFbEkW5ImfTXZouyk",
        longBio:
            "Coordination ports, armateurs et equipes pour une experience fluide.",
    },
];

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
