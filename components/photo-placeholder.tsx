import Image from "next/image"
import { Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoPlaceholderProps {
  label: string
  className?: string
  aspect?: "square" | "portrait" | "landscape" | "tall"
  imageUrl?: string
}

const aspectClasses: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  tall: "aspect-[2/3]",
}

/**
 * Shows the real photo once imageUrl is provided. Until then, shows a
 * warm placeholder tile standing in for a real photograph.
 */
export function PhotoPlaceholder({ label, className, aspect = "portrait", imageUrl }: PhotoPlaceholderProps) {
  if (imageUrl) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-sm border border-border/60",
          aspectClasses[aspect],
          className
        )}
      >
        <Image src={imageUrl} alt={label} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-sm border border-border/60",
        aspectClasses[aspect],
        className
      )}
      style={{
        background:
          "linear-gradient(155deg, hsl(32 24% 87%) 0%, hsl(30 20% 80%) 55%, hsl(28 18% 74%) 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center opacity-70">
        <ImageIcon className="h-6 w-6 text-foreground/50" />
        <span className="px-4 font-body text-[11px] uppercase tracking-[0.16em] text-foreground/50">
          {label}
        </span>
      </div>
    </div>
  )
}
