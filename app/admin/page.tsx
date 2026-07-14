"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, X, CheckCircle, Loader2, Lock } from "lucide-react"
import type { PhotoAspect, PhotoCategory } from "@/lib/gallery-photos"

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
  const [result, setResult] = useState<{ added: number } | null>(null)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

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

    try {
      const formData = new FormData()
      formData.append("password", password)
      pending.forEach((p) => {
        formData.append("files", p.file)
        formData.append("categories", p.category)
        formData.append("aspects", p.aspect)
        formData.append("labels", p.label)
      })

      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          setUnlocked(false)
          setAuthError("Password was rejected. Please re-enter it.")
        }
        setError(data.error || "Upload failed.")
        return
      }

      setResult({ added: data.added })
      setPending([])
      if (inputRef.current) inputRef.current.value = ""
    } catch {
      setError("Something went wrong. Check your connection and try again.")
    } finally {
      setUploading(false)
    }
  }

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
    <section className="mx-auto max-w-4xl px-6 py-16 md:px-10">
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
            {uploading ? "Uploading..." : `Upload ${pending.length} Photo${pending.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-8 flex items-center gap-2 border border-accent/40 bg-accent/10 px-4 py-3 text-accent">
          <CheckCircle className="h-5 w-5" />
          <span className="font-body text-sm">
            {result.added} photo{result.added > 1 ? "s" : ""} added. They&apos;re live on the
            gallery now.
          </span>
        </div>
      )}

      {error && (
        <div className="mt-8 border border-destructive/40 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive">
          {error}
        </div>
      )}
    </section>
  )
}
