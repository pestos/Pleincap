import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import EscapadesIntro from '@/components/EscapadesIntro'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getTrains } from '@/lib/payload-queries'
import TrainsClient from './TrainsClient'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export default async function NosTrainsPage() {
  const trains = await getTrains()

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#f8f7f6] text-[#1A2433]`}>
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">
        <EscapadesIntro
          eyebrow="L'Art du Voyage Ferroviaire"
          title="Nos trains"
          description="Nos trains d'exception vous transportent au coeur des plus beaux paysages du monde. A bord de la flotte ferroviaire Plein Cap, chaque voyage est une invitation a la decouverte, portee par un service d'excellence et une atmosphere feutree."
          edition=""
        />
        <TrainsClient trains={trains} />
        <Philosophy />
      </main>
      <SiteFooter />
    </div>
  )
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
                          Plus qu&apos;un voyage, une experience hors du temps.
                      </h3>
                      <p className="text-lg leading-relaxed text-white/70">
                          A bord de nos trains Plein Cap, chaque detail est pense pour
                          votre confort. De la gastronomie inspiree des terroirs
                          traverses aux conferences de nos experts, nous cultivons
                          une approche humaniste du voyage ferroviaire.
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
                          aria-label="Compartiment avec vue panoramique"
                      />
                  </div>
              </div>
          </div>
      </section>
  );
}
