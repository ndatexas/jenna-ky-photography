"use client"

import { useEffect, useState } from "react"

/**
 * A subtle shooting star that streaks across the top of the screen once,
 * shortly after the site first loads.
 */
export function ShootingStar() {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setPlay(true), 600)
    return () => window.clearTimeout(timer)
  }, [])

  if (!play) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-40 overflow-hidden" aria-hidden="true">
      <span className="shooting-star" />
    </div>
  )
}
