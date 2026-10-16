import { site } from "@/data/site";
import { openSourceProjects } from "@/data/open-source";
import { skillGroups } from "@/data/skills";
import { Reveal } from "./reveal";
import { SocialLinks } from "./social-links";
import { Terminal, type TerminalEntry } from "./terminal";

const terminalEntries: TerminalEntry[] = [
  {
    id: "whoami",
    command: "whoami",
    lines: [site.name, site.role, site.location].filter(Boolean),
  },
  {
    id: "interests",
    command: "cat interests.md",
    lines: site.interests.map((interest) => `- ${interest}`),
  },
  {
    id: "open-source",
    command: "ls open-source/",
    lines: openSourceProjects.map(
      (project) => `- ${project.name}${project.note ? ` — ${project.note}` : ""}`,
    ),
  },
  {
    id: "skills",
    command: "ls skills/",
    lines: skillGroups.map(
      (group) => `${group.title.padEnd(18)} ${group.items.join(", ")}`,
    ),
  },
  {
    id: "contact",
    command: "cat contact.txt",
    lines: site.links.map((link) => `${link.label.toLowerCase()}  ${link.href}`),
  },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 pb-16 pt-20 sm:pt-28 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:pb-28">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent-dim">
            <span
              className="pulse-dot size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {site.role}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            {site.name}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {site.tagline}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {site.focus.map((item) => (
              <li
                key={item}
                className="rounded border border-line bg-elevated/60 px-2.5 py-1 font-mono text-xs text-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>

          <SocialLinks className="mt-8" />
        </div>

        <Reveal delay={120}>
          <Terminal user={site.handle} entries={terminalEntries} />
        </Reveal>
      </div>
    </section>
  );
}
