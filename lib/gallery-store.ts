import { put, list } from "@vercel/blob"
import type { GalleryPhoto } from "./gallery-photos"
import { galleryPhotos as seedPhotos } from "./gallery-photos"

const METADATA_PATHNAME = "gallery/photos.json"

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const { blobs } = await list({ prefix: METADATA_PATHNAME, limit: 1 })
    const match = blobs.find((b) => b.pathname === METADATA_PATHNAME)
    if (!match) return seedPhotos
    const res = await fetch(match.url, { cache: "no-store" })
    if (!res.ok) return seedPhotos
    const data = (await res.json()) as GalleryPhoto[]
    return Array.isArray(data) && data.length > 0 ? data : seedPhotos
  } catch {
    return seedPhotos
  }
}

async function saveGalleryPhotos(photos: GalleryPhoto[]) {
  await put(METADATA_PATHNAME, JSON.stringify(photos, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

export async function addGalleryPhotos(
  newEntries: Omit<GalleryPhoto, "id">[]
): Promise<GalleryPhoto[]> {
  const current = await getGalleryPhotos()
  const nextId = current.length > 0 ? Math.max(...current.map((p) => p.id)) + 1 : 1
  const withIds: GalleryPhoto[] = newEntries.map((entry, i) => ({
    ...entry,
    id: nextId + i,
  }))
  const updated = [...current, ...withIds]
  await saveGalleryPhotos(updated)
  return updated
}
