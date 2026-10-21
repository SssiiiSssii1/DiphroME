import type { OpenSourceProject } from "./types";

/**
 * Open source organisations I contribute to.
 *
 * Only verified contributions belong here. Add a `contributions` array once
 * specific pull requests or commits are known — each entry records what was
 * contributed, its `status` ("merged" or "open"), and an optional `href` to
 * the PR or commit. Until then, a project can stand on its name alone.
 */
export const openSourceProjects: OpenSourceProject[] = [
  { name: "NestJS" },
  { name: "GitLab" },
  { name: "Caddy Server" },
  { name: "TypeOrm" },

];
