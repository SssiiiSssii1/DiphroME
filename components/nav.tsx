"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const items = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#open-source", label: "Open Source" },
  { href: "#skills", label: "Skills" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4"
      >
        <a
          href="#top"
          className="font-mono text-sm text-foreground transition-colors hover:text-accent"
        >
          <span className="text-accent">~/</span>
          {site.handle}
        </a>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm">
          {items.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-block border-b pb-0.5 transition-colors ${
                    isActive
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted hover:border-line-strong hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
