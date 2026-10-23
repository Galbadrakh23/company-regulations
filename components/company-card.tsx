"use client"

import { useEffect, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Check, Copy, ExternalLink, FileText } from "lucide-react"
import type { Company } from "@/lib/companies"

export function CompanyCard({ company }: { company: Company }) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const pdfPath = company.pdf.trim()
  const fullUrl = `${origin}${pdfPath}`

  const handleView = () => {
    window.open(pdfPath, "_blank", "noopener,noreferrer")
  }

  const handleCopy = async () => {
    setCopied(false)
    setCopyError(false)
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError(true)
    }
  }

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5">
      <div className="flex min-h-16 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-sky-50 text-lg font-bold text-indigo-700 ring-1 ring-indigo-100">
          {company.name.trim().charAt(0).toLocaleUpperCase("mn")}
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-semibold leading-5 text-slate-900 text-balance">{company.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            PDF журам
          </p>
        </div>
      </div>

      <div className="my-5 flex flex-1 items-center justify-center rounded-2xl bg-slate-50/80 p-4 ring-1 ring-inset ring-slate-100">
        <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-100">
          {origin ? (
            <QRCodeCanvas
              value={fullUrl}
              size={104}
              level="M"
              aria-label={`${company.name} журмын холбоосын QR код`}
            />
          ) : (
            <div className="h-[104px] w-[104px] animate-pulse rounded bg-slate-100" aria-hidden="true" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleView}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Журам харах
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Хуулагдлаа
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Холбоос хуулах
            </>
          )}
        </button>
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? "Холбоосыг санах ойд хууллаа." : copyError ? "Холбоос хуулах боломжгүй байна." : ""}
        </p>
        {copyError && (
          <p className="text-center text-xs text-red-600" role="alert">
            Холбоос хуулах боломжгүй байна. Хуудасны хаягийг шалгана уу.
          </p>
        )}
      </div>
    </article>
  )
}
