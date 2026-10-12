import { site } from "@/data/site";
import { MailIcon } from "./icons";
import { SocialLinks } from "./social-links";
import { Section } from "./section";

const emailLink = site.links.find((link) => link.icon === "mail");

export function Contact() {
  return (
    <Section id="contact" eyebrow="// contact" title="Get in touch">
      <div className="max-w-2xl">
        <p className="text-pretty text-lg leading-relaxed text-muted">
          {site.closing}
        </p>

        {emailLink ? (
          <a
            href={emailLink.href}
            className="mt-8 inline-flex items-center gap-2.5 rounded-md border border-accent-dim/50 bg-accent/5 px-4 py-2.5 text-sm text-accent transition-colors hover:bg-accent/10"
          >
            <MailIcon className="size-4" />
            {emailLink.href.replace("mailto:", "")}
          </a>
        ) : null}

        <SocialLinks className="mt-6" />
      </div>
    </Section>
  );
}
