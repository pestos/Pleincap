import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

async function uploadMediaFromUrl(
  payload: any,
  url: string,
  alt: string
): Promise<number> {
  const filename = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg'

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id as number
  }

  const response = await fetch(url)
  const buffer = Buffer.from(await response.arrayBuffer())

  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: buffer,
      mimetype: 'image/jpeg',
      name: filename,
      size: buffer.length,
    },
  })

  return media.id as number
}

const testimonialsData = [
  {
    author: 'Mme Catherine D.',
    text: "Une parenthèse enchantée sur le Danube. Le service est d'une discrétion et d'une élégance rares. On se sent invité plus que client. Chaque matin, le paysage se renouvelle avec une poésie que seul le voyage fluvial permet de saisir pleinement. La table est d'une finesse exemplaire, rendant hommage aux terroirs traversés avec une modernité surprenante. Nous reviendrons sans aucune hésitation pour une nouvelle escapade.",
    meta: 'Danube Impérial, Mai 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5BtHx3gNIiJ5izpLiomxkZpSq7-WraxK1VVZtvIr-JSgbM7h0q-Qj1qCwZCivKbiWVNjM9CcuJBuszE0llfSEUyqBBeDLYrPLp2GxwyNJnyg86gbC9Nnbw9K1KmmQ0-qlwx1TBavNiIRcii71IEj1X5n7dl8CwKO2lnMnFFmb7iJC2BUKtjS2D01erDYjAXUdcbH48ZM8E-vGqsxZpjDV0h_kd2J7_jkw7dkoiu6XvRYXbxK3-963Rw1P6Qt_hO0hbqz53rumS10',
    featured: true,
  },
  {
    author: 'Famille Bernard',
    text: "Le silence des Fjords, rompu seulement par le souffle du navire. Une organisation impeccable qui laisse toute la place à l'émerveillement. Nous avons été particulièrement touchés par l'expertise des conférenciers à bord, qui ont su éclairer notre regard sur la géologie et l'histoire de ces contrées sauvages. Les cabines sont de véritables cocons de confort, offrant des vues imprenables sur les falaises escarpées. Un voyage pour l'esprit autant que pour les yeux.",
    meta: 'Fjords de Norvège, Juillet 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDc_mdxYDNLwJo5BvSTC8_p53g35yC1BHoZqqwkYRq4Ve0fuZ00qkIakkDDSr6IxJB_rSLUEt5gdPO9FCB2d2rV4SALGzhqOC3jJ1WzI1uZLMCx2qNfA2SQjhicQKFJhMQydB2kzj4XWp9fo6NVzqRNhrXpHtPxrEFnhLtbWWfoph4Jiz_5DJWvFcYwb7mXPyykV_bOs8sYkNfX42pPwy_vH0NZYqdjQFJcZbFh6dGUxGOKTXkoIaxU6i90j5rvP0WV12IRN_Kcg_4',
    featured: true,
  },
  {
    author: 'M. et Mme Duval',
    text: "Une gastronomie digne des plus grandes tables, au milieu de l'océan. Chaque soir était une nouvelle découverte culinaire. Bravo au chef et à toute son équipe pour leur créativité et la qualité des produits sourcés localement à chaque escale. Le sommelier a également su nous surprendre avec des accords mets-vins audacieux et toujours justes. Un enchantement pour les papilles du début à la fin.",
    meta: 'Croisière des Saveurs, Août 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPlcSAzvgYkoB7sbibXuxEbrtfthoUZWQIlCtLU8YJduDLcS2s8JB54MUSRFv1XGYytYz9gNzxMSWt2m1bA_kHEzT-8_FGSaEVFIkRR_UFDqhGz-ALzIogscIHNnd5ZfzGOWoUrRZ0VaXXzuDGJ_TNbgv_NnqN9vHAuP7ou1iILfT1dlMiU5WoPHdXKWU7EOQAQ9UxVdnBsTzfWzTtakkOHSZRom4dnEeM-QjoPa0h-X-Lhw8o32ahR8kKHJIPFAIJeD938_gLN1Y',
    featured: true,
  },
  {
    author: 'M. Jean-Pierre L.',
    text: "La Méditerranée comme nous ne l'avions jamais vue. Les escales secrètes proposées par Plein Cap sont de véritables joyaux.",
    meta: 'Méditerranée Secrète, Septembre 2023',
    image: null,
    featured: false,
  },
  {
    author: 'Mme Sophie R.',
    text: "L'élégance du salon, la qualité des conférences à bord... Tout concourt à faire de cette croisière une expérience culturelle de haut vol.",
    meta: 'Escapade Adriatique, Octobre 2023',
    image: null,
    featured: false,
  },
  {
    author: 'M. Luc G.',
    text: "Ce qui frappe chez Plein Cap, c'est l'humanité du personnel. On ne se sent jamais comme un numéro. Une expérience profondément humaine.",
    meta: 'Grandes Escales Baltiques, Juin 2023',
    image: null,
    featured: false,
  },
]

function parseMeta(meta: string): { cruiseName: string; date: string | null } {
  const parts = meta.split(',').map((p) => p.trim())
  const cruiseName = parts[0] || ''

  let date: string | null = null
  if (parts[1]) {
    const monthYearMatch = parts[1].match(/(\w+)\s+(\d{4})/)
    if (monthYearMatch) {
      const [, month, year] = monthYearMatch
      const monthMap: Record<string, string> = {
        Janvier: '01',
        Février: '02',
        Mars: '03',
        Avril: '04',
        Mai: '05',
        Juin: '06',
        Juillet: '07',
        Août: '08',
        Septembre: '09',
        Octobre: '10',
        Novembre: '11',
        Décembre: '12',
      }
      const monthNum = monthMap[month] || '01'
      date = `${year}-${monthNum}-01`
    }
  }

  return { cruiseName, date }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })

    let created = 0
    let skipped = 0
    const errors: string[] = []

    for (const testimonial of testimonialsData) {
      try {
        const existing = await payload.find({
          collection: 'testimonials',
          where: { authorName: { equals: testimonial.author } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          skipped++
          continue
        }

        let authorPhotoId: number | undefined
        if (testimonial.image) {
          authorPhotoId = await uploadMediaFromUrl(
            payload,
            testimonial.image,
            testimonial.author
          )
        }

        const { cruiseName, date } = parseMeta(testimonial.meta)

        await payload.create({
          collection: 'testimonials',
          data: {
            authorName: testimonial.author,
            authorPhoto: authorPhotoId,
            content: testimonial.text,
            rating: 5,
            cruiseName,
            date: date || undefined,
            featured: testimonial.featured,
          },
        })

        created++
      } catch (error) {
        errors.push(
          `${testimonial.author}: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    }

    return NextResponse.json({
      success: true,
      total: testimonialsData.length,
      created,
      skipped,
      errors: errors.length,
      errorDetails: errors,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
