'use client'

export type EscapadesIntroProps = {
  eyebrow?: string
  title?: string
  description?: string
  edition?: string
}

export default function EscapadesIntro({
  eyebrow = 'Collection Journal de Bord',
  title = 'Escapade Culturelle',
  description =
    "Le voyage n'est pas seulement un déplacement dans l'espace, mais une immersion dans le temps et l'esprit des civilisations. Chez Plein Cap, nous concevons chaque itinéraire comme une conférence à ciel ouvert, où le paysage dialogue avec l'histoire.",
  edition = 'Édition 2024 — 2025',
}: EscapadesIntroProps) {
  return (
    <section className="mx-auto mb-20 mt-14 max-w-4xl text-center">
      <span className="mb-6 block text-xs font-bold uppercase tracking-[0.4em] text-primary">{eyebrow}</span>
      <h2 className="serif-heading mb-10 text-5xl leading-tight italic text-abyss md:text-8xl">{title}</h2>
      <div className="mx-auto mb-10 h-px w-24 bg-primary" />
      <p className="mb-8 text-xl font-serif italic leading-relaxed text-abyss/80 md:text-2xl">"{description}"</p>
      <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">{edition}</p>
    </section>
  )
}
