import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PhotoPlaceholder } from "@/components/photo-placeholder"
import { caseStudies } from "@/lib/case-studies"

export const metadata = {
  title: "Case Studies — Jenna KY Photography",
}

export default function CaseStudiesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <div className="mb-14 max-w-xl">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">Case Studies</p>
        <h1 className="font-display text-5xl font-medium text-foreground md:text-6xl">
          A closer look at the work
        </h1>
        <p className="mt-5 text-muted-foreground">
          A few real project types, broken down from first idea to final gallery, so you
          can see the thinking behind the shoot and picture your own project.
        </p>
      </div>

      <div className="flex flex-col gap-20">
        {caseStudies.map((study, i) => (
          <article
            key={study.slug}
            className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start"
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <PhotoPlaceholder
                label={study.title}
                aspect="portrait"
                imageUrl={study.imageUrl}
                className="w-full"
              />
            </div>

            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-accent">
                {study.category}
              </p>
              <h2 className="font-display text-3xl font-medium text-foreground md:text-4xl">
                {study.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{study.summary}</p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.16em] text-foreground">
                    The Challenge
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.16em] text-foreground">
                    The Approach
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {study.approach}
                  </p>
                </div>
                <div>
                  <h3 className="font-body text-xs uppercase tracking-[0.16em] text-foreground">
                    The Result
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {study.result}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-4 border-t border-border/70 pt-14 text-center">
        <h2 className="font-display text-3xl font-medium text-foreground">
          Have something similar in mind?
        </h2>
        <Link
          href="/inquire"
          className="mt-2 inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 font-body text-sm uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-foreground"
        >
          Start an Inquiry <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
