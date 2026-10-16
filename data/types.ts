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

export type ContributionStatus = "merged" | "open";

export type OpenSourceContribution = {
  /** What was contributed, in one line. */
  summary: string;
  /** Whether the contribution was merged or is still an open/pending PR. */
  status: ContributionStatus;
  /** Link to the pull request or commit. */
  href?: string;
};

export type OpenSourceProject = {
  /** Organisation or project name, e.g. "NestJS". */
  name: string;
  /** Repository or organisation URL. */
  href?: string;
  /** Optional one-line note when there are no individual entries yet. */
  note?: string;
  /** Individual contributions, once they are known and verifiable. */
  contributions?: OpenSourceContribution[];
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
  /** English text. Omit when only the original-language text is shown. */
  text?: string;
  author: string;
  /** Author name in the original language. Shown right-to-left when present. */
  authorArabic?: string;
  /** Work and year, so the source can be verified. Omit if unverified. */
  source?: string;
  /** Original-language text, shown right-to-left. Omit if not verified. */
  arabic?: string;
};

export type WritingPost = {
  title: string;
  href: string;
};

export type Writing = {
  /** Blog title, in its own language. */
  title: string;
  /** One or two sentences on what the blog is about. */
  description: string;
  /** Blog home page. */
  href: string;
  /** Human-readable language label, e.g. "العربية". */
  language: string;
  /** Recent posts, newest first. */
  posts?: WritingPost[];
};
