"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface FilmStripProps {
  side: "left" | "right"
}

/**
 * A slim vertical film strip fixed to one edge of the viewport.
 * Its sprocket holes "advance" as the page scrolls, echoing film
 * winding through a camera without ever going loud or distracting.
 */
export function FilmStrip({ side }: FilmStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const direction = side === "left" ? 1 : -1
    const onScroll = () => {
      raf = window.requestAnimationFrame(() => {
        const offset = window.scrollY * 0.35 * direction
        if (stripRef.current) {
          stripRef.current.style.transform = `translateY(${-(offset % 64)}px)`
        }
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(raf)
    }
  }, [side])

  const holes = Array.from({ length: 40 })

  return (
    <div
      className={cn(
        "fixed top-0 z-40 hidden h-full w-7 md:block",
        side === "left" ? "left-0" : "right-0"
      )}
      style={{ backgroundColor: "hsl(var(--film))" }}
      aria-hidden="true"
    >
      <div ref={stripRef} className="flex flex-col items-center">
        {holes.map((_, i) => (
          <div
            key={i}
            className="my-4 h-3 w-3 rounded-[2px]"
            style={{ backgroundColor: "hsl(var(--background))" }}
          />
        ))}
      </div>
    </div>
  )
}
