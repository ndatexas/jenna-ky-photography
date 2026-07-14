"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Replaces the default cursor with a small, crisp accent-colored dot that
 * tracks the pointer 1:1 (no lag/trail), plus a camera-shutter flash on
 * every click. Disabled automatically on touch devices.
 */
export function CursorEffects() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [flashes, setFlashes] = useState<number[]>([])

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    setEnabled(isFinePointer)
    if (!isFinePointer) return

    document.body.classList.add("cursor-none-desktop")

    const handleMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const handleClick = (e: MouseEvent) => {
      const id = Date.now()
      setFlashes((prev) => [...prev, id])
      window.setTimeout(() => {
        setFlashes((prev) => prev.filter((f) => f !== id))
      }, 450)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("click", handleClick)

    return () => {
      document.body.classList.remove("cursor-none-desktop")
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: "hsl(var(--accent))" }}
      />
      {flashes.map((id) => (
        <div
          key={id}
          className="shutter-flash pointer-events-none fixed inset-0 z-[9998] bg-white"
        />
      ))}
    </>
  )
}
