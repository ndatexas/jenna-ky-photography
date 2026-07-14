"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Image as ImageIcon, Users, Calendar, User } from "lucide-react"

const specialties = [
  {
    icon: ImageIcon,
    title: "Film Photography",
    description: "Grain, warmth, and imperfection, captured on film.",
    href: "/gallery?category=film",
  },
  {
    icon: Users,
    title: "Family",
    description: "Relaxed, natural sessions that reflect how your family actually is.",
    href: "/gallery?category=family",
  },
  {
    icon: User,
    title: "Personal Portraits",
    description: "One-on-one sessions built around the individual.",
    href: "/gallery?category=personal",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Live energy documented as it happens.",
    href: "/gallery?category=events",
  },
]

export function SpecialtiesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <div className="mb-12 max-w-xl">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">Specialties</p>
        <h2 className="font-display text-4xl font-medium text-foreground md:text-5xl">
          Areas of Focus
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
        {specialties.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={s.href}
              className="group flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-secondary/60"
            >
              <s.icon className="h-7 w-7 text-accent transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="font-display text-2xl font-medium text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Always looking for the next moment worth capturing.
      </p>
    </section>
  )
}
