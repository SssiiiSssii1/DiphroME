import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** Small monospace label, e.g. a path or index. */
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-24 border-t border-line py-16 sm:py-24 ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-widest text-accent-dim">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              {intro}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
