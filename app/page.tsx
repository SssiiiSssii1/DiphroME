import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { OpenSource } from "@/components/open-source";
import { Philosophy } from "@/components/philosophy";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Projects />
        <OpenSource />
        <Skills />
        <Philosophy />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-faint">
          <span>
            <span className="text-accent-dim">~/</span>
            {site.handle}
          </span>
          <span>software · philosophy of science</span>
        </div>
      </footer>
    </>
  );
}
