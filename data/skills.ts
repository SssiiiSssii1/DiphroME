import type { SkillGroup } from "./types";

/**
 * Only list tools you would be comfortable being asked about in an interview.
 * Grouped by the part of the system they belong to.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & APIs",
    summary: "Where most of my work lives: services, contracts, and data flow.",
    items: [
      "Node.js",
      "NestJS",
      "Fastify",
      "Express",
      "REST APIs",
      "GraphQL",
      "gRPC",
      "WebSockets",
      "SSE",
      "JWT",
      "RBAC",
    ],
  },
  {
    title: "Languages",
    summary: "The tools I reach for depending on the problem.",
    items: [
      "TypeScript",
      "JavaScript",
      "Go",
      "Rust",
      "Ruby",
      "Python",
      "SQL",
      "Bash",
    ],
  },
  {
    title: "Data & Storage",
    summary: "Modelling and querying data so the system stays honest.",
    items: ["PostgreSQL", "Redis", "TypeORM", "SQL", "S3 / MinIO"],
  },
  {
    title: "Platform & Tooling",
    summary: "Getting software from a laptop to production, reliably.",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "GitLab",
      "Linux",
      "CI/CD",
      "Microservices",
    ],
  },
  {
    title: "Testing & Observability",
    summary: "Keeping behaviour predictable long after it leaves my machine.",
    items: ["Vitest", "Supertest", "End-to-end tests", "Tracing & observability"],
  },
];
