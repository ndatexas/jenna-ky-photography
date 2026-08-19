import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

interface ClientPayload {
  password: string
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

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {
        // Gallery metadata (category/aspect/label) is written in ONE batched
        // call from the client after all uploads finish, via /api/gallery/manage.
        // This avoids multiple simultaneous uploads racing to read-modify-write
        // the same shared metadata file, which previously caused some uploaded
        // photos to silently never show up in the gallery.
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (err) {
    console.error("Upload token error:", err)
    const message = err instanceof Error ? err.message : "Upload failed."
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
