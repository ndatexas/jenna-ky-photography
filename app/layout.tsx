import type { Metadata } from "next"
import { Cormorant_Garamond, Petit_Formal_Script, Jost } from "next/font/google"
import "./globals.css"
import { CursorEffects } from "@/components/cursor-effects"
import { FilmStrip } from "@/components/film-strip"
import { ShootingStar } from "@/components/shooting-star"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
})

const script = Petit_Formal_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
})

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Jenna KY Photography",
  description:
    "Film, wedding, event, and portrait photography by Jenna Calton, based in Dallas, TX.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${script.variable} ${body.variable} font-body min-h-screen bg-background text-foreground antialiased`}
      >
        <ShootingStar />
        <CursorEffects />
        <FilmStrip side="left" />
        <FilmStrip side="right" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
