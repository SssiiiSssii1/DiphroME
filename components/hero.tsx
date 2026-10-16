import { site } from "@/data/site";
import { openSourceProjects } from "@/data/open-source";
import { skillGroups } from "@/data/skills";
import { Reveal } from "./reveal";
import { SocialLinks } from "./social-links";
import { Terminal, type TerminalEntry } from "./terminal";
import Image from "next/image";

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
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 pb-16 pt-20 sm:pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-x-16 lg:gap-y-6 lg:pb-28">
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

        <Reveal
          delay={120}
          className="relative flex flex-col items-center gap-6 lg:col-start-2"
        >
          <div className="relative mx-auto flex aspect-[4/3] w-full max-w-sm items-center justify-center sm:max-w-md lg:aspect-auto lg:min-h-48 lg:max-w-lg lg:flex-1">
            <Image
              src="/icarus.jpeg"
              alt="Icarus illustration"
              fill
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 20rem"
              priority
              className="rounded-xl object-cover object-[center_100%] drop-shadow-[0_40px_120px_-50px_rgba(96,165,250,0.5)]" />
          </div>
          <div className="w-full shrink-0">
            <Terminal user={site.handle} entries={terminalEntries} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
