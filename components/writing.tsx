import { writings } from "@/data/writing";
import { ArrowUpRightIcon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Writing() {
  return (
    <Section
      id="writing"
      eyebrow="// writing"
      title="Writing"
      intro="Some ideas are too long for a commit message. I write in Arabic when a subject needs more room than a terminal gives it."
    >
      {writings.length === 0 ? (
        <p className="max-w-xl rounded-lg border border-dashed border-line-strong bg-surface/40 px-5 py-6 font-mono text-sm text-faint">
          No writing listed yet. Add it in{" "}
          <span className="text-muted">data/writing.ts</span>.
        </p>
      ) : (
        <ul className="grid gap-4">
          {writings.map((writing, index) => (
            <li key={writing.href}>
              <Reveal delay={index * 70}>
                <article className="rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div lang="ar" dir="rtl" className="min-w-0">
                      <h3 className="text-balance font-arabic text-2xl font-semibold leading-normal text-foreground">
                        {writing.title}
                      </h3>
                    </div>
                    <span
                      lang="ar"
                      dir="rtl"
                      className="rounded border border-line bg-elevated/60 px-2.5 py-1 font-arabic text-xs text-muted"
                    >
                      {writing.language}
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
                    {writing.description}
                  </p>

                  {writing.posts && writing.posts.length > 0 ? (
                    <ul className="mt-5 grid gap-2">
                      {writing.posts.map((post) => (
                        <li key={post.href}>
                          <a
                            href={post.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 text-muted transition-colors hover:text-foreground"
                          >
                            <span
                              aria-hidden="true"
                              className="font-mono text-xs text-accent-dim"
                            >
                              ↳
                            </span>
                            <span
                              lang="ar"
                              dir="rtl"
                              className="font-arabic text-lg leading-normal"
                            >
                              {post.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-6">
                    <a
                      href={writing.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-foreground"
                    >
                      visit the blog
                      <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
