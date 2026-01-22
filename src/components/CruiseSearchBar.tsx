"use client";

import React, { useState, createContext, useContext } from "react"
import { ChevronDown } from "lucide-react"

const FilterContext = createContext<{ open: number; setOpen: (i: number) => void }>({
  open: -1,
  setOpen: () => {},
})

function CheckboxFilter({
  label,
  options = [],
  border = true,
  index,
}: {
  label: string
  options?: string[]
  border?: boolean
  index: number
}) {
  const { open, setOpen } = useContext(FilterContext)
  const isOpen = open === index
  const [selected, setSelected] = useState<string[]>([])

  const toggleOption = (opt: string) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    )
  }

  return (
    <div
      className={`relative p-4 transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-zinc-700 ${border ? "border-r border-border-light dark:border-border-dark" : ""} ${isOpen ? "ring-2 ring-primary/50" : ""}`}
    >
      <button
        className="w-full text-left"
        aria-expanded={isOpen}
        onClick={() => setOpen(isOpen ? -1 : index)}
      >
        <label className="block text-xs font-medium text-text-light dark:text-text-dark uppercase">
          {label}
        </label>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-900 dark:text-white">
            {selected.length === 0 ? "Tout" : selected.join(", ")}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {isOpen && options.length > 0 && (
        <ul className="absolute left-0 mt-2 w-full z-20 bg-white dark:bg-zinc-800 rounded-md shadow-lg p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
          {options.map((opt) => {
            const id = `${label}-${opt}`
            const checked = selected.includes(opt)
            return (
              <li key={opt} className="flex items-center gap-2">
                <input
                  id={id}
                  type="checkbox"
                  className="accent-primary h-4 w-4 rounded-sm border-gray-300 dark:border-gray-600"
                  checked={checked}
                  onChange={() => toggleOption(opt)}
                />
                <label htmlFor={id} className="cursor-pointer">
                  {opt}
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function RangeFilter({
  label,
  min = 0,
  max = 100,
  unit = "",
  border = true,
  index,
}: {
  label: string
  min?: number
  max?: number
  unit?: string
  border?: boolean
  index: number
}) {
  const { open, setOpen } = useContext(FilterContext)
  const isOpen = open === index
  const [value, setValue] = useState(min)
  
  const displayValue = unit ? `${value} ${unit}` : value.toString()

  return (
    <div
      className={`relative p-4 transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-zinc-700 ${border ? "border-r border-border-light dark:border-border-dark" : ""} ${isOpen ? "ring-2 ring-primary/50" : ""}`}
    >
      <button
        className="w-full text-left"
        aria-expanded={isOpen}
        onClick={() => setOpen(isOpen ? -1 : index)}
      >
        <label className="block text-xs font-medium text-text-light dark:text-text-dark uppercase">
          {label}
        </label>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-900 dark:text-white">
            {value === min ? "Tout" : displayValue}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full z-20 bg-white dark:bg-zinc-800 rounded-md shadow-lg p-4">
          <div className="flex items-center justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{min} {unit}</span>
            <span>{max} {unit}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="mt-2 text-center text-sm font-medium text-primary">
            {displayValue}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CruiseSearchBar() {
  const currentYear = new Date().getFullYear()
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
    (currentYear + 1).toString(),
    (currentYear + 2).toString(),
  ]

  return (
    <div className="bg-background-light dark:bg-background-dark font-display flex items-center justify-center w-full py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-white via-blue-50 to-white dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 shadow-xl rounded-xl border border-primary/20">
          {(() => {
            const [open, setOpen] = useState<number>(-1)
            return (
              <FilterContext.Provider value={{ open, setOpen }}>
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-light dark:divide-border-dark">
                  <CheckboxFilter
                    index={0}
                    label="TYPE DE VOYAGE"
                    options={[
                      "Croisière maritime",
                      "Croisière fluviale",
                      "Voyage",
                      "Voyage en train",
                    ]}
                  />
                  <CheckboxFilter index={1} label="DATE DE DÉPART" options={months} />
                  <RangeFilter index={2} label="VOTRE BUDGET" min={0} max={20000} unit="€" />
                  <RangeFilter
                    index={3}
                    label="TAILLE DU BATEAU"
                    min={0}
                    max={500}
                    unit="passagers"
                    border={false}
                  />
                </div>
              </FilterContext.Provider>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
