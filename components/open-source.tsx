import { openSourceProjects } from "@/data/open-source";
import { GitHubIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function OpenSource() {
  return (
    <Section
      id="open-source"
      eyebrow="// open source"
      title="Open source contributions"
      intro="Projects and organisations whose codebases I contribute to."
    >
      {openSourceProjects.length === 0 ? (
        <p className="max-w-xl rounded-lg border border-dashed border-line-strong bg-surface/40 px-5 py-6 font-mono text-sm text-faint">
          No contributions listed yet. Add them in{" "}
          <span className="text-muted">data/open-source.ts</span>.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {openSourceProjects.map((project, index) => (
            <li key={project.name}>
              <Reveal
                delay={index * 70}
                className="flex h-full items-start gap-4 rounded-xl border border-line bg-surface/40 p-6"
              >
                <GitHubIcon className="mt-0.5 size-5 shrink-0 text-accent-dim" />
                <div>
                  <h3 className="font-medium text-foreground">
                    {project.name}
                  </h3>
                  {project.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-faint">
                      {project.note}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-faint">
                      Contributor
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
