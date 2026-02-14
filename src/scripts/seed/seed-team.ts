import { getPayload } from 'payload'
import config from '@payload-config'
import { uploadMediaFromUrl } from './utils'

// Extract hardcoded team data from equipe page
const teamData = [
  {
    name: 'Jean-Paul Macocco',
    jobTitle: 'Directeur',
    bio: 'Vision culturelle, rigueur, selection des navires et itineraires.',
    image: 'https://www.plein-cap.com/images/stories/pc/photo-direction.jpg',
    order: 0,
  },
  {
    name: 'Karine',
    jobTitle: 'Responsable Financier',
    bio: "« Lorsqu'en 1996 j'intègre la société d'autocars TVL, je n'imaginais pas que tant d'opportunités professionnelles s'offriraient à moi. Mes débuts m'ont permis de me familiariser au secteur du transport. Puis, entre 1997 et 2010, j'ai eu la chance de vivre l'aventure Adriana et de remplir de nombreuses tâches : approvisionnement du navire, gestion de l'équipage, réservations des ports, escales, comptabilité… Forte de cette solide expérience et de mes compétences financières antérieures, en 2010 je rejoins la section voyages et tout naturellement prend en charge le département financier. Mes multiples casquettes m'ont permis de devenir responsable des brochures et des newsletters ainsi que du secteur aérien . Mon moment croisière préféré ? Le coucher de soleil en navigation. Même si j'ai eu le privilège d'en voir des milliers, je ne me suis jamais lassée de les admirer.»",
    image: 'https://www.plein-cap.com/images/stories/pc/karine.jpg',
    order: 1,
  },
  {
    name: 'Magali',
    jobTitle: 'Accompagnateur Senior',
    bio: "« Déjà 24 ans que j'ai rejoint Plein Cap et pourtant, j'ai l'impression que c'était hier ! Mes 10 premières années furent entièrement consacrées à la navigation. Du nord au sud, de l'Asie à l'Arctique en passant par la mer Rouge, c'est en tant que Responsable Excursions et Directrice de croisières sur les bateaux affrétés par Plein Cap que j'ai sillonné mers et océans. Depuis 2011 j'ai posé mes bagages au siège, même si je continue ponctuellement à vous accompagner dans vos croisières. Cette expertise du terrain me sert au quotidien à créer des programmes captivants que cela soit pour une croisière maritime ou fluviale, une escapade terrestre ou encore un circuit ferroviaire. Ma destination croisière préférée ? Je dirais la navigation dans les fjords de Norvège dont la beauté est à couper le souffle.»",
    image: 'https://www.plein-cap.com/images/stories/pc/magali.jpg',
    order: 2,
  },
  {
    name: 'Williams',
    jobTitle: 'Accompagnateur Senior',
    bio: "« Mon entrée dans le monde maritime ? Elle remonte à 2003, lorsque j'ai intégré la Marina Cruises Company qui gérait alors le MS Adriana. En tant qu'aide-comptable, j'ai pu effectuer diverses missions : achats, salaires ou encore comptabilité et c'est en 2010 que je rejoins l'équipe Plein Cap. Véritable couteau suisse, je m'occupe aussi bien de la PAO (programmes, brochures, dépliants…) que de l'administratif, de la billetterie ou de l'envoi des carnets de voyage. J'ai par ailleurs eu l'occasion d'être l'interlocuteur privilégié des passagers du MS Berlin à destination de la Corse et de la Sardaigne. Touche à tout passionné, j'ai également été amené à gérer l'assistance aéroport [accueil, bagages, accompagnement en vol. Mon coup de cœur croisières? Le cabotage en Croatie sur la sublime Adriatique.»",
    image: 'https://www.plein-cap.com/images/stories/pc/williams.jpg',
    order: 3,
  },
  {
    name: 'Guillaume',
    jobTitle: 'Conseiller Voyage',
    bio: "« Véritable globe-trotter des mers, ma rencontre avec Plein Cap remonte à 2005. J'ai pleinement vécu l'aventure de l'Adriana pour y avoir pris mes quartiers pendant de nombreuses années et ainsi découvert l'Europe du Nord, la Lybie, l'Egypte, la Jordanie, la Syrie, la Turquie ou d'autres destinations plus classiques comme la Grèce, la Croatie, l'Italie ou la Corse. Chaque croisière m'a permis de renforcer ma connaissance du terrain,mais aussi de tester ma réactivité dans l'action. Depuis plusieurs années je navigue entre le bureau et les démarches administratives à préparer en amont des voyages. Passionné par la Croatie, je vous la ferai découvrir là où elle se révèle le mieux en yachting. Mon coup de cœur croisières ? Je dirais plutôt les rencontres-surprises en mer avec les baleines, les dauphins ou encore les oiseaux marins.»",
    image: 'https://www.plein-cap.com/images/stories/pc/guillaume.jpg',
    order: 4,
  },
  {
    name: 'Isabelle Mercier',
    jobTitle: 'Conseillere Voyage',
    bio: 'Conseillere experimentee, personnalisation des reservations.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbp8rslkj291KG51ex5HtsVf6fh38Yxgd3-2ikl_j3UixzOyivHLUY6RAqaZdONnxk8lZLeweSqP0ctsVniX1GjZPlkRS6_WG8j9-yy0a1DXlbw7r68SQeg5HtVNpdbmuDXa7KH825ck8pCwo10LKfzuqaEH0FY_s_DCHTbrHSRC0JrZWRIpwhBMghnPI0lPhngn3qZS_VfPlOFf3xYM_mCPUkF8hHgY3Yy_PlLSZgErNP3kYHFjTBVkdckxgWHSWav6dCDkwOo98',
    order: 5,
  },
  {
    name: 'Franck Vallet',
    jobTitle: 'Logistique & Operations',
    bio: 'Coordination ports, armateurs et equipes pour une experience fluide.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFE0JHyVkjaO9UjuGhTHGLX6srqdyL9w6ILl86CPclRSDcrE8zgicq1xRIWvsm1KECDRCnyGAQQErCfAl6XIs8AbfJHvI06PwH781MNwg216k7yzzHxqUw1HWiddrnAlPPp8lGzvwkU24EtVq2EVGXkvO1y1AKwM1rtCdOu0-NbAIETm0CUzu9SSiOvC2VOMTHKJE8MyA7BqVLS3NAUk6btq1nx3TOnH2Gz9mg8WnwEV68tKa-jXCuHpUHNmwFbEkW5ImfTXZouyk',
    order: 6,
  },
]

async function seedTeam() {
  console.log('🎯 Starting Team seed script...\n')

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0
  let errors = 0

  for (const member of teamData) {
    try {
      console.log(`Processing: ${member.name}`)

      // Generate slug from name (will be auto-generated by hook, but check for duplicates)
      const slug = member.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Check if team member already exists
      const existing = await payload.find({
        collection: 'team',
        where: { slug: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ✓ Already exists (skipped)\n`)
        skipped++
        continue
      }

      // Upload photo to Media collection
      const photoId = await uploadMediaFromUrl(payload, member.image, member.name)

      // Convert bio to richText format
      const bioRichText = {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: member.bio,
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

      // Create team member
      await payload.create({
        collection: 'team',
        data: {
          name: member.name,
          jobTitle: member.jobTitle,
          bio: bioRichText,
          photo: photoId,
          order: member.order,
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
  console.log('📊 Team Migration Summary')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Total team members: ${teamData.length}`)
  console.log(`✓ Created: ${created}`)
  console.log(`↷ Skipped: ${skipped}`)
  console.log(`✗ Errors: ${errors}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  process.exit(errors > 0 ? 1 : 0)
}

seedTeam()
