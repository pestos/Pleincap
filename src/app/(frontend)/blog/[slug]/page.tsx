import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getPostBySlug, getPosts } from '@/lib/payload-queries'
import { lexicalToHtml } from '@/payload/lib/lexicalToHtml'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Article introuvable' }

  return {
    title: `${(post as any).title} | Plein Cap`,
    description: (post as any).excerpt || '',
  }
}

export async function generateStaticParams() {
  const { docs } = await getPosts({ limit: 100 })
  return docs.map((post: any) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as any

  if (!post) notFound()

  const contentHtml = lexicalToHtml(post.content)
  const publishedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const authorName = post.author?.name || post.author?.email || 'Plein Cap'
  const categoryName = post.categories?.[0]?.name || 'Article'

  // Get related posts (same category, exclude current)
  const { docs: allPosts } = await getPosts({ limit: 50 })
  const related = (allPosts as any[])
    .filter((p: any) => p.id !== post.id)
    .filter((p: any) =>
      post.categories?.some((cat: any) =>
        p.categories?.some((pCat: any) => pCat.id === cat.id)
      )
    )
    .slice(0, 3)

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-abyss dark:bg-background-dark dark:text-ecru">
      <SiteHeader />

      {/* Hero image */}
      <section className="relative h-[40vh] w-full overflow-hidden pt-20 md:h-[50vh]">
        {post.featuredImage?.url ? (
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-abyss" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="mx-auto max-w-[900px]">
            <span className="mb-3 inline-block bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {categoryName}
            </span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="mx-auto w-full max-w-[900px] px-6 py-12 md:px-8 md:py-16">
        {/* Title & meta */}
        <header className="mb-10 md:mb-14">
          <h1 className="serif-heading mb-6 text-3xl leading-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest opacity-60 md:gap-4">
            <span>Par {authorName}</span>
            <div className="h-3 w-[1px] bg-abyss/30 dark:bg-white/30" />
            <span>{publishedDate}</span>
          </div>
          {post.excerpt && (
            <p className="mt-6 border-l-2 border-primary pl-4 text-base font-light italic leading-relaxed opacity-70 md:text-lg">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Rich text content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:serif-heading prose-headings:text-abyss dark:prose-headings:text-ecru
            prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-2xl md:prose-h2:text-3xl
            prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-xl md:prose-h3:text-2xl
            prose-p:mb-4 prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-abyss/80 dark:prose-p:text-ecru/80 md:prose-p:text-base
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-abyss dark:prose-strong:text-ecru
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-[15px] prose-li:text-abyss/80 dark:prose-li:text-ecru/80 md:prose-li:text-base
            prose-blockquote:border-primary prose-blockquote:text-abyss/70 dark:prose-blockquote:text-ecru/70
            prose-img:rounded-sm
          "
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t border-primary/10 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Tags :</span>
              {post.tags.map((tag: any) => (
                <span
                  key={tag.id || tag.name}
                  className="bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-abyss dark:hover:text-ecru"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Retour aux articles
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-primary/10 bg-abyss py-16 text-ecru md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <div className="mb-10 text-center md:mb-14">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                A lire aussi
              </span>
              <h2 className="serif-heading text-3xl md:text-4xl">
                Articles similaires
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rPost: any) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="group"
                >
                  <div className="relative mb-4 aspect-[3/2] overflow-hidden">
                    {rPost.featuredImage?.url ? (
                      <Image
                        src={rPost.featuredImage.url}
                        alt={rPost.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-white/10" />
                    )}
                  </div>
                  <p className="mb-2 text-[10px] uppercase tracking-widest text-primary">
                    {rPost.categories?.[0]?.name || 'Article'}
                  </p>
                  <h3 className="serif-heading text-xl leading-tight transition-colors group-hover:text-primary">
                    {rPost.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}
