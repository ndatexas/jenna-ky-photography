import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import { addGalleryPhotos } from "@/lib/gallery-store"
import type { PhotoAspect, PhotoCategory } from "@/lib/gallery-photos"

export const dynamic = "force-dynamic"

const VALID_CATEGORIES: PhotoCategory[] = ["film", "family", "personal", "events", "brand"]
const VALID_ASPECTS: PhotoAspect[] = ["square", "portrait", "landscape", "tall"]

interface ClientPayload {
  password: string
  category: string
  aspect: string
  label: string
}

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let parsed: ClientPayload | null = null
        try {
          parsed = clientPayload ? (JSON.parse(clientPayload) as ClientPayload) : null
        } catch {
          parsed = null
        }

        if (!parsed || !process.env.ADMIN_PASSWORD || parsed.password !== process.env.ADMIN_PASSWORD) {
          throw new Error("Incorrect password.")
        }

        const category = VALID_CATEGORIES.includes(parsed.category as PhotoCategory)
          ? parsed.category
          : "personal"
        const aspect = VALID_ASPECTS.includes(parsed.aspect as PhotoAspect)
          ? parsed.aspect
          : "landscape"

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            category,
            aspect,
            label: parsed.label || "Photo",
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          const meta = tokenPayload ? JSON.parse(tokenPayload) : {}
          await addGalleryPhotos([
            {
              category: (meta.category as PhotoCategory) || "personal",
              aspect: (meta.aspect as PhotoAspect) || "landscape",
              label: meta.label || "Photo",
              imageUrl: blob.url,
            },
          ])
        } catch (err) {
          console.error("Failed to save gallery entry after upload:", err)
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (err) {
    console.error("Upload token error:", err)
    const message = err instanceof Error ? err.message : "Upload failed."
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
