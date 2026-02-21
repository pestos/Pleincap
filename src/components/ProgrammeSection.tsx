'use client'

import { useState } from 'react'

type Media = { url?: string; alt?: string; id?: number | string }

type DayItem = {
  id: string
  day: number | string
  title: string
  description: any
  highlights?: string
  images?: Media | Media[]
}

export default function ProgrammeSection({ itinerary }: { itinerary: DayItem[] }) {
  const [expanded, setExpanded] = useState(false)
  const previewCount = 3
  const hasMore = itinerary.length > previewCount
  const visibleDays = expanded ? itinerary : itinerary.slice(0, previewCount)

  return (
    <section id="programme">
      <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
        Programme
      </span>
      <h3 className="serif-heading mb-12 text-4xl">Programme Quotidien</h3>
      <div className="relative space-y-16 pl-12">
        <div className="absolute left-5 top-0 h-full w-px bg-primary/30" />
        {visibleDays.map((day) => {
          const dayImages = (Array.isArray(day.images) ? day.images : [day.images].filter(Boolean)) as Media[]
          const dayImage = dayImages[0]

          return (
            <div key={day.id} className="group relative">
              <div className="absolute -left-[52px] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {day.day}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <h4 className="serif-heading mb-3 text-2xl leading-tight">{day.title}</h4>
                  <div className="mb-4 text-sm font-light leading-relaxed opacity-70">
                    {typeof day.description === 'object' &&
                      day.description &&
                      'root' in day.description &&
                      day.description.root?.children?.[0]?.children?.[0]?.text}
                  </div>
                  {day.highlights && (
                    <div className="flex flex-wrap gap-2">
                      {day.highlights.split('\n').map((highlight: string, idx: number) => (
                        <span
                          key={idx}
                          className="border border-primary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {dayImage?.url && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={dayImage.url}
                      alt={dayImage.alt || day.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Expand / Collapse button */}
      {hasMore && (
        <div className="relative mt-12 text-center">
          {/* Gradient fade when collapsed */}
          {!expanded && (
            <div className="pointer-events-none absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-background-light to-transparent dark:from-background-dark" />
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative inline-flex items-center gap-2 border border-primary/30 bg-background-light px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white dark:bg-background-dark"
          >
            <span className="material-symbols-outlined text-sm">
              {expanded ? 'expand_less' : 'expand_more'}
            </span>
            {expanded
              ? 'Reduire le programme'
              : `Voir tout le programme (${itinerary.length} jours)`}
          </button>
        </div>
      )}
    </section>
  )
}
