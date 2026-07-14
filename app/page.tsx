import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SpecialtiesSection } from "@/components/specialties-section"
import { PhotoPlaceholder } from "@/components/photo-placeholder"

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-16 pt-16 md:flex-row md:px-10 md:pt-24">
        <div className="fade-up max-w-xl text-center md:text-left">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-accent">
            Dallas, TX Photographer
          </p>
          <h1 className="font-display text-5xl font-medium leading-[1.05] text-foreground md:text-6xl">
            Real moments,
            <br /> honestly seen.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Photographing events, family photos, and personal portraits with the
            same patience I bring to film, letting the moment happen before I take
            it.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 md:justify-start">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-foreground px-6 py-3 font-body text-sm uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              View Gallery <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="font-body text-sm uppercase tracking-[0.16em] text-muted-foreground hover:text-accent"
            >
              About
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md fade-up" style={{ animationDelay: "150ms" }}>
          <PhotoPlaceholder
            label="Featured Portrait"
            aspect="tall"
            className="w-full"
            imageUrl="https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/0fd204689a7b4e6db987d45c711581b7.jpg"
          />
        </div>
      </section>

      <div className="hairline mx-auto max-w-6xl md:mx-10" />

      <SpecialtiesSection />

      <div className="hairline mx-auto max-w-6xl md:mx-10" />

      {/* Quick preview strip */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-medium text-foreground md:text-5xl">
            Recent Work
          </h2>
          <Link
            href="/gallery"
            className="font-body text-sm uppercase tracking-[0.16em] text-muted-foreground hover:text-accent"
          >
            Full Gallery &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <PhotoPlaceholder
            label="Family"
            aspect="portrait"
            imageUrl="https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/e67d534e0da144a5b928106141137ac3.jpg"
          />
          <PhotoPlaceholder
            label="Film"
            aspect="square"
            imageUrl="https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/87cd687d44ec4ebda54339745174287a.jpg"
          />
          <PhotoPlaceholder
            label="Event"
            aspect="landscape"
            className="col-span-2 md:col-span-1"
            imageUrl="https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/5600bf5d4ad14f3c9b8f922e4b5f41c5.jpg"
          />
          <PhotoPlaceholder
            label="Personal"
            aspect="tall"
            imageUrl="https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/ba520d4b3eae491289533001d36df05a.jpg"
          />
        </div>
      </section>
    </main>
  )
}
