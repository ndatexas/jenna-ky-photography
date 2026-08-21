"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const STORAGE_KEY = "jky-inquiry-popup-seen"

export function InquiryPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const timer = window.setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem(STORAGE_KEY, "1")
    }, 4000)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fade-up fixed bottom-6 right-6 z-40 max-w-sm border border-border bg-background p-6 shadow-lg">
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="font-script text-2xl text-foreground">Have a shoot in mind?</p>
      <p className="mt-2 text-sm text-muted-foreground">
        I&apos;d love to hear about it. Share a few details and I&apos;ll follow up soon.
      </p>
      <Link
        href="/inquire"
        onClick={() => setVisible(false)}
        className="mt-4 inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-2.5 font-body text-xs uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-foreground"
      >
        Inquire Now
      </Link>
    </div>
  )
}
