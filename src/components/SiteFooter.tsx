import NewsletterForm from './NewsletterForm'

export default function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-background-light pb-12 pt-20 dark:bg-background-dark">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="mb-20 grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          <div>
            <h2 className="serif-heading mb-6 text-4xl italic">Restez informé</h2>
            <p className="max-w-md text-sm font-light opacity-70">Recevez un accès anticipé aux nouveaux itinéraires, du contenu culturel exclusif et de l'inspiration au voyage.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Nos Croisières</h6>
            <ul className="flex flex-col gap-2 text-xs font-light">
              <li><a className="hover:text-primary" href="/catalogue">Catalogue</a></li>
              <li><a className="hover:text-primary" href="/destinations">Destinations</a></li>
              <li><a className="hover:text-primary" href="/catalogue?voyageType=maritime">Croisières maritimes</a></li>
              <li><a className="hover:text-primary" href="/catalogue?voyageType=fluviale">Croisières fluviales</a></li>
              <li><a className="hover:text-primary" href="/voyages-en-train">Voyages en train</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Esprit Plein Cap</h6>
            <ul className="flex flex-col gap-2 text-xs font-light">
              <li><a className="hover:text-primary" href="/notre-histoire">Notre histoire</a></li>
              <li><a className="hover:text-primary" href="/equipe">L&apos;équipe</a></li>
              <li><a className="hover:text-primary" href="/nos-conferenciers">Nos conférenciers</a></li>
              <li><a className="hover:text-primary" href="/nos-bateaux">Nos bateaux</a></li>
              <li><a className="hover:text-primary" href="/livre-d-or">Livre d&apos;or</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Informations</h6>
            <ul className="flex flex-col gap-2 text-xs font-light">
              <li><a className="hover:text-primary" href="/visioconferences">Visioconférences</a></li>
              <li><a className="hover:text-primary" href="/blog">Blog &amp; Actualités</a></li>
              <li><a className="hover:text-primary" href="/contact">Nous contacter</a></li>
              <li><a className="hover:text-primary" href="/conditions-generales">Conditions générales</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Suivez-nous</h6>
            <div className="flex gap-6">
              <a aria-label="Instagram" className="text-abyss transition-all duration-300 hover:text-primary dark:text-ecru" href="#">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a aria-label="Facebook" className="text-abyss transition-all duration-300 hover:text-primary dark:text-ecru" href="#">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a aria-label="LinkedIn" className="text-abyss transition-all duration-300 hover:text-primary dark:text-ecru" href="#">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
            <p className="mt-2 text-xs font-light opacity-50">
              Licence Atout France IM07510000
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 text-[10px] uppercase tracking-widest opacity-40 md:flex-row">
          <p>© 2025 Plein Cap — Croisières culturelles d&apos;exception</p>
          <div className="flex gap-10">
            <a className="hover:text-primary" href="/conditions-generales">Mentions légales</a>
            <a className="hover:text-primary" href="/conditions-generales">Confidentialité</a>
            <a className="hover:text-primary" href="/conditions-generales">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
