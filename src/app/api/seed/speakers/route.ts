import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Upload media from external URL
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

const speakersData = [
  {
    name: 'Isabelle Arnon',
    specialty: "Professeur d'Archéologie, Spécialiste Byzantin",
    bio: "Membre émérite de l'Institut de France, il accompagne nos croisières en Méditerranée depuis plus de 15 ans. Ses récits font revivre les pierres des sites les plus secrets de la Grèce et de la Turquie.",
    image: 'https://www.plein-cap.com/images/stories/Conferenciers/Isabelle_Arnon_01.jpg',
  },
  {
    name: 'Christine Darmagnac',
    specialty: "Historienne de l'Art, Conservatrice",
    bio: "Spécialiste de la peinture européenne du XVIème siècle, elle partage son regard acéré sur les chefs-d'œuvre des musées italiens et espagnols lors de nos escales culturelles.",
    image: 'https://www.plein-cap.com/images/stories/Conferenciers/ChristineDarmagnac.jpg',
  },
  {
    name: 'Marc-Antoine Durand',
    specialty: 'Musicologue & Critique Musical',
    bio: "Ancien directeur de programmation, il anime nos croisières musicales par des conférences-concerts illustrées au piano, explorant l'âme des cités de la musique.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTBLC2jMEKbiWeGEXHkBGZgePFfyelc2hChlW_sd0Jimsx8hMWJ3Yh7OSEN6gYsc4u8LvqBOFD0kEgYAgmqMBJ86LtJNJpGCGH497pk6_5dIi3MU0TpZ9wV26026yc7JqJP3vlbYMMXQ8IaGElUEfVI5k0CqNT9_iWu_aL4uFwzYv54ZdNlK0AnpgtTgBcq--M7ReyU_WTHiZ4rfmBwHx0IT3V_ENODRfUffQvC0qe4UQ0AEpS8T3Axts4z1txTxuoJKXEFbBnbbM',
  },
  {
    name: 'Hélène Girard',
    specialty: 'Naturaliste & Botaniste',
    bio: "Docteure en sciences de l'environnement, elle apporte un éclairage scientifique sur les écosystèmes traversés, des glaces du Grand Nord aux lagons tropicaux.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRqzoVYIlXT32ZcCVVJ0X-v_wKE78HQo1GpnD3_8p-ctR9l76q8G_ri6pHM9ITxQBc3f9lrO0e-HBpj3CAqNKqdqz-ndmlkUAmUijlInF2toI3sXGB8OogSv6Q3RcthIo99FlQSUjO9j0bqIxO5q5uU0TGMKEmhcuUfjajkvFCJ5guQBMp54Ijtu_l924_CmFE1D1kDKLIq4c3FqF0CqG7F7T1uN9t_jEjxVaLgiXH3rgzOS0xbfY1FTY9_ebnh-K95oov9iSGycw',
  },
  {
    name: 'François Dupont',
    specialty: 'Historien de la Marine',
    bio: "Grand voyageur et auteur sur la Compagnie des Indes, il retrace l'épopée des marins qui ont dessiné le monde d'aujourd'hui.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiJm4gCKI8c4LnmJKhHI4i5pWy2B06KnsBpevqKseJSM0SftuT062GMsVS03mAsYlejRYeK9xRK3P0FUTzjEZu_bj-xW5Bd65OjKuQQ9It-qAPuxkoqPEUMEb5HRi2ao0ZjNzDeLb276Vr8q5piClgA-nEa5CCpRyLmP-maJifWsRu6pzTlgLbp3kW6POPxxNZx2k21LWmaKQX3DY1xKyeBWtAc6JJITmAaVJEs6R_-VC2tz7x_L2iBAaxcVMGlqsZy2NAKS8BF-I',
  },
  {
    name: 'Claire Valéry',
    specialty: 'Conférencière en Littérature',
    bio: "Claire explore les liens entre paysages et textes qu'ils ont inspirés, offrant des lectures au crépuscule qui enchantent nos traversées.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0rO2TYlf0AS7ppd0xmFlZa-eZ-KeoMXqJJ3V2tKrW_dLifqgXEd6diOK1KPF10B1clll_yCCVzuqLZFNmzXzNIEcBcYAERAMmLa5QL3wJJuM2oU1GjfgTHczKTnNu7uLkk33IdlzesQ0WZNuJzBj-yTRRwyueE3OyYhRA-qdQX-QavcEBqxH0Uza7gs2Rk-x-NHInP4AjHizS7FMXaJPaahGVP1fTRfJCBgSMN-08AZXOpORZwp_Tq-CHuvToz2lomFqjPBa0Zng',
  },
]

export async function GET() {
  try {
    const payload = await getPayload({ config })

    let created = 0
    let skipped = 0
    const errors: string[] = []

    for (const speaker of speakersData) {
      try {
        const slug = speaker.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')

        const existing = await payload.find({
          collection: 'speakers',
          where: { slug: { equals: slug } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          skipped++
          continue
        }

        const photoId = await uploadMediaFromUrl(payload, speaker.image, speaker.name)

        const bioRichText = {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: speaker.bio,
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        }

        await payload.create({
          collection: 'speakers',
          data: {
            name: speaker.name,
            specialty: speaker.specialty,
            bio: bioRichText,
            photo: photoId,
          },
        })

        created++
      } catch (error) {
        errors.push(`${speaker.name}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    return NextResponse.json({
      success: true,
      total: speakersData.length,
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
