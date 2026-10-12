import type { SkillGroup } from "./types";

/**
 * Only list tools you would be comfortable being asked about in an interview.
 * Grouped by the part of the system they belong to.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & APIs",
    summary: "Where most of my work lives: services, contracts, and data flow.",
    items: ["Node.js", "NestJS", "REST APIs", "TypeScript"],
  },
  {
    title: "Languages",
    summary: "The tools I reach for depending on the problem.",
    items: ["TypeScript", "Go", "JavaScript"],
  },
  {
    title: "Data & Storage",
    summary: "Modelling and querying data so the system stays honest.",
    items: ["PostgreSQL", "SQL", "Redis"],
  },
  {
    title: "Platform & Tooling",
    summary: "Getting software from a laptop to production, reliably.",
    items: ["Docker", "Git", "Linux", "CI/CD"],
  },
];
