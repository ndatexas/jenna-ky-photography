import { NextResponse } from "next/server"
import {
  addGalleryPhotos,
  deleteGalleryPhoto,
  reorderGalleryPhotos,
  updateGalleryPhoto,
} from "@/lib/gallery-store"
import type { GalleryPhoto, PhotoAspect, PhotoCategory } from "@/lib/gallery-photos"

export const dynamic = "force-dynamic"

const VALID_CATEGORIES: PhotoCategory[] = ["film", "family", "personal", "events", "brand"]
const VALID_ASPECTS: PhotoAspect[] = ["square", "portrait", "landscape", "tall"]

function checkPassword(password: unknown) {
  return Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!checkPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
  }

  try {
    switch (body.action) {
      case "add": {
        const rawEntries = Array.isArray(body.entries) ? body.entries : []
        const entries: Omit<GalleryPhoto, "id">[] = rawEntries.map((e: Record<string, unknown>) => ({
          category: VALID_CATEGORIES.includes(e.category as PhotoCategory)
            ? (e.category as PhotoCategory)
            : "personal",
          aspect: VALID_ASPECTS.includes(e.aspect as PhotoAspect) ? (e.aspect as PhotoAspect) : "landscape",
          label: typeof e.label === "string" && e.label.trim() ? e.label : "Photo",
          imageUrl: typeof e.imageUrl === "string" ? e.imageUrl : undefined,
        }))
        if (entries.length === 0) {
          return NextResponse.json({ error: "No entries to add." }, { status: 400 })
        }
        const photos = await addGalleryPhotos(entries)
        return NextResponse.json({ success: true, photos })
      }
      case "delete": {
        const id = Number(body.id)
        if (!Number.isFinite(id)) {
          return NextResponse.json({ error: "Invalid photo id." }, { status: 400 })
        }
        const photos = await deleteGalleryPhoto(id)
        return NextResponse.json({ success: true, photos })
      }
      case "update": {
        const id = Number(body.id)
        if (!Number.isFinite(id)) {
          return NextResponse.json({ error: "Invalid photo id." }, { status: 400 })
        }
        const patch: Partial<Omit<GalleryPhoto, "id">> = {}
        if (typeof body.category === "string" && VALID_CATEGORIES.includes(body.category as PhotoCategory)) {
          patch.category = body.category as PhotoCategory
        }
        if (typeof body.label === "string") {
          patch.label = body.label
        }
        const photos = await updateGalleryPhoto(id, patch)
        return NextResponse.json({ success: true, photos })
      }
      case "reorder": {
        const orderedIds = Array.isArray(body.orderedIds) ? body.orderedIds.map(Number) : []
        if (orderedIds.length === 0) {
          return NextResponse.json({ error: "No order provided." }, { status: 400 })
        }
        const photos = await reorderGalleryPhotos(orderedIds)
        return NextResponse.json({ success: true, photos })
      }
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 })
    }
  } catch (err) {
    console.error("Gallery manage error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
