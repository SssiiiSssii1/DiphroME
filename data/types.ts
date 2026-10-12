export type SocialIcon = "github" | "linkedin" | "mail";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type Project = {
  /** Project name. */
  name: string;
  /** One or two sentences describing what it does and why it exists. */
  description: string;
  /** Technologies actually used. */
  stack: string[];
  /** Repository or project URL. Omit if there is nothing to link. */
  href?: string;
  /** Optional short note, e.g. the problem you were solving. */
  note?: string;
};

export type SkillGroup = {
  title: string;
  /** One line on how these fit together. */
  summary: string;
  items: string[];
};

export type Reflection = {
  /** A heading for the idea. */
  title: string;
  /** Your own words on the idea. */
  body: string;
};

export type Quotation = {
  text: string;
  author: string;
  /** Work and year, so the source can be verified. */
  source: string;
};
