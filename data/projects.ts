import type { Project } from "./types";

/**
 * Real projects only. Add one object per project.
 *
 * Example:
 * {
 *   name: "Project name",
 *   description: "What it does and why it exists.",
 *   stack: ["TypeScript", "NestJS", "PostgreSQL"],
 *   href: "https://github.com/you/project",
 *   note: "Optional: the problem it solved.",
 * }
 */
export const projects: Project[] = [];
