import type { SocialLink } from "./types";

/**
 * Single source of truth for personal details.
 *
 * TODO: replace the placeholder values below with your real information.
 * Nothing here should be shipped with invented claims, links, or metrics.
 */
export const site = {
  name: "Your Name",
  handle: "yourhandle",
  role: "Software Developer",
  location: "",

  /**
   * A short, personal tagline connecting engineering with curiosity and
   * scientific thinking. Edit freely — keep it honest to how you work.
   */
  tagline:
    "I build software the way I try to make sense of the world: form a hypothesis, ship it, watch it break, and let the evidence decide what survives.",

  /** Shown in the interactive terminal and available for elsewhere. */
  interests: [
    "backend systems",
    "software design",
    "philosophy of science",
    "epistemology",
    "scientific reasoning",
  ],

  links: [
    { label: "GitHub", href: "https://github.com/SssiiiSssii1", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mhamedahmed/",
      icon: "linkedin",
    },
    { label: "Email", href: "mailto:you@example.com", icon: "mail" },
  ] satisfies SocialLink[],

  /** Short paragraphs shown in the About section. */
  about: [
    "TODO: two or three sentences on your software engineering background — where you have worked, what you tend to build, and the kind of problems you enjoy.",
    "TODO: how you approach problem-solving. What you reach for first, how you reduce uncertainty, and when you stop and question your own assumptions.",
    "TODO: what draws you to the philosophy of science — the throughline between how you reason about systems and how you reason about knowledge.",
  ],

  /** Closing line for the Contact section. */
  closing:
    "The best conversations start with a question. If you have one about a system, an idea, or a problem worth taking apart — I would like to hear it.",
} as const;
