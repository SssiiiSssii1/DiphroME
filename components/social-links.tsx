import { site } from "@/data/site";
import type { SocialLink } from "@/data/types";
import { socialIcon } from "./icons";

export function SocialLinks({
  links = [...site.links],
  className,
}: {
  links?: SocialLink[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {links.map((link) => {
        const Icon = socialIcon(link.icon);
        const isExternal = !link.href.startsWith("mailto:");
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="group inline-flex items-center gap-2 rounded-md border border-line bg-surface/60 px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent-dim/60 hover:text-foreground focus-visible:border-accent-dim/60"
            >
              <Icon className="size-4 text-faint transition-colors group-hover:text-accent" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
