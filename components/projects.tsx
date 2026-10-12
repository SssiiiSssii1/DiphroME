import { projects } from "@/data/projects";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="// projects"
      title="Selected work"
      intro="Real projects, with the technologies they are built on and links to the source."
    >
      {projects.length === 0 ? (
        <p className="max-w-xl rounded-lg border border-dashed border-line-strong bg-surface/40 px-5 py-6 font-mono text-sm text-faint">
          No projects listed yet. Add them in{" "}
          <span className="text-muted">data/projects.ts</span>.
        </p>
      ) : (
        <ul className="grid gap-4">
          {projects.map((project, index) => (
            <li key={project.name}>
              <Reveal delay={index * 70}>
                <article className="group rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="text-lg font-medium text-foreground">
                      {project.name}
                    </h3>
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                      >
                        <GitHubIcon className="size-4" />
                        source
                        <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
                    {project.description}
                  </p>

                  {project.note ? (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-faint">
                      {project.note}
                    </p>
                  ) : null}

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-line px-2 py-0.5 font-mono text-xs text-accent-dim"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
