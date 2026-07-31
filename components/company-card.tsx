"use client"

import { useEffect, useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Check, Copy, FileText } from "lucide-react"
import type { Company } from "@/lib/companies"

export function CompanyCard({ company }: { company: Company }) {
  const [copied, setCopied] = useState(false)
  const [origin, setOrigin] = useState("")

  // Resolve the deployed origin on the client so links/QR point to the live URL.
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const fullUrl = `${origin}${company.pdf}`

  const handleView = () => {
    window.open(company.pdf, "_blank", "noopener,noreferrer")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — ignore silently.
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-5 text-center">
      <h2 className="text-lg font-semibold text-primary text-balance">{company.name}</h2>

      <div className="rounded-md bg-background p-2">
        {origin ? (
          <QRCodeCanvas value={fullUrl} size={112} level="M" />
        ) : (
          <div className="h-28 w-28" aria-hidden="true" />
        )}
      </div>

      <div className="flex w-full flex-col gap-2">
        <button
          type="button"
          onClick={handleView}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Журам харах
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Хуулагдлаа
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Холбоос хуулах
            </>
          )}
        </button>
      </div>
    </div>
  )
}
