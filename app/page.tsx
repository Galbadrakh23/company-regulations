"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { companies } from "@/lib/companies"
import { CompanyCard } from "@/components/company-card"

export default function HomePage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return companies
    return companies.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-primary text-balance md:text-3xl">
          Компанийн дотоод журмын нэгдсэн сан
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Компаниудын дотоод журмын PDF файлуудыг эндээс харна уу.
        </p>
      </header>

      <div className="mx-auto mb-8 max-w-md">
        <label htmlFor="search" className="sr-only">
          Компани хайх
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Компанийн нэрээр хайх..."
            className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">Хайлтад тохирох компани олдсонгүй.</p>
      )}
    </main>
  )
}
