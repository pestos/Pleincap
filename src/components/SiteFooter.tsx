export default function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-background-light pb-12 pt-20 dark:bg-background-dark">
      <div className="mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="mb-20 grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          <div>
            <h2 className="serif-heading mb-6 text-4xl italic">Restez informé</h2>
            <p className="max-w-md text-sm font-light opacity-70">Recevez un accès anticipé aux nouveaux itinéraires, du contenu culturel exclusif et de l'inspiration au voyage.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex border-b border-primary py-2">
              <input
                className="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
                type="email"
                placeholder="Adresse email"
              />
              <button className="text-xs font-bold uppercase tracking-widest text-primary">S'abonner</button>
            </div>
            <p className="text-[10px] uppercase tracking-widest opacity-40">S'abonner signifie accepter notre Politique de confidentialité</p>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Destinations</h6>
            <ul className="flex flex-col gap-2 text-xs font-light">
              <li><a className="hover:text-primary" href="#">Europe du Nord</a></li>
              <li><a className="hover:text-primary" href="#">Mediterranean</a></li>
              <li><a className="hover:text-primary" href="#">Africa &amp; Indian Ocean</a></li>
              <li><a className="hover:text-primary" href="#">Asia &amp; Pacific</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Our Fleet</h6>
            <ul className="flex flex-col gap-2 text-xs font-light">
              <li><a className="hover:text-primary" href="#">MS Monet</a></li>
              <li><a className="hover:text-primary" href="#">RV Queen</a></li>
              <li><a className="hover:text-primary" href="#">The Venice Express</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Experience</h6>
            <ul className="flex flex-col gap-2 text-xs font-light">
              <li><a className="hover:text-primary" href="#">Life on Board</a></li>
              <li><a className="hover:text-primary" href="#">Cultural Enrichment</a></li>
              <li><a className="hover:text-primary" href="#">Private Charters</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="text-[10px] font-bold uppercase tracking-widest text-primary">Accreditations &amp; Social</h6>
            <div className="mt-2 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex min-w-[80px] flex-col items-center justify-center border-2 border-primary bg-primary/5 px-3 py-2">
                  <span className="text-[14px] font-black leading-none tracking-tighter text-abyss dark:text-primary">CLIA</span>
                  <div className="my-1 h-[1px] w-full bg-primary/40" />
                  <span className="text-[7px] font-bold uppercase tracking-widest text-primary">Member</span>
                </div>
                <span className="text-[8px] font-medium uppercase tracking-widest leading-tight opacity-70">Cruise Lines International Association</span>
              </div>
              <div className="flex gap-6 border-t border-primary/10 pt-4">
                <a aria-label="Instagram" className="text-abyss transition-all duration-300 hover:text-primary dark:text-ecru" href="#">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a aria-label="Facebook" className="text-abyss transition-all duration-300 hover:text-primary dark:text-ecru" href="#">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a aria-label="LinkedIn" className="text-abyss transition-all duration-300 hover:text-primary dark:text-ecru" href="#">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 text-[10px] uppercase tracking-widest opacity-40 md:flex-row">
          <div className="flex items-center gap-4">
            <p>© 2024 Plein Cap Luxury Voyages.</p>
            <div className="h-3 w-[1px] bg-abyss" />
            <p>Licence Atout France IM07510000</p>
          </div>
          <div className="flex gap-10">
            <a className="hover:text-primary" href="#">Privacy Policy</a>
            <a className="hover:text-primary" href="#">Cookies</a>
            <a className="hover:text-primary" href="#">Legal Notices</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
