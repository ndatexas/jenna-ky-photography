import { Suspense } from "react"
import { GalleryClient } from "@/components/gallery-client"

export const metadata = {
  title: "Gallery — Jenna KY Photography",
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-center text-muted-foreground md:px-10">Loading gallery…</div>}>
      <GalleryClient />
    </Suspense>
  )
}
