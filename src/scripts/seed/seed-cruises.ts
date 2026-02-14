import { getPayload } from 'payload'
import config from '@payload-config'
import { uploadMediaFromUrl } from './utils'

// Extract cruise data from catalogue/page.tsx listing
const cruisesData = [
  {
    title: "L'Odyssée des Dieux : Mythes de l'Égée",
    route: 'Athènes — Rhodes — Patmos — Dubrovnik',
    departure: '14 Juin 2024',
    duration: '12 Jours',
    ship: 'MS Berlin',
    region: 'Europe',
    price: '2,490 €',
    excerpt:
      "Explorez les mythes de l'Égée à travers une croisière culturelle exceptionnelle, de la majesté d'Athènes aux îles légendaires de Rhodes et Patmos.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGEQCJ-v36Y9Sf8ywHDFmMcCJr3GIID0ETJjmfNnOLSzThzJbXfbce3lBqlM5KX33QFIxy2YAFj0QpnazhvukmDmm15IUHuBDfxVUZTMrWfIOeUa-frchlZ1Omk-9N_9ivDJbAzPkHMwMG6Rt6O7a5ozALaHG9g1__TJ37dO2qI1nH65dwaKw9IiRIG6YOCNiD9qSfHZDzhmkluU5x3lIUhdls5vG3h9yNGk28SgCdOBFftTthxODEf2z8i1qxqZ6XK3jGYddCbcg',
    destinationMatch: 'Grèce',
  },
  {
    title: 'Symphonie Boréale : Fjords de Norvège',
    route: 'Bergen — Geiranger — Îles Lofoten — Tromsø',
    departure: '08 Août 2024',
    duration: '10 Jours',
    ship: "MS Belle de l'Adriatique",
    region: 'Europe',
    price: '3,150 €',
    excerpt:
      'Découvrez les fjords majestueux de Norvège, leurs cascades vertigineuses et leurs villages pittoresques lors de cette croisière contemplative.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAd6B3sdOAZ2jJopHEMmns2QePzvOhFKS4UKOAkxlMsjpMo2WaOzyPzV2Mn9VIkuwrxpkRLujVK_H_0Mt9IRpVZ8IgWT0dSVmbXa7kvskxc3s5jU9vQnBCdy7TSVlIHpkm8dEnkCnjS4MO7Mh2zfQ69kk9PgvoomzVUNKknlzVn0_T3B98JuesrFzzuPlHIWZH29O0AalQ5pzPur5mW9OlR9Umo_aHiMXCJLCPy1s8NsiLy_K1mod8WnhwmYpA2DPUQPCiYioSeB2U',
    destinationMatch: 'Fjords',
  },
  {
    title: 'Le Danube Impérial : De Vienne à Belgrade',
    route: 'Vienne — Budapest — Belgrade — Portes de Fer',
    departure: '12 Septembre 2024',
    duration: '11 Jours',
    ship: 'MS Cyrano de Bergerac',
    region: 'Europe',
    price: '2,880 €',
    excerpt:
      "Naviguez au cœur de l'histoire européenne, de la majesté de Vienne aux rives mystérieuses des Balkans à bord d'une croisière culturelle d'exception.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHw9tOHxEPtnK2h2J-naJD9wzXuj4S90hU35gzTfR4o-mdPyp-Pj6TPDaCz3L62KmPVdPDjlyPB_b-dk1h8cE1FdUfXS1HTSLr8AmFUCTwdoMyk1MUKUmfyXFnLKhloF4EP9XwtSZ8AhTN8LgXhu9OSGmghJ7-Schhr4iB47AbKYlWUMVWMWKzJDIQ6vYOuxzZzeSctz4ZPIoWGAKfQWbM_h5JW8RYFJ3wx_hHxccplgUl2V59q-8PN_f9eqB1eRU28joCdJXcgRk',
    destinationMatch: null, // No matching destination seeded yet
    detailData: true, // Has full itinerary data
    explicitSlug: 'danube-imperial', // Preserve URL
  },
  {
    title: 'La Belle Époque du Nil : Voyage Intemporel',
    route: 'Louxor — Edfou — Kom Ombo — Assouan',
    departure: '22 Octobre 2024',
    duration: '12 Jours',
    ship: 'Vapeur Authentique',
    region: 'Afrique',
    price: '4,200 €',
    excerpt:
      "Remontez le temps le long du Nil à bord d'un vapeur authentique, découvrant les trésors de l'Égypte ancienne dans une atmosphère d'époque.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDHqvOi1bOsPannTaV89z_cEzFl9QtKfyfIxOy_FUo5Buujm2tKamLEyPXCn4LXsIVOuL9FwCDvZKnK3mvy1WTr3d2W2j4CuE7puBl26NDtwFYJ2ItuXPvckoBR4FruVqEK4WZZrw2SgYmCaVGOEO7eZPCDYyk-ZVDr8YQ2Pw7gITUlHKlnwFXZJSgBTg7SXDRNKCzMUc0B2AOfIUZ7PwV4ld0f0QNMJrqVFcyqHf0C95WYWSX1NzRbEiNMiDUD4a2KaYehv_CNoI',
    destinationMatch: null, // No matching destination seeded yet
  },
]

// Extract detailed itinerary data from danube-imperial/page.tsx
const danubeItineraryData = [
  {
    day: 1,
    title: 'Vienne - Embarquement',
    desc: 'Accueil à bord de votre navire à partir de 16h. Cocktail de bienvenue et présentation de l\'équipage. Dîner de gala impérial pour débuter votre séjour dans la capitale autrichienne.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCnFCuj0j_-t0AC90skvOY0bnMAwpTy9wu_Y6XyVozNt2NwSwZbJZOmxw7oZrLX61h9lMwkcv5_wtHGy4lqoyg4zHDa2Rnmsd-5LaXyLTjgjSDLYLPT7V1qaZD5_lR-A3DO9EyiN_jq7AG2qKxPS1A8fDeBlnj8BOlAlyTgfs_WCQ9DUGM8QfaVUe5E-OWd0MzeT35RTCGuhIfWgb5j1sOeamYXDq20AVWU-SYyGYmWX5zUFSXqPzlAXCUqZcf6RwuEwCbaSJsRAY',
    highlights: ['Embarquement 16h', 'Cocktail de bienvenue', 'Dîner de gala'],
  },
  {
    day: 2,
    title: 'Dürnstein & Vallée de la Wachau',
    desc: 'Escale dans le plus charmant village de la vallée. Visite de l\'abbaye baroque de Melk, surplombant le fleuve, véritable chef-d\'œuvre de l\'architecture autrichienne avec ses fresques exceptionnelles.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeXOI8F29nwuSuLEcC_y4z2YyNPQUtR8cohNPIQ34o-6Qz-tNEgW8NhdbdGNXxtKX53Sr1G6KOsDIapOi22rPLXpooeOoAv6EoFEINsjBb89CrLqhBmfBCjcpnMxCwjLmoYAT2rW_ZACw2Xgzhr7pFxYG2r0DzzQLQtkZ9n_To10wBHQK8ICbtGSVjV7SfXySnijq9V-bqa517hCwuLc0MvwLFSqLdWcTaicDmiyWdhQDHVf8AwKKOExjqo7hRPnGRj5TsAJSSA0w',
    highlights: ['Abbaye de Melk', 'Vignobles en terrasses', 'Architecture baroque'],
  },
  {
    day: 3,
    title: 'Bratislava - La Perle du Danube',
    desc: 'Découverte de la capitale slovaque : la vieille ville pavée, la cathédrale Saint-Martin où furent couronnés les rois de Hongrie, et le château offrant une vue panoramique sur trois pays.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsWx5JatNxZoCIurUSek3FArtCXYbHx6nhYLP0o2NZfm7zq1QtWUuqO-WSQn4COMX8Ney2gb6ri90XApI8YUuAy6pt8Ig-7NerA4gJ5N4xlD-WK5NAgegAlGqTCPl_NPWRWpUdXJBYZ9vHJBt1HUYLmGkJ8mIhdbeGEjBMc_QwbTyYxN76qv84wJzihYi7zaFCubEbup0DY1GOxO-A32rbQFBpDAXKJRJimowtbZFY0_nBPevflOpHPCQK3_NXsPmcR2ec2ycXssk',
    highlights: ['Château de Bratislava', 'Vieille ville médiévale', 'Cathédrale Saint-Martin'],
  },
  {
    day: 4,
    title: 'Budapest - La Perle du Danube',
    desc: 'Journée complète dans la majestueuse capitale hongroise. Visite du Parlement néo-gothique, des Thermes Széchenyi, et promenade dans le quartier du château de Buda.',
    image: 'https://www.plein-cap.com/images/stories/MsLadyDiletta/Lady-Diletta_08.jpg',
    highlights: ['Parlement hongrois', 'Thermes historiques', 'Château de Buda', 'Croisière nocturne'],
  },
  {
    day: 5,
    title: 'Belgrade - Carrefour des Balkans',
    desc: 'Découverte de la capitale serbe, mélange fascinant d\'influences ottomanes et austro-hongroises. Visite de la forteresse de Kalemegdan et du quartier bohème de Skadarlija.',
    image:
      'https://www.plein-cap.com/images/2026/capitales_baltes/entete_capitales_baltes.jpg',
    highlights: ['Forteresse de Kalemegdan', 'Quartier Skadarlija', 'Confluence Danube-Sava'],
  },
]

// Experts from danube-imperial page
const danubeExperts = ['Dr. Jean-Pierre Bastide', 'Hélène de Vogué']

async function seedCruises() {
  console.log('🎯 Starting Cruises seed script...\n')

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let errors = 0

  for (const cruise of cruisesData) {
    try {
      console.log(`Processing: ${cruise.title}`)

      // Generate slug (use explicit slug for danube-imperial to preserve URL)
      const slug =
        cruise.explicitSlug ||
        cruise.title
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')

      // Check if cruise already exists (idempotent)
      const existing = await payload.find({
        collection: 'cruises',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ✓ Already exists (skipped)\n`)
        skipped++
        continue
      }

      // Upload featured image
      const featuredImageId = await uploadMediaFromUrl(payload, cruise.image, cruise.title)

      // Resolve boat relationship by name
      let boatId: number | undefined
      const boatResult = await payload.find({
        collection: 'boats',
        where: {
          name: { like: cruise.ship },
        },
        limit: 1,
      })
      if (boatResult.docs.length > 0) {
        boatId = boatResult.docs[0].id as number
        console.log(`  ↳ Resolved boat: ${cruise.ship} (ID: ${boatId})`)
      } else {
        console.log(`  ⚠ Boat not found: ${cruise.ship} (relationship will be empty)`)
      }

      // Resolve destination relationship by matching destinationMatch or region
      let destinationId: number | undefined
      if (cruise.destinationMatch) {
        const destResult = await payload.find({
          collection: 'destinations',
          where: {
            name: { like: cruise.destinationMatch },
          },
          limit: 1,
        })
        if (destResult.docs.length > 0) {
          destinationId = destResult.docs[0].id as number
          console.log(
            `  ↳ Resolved destination: ${destResult.docs[0].name} (ID: ${destinationId})`
          )
        } else {
          console.log(
            `  ⚠ Destination not found: ${cruise.destinationMatch} (relationship will be empty)`
          )
        }
      } else {
        console.log(`  ⚠ No destination match defined (relationship will be empty)`)
      }

      // Parse price from "2,490 €" -> 2490
      const priceMatch = cruise.price.replace(/[^\d]/g, '')
      const price = parseInt(priceMatch)

      // Parse departure date from "14 Juin 2024" format
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

      const departureParts = cruise.departure.split(' ')
      const day = departureParts[0].padStart(2, '0')
      const month = monthMap[departureParts[1]] || '01'
      const year = departureParts[2]
      const departureDate = `${year}-${month}-${day}`

      // Calculate return date from duration (parse "12 Jours" -> 12)
      const durationMatch = cruise.duration.match(/\d+/)
      const durationDays = durationMatch ? parseInt(durationMatch[0]) : 7
      const returnDateObj = new Date(departureDate)
      returnDateObj.setDate(returnDateObj.getDate() + durationDays)
      const returnDate = returnDateObj.toISOString().split('T')[0]

      // Convert excerpt to richText
      const descriptionRichText = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: cruise.excerpt,
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

      // Prepare cruise data
      const cruiseData: any = {
        title: cruise.title,
        slug,
        excerpt: cruise.excerpt,
        description: descriptionRichText,
        featuredImage: featuredImageId,
        destination: destinationId,
        boat: boatId,
        departureDate,
        returnDate,
        price,
        availableSpots: 20,
        _status: 'published',
      }

      // Add detailed itinerary data for danube-imperial
      if (cruise.detailData) {
        console.log(`  ↳ Adding detailed itinerary (${danubeItineraryData.length} days)`)

        // Upload images for each day and build itinerary array
        const itinerary = []
        for (const day of danubeItineraryData) {
          const dayImageId = await uploadMediaFromUrl(
            payload,
            day.image,
            `${cruise.title} - Day ${day.day}`
          )

          const dayDescription = {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: day.desc,
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

          itinerary.push({
            day: day.day,
            title: day.title,
            description: dayDescription,
            highlights: day.highlights.join('\n'),
            images: [dayImageId],
          })
        }

        cruiseData.itinerary = itinerary

        // Resolve speaker relationships
        console.log(`  ↳ Resolving speakers (${danubeExperts.length} experts)`)
        const speakerIds = []
        for (const expertName of danubeExperts) {
          const speakerResult = await payload.find({
            collection: 'speakers',
            where: {
              name: { like: expertName },
            },
            limit: 1,
          })
          if (speakerResult.docs.length > 0) {
            speakerIds.push(speakerResult.docs[0].id as number)
            console.log(`    ✓ Resolved speaker: ${expertName}`)
          } else {
            console.log(`    ⚠ Speaker not found: ${expertName}`)
          }
        }
        if (speakerIds.length > 0) {
          cruiseData.speakers = speakerIds
        }
      }

      // Create cruise
      await payload.create({
        collection: 'cruises',
        data: cruiseData,
      })

      console.log(`  ✓ Created successfully\n`)
      created++
    } catch (error) {
      console.error(`  ✗ Error: ${error instanceof Error ? error.message : String(error)}\n`)
      errors++
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 Cruises Migration Summary')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Total cruises: ${cruisesData.length}`)
  console.log(`✓ Created: ${created}`)
  console.log(`↷ Skipped: ${skipped}`)
  console.log(`✗ Errors: ${errors}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  process.exit(errors > 0 ? 1 : 0)
}

seedCruises()
