import { openSourceProjects } from "@/data/open-source";
import type { ContributionStatus } from "@/data/types";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

const statusStyles: Record<ContributionStatus, string> = {
  merged: "border-accent-dim/50 bg-accent/10 text-accent",
  open: "border-warn/60 bg-warn/10 text-warn",
};

const statusLabels: Record<ContributionStatus, string> = {
  merged: "merged",
  open: "open PR",
};

export function OpenSource() {
  return (
    <Section
      id="open-source"
      eyebrow="// open source"
      title="Open source contributions"
      intro="I contribute to projects I use and depend on. Giving back to the communities behind them is part of how I work, not a side interest."
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
              <Reveal delay={index * 70} className="h-full">
                <article className="flex h-full flex-col rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong">
                  <div className="flex items-start justify-between gap-x-4 gap-y-2">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-2 text-lg font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {project.name}
                        <ArrowUpRightIcon className="size-3.5 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <h3 className="text-lg font-medium text-foreground">
                        {project.name}
                      </h3>
                    )}
                    <GitHubIcon className="mt-1 size-4 shrink-0 text-faint" />
                  </div>

                  {project.contributions && project.contributions.length > 0 ? (
                    <ul className="mt-4 grid gap-3">
                      {project.contributions.map((contribution) => (
                        <li
                          key={contribution.summary}
                          className="flex flex-wrap items-start gap-x-2 gap-y-1 border-t border-line pt-3 text-sm"
                        >
                          <span
                            className={`rounded border px-1.5 py-0.5 font-mono text-[0.65rem] tracking-wide ${statusStyles[contribution.status]}`}
                          >
                            {statusLabels[contribution.status]}
                          </span>
                          {contribution.href ? (
                            <a
                              href={contribution.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="min-w-0 flex-1 text-pretty leading-relaxed text-muted transition-colors hover:text-foreground"
                            >
                              {contribution.summary}
                            </a>
                          ) : (
                            <span className="min-w-0 flex-1 text-pretty leading-relaxed text-muted">
                              {contribution.summary}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : project.note ? (
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                      {project.note}
                    </p>
                  ) : (
                    <p className="mt-3 font-mono text-xs text-faint">
                      Contributor
                    </p>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
