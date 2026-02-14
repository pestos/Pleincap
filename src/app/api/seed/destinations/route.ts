import { getPayload } from 'payload'
import config from '@payload-config'
import { uploadMediaFromUrl } from '@/scripts/seed/utils'
import { NextResponse } from 'next/server'

// Extract destination data from DestinationsClient
const destinationsData = [
  {
    title: 'Grèce & Îles',
    area: 'Méditerranée',
    itineraries: 14,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMo_HmN41PISMYRq0nxhlCCENBAmgXLvzndycbKf3lzTzpNMYcq-L0MnecJcb4KBkQJM_bNyCyF8TqM7-Ip6_I3Edfj-AUGOgG9EUL1DTpc1ZsgO9zPqOPqHsf9kxnDMMpgj9pRi3FfkizMRz3F2gcsUK4uU7hkn7H3eROTHSzDpgjA0yCcUAzO6OHpnh7-YFUWVetSopNDKWjW0eyIWnwd-tr-QiOx86sgdRTQRx2DMvkvGWHXfRB-FhG1WZwC7OhM9enBAYvUSo',
    continent: 'Europe',
    region: 'mediterranee',
    continentDesc: 'Le berceau des arts et de la civilisation.',
  },
  {
    title: 'Italie & Sicile',
    area: 'Méditerranée Centrale',
    itineraries: 8,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkHdPyCgkyoQSEzDREtGB62rsjK_xNjmUKcQ0bCi8t5PFCmO3k17K5DpRerfPSB99NsVcq_7NPCzssgZ154qrdJMvKIUkZkjcPfpZiIsQIjWrQGM8O-DHVkZER6bE_TsrIoWBU_u7AQybSw3zH2KnXn3ONVRLxTKAzjVZvkPmCBuBNttdS0kmJlNJd4SJd6qd8OelLnqmKqgOwcffrwsBjlPB90TMhe5g3A-lkytmkxNof7m6z92UiA5J95hFSnh5ycvbyoWj-A9Q',
    continent: 'Europe',
    region: 'mediterranee',
    continentDesc: 'Le berceau des arts et de la civilisation.',
  },
  {
    title: 'Fjords Norvégiens',
    area: 'Europe du Nord',
    itineraries: 6,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1J_yZhAd-GR1343o0IekwbT_-B7ietBaL24lQKfghmRKPZrOEPkchBdFSm165CVV69Uszo8E-c9Vj836kTzTjERtsAqP_2g4MGPQRW1dmpAexxVxWVezqeGri-0xmshRJkZtAMnOTXhTfmyTQDiomizCKKgjlDsaCjE23cSLUy2d5sBwIMZhCqQ6_g2TxXZpmIX9u6vTTXKxArbDymG6Fo7DUuQqLxSUHjLKcPRzBGIjD8O44wDabthYGCDw0Sx5eQlNwYnffnBw',
    continent: 'Europe',
    region: 'europe-nord',
    continentDesc: 'Le berceau des arts et de la civilisation.',
  },
  {
    title: 'Patagonie & Andes',
    area: 'Amériques',
    itineraries: 7,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGEQCJ-v36Y9Sf8ywHDFmMcCJr3GIID0ETJjmfNnOLSzThzJbXfbce3lBqlM5KX33QFIxy2YAFj0QpnazhvukmDmm15IUHuBDfxVUZTMrWfIOeUa-frchlZ1Omk-9N_9ivDJbAzPkHMwMG6Rt6O7a5ozALaHG9g1__TJ37dO2qI1nH65dwaKw9IiRIG6YOCNiD9qSfHZDzhmkluU5x3lIUhdls5vG3h9yNGk28SgCdOBFftTthxODEf2z8i1qxqZ6XK3jGYddCbcg',
    continent: 'Amériques',
    region: 'autre',
    continentDesc: "Des fjords polaires aux déserts mythiques, l'aventure grandeur nature.",
  },
  {
    title: 'Japon & Corée',
    area: 'Asie Pacifique',
    itineraries: 9,
    image:
      'https://static.service-voyages.com/mobile/croisiere/images/fr/escales/escale,hong%20kong-hong%20kong_zoom,HK,HKG,38652.jpg',
    continent: 'Asie',
    region: 'asie',
    continentDesc: 'Rituels ancestraux et capitales vibrantes à découvrir.',
  },
  {
    title: 'Namibie & Cap',
    area: 'Afrique Australe',
    itineraries: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8njPqwi3fRZJZgttqk2WI4HWK15cZJBIIorzwoBhv7iFLfIlOgP_d3e6iKigmQWaLSfKgu0OwrHOlPhqgWBbciIN779zUehBjRpvKsjkdkJlK-htTKdiq09U2NDcdufEi-d34gMRwA_Qz9BfT64uwhPII22qq4NUO2CEzOG3KCnvqcRCPbSpWGYKMu2zQEH8DdiZYY8awG6NeI3W6Kb5tFY0hcp7eDbHolwybuXCjNn-W0-TXvSJucgBBTYT-mE3NNfp7Q1J3RKU',
    continent: 'Afrique',
    region: 'afrique',
    continentDesc: 'Terres de légendes, de cultures et de paysages majestueux.',
  },
  {
    title: 'Déserts Rouges & Top End',
    area: 'Océanie',
    itineraries: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAWTPnrfH8kjDHN344CaNdEDz8DKBdGfxNQZXMkjrtw78ejl2Lgf0SJBKmDBhkU15sHrD6C0bCM0RSvVuWd-k0MCIwdIT_8_WJmCfyXiJZby7n-hPLbOuDSAPejm5b8BT6CNbgVS0S2IndeOenwU1n1phCGcKTXuN262JIUvAF7YbGce4aaLhlwn063iXDK1PQrb_vavqnDsdZ75QZjrtm5nbNGVbbSRdA5U_2QClfUxu777ZbIVSO3N-Xt04piO8a987QY7NRsW40',
    continent: 'Océanie',
    region: 'autre',
    continentDesc: 'Archipels secrets et horizons sans fin entre mer et désert.',
  },
]

export async function GET() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let errors = 0
  const log: string[] = []

  log.push('🎯 Starting Destinations seed script...\n')

  for (const dest of destinationsData) {
    try {
      log.push(`Processing: ${dest.title}`)

      // Generate slug from title (consistent with formatSlug hook)
      const slug = dest.title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Check if destination already exists
      const existing = await payload.find({
        collection: 'destinations',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        log.push(`  ✓ Already exists (skipped)\n`)
        skipped++
        continue
      }

      // Upload featured image
      const featuredImageId = await uploadMediaFromUrl(payload, dest.image, dest.title)

      // Convert description to richText format
      const descriptionText = `Discover ${dest.area} - ${dest.itineraries} itineraries available. ${dest.continentDesc}`
      const descriptionRichText = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: descriptionText,
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

      // Create destination
      await payload.create({
        collection: 'destinations',
        data: {
          name: dest.title,
          region: dest.region,
          description: descriptionRichText,
          excerpt: `${dest.area} - ${dest.itineraries} itinéraires disponibles`,
          featuredImage: featuredImageId,
        },
      })

      log.push(`  ✓ Created successfully\n`)
      created++
    } catch (error) {
      log.push(`  ✗ Error: ${error instanceof Error ? error.message : String(error)}\n`)
      errors++
    }
  }

  log.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  log.push('📊 Destinations Migration Summary')
  log.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  log.push(`Total destinations: ${destinationsData.length}`)
  log.push(`✓ Created: ${created}`)
  log.push(`↷ Skipped: ${skipped}`)
  log.push(`✗ Errors: ${errors}`)
  log.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  return NextResponse.json({
    success: errors === 0,
    created,
    skipped,
    errors,
    log: log.join('\n'),
  })
}
