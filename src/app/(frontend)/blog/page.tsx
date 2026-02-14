import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import BlogClient from './BlogClient'
import { getPosts } from '@/lib/payload-queries'

// Helper to get categories from Payload
async function getCategories() {
  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'categories',
    pagination: false,
  })
  return docs
}

export default async function BlogPage() {
  const { docs: posts } = await getPosts({ limit: 50 })
  const categories = await getCategories()

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(26, 43, 60, 0.6), rgba(26, 43, 60, 0.6)), url('https://www.plein-cap.com/images/2026/celtique/shutterstock_1240921069.jpg')"
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center text-white md:px-16">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Inspiration & Découvertes
          </span>
          <h1 className="serif-heading mb-6 text-5xl md:text-7xl">
            Le Blog Plein Cap
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed opacity-90">
            Découvrez nos récits de voyage, conseils d&apos;experts et inspirations culturelles pour préparer votre prochaine aventure exceptionnelle
          </p>
        </div>
      </section>

      {posts.length > 0 ? (
        <BlogClient posts={posts} categories={categories} />
      ) : (
        <section className="w-full py-[120px]">
          <div className="mx-auto max-w-[1600px] px-6 text-center md:px-16">
            <p className="text-sm opacity-60">
              Aucun article publié pour le moment. Revenez bientôt pour découvrir nos inspirations voyage.
            </p>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}
