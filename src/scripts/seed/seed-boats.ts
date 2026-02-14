import { getPayload } from 'payload'
import config from '@payload-config'
import { uploadMediaFromUrl } from './utils'

// Extract boat data from nos-bateaux page
const boatsData = [
  {
    name: 'M/S Amadeus Diamond',
    tag: 'Fluvial',
    atmosphere:
      "Un bijou d'élégance sur les rives de la Seine, alliant raffinement autrichien et art de vivre à la française.",
    capacity: '144 Passagers',
    decks: '4 Ponts passagers',
    image: 'https://www.taoticket.fr/assets/images/navi/luftner-cruises-ms-amadeus-diamond-01-VQuun-6.webp',
  },
  {
    name: 'M/S Nile Excellence',
    tag: 'Fluvial',
    atmosphere:
      'Le privilège de naviguer sur le Nil à bord d\'une unité de grand luxe, conçue pour l\'immersion historique.',
    capacity: '60 Passagers',
    decks: '5 Ponts',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3YGeIf8cqI0uTrdiAUiF_kLU-TtWs4haeWdAKQbtZ5BGNkVFZ96FOJjleHPw7WEMR8NLUldDpoWiGtrMJioNyMKkQPAShXEFebnm6Em-DdGEAH1W74W8d9E6bryB0tM05bYcSP6WrWsOohf8hHOkkG8-MgT4bsK_byM7M985jq2MChRx5S_NvItSSjuakxiAavOxiMP4vgmnPqJm02u5aOghsJiG1Ufr-gm43nTrA9OaNFPFr6JOiojJk39l303tI8aPykNESDzQ',
  },
  {
    name: 'SH Diana',
    tag: 'Maritime',
    atmosphere:
      'Un yacht de charme pour explorer l\'Adriatique, privilégiant la proximité avec la mer et les escales inédites.',
    capacity: '50 Passagers',
    decks: '3 Ponts',
    image: 'https://www.plein-cap.com/images/stories/ShDiana/sh_diana_01.jpg',
  },
  {
    name: 'M/S Hamburg',
    tag: 'Fluvial',
    atmosphere:
      'Le Douro révélé avec majesté. Un navire aux finitions précieuses pour une navigation contemplative.',
    capacity: '118 Passagers',
    decks: '4 Ponts',
    image: 'https://www.plein-cap.com/images/stories/MsHamburg/ms-hamburg.jpg',
  },
]

async function seedBoats() {
  console.log('🎯 Starting Boats seed script...\n')

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let errors = 0

  for (const boat of boatsData) {
    try {
      console.log(`Processing: ${boat.name}`)

      // Generate slug from name (consistent with formatSlug hook)
      const slug = boat.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Check if boat already exists
      const existing = await payload.find({
        collection: 'boats',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ✓ Already exists (skipped)\n`)
        skipped++
        continue
      }

      // Upload featured image
      const featuredImageId = await uploadMediaFromUrl(payload, boat.image, boat.name)

      // Parse capacity (extract number from "144 Passagers" -> 144)
      const capacityMatch = boat.capacity.match(/\d+/)
      const capacity = capacityMatch ? parseInt(capacityMatch[0]) : 50

      // Convert atmosphere to richText format
      const descriptionRichText = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: boat.atmosphere,
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

      // Create boat (cabin data will be added later when detail pages are converted)
      await payload.create({
        collection: 'boats',
        data: {
          name: boat.name,
          capacity,
          featuredImage: featuredImageId,
          description: descriptionRichText,
        },
      })

      console.log(`  ✓ Created successfully\n`)
      created++
    } catch (error) {
      console.error(`  ✗ Error: ${error instanceof Error ? error.message : String(error)}\n`)
      errors++
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 Boats Migration Summary')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Total boats: ${boatsData.length}`)
  console.log(`✓ Created: ${created}`)
  console.log(`↷ Skipped: ${skipped}`)
  console.log(`✗ Errors: ${errors}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  process.exit(errors > 0 ? 1 : 0)
}

seedBoats()
