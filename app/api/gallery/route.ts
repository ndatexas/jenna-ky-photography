import { NextResponse } from "next/server"
import { getGalleryPhotos } from "@/lib/gallery-store"

export const dynamic = "force-dynamic"

export async function GET() {
  const photos = await getGalleryPhotos()
  return NextResponse.json(photos)
}
