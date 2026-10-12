import { site } from "@/data/site";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="// about"
      title="How I work"
      intro="A short introduction to my background, interests, and the way I approach problems."
    >
      <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
        {site.about.map((paragraph, index) => (
          <Reveal key={index} delay={index * 80}>
            <p className="text-pretty leading-relaxed text-muted">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
