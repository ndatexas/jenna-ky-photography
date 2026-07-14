import Link from "next/link"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { PhotoPlaceholder } from "@/components/photo-placeholder"

export const metadata = {
  title: "About — Jenna KY Photography",
}

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div className="fade-up md:sticky md:top-28">
          <PhotoPlaceholder
            label="Jenna Calton"
            aspect="portrait"
            className="w-full"
            imageUrl="https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/66983c5581884a498f919e0a860921e3.png"
          />
        </div>

        <div className="fade-up" style={{ animationDelay: "120ms" }}>
          <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">About</p>
          <h1 className="font-display text-5xl font-medium text-foreground md:text-6xl">
            Jenna Calton
          </h1>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I am a photographer based in Dallas, Texas, specializing in events,
              family photos, and personal portraits. My approach is rooted in
              patience and attentiveness, capturing genuine moments as they unfold
              rather than staging them.
            </p>
            <p>
              My background is not limited to photography. Years spent in marketing,
              promotions, and event coordination shaped how I work today, giving me
              an instinct for anticipating meaningful moments and understanding what
              makes a story worth telling. I bring that experience into every session.
            </p>
            <p>
              Alongside my client work, I continue to shoot film, a medium that
              reflects the same values I bring to all of my photography: patience,
              warmth, and authenticity.
            </p>
            <p>
              I am currently building my photography practice in Dallas and the
              surrounding areas, and I welcome the opportunity to work with new
              clients across weddings, events, family sessions, and personal
              portraits.
            </p>
          </div>

          <div className="hairline my-10" />

          <h2 className="font-display text-2xl font-medium text-foreground">Contact</h2>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="tel:+16232622149" className="flex items-center gap-3 hover:text-accent">
              <Phone className="h-4 w-4" /> (623) 262-2149
            </a>
            <a href="mailto:jkmcalton@outlook.com" className="flex items-center gap-3 hover:text-accent">
              <Mail className="h-4 w-4" /> jkmcalton@outlook.com
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-4 w-4" /> Dallas, Texas &amp; surrounding areas
            </span>
            <Link
              href="https://www.linkedin.com/in/jenna-calton-11788526a/"
              target="_blank"
              className="flex items-center gap-3 hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" /> LinkedIn
            </Link>
          </div>

          <Link
            href="/gallery"
            className="mt-10 inline-flex items-center gap-2 border border-foreground px-6 py-3 font-body text-sm uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
