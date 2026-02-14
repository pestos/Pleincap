'use client'

import { useState } from 'react'

type Post = any

type Category = any

type BlogClientProps = {
  posts: Post[]
  categories: Category[]
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === "Toutes les catégories" ||
      (post.categories && post.categories.some((cat: any) => cat.name === selectedCategory))
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const recentPosts = posts.slice(0, 4)

  const categoryNames = ["Toutes les catégories", ...categories.map((cat: any) => cat.name)]

  return (
    <>
      <section className="relative z-20 -mt-12 w-full">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex flex-col items-center gap-6 border border-primary/30 bg-background-light p-6 shadow-2xl dark:bg-background-dark md:flex-row md:p-8">
            <div className="flex w-full flex-1 items-center gap-3 border-b border-abyss/20 py-2">
              <span className="material-symbols-outlined text-sm">
                search
              </span>
              <input
                className="w-full border-none bg-transparent p-0 text-sm text-abyss focus:ring-0 dark:text-ecru"
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="sharp-edge w-full border border-primary/30 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest focus:ring-0 md:w-auto"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryNames.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="w-full py-[80px]">
          <div className="mx-auto max-w-[1600px] px-6 md:px-16">
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Article à la une
            </span>
            <div className="group grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={featuredPost.featuredImage?.url || ''}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                  {featuredPost.categories?.[0]?.name || 'Article'}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="serif-heading mb-4 text-4xl md:text-5xl">
                  {featuredPost.title}
                </h2>
                <div className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-60">
                  <span>{featuredPost.author?.name || featuredPost.author?.email || 'Auteur'}</span>
                  <div className="h-3 w-[1px] bg-abyss/30" />
                  <span>{featuredPost.publishedDate ? new Date(featuredPost.publishedDate).toLocaleDateString('fr-FR') : ''}</span>
                  <div className="h-3 w-[1px] bg-abyss/30" />
                  <span>5 min de lecture</span>
                </div>
                <p className="mb-8 text-sm font-light leading-relaxed opacity-70">
                  {featuredPost.excerpt || ''}
                </p>
                <button className="sharp-edge w-fit border border-abyss/20 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white">
                  Lire l&apos;article
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="w-full pb-[120px] pt-12">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-12 flex items-center justify-between border-b border-primary/20 pb-6">
                <h3 className="serif-heading text-3xl">
                  Tous les articles
                </h3>
                <span className="text-sm opacity-60">
                  {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
                </span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {filteredPosts.map((post: any) => (
                    <article key={post.id} className="group cursor-pointer">
                      <div className="relative mb-4 aspect-[3/2] overflow-hidden">
                        <img
                          src={post.featuredImage?.url || ''}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                          {post.categories?.[0]?.name || 'Article'}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest opacity-60">
                          <span>{post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('fr-FR') : ''}</span>
                          <div className="h-2 w-[1px] bg-abyss/30" />
                          <span>5 min</span>
                        </div>
                        <h4 className="serif-heading text-xl leading-tight transition-colors group-hover:text-primary">
                          {post.title}
                        </h4>
                        <p className="text-xs font-light leading-relaxed opacity-70">
                          {post.excerpt || ''}
                        </p>
                        <div className="flex items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                          <span>Lire la suite</span>
                          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                            arrow_forward
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-sm opacity-60">
                    Aucun article ne correspond à votre recherche.
                  </p>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="mb-12 border border-primary/20 p-6">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Catégories
                </h4>
                <ul className="space-y-3">
                  {categories.map((category: any) => {
                    const count = posts.filter((post: any) =>
                      post.categories?.some((cat: any) => cat.name === category.name)
                    ).length
                    return (
                      <li key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(category.name)}
                          className={`flex w-full items-center justify-between text-left text-sm transition-colors hover:text-primary ${
                            selectedCategory === category.name ? 'font-semibold text-primary' : ''
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs opacity-60">({count})</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mb-12 border border-primary/20 p-6">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Articles récents
                </h4>
                <ul className="space-y-6">
                  {recentPosts.map((post: any) => (
                    <li key={post.id} className="group cursor-pointer">
                      <div className="mb-2 flex items-center gap-3 text-[9px] uppercase tracking-widest opacity-60">
                        <span>{post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('fr-FR') : ''}</span>
                      </div>
                      <h5 className="text-sm font-medium leading-tight transition-colors group-hover:text-primary">
                        {post.title}
                      </h5>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-primary/20 bg-ecru p-8">
                <span className="material-symbols-outlined mb-4 text-4xl text-primary">
                  mail
                </span>
                <h4 className="serif-heading mb-3 text-2xl">
                  Restez informé
                </h4>
                <p className="mb-6 text-xs font-light leading-relaxed opacity-70">
                  Recevez nos derniers articles et inspirations voyage directement dans votre boîte mail.
                </p>
                <div className="flex border-b border-primary py-2">
                  <input
                    className="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
                    type="email"
                    placeholder="Votre email"
                  />
                </div>
                <button className="sharp-edge mt-4 w-full bg-abyss px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-primary">
                  S&apos;abonner
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
