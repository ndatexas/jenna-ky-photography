"use client"

import { useState } from "react"
import { Send, CheckCircle, Loader2 } from "lucide-react"

const WEB3FORMS_ACCESS_KEY = "9f8f36f2-dce4-4a57-b1f0-bc03b8245a74"

const SESSION_TYPES = [
  "Film Photography",
  "Family",
  "Personal Portraits",
  "Events",
  "Brand Shoots",
  "Other",
]

export function InquireForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", WEB3FORMS_ACCESS_KEY)
    formData.append("subject", "New Photography Inquiry — Jenna KY Photography")
    formData.append("from_name", "Jenna KY Photography Website")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
        setErrorMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Check your connection and try again.")
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
      <p className="mb-3 font-body text-xs uppercase tracking-[0.25em] text-accent">Get In Touch</p>
      <h1 className="font-display text-5xl font-medium text-foreground">Inquire About a Session</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Tell me a bit about what you have in mind, and I&apos;ll follow up within 1-2 business
        days to talk through details and availability.
      </p>

      {status === "sent" ? (
        <div className="mt-10 flex items-center gap-3 border border-accent/40 bg-accent/10 px-5 py-4 text-accent">
          <CheckCircle className="h-6 w-6 flex-shrink-0" />
          <p className="font-body text-sm">
            Thank you for reaching out. Your inquiry has been sent, and I&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                required
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Type of Session
              </label>
              <select
                name="session_type"
                required
                defaultValue=""
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
              >
                <option value="" disabled>
                  Select one
                </option>
                {SESSION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Preferred Date
              </label>
              <input
                type="date"
                name="preferred_date"
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="City, venue, or general area"
              className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-2 block font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
              What are you envisioning?
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about the occasion, who's involved, and anything else that will help me understand your vision."
              className="w-full border border-border bg-background px-4 py-3 font-body text-sm outline-none focus:border-accent"
            />
          </div>

          {status === "error" && (
            <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 font-body text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 font-body text-sm uppercase tracking-[0.16em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:opacity-50"
          >
            {status === "sending" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {status === "sending" ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      )}
    </section>
  )
}
