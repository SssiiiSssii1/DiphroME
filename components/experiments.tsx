import { experiments } from "@/data/experiments";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Experiments() {
  return (
    <Section
      id="experiments"
      eyebrow="// experiments"
      title="Beyond the backend"
      intro="Projects I take on to find out how something actually works underneath — a terminal, two worker pools, a cipher, a language's text. A short list on purpose."
    >
      {experiments.length === 0 ? (
        <p className="max-w-xl rounded-lg border border-dashed border-line-strong bg-surface/40 px-5 py-6 font-mono text-sm text-faint">
          No experiments listed yet. Add them in{" "}
          <span className="text-muted">data/experiments.ts</span>.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {experiments.map((experiment, index) => (
            <li key={experiment.name}>
              <Reveal delay={index * 70} className="h-full">
                <article className="group flex h-full flex-col rounded-xl border border-line bg-surface/40 p-5 transition-colors hover:border-line-strong">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span
                        className="font-mono text-xs text-accent-dim"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-balance text-base font-medium text-foreground">
                        {experiment.name}
                      </h3>
                    </div>
                    {experiment.href ? (
                      <a
                        href={experiment.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                      >
                        <GitHubIcon className="size-4" />
                        source
                        <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                    {experiment.description}
                  </p>

                  {experiment.note ? (
                    <p className="mt-2 text-pretty text-xs leading-relaxed text-faint">
                      {experiment.note}
                    </p>
                  ) : null}

                  <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                    {experiment.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-line bg-elevated/60 px-2 py-0.5 font-mono text-[0.7rem] text-foreground/90"
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
