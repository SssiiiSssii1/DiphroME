import type { SocialLink } from "./types";

/**
 * Single source of truth for personal details.
 */
export const site = {
  name: "Mohamed A. Abdel Fattah",
  handle: "SssiiiSssii1",
  role: "Software Enginner",
  location: "Home Where We Are",

  /**
   * The hero summary, written in first person: who I am, what I work on,
   * and what I care about beyond the code.
   */
  tagline:
    "I'm a software enginner with three years of experience building systems that have to hold up in production. I contribute to open source, and I'm drawn to cybersecurity and bioinformatics — fields where the details genuinely matter. Above all, I care about people: I think technology is only worth building when it improves human lives.",

  /** Short labels shown under the hero summary to make my focus scannable. */
  focus: ["Back End", "Open source", "Cybersecurity", "Bioinformatics", "Humanity", "philosophy"],

  /** Shown in the interactive terminal and available for elsewhere. */
  interests: [
    "backend systems",
    "open source",
    "cybersecurity",
    "bioinformatics",
    "human nature",
    "philosophy",
    "how we know what we know",
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
    "I am an active open-source contributor, and outside of work I explore cybersecurity and bioinformatics — two fields where correctness is not optional and the details are the whole point.",
    "Above all, I am interested in people: in human nature, in philosophy, and in how technology can be used to make life better for others rather than merely faster for a few.",
  ],

  /** Closing line for the Contact section. */
  closing:
    "The best conversations start with a question. If you have one about a system, an idea, or a problem worth taking apart — I would like to hear it.",
} as const;
