"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { upload } from "@vercel/blob/client"
import {
  Upload,
  X,
  CheckCircle,
  Loader2,
  Lock,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import type { GalleryPhoto, PhotoAspect, PhotoCategory } from "@/lib/gallery-photos"

interface PendingFile {
  file: File
  previewUrl: string
  category: PhotoCategory
  aspect: PhotoAspect
  label: string
}

const CATEGORY_OPTIONS: { value: PhotoCategory; label: string }[] = [
  { value: "film", label: "Film Photography" },
  { value: "family", label: "Family" },
  { value: "personal", label: "Personal Portraits" },
  { value: "events", label: "Events" },
  { value: "brand", label: "Brand Shoots" },
]

const FILTER_OPTIONS: { value: PhotoCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  ...CATEGORY_OPTIONS,
]

function classifyAspect(width: number, height: number): PhotoAspect {
  const ratio = width / height
  if (ratio > 1.2) return "landscape"
  if (ratio < 0.85) return "tall"
  return "square"
}

export default function AdminUploadPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  const [pending, setPending] = useState<PendingFile[]>([])
  const [defaultCategory, setDefaultCategory] = useState<PhotoCategory>("family")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState("")
  const [result, setResult] = useState<{ added: number; failed: number } | null>(null)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loadingPhotos, setLoadingPhotos] = useState(false)
  const [manageFilter, setManageFilter] = useState<PhotoCategory | "all">("all")
  const [manageError, setManageError] = useState("")
  const [busyId, setBusyId] = useState<number | null>(null)

  const loadPhotos = useCallback(async () => {
    setLoadingPhotos(true)
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" })
      const data = await res.json()
      if (Array.isArray(data)) setPhotos(data)
    } catch {
      // keep whatever is already shown
    } finally {
      setLoadingPhotos(false)
    }
  }, [])

  useEffect(() => {
    if (unlocked) loadPhotos()
  }, [unlocked, loadPhotos])

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    setUnlocked(true)
  }

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return
      const files = Array.from(fileList)
      files.forEach((file) => {
        const previewUrl = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
          const aspect = classifyAspect(img.naturalWidth, img.naturalHeight)
          setPending((prev) =>
            prev.map((p) => (p.previewUrl === previewUrl ? { ...p, aspect } : p))
          )
        }
        img.src = previewUrl
        setPending((prev) => [
          ...prev,
          {
            file,
            previewUrl,
            category: defaultCategory,
            aspect: "landscape",
            label: file.name.replace(/\.[^/.]+$/, ""),
          },
        ])
      })
    },
    [defaultCategory]
  )

  const removeFile = (previewUrl: string) => {
    setPending((prev) => prev.filter((p) => p.previewUrl !== previewUrl))
  }

  const updateFile = (previewUrl: string, patch: Partial<PendingFile>) => {
    setPending((prev) => prev.map((p) => (p.previewUrl === previewUrl ? { ...p, ...patch } : p)))
  }

  const handleSubmit = async () => {
    if (pending.length === 0) return
    setUploading(true)
    setError("")
    setResult(null)

    const succeeded: Omit<GalleryPhoto, "id">[] = []
    const stillPending: PendingFile[] = []
    let authFailed = false

    for (let i = 0; i < pending.length; i++) {
      const p = pending[i]
      if (authFailed) {
        stillPending.push(p)
        continue
      }
      setProgress(`Uploading ${i + 1} of ${pending.length}...`)
      try {
        const blob = await upload(p.file.name, p.file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          clientPayload: JSON.stringify({ password }),
        })
        succeeded.push({ category: p.category, aspect: p.aspect, label: p.label, imageUrl: blob.url })
      } catch (err) {
        const message = err instanceof Error ? err.message : ""
        if (message.toLowerCase().includes("password") || message.toLowerCase().includes("incorrect")) {
          authFailed = true
        }
        stillPending.push(p)
      }
    }

    if (authFailed) {
      setUnlocked(false)
      setAuthError("Password was rejected. Please re-enter it.")
    }

    if (succeeded.length > 0) {
      setProgress("Saving to gallery...")
      try {
        const res = await fetch("/api/gallery/manage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, action: "add", entries: succeeded }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || "Photos uploaded but could not be saved to the gallery.")
        } else {
          setResult({ added: succeeded.length, failed: stillPending.length })
          if (Array.isArray(data.photos)) setPhotos(data.photos)
        }
      } catch {
        setError("Photos uploaded but the gallery could not be updated. Refresh and check before re-uploading.")
      }
    }

    if (!authFailed && stillPending.length > 0 && succeeded.length > 0) {
      setError(
        (prev) =>
          prev ||
          `${stillPending.length} photo${stillPending.length > 1 ? "s" : ""} failed to upload — still listed below, try submitting again.`
      )
    }

    setPending(stillPending)
    if (stillPending.length === 0 && inputRef.current) inputRef.current.value = ""

    setUploading(false)
    setProgress("")
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this photo from the gallery?")) return
    setBusyId(id)
    setManageError("")
    try {
      const res = await fetch("/api/gallery/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "delete", id }),
      })
      const data = await res.json()
      if (!res.ok) {
        setManageError(data.error || "Could not delete photo.")
      } else if (Array.isArray(data.photos)) {
        setPhotos(data.photos)
      }
    } catch {
      setManageError("Could not delete photo. Check your connection and try again.")
    } finally {
      setBusyId(null)
    }
  }

  const handleCategoryChange = async (id: number, category: PhotoCategory) => {
    setBusyId(id)
    setManageError("")
    try {
      const res = await fetch("/api/gallery/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "update", id, category }),
      })
      const data = await res.json()
      if (!res.ok) {
        setManageError(data.error || "Could not update photo.")
      } else if (Array.isArray(data.photos)) {
        setPhotos(data.photos)
      }
    } catch {
      setManageError("Could not update photo. Check your connection and try again.")
    } finally {
      setBusyId(null)
    }
  }

  const moveGlobal = async (id: number, direction: "up" | "down") => {
    const index = photos.findIndex((p) => p.id === id)
    if (index === -1) return
    const swapIndex = direction === "up" ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= photos.length) return

    const reordered = [...photos]
    ;[reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]]
    setPhotos(reordered)
    setBusyId(id)
    setManageError("")
    try {
      const res = await fetch("/api/gallery/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "reorder", orderedIds: reordered.map((p) => p.id) }),
      })
      const data = await res.json()
      if (!res.ok) {
        setManageError(data.error || "Could not reorder photos.")
      } else if (Array.isArray(data.photos)) {
        setPhotos(data.photos)
      }
    } catch {
      setManageError("Could not reorder photos. Check your connection and try again.")
    } finally {
      setBusyId(null)
    }
  }

  const visiblePhotos = manageFilter === "all" ? photos : photos.filter((p) => p.category === manageFilter)

  if (!unlocked) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
        <div className="mb-6 flex items-center gap-2 text-accent">
          <Lock className="h-5 w-5" />
          <span className="font-body text-xs uppercase tracking-[0.25em]">Admin Access</span>
        </div>
        <h1 className="font-display text-4xl font-medium text-foreground">Upload Photos</h1>
        <form onSubmit={handleUnlock} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
            autoFocus
          />
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <button
            type="submit"
            className="w-full border border-foreground bg-foreground px-6 py-3 font-body text-sm uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Continue
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:px-10">
      <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">Admin</p>
      <h1 className="font-display text-5xl font-medium text-foreground">Upload Photos</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Drop photos below, set a category for each, and submit. They appear on the live
        gallery immediately, no other steps needed.
      </p>

      <div className="mt-10 flex items-center gap-4">
        <label className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Default category for new uploads
        </label>
        <select
          value={defaultCategory}
          onChange={(e) => setDefaultCategory(e.target.value as PhotoCategory)}
          className="border border-border bg-background px-3 py-2 font-body text-sm"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="mt-6 flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-border bg-secondary/30 p-10 text-center transition-colors hover:border-accent"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          addFiles(e.dataTransfer.files)
        }}
      >
        <Upload className="h-8 w-8 text-accent" />
        <p className="font-body text-sm text-muted-foreground">
          Click to browse, or drag and drop photos here
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {pending.length > 0 && (
        <div className="mt-10 space-y-4">
          {pending.map((p) => (
            <div
              key={p.previewUrl}
              className="flex flex-col gap-4 border border-border/70 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={p.previewUrl}
                alt=""
                className="h-24 w-24 flex-shrink-0 rounded-sm object-cover"
              />
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <select
                  value={p.category}
                  onChange={(e) =>
                    updateFile(p.previewUrl, { category: e.target.value as PhotoCategory })
                  }
                  className="border border-border bg-background px-3 py-2 font-body text-sm"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                  Detected: {p.aspect}
                </span>
                <input
                  type="text"
                  value={p.label}
                  onChange={(e) => updateFile(p.previewUrl, { label: e.target.value })}
                  placeholder="Label (optional)"
                  className="flex-1 border border-border bg-background px-3 py-2 font-body text-sm"
                />
              </div>
              <button
                onClick={() => removeFile(p.previewUrl)}
                aria-label="Remove"
                className="self-end text-muted-foreground hover:text-destructive sm:self-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 font-body text-sm uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50"
          >
            {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
            {uploading ? progress || "Uploading..." : `Upload ${pending.length} Photo${pending.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-8 flex items-center gap-2 border border-accent/40 bg-accent/10 px-4 py-3 text-accent">
          <CheckCircle className="h-5 w-5" />
          <span className="font-body text-sm">
            {result.added} photo{result.added > 1 ? "s" : ""} added
            {result.failed > 0 ? `, ${result.failed} failed` : ""}. They&apos;re live on the gallery now.
          </span>
        </div>
      )}

      {error && (
        <div className="mt-8 border border-destructive/40 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="hairline my-16" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-3xl font-medium text-foreground">Manage Gallery</h2>
        <div className="flex items-center gap-3">
          <select
            value={manageFilter}
            onChange={(e) => setManageFilter(e.target.value as PhotoCategory | "all")}
            className="border border-border bg-background px-3 py-2 font-body text-sm"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {loadingPhotos && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Use the arrows to reorder photos, the category dropdown to move a photo to a
        different section, or the trash icon to remove it from the site permanently.
      </p>

      {manageError && (
        <div className="mt-4 border border-destructive/40 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive">
          {manageError}
        </div>
      )}

      <div className="mt-8 space-y-3">
        {visiblePhotos.length === 0 && !loadingPhotos && (
          <p className="text-sm text-muted-foreground">No photos in this category yet.</p>
        )}
        {visiblePhotos.map((photo) => (
          <div
            key={photo.id}
            className="flex flex-col gap-4 border border-border/70 p-4 sm:flex-row sm:items-center"
          >
            {photo.imageUrl ? (
              <img
                src={photo.imageUrl}
                alt={photo.label}
                className="h-20 w-20 flex-shrink-0 rounded-sm object-cover"
              />
            ) : (
              <div className="h-20 w-20 flex-shrink-0 rounded-sm bg-secondary" />
            )}

            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="font-body text-sm text-foreground">{photo.label}</span>
              <select
                value={photo.category}
                onChange={(e) => handleCategoryChange(photo.id, e.target.value as PhotoCategory)}
                disabled={busyId === photo.id}
                className="border border-border bg-background px-3 py-2 font-body text-sm"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 self-end sm:self-center">
              <button
                onClick={() => moveGlobal(photo.id, "up")}
                disabled={busyId === photo.id}
                aria-label="Move up"
                className="text-muted-foreground hover:text-accent disabled:opacity-40"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
              <button
                onClick={() => moveGlobal(photo.id, "down")}
                disabled={busyId === photo.id}
                aria-label="Move down"
                className="text-muted-foreground hover:text-accent disabled:opacity-40"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(photo.id)}
                disabled={busyId === photo.id}
                aria-label="Delete"
                className="ml-2 text-muted-foreground hover:text-destructive disabled:opacity-40"
              >
                {busyId === photo.id ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
