import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'

type NewsletterPageProps = {
  params: { slug: string }
}

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "L'Art du Voyage : Détail Newsletter | Plein Cap",
  description: "Lecture d'une édition détaillée de la Lettre Plein Cap.",
}

export default function NewsletterDetailPage({ params }: NewsletterPageProps) {
  const slug = params.slug
  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#F9F7F2] text-[#001F3F]`}>
      <SiteHeader />
      <main className="relative flex-1 pt-24 md:pt-28">
        <Breadcrumb slug={slug} />
        <Hero />
        <Content />
      </main>
      <SiteFooter />
    </div>
  )
}

function Breadcrumb({ slug }: { slug: string }) {
  const label = slug.replace(/-/g, ' ')
  return (
    <div className="mx-auto max-w-7xl px-6 py-6 lg:px-20">
      <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#001F3F]/50">
        <a className="hover:text-[#001F3F]" href="/">Accueil</a>
        <span>/</span>
        <a className="hover:text-[#001F3F]" href="/news-letter">Newsletter</a>
        <span>/</span>
        <span className="text-[#001F3F]">{label}</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="w-full">
      <div className="relative h-[70vh] w-full overflow-hidden bg-[#001F3F]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,31,63,0.2), rgba(0,31,63,0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZmE6rB46Q2pNLP8dtTpLcfQy52G13kJJMM9f4M1Uv30QFX9uXQOvEiqnJpVUmasQWBujwVq6ZPEjsbHzlnr1-2_WRY6t5Mh4UDKMQ0M9g6-HhHqHiuJ3yAdWXNsb2yfJ3_hsbS7YtlM0Knn_17UxpZsoPMnZI6QtebJC0mEFDhGm1BOcQX1tQlYDoOZeZZPDpWDNv2RmQz7kPXRk5XSFy-NAEhrJ3RUIqF8ep1hPY0lqFf0I6rm-DIblSfAenTLen_5zMWt7bMDs')",
          }}
        />
        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-10 text-white lg:px-20 lg:pb-20">
          <span className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#f4c025]">Édition Spéciale Culture</span>
          <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight lg:text-7xl">
            Splendeurs de l'Adriatique : Un voyage au cœur de l'histoire
          </h1>
          <div className="flex items-center gap-6 text-sm font-sans italic text-white/70">
            <span>Par Jean-Pierre Vernet</span>
            <span className="h-1 w-1 rounded-full bg-[#f4c025]" />
            <span>8 min de lecture</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Content() {
  return (
    <div className="relative mx-auto flex max-w-7xl gap-16 px-6 py-16 lg:px-20">
      <Sidebar />
      <Article />
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col justify-between border-r border-[#001F3F]/10 pr-12 lg:flex">
      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#001F3F]/40">Progression</p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold italic">
              <span>Lecture</span>
              <span>45%</span>
            </div>
            <div className="h-[2px] w-full bg-[#e8e2ce]">
              <div className="h-full bg-[#f4c025]" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#001F3F]/40">Actions</p>
          <a className="group flex items-center gap-4 text-[#001F3F] transition-colors hover:text-[#f4c025]" href="#">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">share</span>
            <span className="text-xs font-bold uppercase tracking-wider">Partager</span>
          </a>
          <a className="group flex items-center gap-4 text-[#001F3F] transition-colors hover:text-[#f4c025]" href="#">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">picture_as_pdf</span>
            <span className="text-xs font-bold uppercase tracking-wider">Version PDF</span>
          </a>
          <a className="group flex items-center gap-4 text-[#001F3F] transition-colors hover:text-[#f4c025]" href="#">
            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">bookmark</span>
            <span className="text-xs font-bold uppercase tracking-wider">Enregistrer</span>
          </a>
        </nav>
      </div>
      <div className="space-y-4 bg-[#f4c025]/10 p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#001F3F]">Archives</p>
        <p className="text-xs italic leading-relaxed text-[#001F3F]">Retrouvez toutes nos lettres d'information dans votre espace membre.</p>
        <button className="w-full bg-[#f4c025] py-3 text-[10px] font-bold uppercase tracking-widest text-[#001F3F] transition-all hover:bg-[#001F3F] hover:text-white">
          Consulter
        </button>
      </div>
    </aside>
  )
}

function Article() {
  return (
    <article className="flex-1 max-w-4xl">
      <div className="space-y-12">
        <div className="columns-1 gap-12 text-justify text-lg leading-relaxed lg:columns-2">
          <p className="mb-6 first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold first-letter:text-[#f4c025]">
            L'Adriatique n'est pas seulement une mer ; c'est un carrefour de civilisations où chaque vague semble murmurer des récits millénaires. De Venise à
            Corfou, les côtes découpées révèlent des cités de pierre blanche qui ont vu passer les galères romaines, les marchands vénitiens et les poètes de la
            Renaissance.
          </p>
          <p className="mb-6">
            Naviguer dans ces eaux, c'est entreprendre un pèlerinage esthétique. Le contraste entre le bleu profond des abysses et l'éclat solaire des façades
            dalmates crée une harmonie visuelle que peu d'autres lieux au monde peuvent égaler. Chaque escale est une immersion dans une strate différente de
            notre héritage européen.
          </p>
        </div>

        <div className="grid h-[500px] grid-cols-12 gap-4">
          <div
            className="col-span-8 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApus9IuxeAw7AljoE4mD9IAia6REcf4qKLrEvXEv-u4OnwcIoFVsMSfo9YmxS71-5DjeMKzjmZtJ-e2ZqWuemv0jaravbxzXvoRFvXFOTw_FHFT1RzTtiR3yaML0I7mCjLKB0yueIJbluG9MM_fWfslz813mepHMGAAEGozvuMqYsViIJT4DjEOJm1ldVio3rSF_K8wK_qfodM4HWgeVfWeNzSfuioNtUod4eeOGhQYBsI7DfRPrUqvcSPoUWgvLFFiY0aJbrOmj4')",
            }}
          />
          <div className="col-span-4 flex flex-col gap-4">
            <div
              className="flex-1 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcQZQ5CKhsL9JyXJMyLBOLDb1MeSr7i9zOiSyAV66iMNYJEg_YbUmUx_tKVSr9z-zK6grTCi8nKT7gwpNI_J-YqmEr0_MYekOwIuQtWep0_FXR25l3gCWOLw71OITNOQmsuW-Uz_4BX1qYa3nrykpduDEQZognGKybqOCfOQCNF7l7FL8jNfTmhBPQUsc2FGu1jHVAl0aEVZn2Gbk3Yg80eVQKcLdhgSMccl5_zGwdxEaYkkoqHhLOEK7-K0GkGemb_rje2s2eooU')",
              }}
            />
            <div
              className="flex-1 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDh5_vbGR_VxM1Wqv5KHlNectL_sGEmBuP1e3uRBfgVI4PLxaZ1tG3lHp-NhiOSnaXGl_XQgh_hITylN4wzNCbUkwBV0SSBzKpoqgx9hUtLZAhndMnD-5BD8EVEwSKbEfpbAteEQflAxGADyB3c6cneKHpe0z_ZxVbY6VJFnYYePqLlPJiw7zkYVlHlwAP5IKLMXOlxVEjScaUgCyBSQdYcVx7yTT6C5bLvtQwCSANYQVsrE6EBBfQOpti89T4-vK-J9ueT7H4Ly4Q')",
              }}
            />
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#001F3F] p-12 text-white">
          <span className="material-symbols-outlined absolute -right-4 -top-4 rotate-12 text-9xl text-white/5">lightbulb</span>
          <h3 className="mb-6 flex items-center gap-3 text-2xl text-[#f4c025]">
            <span className="material-symbols-outlined">auto_stories</span>
            Le Saviez-vous ?
          </h3>
          <p className="relative z-10 text-lg italic leading-relaxed">
            "La ville de Raguse (l'actuelle Dubrovnik) fut la première au monde à abolir l'esclavage en 1416, bien avant les grandes puissances coloniales. Sa
            devise, 'Libertas', gravée sur les portes de la forteresse de Lovrijenac, témoigne d'une fierté républicaine qui a résisté aux empires les plus
            puissants pendant des siècles."
          </p>
        </div>

        <div className="columns-1 gap-12 text-justify text-lg leading-relaxed lg:columns-2">
          <h2 className="mb-8 block w-full border-l-4 border-[#f4c025] pl-6 text-3xl">L'Héritage de la Sérénissime</h2>
          <p className="mb-6">
            L'influence vénitienne est omniprésente le long de la côte dalmate. Le lion de Saint-Marc, sculpté dans la pierre, garde encore les entrées de villes
            comme Zadar ou Kotor. Cette présence n'était pas seulement militaire ou commerciale, elle était profondément culturelle, apportant le goût des arts,
            de l'opéra et d'une architecture raffinée.
          </p>
          <p>
            Aujourd'hui, flâner dans ces ruelles, c'est s'exposer à un dialogue permanent entre l'Orient et l'Occident. Les clochers romans côtoient des dômes
            byzantins, tandis que les marchés locaux exhalent des parfums d'épices qui rappellent les routes de la soie qui aboutissaient autrefois dans ces
            ports dynamiques.
          </p>
        </div>

        <blockquote className="border-y border-[#001F3F]/10 py-16 text-center">
          <p className="mx-auto max-w-2xl text-4xl italic leading-snug">
            "L'Adriatique est le miroir où l'Europe contemple son passé pour mieux dessiner son avenir."
          </p>
          <cite className="mt-6 block text-sm font-bold uppercase tracking-widest text-[#f4c025]">— André Suarez, Voyageur</cite>
        </blockquote>

        <div className="mt-20 flex flex-col items-center gap-12 bg-[#e8e2ce] p-8 dark:bg-zinc-800 lg:flex-row lg:p-16">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center shadow-2xl lg:w-1/3"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_7Ep8dJSYkCf_23tRa5tZ4uXxeF9HPeq29zH9EabAyZQQCy_7mQ6Tti6rr8PYlECJ0nMVrb4DUCfYKGu7IyBnkYyfHsNd7BOn7AZNSFuIC1lltvys2gS2e9iJlW5j0btj_uUbJ6KyCvTaijzop5_-m3FIDmbvCCmYBI4y_tV9FAnduw2ltz0skt1VlIpS_yvyqKZi36I_eWTyAbl_Mc5tB0gqWq4HLoFp2OTT2b-5mxYE9agRXuTr9WMYkJAgUQ5QsPnQiR7PD0M')",
            }}
          />
          <div className="flex-1 space-y-8">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f4c025]">Invitation au voyage</h4>
              <h3 className="text-4xl leading-tight text-[#001F3F] dark:text-white">Croisière : Les Perles de l'Adriatique</h3>
            </div>
            <p className="text-lg italic leading-relaxed text-[#001F3F]/80 dark:text-gray-300">
              Embarquez à bord du MS Plein Cap pour une odyssée de 12 jours. Un itinéraire exclusif incluant des conférenciers experts en histoire de l'art et des
              escales secrètes inaccessibles aux grands paquebots.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-[#f4c025] px-10 py-5 text-sm font-bold uppercase tracking-widest text-[#001F3F] transition-all hover:bg-[#001F3F] hover:text-white">
                Voir l'itinéraire
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="border-2 border-[#001F3F] px-10 py-5 text-sm font-bold uppercase tracking-widest text-[#001F3F] transition-all hover:bg-[#001F3F] hover:text-white">
                Demander la brochure
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-50 h-1 w-full bg-[#e8e2ce] lg:hidden">
        <div className="h-full bg-[#f4c025]" style={{ width: '45%' }} />
      </div>
    </article>
  )
}
