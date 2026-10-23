"use client"

import { useMemo, useState } from "react"
import { Building2, FileText, Search, X } from "lucide-react"
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
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/70 via-slate-50 to-slate-100/80 px-4 py-8 text-foreground sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="relative mb-8 overflow-hidden rounded-3xl border border-white/80 bg-white/75 px-6 py-10 text-center shadow-sm backdrop-blur sm:mb-10 sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-indigo-700">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              НЭГДСЭН МЭДЭЭЛЛИЙН САН
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl">
              Компанийн дотоод журмын сан
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Байгууллагынхаа дотоод журмыг хайж олоод, PDF хэлбэрээр шууд нээгээрэй.
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/80">
              <FileText className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              <span className="font-semibold text-slate-900">{companies.length}</span>
              компанийн журам энд байна
            </div>
          </div>
        </header>

        <section aria-labelledby="companies-heading">
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">Журмын жагсаалт</p>
              <h2 id="companies-heading" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Байгууллагууд
              </h2>
            </div>
            <p className="text-sm text-slate-500" aria-live="polite" aria-atomic="true">
              {query.trim()
                ? `${filtered.length} / ${companies.length} компани`
                : `${filtered.length} компани`}
            </p>
          </div>

          <div className="mb-7">
            <label htmlFor="search" className="sr-only">
              Компани хайх
            </label>
            <div className="group relative mx-auto max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600"
                aria-hidden="true"
              />
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Компанийн нэрээр хайх..."
                autoComplete="off"
                aria-describedby="search-hint"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 pl-12 pr-12 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Хайлтыг цэвэрлэх"
                  className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p id="search-hint" className="mt-2 text-center text-xs text-slate-500">
              Нэрийн хэсгийг бичиж тохирох байгууллагыг шүүнэ үү.
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">Тохирох компани олдсонгүй</h3>
              <p className="mt-1 text-sm text-slate-500">Өөр нэрээр хайх эсвэл хайлтын үгээ өөрчилнө үү.</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 rounded-xl px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Бүх компанийг харах
              </button>
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
          Компанийн дотоод журмын нэгдсэн сан
        </footer>
      </div>
    </main>
  )
}
