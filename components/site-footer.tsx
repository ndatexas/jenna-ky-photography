import Link from "next/link"
import { Phone, Mail, ExternalLink } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 px-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="font-script text-2xl text-foreground">Jenna KY Photography</p>
          <p className="mt-1 text-sm text-muted-foreground">Dallas, TX &amp; surrounding areas</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
          <a href="tel:+16232622149" className="flex items-center gap-2 hover:text-accent">
            <Phone className="h-4 w-4" /> (623) 262-2149
          </a>
          <a href="mailto:jkmcalton@outlook.com" className="flex items-center gap-2 hover:text-accent">
            <Mail className="h-4 w-4" /> jkmcalton@outlook.com
          </a>
          <Link
            href="https://www.linkedin.com/in/jenna-calton-11788526a/"
            target="_blank"
            className="flex items-center gap-2 hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" /> LinkedIn
          </Link>
        </div>
      </div>
      <div className="pb-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Jenna KY Photography. All rights reserved.
      </div>
    </footer>
  )
}
