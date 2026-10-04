import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SpecialtiesSection } from "@/components/specialties-section"
import { PhotoPlaceholder } from "@/components/photo-placeholder"
import { PortfolioScroll } from "@/components/portfolio-scroll"
import { caseStudies } from "@/lib/case-studies"
import { galleryPhotos } from "@/lib/gallery-photos"

const scrollPhotos = galleryPhotos.slice(0, 14)

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
            Brands, headshots,
            <br /> and portraits with intention.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm Jenna, a Dallas-based photographer working with brands, teams, and
            individuals on product shoots, headshots, personal portraits, and
            everything in between, styled with the same patience and attention to
            detail in every frame.
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
            label="Jenna Calton"
            aspect="tall"
            className="w-full"
            imageUrl="https://g.tlcdn.com/view/e8108ea7018546bbaef746d8cb91f364.png"
          />
        </div>
      </section>

      <div className="hairline mx-auto max-w-6xl md:mx-10" />

      <SpecialtiesSection />

      <div className="hairline mx-auto max-w-6xl md:mx-10" />

      {/* Scrollable portfolio feed */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">
              Portfolio
            </p>
            <h2 className="font-display text-4xl font-medium text-foreground md:text-5xl">
              Browse the Work
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-body text-sm uppercase tracking-[0.16em] text-muted-foreground hover:text-accent"
          >
            Full Gallery &rarr;
          </Link>
        </div>
        <PortfolioScroll photos={scrollPhotos} />
      </section>

      <div className="hairline mx-auto max-w-6xl md:mx-10" />

      {/* Case studies preview */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">
              Case Studies
            </p>
            <h2 className="font-display text-4xl font-medium text-foreground md:text-5xl">
              See the Work, Then Picture Yours
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="font-body text-sm uppercase tracking-[0.16em] text-muted-foreground hover:text-accent"
          >
            All Case Studies &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <Link key={study.slug} href="/case-studies" className="group block">
              <PhotoPlaceholder
                label={study.title}
                aspect="portrait"
                imageUrl={study.imageUrl}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
              <p className="mt-4 font-body text-xs uppercase tracking-[0.16em] text-accent">
                {study.category}
              </p>
              <h3 className="mt-1 font-display text-xl font-medium text-foreground">
                {study.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
