export interface CaseStudy {
  slug: string
  category: string
  title: string
  summary: string
  challenge: string
  approach: string
  result: string
  imageUrl: string
}

/**
 * Case studies built from real session types in the portfolio, written so
 * prospective brand, team, and personal-portrait clients can see the kind
 * of work this produces and picture it for their own project.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "brand-product-lookbook",
    category: "Brand & Product",
    title: "A Lookbook Built to Sell the Collection",
    summary:
      "On-model and product imagery for a seasonal launch, styled to feel editorial while staying usable across the site and socials.",
    challenge:
      "The goal was a lookbook that could carry an entire collection launch: hero shots for the homepage, clean product detail for the shop pages, and lifestyle frames for social, all from a single shoot day.",
    approach:
      "A pre-shoot planning call set the mood, shot list, and usage up front, so the day moved efficiently between on-model looks, flat-lay detail shots, and styled lifestyle frames without re-shoots.",
    result:
      "A single shoot delivered a full gallery covering homepage, product pages, and a month of social content, cutting down the number of sessions needed per launch.",
    imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/5600bf5d4ad14f3c9b8f922e4b5f41c5.jpg",
  },
  {
    slug: "team-headshot-day",
    category: "Headshots",
    title: "One Day, a Whole Team Looking Consistent",
    summary:
      "A portable headshot setup brought to the office so an entire team could get camera-ready, polished portraits without the stiffness of a studio visit.",
    challenge:
      "A growing team needed headshots that matched across LinkedIn, the website, and press, without pulling everyone out of the office for a half day each.",
    approach:
      "A compact lighting and backdrop setup was brought on-site, with consistent framing and relaxed direction for each person so the final set reads as one cohesive library instead of a patchwork.",
    result:
      "Every team member walked away with an edited, high-resolution headshot ready to use the same week, with a repeatable setup for new hires going forward.",
    imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/897d2f1c280f41a4bd14c6d92e9a99da.jpg",
  },
  {
    slug: "personal-brand-portraits",
    category: "Personal Portraits",
    title: "Portraits That Do Double Duty as a Personal Brand",
    summary:
      "A one-on-one portrait session built around how a client wanted to show up online, from a polished professional profile photo to a few more relaxed personal frames.",
    challenge:
      "The client needed images that worked as both a professional headshot and a broader personal brand look across their own site and social presence.",
    approach:
      "The session moved through a few distinct looks and settings in one sitting, giving the client options that felt like them rather than one stiff, single pose.",
    result:
      "A versatile gallery the client now pulls from for everything from a LinkedIn profile to their own marketing, without needing a new shoot for each use.",
    imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/ba520d4b3eae491289533001d36df05a.jpg",
  },
]
