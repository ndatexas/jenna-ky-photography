"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PhotoPlaceholder } from "@/components/photo-placeholder"
import { galleryPhotos as seedPhotos, type GalleryPhoto, type PhotoCategory } from "@/lib/gallery-photos"

type Filter = "all" | PhotoCategory

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "film", label: "Film Photography" },
  { value: "family", label: "Family" },
  { value: "personal", label: "Personal" },
  { value: "events", label: "Events" },
]

export function GalleryClient() {
  const searchParams = useSearchParams()
  const initial = (searchParams.get("category") as Filter) || "all"
  const [active, setActive] = useState<Filter>(initial)
  const [selected, setSelected] = useState<GalleryPhoto | null>(null)
  const [photos, setPhotos] = useState<GalleryPhoto[]>(seedPhotos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : seedPhotos))
      .then((data: GalleryPhoto[]) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) setPhotos(data)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const visible = useMemo(
    () => (active === "all" ? photos : photos.filter((i) => i.category === active)),
    [active, photos]
  )

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="mb-4 max-w-xl">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">Portfolio</p>
        <h1 className="font-display text-5xl font-medium text-foreground">Gallery</h1>
        <p className="mt-4 text-muted-foreground">
          A collection of my film, family, personal, and event work.
          <br />
          Always looking for the next moment to capture.
        </p>
      </div>

      <div className="my-10 flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              "border px-4 py-2 font-body text-xs uppercase tracking-[0.14em] transition-colors",
              active === f.value
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
            )}
          >
            {f.label}
          </button>
        ))}
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelected(item)}
              className="group text-left"
            >
              <PhotoPlaceholder
                label={item.label}
                aspect={item.aspect}
                imageUrl={item.imageUrl}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-6"
            onClick={() => setSelected(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 text-background/80 hover:text-background"
              onClick={() => setSelected(null)}
            >
              <X className="h-7 w-7" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-h-[80vh] w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <PhotoPlaceholder
                label={selected.label}
                aspect="portrait"
                imageUrl={selected.imageUrl}
                className="w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
