import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { addGalleryPhotos } from "@/lib/gallery-store"
import type { PhotoAspect, PhotoCategory } from "@/lib/gallery-photos"

export const dynamic = "force-dynamic"

const VALID_CATEGORIES: PhotoCategory[] = ["film", "family", "personal", "events"]
const VALID_ASPECTS: PhotoAspect[] = ["square", "portrait", "landscape", "tall"]

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Photo storage isn't connected yet. Ask your site admin to connect Vercel Blob storage in project settings." },
      { status: 503 }
    )
  }

  const formData = await request.formData()
  const password = formData.get("password")
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
  }

  const files = formData.getAll("files") as File[]
  const categories = formData.getAll("categories") as string[]
  const aspects = formData.getAll("aspects") as string[]
  const labels = formData.getAll("labels") as string[]

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 })
  }

  try {
    const newEntries: Omit<import("@/lib/gallery-photos").GalleryPhoto, "id">[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const category = VALID_CATEGORIES.includes(categories[i] as PhotoCategory)
        ? (categories[i] as PhotoCategory)
        : "personal"
      const aspect = VALID_ASPECTS.includes(aspects[i] as PhotoAspect)
        ? (aspects[i] as PhotoAspect)
        : "landscape"
      const label = labels[i]?.trim() || "Photo"

      const blob = await put(`gallery/images/${Date.now()}-${i}-${file.name}`, file, {
        access: "public",
        addRandomSuffix: true,
      })

      newEntries.push({ category, aspect, label, imageUrl: blob.url })
    }

    const updated = await addGalleryPhotos(newEntries)
    return NextResponse.json({ success: true, added: newEntries.length, total: updated.length })
  } catch (err) {
    console.error("Upload failed:", err)
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 })
  }
}
