import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import EscapadesIntro from '@/components/EscapadesIntro'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: 'Nous contacter | Plein Cap',
  description:
    "Bénéficiez de l'expertise de nos conseillers pour concevoir votre prochain voyage d'exception. Un accompagnement sur-mesure pour vos envies d'évasion.",
}

const mapImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBVioqHEQZM1t_NI1ZZsnakun9dpbFQD8uuFu_oRR5JD3v9_8MKWzMsPXFXHpZJ-XxChS4NUs_evknG64_lwvDAZx2ugPmk-hqIdtvg32UeVfCN4-Bfy0bRbLPfxdM6O7wp-BdZOxp0_cPw-rf0o8EsPnpDK-nx35HXTwou_6D5xa8cqZroRcZQXJTkdeQccEX-ayNqZVx_WG52EsldxIpHK6HdZAJwdLAoMSHT9WUZuSCL13HFLY-GQMpiPJBuluFJorxBULY34Bw'

const motifs = [
  "Projet de voyage d'exception",
  'Demande de brochure prestige',
  'Privatisation & Événements',
  'Question administrative',
]

export default function ContactPage() {
  return (
    <div className={`${plusJakarta.className} min-h-screen bg-ecru text-abyss`}> 
      <SiteHeader />
      <main className="px-6 pb-20 pt-28 lg:px-24 xl:px-32">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
          <EscapadesIntro
            eyebrow="Conciergerie Plein Cap"
            title="Nous contacter"
            description="Bénéficiez de l'expertise de nos conseillers pour concevoir votre prochain voyage d'exception. Un accompagnement sur-mesure pour vos envies d'évasion."
            edition=""
          />

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col gap-12">
              <section>
                <h3 className="mb-8 border-b border-primary/30 pb-4 text-xs font-bold uppercase tracking-[0.25em]">Nos coordonnées</h3>
                <div className="flex flex-col divide-y divide-primary/10">
                  <InfoRow icon="location_on" label="Siège social" value="8 Avenue de Verdun, 06000 Nice, France" />
                  <InfoRow icon="call" label="Téléphone" value="+33 (0)4 93 00 00 00" />
                  <InfoRow icon="schedule" label="Horaires d'ouverture" value={['Du lundi au vendredi', '08h30 – 12h00', '13h30 – 18h00']} />
                  <InfoRow icon="mail" label="Email" value="conciergerie@pleincap.com" />
                </div>
              </section>

              <section>
                <div className="relative aspect-video overflow-hidden bg-abyss/5">
                  <img
                    src={mapImage}
                    alt="Carte de Nice et localisation du siège Plein Cap"
                    className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-primary/5" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="block h-4 w-4 animate-pulse rounded-full bg-primary shadow-[0_0_18px_rgba(197,160,80,0.6)]" />
                  </div>
                </div>
              </section>
            </div>

            <section className="rounded-sm border border-primary/10 bg-white/90 p-10 shadow-sm backdrop-blur dark:bg-abyss/80">
              <h3 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.25em]">Formulaire de contact</h3>
              <form className="space-y-8">
                <Field label="Nom & Prénom">
                  <input
                    type="text"
                    name="name"
                    className="w-full border-none bg-transparent px-0 py-2 text-base text-abyss placeholder-abyss/30 focus:ring-0"
                    placeholder="Jean Dupont"
                    required
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    className="w-full border-none bg-transparent px-0 py-2 text-base text-abyss placeholder-abyss/30 focus:ring-0"
                    placeholder="jean.dupont@email.com"
                    required
                  />
                </Field>

                <Field label="Téléphone">
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border-none bg-transparent px-0 py-2 text-base text-abyss placeholder-abyss/30 focus:ring-0"
                    placeholder="+33 (0)6 00 00 00 00"
                  />
                </Field>

                <Field label="Motif de votre demande">
                  <div className="relative">
                    <select
                      name="motif"
                      className="w-full appearance-none border-none bg-transparent px-0 py-2 text-lg font-serif text-abyss focus:ring-0"
                      defaultValue="projet"
                    >
                      {motifs.map((motif) => (
                        <option key={motif} value={motif}>
                          {motif}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-primary">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                    <div className="absolute bottom-0 left-0 h-px w-full bg-abyss/10" />
                  </div>
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full border-none bg-transparent px-0 py-2 text-base text-abyss placeholder-abyss/30 focus:ring-0"
                    placeholder="Comment pouvons-nous vous aider ?"
                    required
                  />
                </Field>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full h-14 bg-primary text-abyss text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-abyss hover:text-primary"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
              <p className="mt-8 text-center text-[11px] font-light leading-relaxed text-abyss/40">
                Vos données sont traitées par Plein Cap pour répondre à votre demande conformément à notre politique de confidentialité.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string | string[] }) {
  const lines = Array.isArray(value) ? value : [value]
  return (
    <div className="grid grid-cols-[40px_1fr] items-start gap-3 py-6">
      <span className="material-symbols-outlined text-xl text-primary">{icon}</span>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{label}</p>
        <div className="space-y-0.5 text-base font-medium text-abyss">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group border-b border-abyss/10 transition-colors focus-within:border-primary">
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{label}</label>
      {children}
    </div>
  )
}
