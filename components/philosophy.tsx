import { quotations, reflections } from "@/data/philosophy";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      eyebrow="// philosophy of science"
      title="How we know what we know"
      intro="Not a hobby list so much as the other half of the same question: how do we decide which explanations to trust? These are working notes, not conclusions."
    >
      <ol className="grid gap-8">
        {reflections.map((reflection, index) => (
          <li key={reflection.title}>
            <Reveal
              delay={index * 70}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-l border-line pl-6"
            >
              <span
                className="pt-0.5 font-mono text-xs text-accent-dim"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-balance text-lg font-medium text-foreground">
                  {reflection.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted">
                  {reflection.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2">
        {quotations.map((quotation) => (
          <li key={quotation.author}>
            <Reveal className="h-full">
              <figure className="flex h-full flex-col rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong">
                {quotation.arabic ? (
                  <p
                    lang="ar"
                    dir="rtl"
                    className={`text-balance font-arabic text-xl leading-loose text-accent-dim${
                      quotation.text ? "" : " flex-1"
                    }`}
                  >
                    {quotation.arabic}
                  </p>
                ) : null}
                {quotation.text ? (
                  <blockquote
                    className={`flex-1 text-pretty leading-relaxed text-foreground/90 italic${
                      quotation.arabic ? " mt-4 border-t border-line pt-4" : ""
                    }`}
                  >
                    &ldquo;{quotation.text}&rdquo;
                  </blockquote>
                ) : null}
                <figcaption className="mt-4 font-mono text-xs text-faint">
                  {quotation.authorArabic ? (
                    <span lang="ar" dir="rtl" className="font-arabic">
                      {quotation.authorArabic}
                    </span>
                  ) : (
                    quotation.author
                  )}
                  {quotation.source ? (
                    <>
                      {", "}
                      <cite className="not-italic">{quotation.source}</cite>
                    </>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
