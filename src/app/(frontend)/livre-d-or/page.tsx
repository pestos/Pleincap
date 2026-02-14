import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { getTestimonials } from '@/lib/payload-queries'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

export const metadata = {
  title: "Livre d'Or | Plein Cap - Témoignages Clients",
  description: "Témoignages clients Plein Cap : retours d'expérience de croisières culturelles et voyages d'exception.",
}

const gallery = [
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5BtHx3gNIiJ5izpLiomxkZpSq7-WraxK1VVZtvIr-JSgbM7h0q-Qj1qCwZCivKbiWVNjM9CcuJBuszE0llfSEUyqBBeDLYrPLp2GxwyNJnyg86gbC9Nnbw9K1KmmQ0-qlwx1TBavNiIRcii71IEj1X5n7dl8CwKO2lnMnFFmb7iJC2BUKtjS2D01erDYjAXUdcbH48ZM8E-vGqsxZpjDV0h_kd2J7_jkw7dkoiu6XvRYXbxK3-963Rw1P6Qt_hO0hbqz53rumS10',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDc_mdxYDNLwJo5BvSTC8_p53g35yC1BHoZqqwkYRq4Ve0fuZ00qkIakkDDSr6IxJB_rSLUEt5gdPO9FCB2d2rV4SALGzhqOC3jJ1WzI1uZLMCx2qNfA2SQjhicQKFJhMQydB2kzj4XWp9fo6NVzqRNhrXpHtPxrEFnhLtbWWfoph4Jiz_5DJWvFcYwb7mXPyykV_bOs8sYkNfX42pPwy_vH0NZYqdjQFJcZbFh6dGUxGOKTXkoIaxU6i90j5rvP0WV12IRN_Kcg_4',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPlcSAzvgYkoB7sbibXuxEbrtfthoUZWQIlCtLU8YJduDLcS2s8JB54MUSRFv1XGYytYz9gNzxMSWt2m1bA_kHEzT-8_FGSaEVFIkRR_UFDqhGz-ALzIogscIHNnd5ZfzGOWoUrRZ0VaXXzuDGJ_TNbgv_NnqN9vHAuP7ou1iILfT1dlMiU5WoPHdXKWU7EOQAQ9UxVdnBsTzfWzTtakkOHSZRom4dnEeM-QjoPa0h-X-Lhw8o32ahR8kKHJIPFAIJeD938_gLN1Y',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCmTemJMIkB7Q-HwFHO9IOQt8WPr8VdbUqYpPf62rt-ELjNSeODvWEcX7iu7Dd_Y5iFRAi7snyeCBNi4Rdp01IBCSsk-wWtS7FQe_sv691LRkMhb-ww1DTgtdvQScZtM4VOWwaxJtXwUNy12T2z5ZK1l9-EQ2nF9XyPIP3LY2CzjRO3h4K-jqDXGD--BFpVnmsWR1Zf5zoMAddKGrydHN1UW_yCMAwaMI2ArmSS-spRKBVYzJJtaDK4rI19L3fZEeokY7svU7KtY2A',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTXV-VvgzljdC3y-n7KIMgCW00N8clZnH7Z9fm_v0xqNp_yIDyPKhFVTgZYN-9gJr2cXtS0iyTtapYVgRIhSLuFb9Jaca9RBL_mv9Oq6Efyu3z-G2nujjaQSswYPiDSiSSMAkPP5Ao0D9Z-pXwd1-73KvVpiLFLUtM1Wt-e8Cwb5D0SOvh3CveTsvWP6POGDuYbyi-aFxUsA6Of8GFDt0rOogeGRbsGPZ-Vnka3kfgwiX4m5MBw6EEmqM692Gy6hLaqhtlO4gPb8c',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmG6Tmpv-pWrNKyPAOaJ_ztHCHtKBpqX_98HKygizBSk9Gg9p5_irUc3vXrv1JvAR6Mipp5pss0BmNMYJNc2zHlXUiqccOdMFDrc0UTSjIcEQHAcDoIOQFaN-0monjcBXBaf2657LNhkzro5XYvDFK8j_ct2e0qfKTnBwL-Vyvq58g5os-802AdpV_ewZETSomguRiTAlRWZ1mUoxCkpF6hM_QsowteN-X5rzLG1Qc-mrt8K8AWTa-STzu4yH6Qkz-0t29NRe87M',
    className: 'md:col-span-2 md:row-span-1',
  },
]

const inspired = [
  {
    title: 'Danube Impérial',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZYypX13L4hNGHAQboNI5dLUYFWjx4_FWH1tcGZQK1zpst4mdyQ_Z70SXqDnr3fFzrcDRVUHDHn-wWjxNPPp6M3idJ9-IlsneOpECK3WiRitznPAGiW6YIpIwtCTFHcuHF7U1Dc_am6TOG6Xif6v8zbt8PM8i2fSL4GT3WizhZ23yC86hLnfcBCpG1on-LJuFwhuBt0FXq5QkfPEO7AJNuZpRvw0FGKIeA3RCt496mPaRW3_6gNDqj5Svpcj-PXIb3SuZrSi3aXhc',
  },
  {
    title: 'Fjords de Norvège',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcNLwzPA1D7lFoaTBHy353hRU0DCaf-Z4w0ezHP5yyClQdS0oFL1l4D440Q5QCotyPKkneEs5_0Jq3V9Fg9P9vsBErNCbd3ov_7hOk_308FvQ7Kya7jpHysYvszxovBPPtE4-NPjpRa80MHrklztaUvdYDyKjwPcLRS4aW9NhjWHMfOgg7YzyOJ2axOyQt-tGr2joRzhTqcI0Wlaa4zf6ECL0y-dONiUFY-PrTNd9tePmoiNs2RXi0R-Uua2Nih9YQL34MyLrRK9U',
  },
  {
    title: 'Méditerranée Secrète',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALir0ObpAKpELjv6DFrhxvZdTBd2N_fLjUR32u0RDwOa-_qdh6MFTF6iPeMvRZUkK0LYoVQ9Q-Si9eRxetz-hHvijHZpv6hrne8Cf5UgbZTvXXylRPDf2LCtMJlUcMrufheyCtLcxfkd4FA069jHtXx--UqtQjRPtOOrvGVQpjzrVZdUkxem5J4GVk3sYnAWb-tqtvRTO4drxYVUMAGU40IDowCbB73mgbYtLnPeyD8BHliGTp9SU0QjMoNil1D1Mb6nerTEdUXj4',
  },
]

export default async function LivreDOrPage() {
  const testimonials = await getTestimonials()

  return (
    <div className={`${plusJakarta.className} flex min-h-screen flex-col bg-[#fbfaf9] text-[#1A2B3C] dark:bg-[#1e1a14] dark:text-[#F9F8F6]`}>
      <SiteHeader />
      <main className="flex-1 pt-24 md:pt-28">
        <Hero />
        <Testimonials testimonials={testimonials} />
        <Inspired />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="px-6 py-12 md:px-20 lg:px-40 md:py-20">
      <div className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
        <h1 className="mb-6 text-4xl font-bold leading-tight italic md:text-6xl">L'Âme de nos Voyages : Votre Livre d'Or</h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed opacity-80 md:text-xl">
          Chaque sillage laissé sur l'onde est une histoire que nous écrivons ensemble. Découvrez les récits de ceux qui ont fait de nos traversées un
          moment d'exception, entre ciel et mer.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="h-px w-12 bg-[#c59f59]" />
        </div>
      </div>
    </section>
  )
}

function Testimonials({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="px-6 pb-24 md:px-20 lg:px-40">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {testimonials.map((t, idx) => {
          const imageUrl = t.authorPhoto?.url || t.authorPhoto?.thumbnailURL || ''

          return (
            <div
              key={t.id}
              className={`mb-6 break-inside-avoid border border-primary/10 bg-white p-8 shadow-sm transition dark:bg-[#1e1a14]/50 ${idx === 4 ? 'bg-primary/5 dark:bg-primary/10 border-primary/20' : ''}`}
            >
              <span className="quote-mark mb-2 block text-5xl text-primary leading-none">"</span>
              <input className="peer hidden" id={`testimonial-${t.id}`} type="checkbox" />
              <div className="relative max-h-40 overflow-hidden transition-[max-height] duration-500 peer-checked:max-h-[2000px]">
                <p className="mb-4 text-xl italic leading-relaxed">{t.content}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 peer-checked:opacity-0 dark:from-[#1e1a14]" />
              </div>
              <div className="mb-8 flex items-center gap-4">
                {imageUrl ? (
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-primary/20">
                    <img alt={t.authorName} src={imageUrl} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex flex-col gap-1 text-sm font-bold uppercase tracking-widest">
                  <p className="text-[#1A2B3C] dark:text-primary">{t.authorName}</p>
                  <p className="text-xs uppercase tracking-wider opacity-60">{t.cruiseName || ''}</p>
                </div>
              </div>
              <label
                className="toggle-label inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#C5A059] transition-opacity hover:opacity-80"
                htmlFor={`testimonial-${t.id}`}
              >
                <span className="read-more">Lire l'avis en entier</span>
                <span className="read-less">Fermer</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </label>
            </div>
          )
        })}
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="h-16 w-px bg-primary/30" />
        <h3 className="text-2xl italic font-medium">Votre histoire reste à écrire...</h3>
        <div className="flex justify-center px-4 py-3">
          <button className="flex min-w-[280px] cursor-pointer items-center justify-center gap-2 border-2 border-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-white">
            Partager votre expérience
          </button>
        </div>
      </div>
    </section>
  )
}

function Inspired() {
  return (
    <section className="border-t border-primary/10 bg-[#F9F8F6] px-6 py-24 dark:bg-[#1e1a14] md:px-20 lg:px-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-light italic md:text-4xl">Itinéraires Inspirés</h2>
            <p className="text-sm uppercase tracking-widest opacity-60">Poursuivez le voyage à travers les escales citées par nos passagers</p>
          </div>
          <div className="mx-12 hidden h-px flex-1 bg-primary/20 md:block" />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-20">
          {inspired.map((item) => (
            <a key={item.title} className="group flex flex-row items-center gap-6" href="#">
              <div className="h-20 w-20 shrink-0 overflow-hidden">
                <img
                  alt={item.title}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  src={item.image}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-medium tracking-tight transition-colors group-hover:text-primary">{item.title}</h4>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                  Découvrir <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
