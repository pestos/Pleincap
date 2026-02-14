'use client'

import { useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Les trésors cachés de la Méditerranée : au-delà des destinations classiques",
    excerpt: "Découvrez les joyaux méconnus de la Méditerranée, des criques secrètes de Croatie aux villages perchés de la côte amalfitaine, pour une expérience de croisière véritablement unique.",
    image: "https://www.plein-cap.com/images/2026/odyssee/entete_odyssee_2026.jpg",
    category: "Destinations",
    author: "Sophie Moreau",
    date: "15 janvier 2026",
    readTime: "8 min",
    featured: true
  },
  {
    id: 2,
    title: "Orient-Express : Voyage dans le temps à bord du train légendaire",
    excerpt: "Plongez dans l'élégance d'une époque révolue. L'Orient-Express n'est pas qu'un train, c'est une expérience sensorielle entre luxe et histoire.",
    image: "https://www.plein-cap.com/images/2026/train-autriche/shutterstock_2063740619.jpg",
    category: "Voyages en Train",
    author: "Jean-Michel Duvall",
    date: "12 janvier 2026",
    readTime: "6 min"
  },
  {
    id: 3,
    title: "Croisière culturelle sur le Danube : de Vienne à Budapest",
    excerpt: "Naviguez sur le Danube bleu et découvrez les capitales impériales d'Europe centrale, enrichies par les conférences de nos historiens passionnés.",
    image: "https://www.plein-cap.com/images/stories/MsLadyDiletta/Lady-Diletta_08.jpg",
    category: "Croisières Fluviales",
    author: "Marie Dupont",
    date: "10 janvier 2026",
    readTime: "7 min"
  },
  {
    id: 4,
    title: "Les conférenciers Plein Cap : rencontre avec nos experts",
    excerpt: "Nos voyages sont enrichis par la présence d'historiens, archéologues et spécialistes culturels. Découvrez leurs parcours fascinants et leur passion pour le partage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMDCtemCn76yZjscVkq4u5Qgo5cRM9GhYWf2ZlJL3kgJLYMpKt9wV9M9KlJMt-ghB6vH4AYI1RzB1tBHJweLEjmOCgEZjEbPHtF1mHHu7uAY5P8v-gKpOqS_AmG020A6-P8iof7MbF6GI8iMLr0jPJfHza1nCRgzgcPaTQqYg2qTd1B17-erUVunggF1tomGga-VM9O6JXCsBJ9sjwz3DrV1bivedTaCPmvsT_h2I4wutNvDVLENEDZ61KnCKRVHC7l34cbTae_aU",
    category: "Esprit Plein Cap",
    author: "Isabelle Laurent",
    date: "8 janvier 2026",
    readTime: "5 min"
  },
  {
    id: 5,
    title: "Escapade culturelle à Dakar : entre tradition et modernité",
    excerpt: "Partez à la découverte de la capitale sénégalaise, où l'art contemporain côtoie les traditions ancestrales dans une explosion de couleurs et de saveurs.",
    image: "https://www.plein-cap.com/images/2026/dakar/shutterstock_597262751.jpg",
    category: "Escapades Culturelles",
    author: "Thomas Bernard",
    date: "5 janvier 2026",
    readTime: "6 min"
  },
  {
    id: 6,
    title: "Capitales baltes : un voyage au cœur de l'histoire européenne",
    excerpt: "De Tallinn à Vilnius en passant par Riga, explorez ces villes médiévales préservées, témoins de siècles d'histoire mouvementée.",
    image: "https://www.plein-cap.com/images/2026/capitales_baltes/entete_capitales_baltes.jpg",
    category: "Destinations",
    author: "Caroline Petit",
    date: "2 janvier 2026",
    readTime: "7 min"
  },
  {
    id: 7,
    title: "Spitzberg : expédition au pays des glaces éternelles",
    excerpt: "Embarquez pour une aventure arctique unique à bord du SH Diana. Glaciers majestueux, faune sauvage et aurores boréales vous attendent.",
    image: "https://www.plein-cap.com/images/2026/spitzberg_sh_diana/Monacobreen__SS_1672-1.jpg",
    category: "Croisières Maritimes",
    author: "Marc Legrand",
    date: "28 décembre 2025",
    readTime: "9 min"
  }
]

const categories = [
  "Toutes les catégories",
  "Destinations",
  "Croisières Maritimes",
  "Croisières Fluviales",
  "Voyages en Train",
  "Escapades Culturelles",
  "Esprit Plein Cap"
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === "Toutes les catégories" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const recentPosts = blogPosts.slice(0, 4)

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
            Découvrez nos récits de voyage, conseils d'experts et inspirations culturelles pour préparer votre prochaine aventure exceptionnelle
          </p>
        </div>
      </section>

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
              {categories.map(cat => (
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
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                  {featuredPost.category}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="serif-heading mb-4 text-4xl md:text-5xl">
                  {featuredPost.title}
                </h2>
                <div className="mb-6 flex items-center gap-4 text-[10px] uppercase tracking-widest opacity-60">
                  <span>{featuredPost.author}</span>
                  <div className="h-3 w-[1px] bg-abyss/30" />
                  <span>{featuredPost.date}</span>
                  <div className="h-3 w-[1px] bg-abyss/30" />
                  <span>{featuredPost.readTime} de lecture</span>
                </div>
                <p className="mb-8 text-sm font-light leading-relaxed opacity-70">
                  {featuredPost.excerpt}
                </p>
                <button className="sharp-edge w-fit border border-abyss/20 bg-transparent px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-abyss hover:text-white">
                  Lire l'article
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

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {filteredPosts.map(post => (
                  <article key={post.id} className="group cursor-pointer">
                    <div className="relative mb-4 aspect-[3/2] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-abyss backdrop-blur-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest opacity-60">
                        <span>{post.date}</span>
                        <div className="h-2 w-[1px] bg-abyss/30" />
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="serif-heading text-xl leading-tight transition-colors group-hover:text-primary">
                        {post.title}
                      </h4>
                      <p className="text-xs font-light leading-relaxed opacity-70">
                        {post.excerpt}
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

              {filteredPosts.length === 0 && (
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
                  {categories.filter(cat => cat !== "Toutes les catégories").map(category => {
                    const count = blogPosts.filter(post => post.category === category).length
                    return (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`flex w-full items-center justify-between text-left text-sm transition-colors hover:text-primary ${
                            selectedCategory === category ? 'font-semibold text-primary' : ''
                          }`}
                        >
                          <span>{category}</span>
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
                  {recentPosts.map(post => (
                    <li key={post.id} className="group cursor-pointer">
                      <div className="mb-2 flex items-center gap-3 text-[9px] uppercase tracking-widest opacity-60">
                        <span>{post.date}</span>
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
                  S'abonner
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
