import { skillGroups } from "@/data/skills";
import { Reveal } from "./reveal";
import { Section } from "./section";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="// skills"
      title="Tools & technologies"
      intro="The part of the stack I spend most of my time in, and the tools around it."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <li key={group.title}>
            <Reveal
              delay={index * 70}
              className="h-full rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong"
            >
              <h3 className="font-mono text-sm text-accent">{group.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-faint">
                {group.summary}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-line bg-elevated/60 px-2.5 py-1 font-mono text-xs text-foreground/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
