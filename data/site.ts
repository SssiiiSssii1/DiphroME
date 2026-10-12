import type { SocialLink } from "./types";

/**
 * Single source of truth for personal details.
 */
export const site = {
  name: "Mohamed A. Abdel Fattah",
  handle: "SssiiiSssii1",
  role: "Software Engineer",
  location: "Egypt",

  /**
   * A short, personal tagline connecting engineering with curiosity and
   * scientific thinking.
   */
  tagline:
    "I build software the way I try to make sense of the world: form a hypothesis, ship it, watch it break, and let the evidence decide what survives.",

  /** Shown in the interactive terminal and available for elsewhere. */
  interests: [
    "backend systems",
    "software design",
    "open source",
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
    { label: "Email", href: "mailto:mohamedbenahmedabdelfattah@gmail.com", icon: "mail" },
  ] satisfies SocialLink[],

  /** Short paragraphs shown in the About section. */
  about: [
    "I specialize in designing and building robust backend systems, focusing on clean architecture, scalability, and predictable behavior under load.",
    "I approach problem-solving by stripping away noise to reach first principles, measuring constraints carefully, and letting empirical feedback drive the design.",
    "An active advocate for open source, I regularly contribute to community projects and share tools aimed at solving practical developer challenges.",
    "Drawn to epistemology and the philosophy of science, I view software engineering as a continuous process of modeling reality and systematically reducing uncertainty.",
  ],

  /** Closing line for the Contact section. */
  closing:
    "The best conversations start with a question. If you have one about a system, an idea, or a problem worth taking apart — I would like to hear it.",
} as const;