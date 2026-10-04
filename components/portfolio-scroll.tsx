"use client"

import { PhotoPlaceholder } from "@/components/photo-placeholder"
import type { GalleryPhoto } from "@/lib/gallery-photos"

interface PortfolioScrollProps {
  photos: GalleryPhoto[]
}

/**
 * Horizontally scrollable strip of portfolio images for the homepage.
 * Lets visitors browse a wide slice of work without leaving the page.
 */
export function PortfolioScroll({ photos }: PortfolioScrollProps) {
  return (
    <div className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="w-[220px] flex-shrink-0 snap-start md:w-[260px]"
        >
          <PhotoPlaceholder
            label={photo.label}
            aspect={photo.aspect}
            imageUrl={photo.imageUrl}
          />
        </div>
      ))}
    </div>
  )
}
