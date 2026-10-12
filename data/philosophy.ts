import type { Quotation, Reflection } from "./types";

/**
 * These are personal reflections in my own words. The quotations below are
 * kept to a minimum and are included only where the source can be verified.
 */
export const reflections: Reflection[] = [
  {
    title: "A claim that cannot fail explains nothing",
    body: "Popper's criterion for a scientific theory is that it forbids something — it rules out observations, and so exposes itself to being wrong. The same instinct is useful in software. A design that cannot fail any test is not robust; it is untested. A monitoring dashboard with no alert is a story we tell ourselves. Making a claim falsifiable — a threshold, an assertion, a reproducible failing case — is what turns belief into something we can actually check.",
  },
  {
    title: "The problem of induction is a production problem",
    body: "Hume noticed that no amount of past observation logically guarantees the next case. We reason as if the future will resemble the past, but that inference is not deductive. Systems inherit this. \"It has worked every time so far\" is an assumption, not a proof. Good engineering is largely the practice of taking that assumption seriously: watching for the edge where it quietly stops holding.",
  },
  {
    title: "Evidence underdetermines the explanation",
    body: "Any observation is consistent with more than one theory — the failure you are staring at rarely tells you, by itself, which of your many beliefs was wrong. Duhem and Quine made this vivid for science; debugging makes it concrete. The stack trace does not name the guilty assumption. You have to design the experiment — change one thing, predict the result, and let the outcome eliminate a hypothesis rather than confirm your favourite one.",
  },
  {
    title: "The limits of what we can know",
    body: "There is a difference between a reliable explanation and a merely satisfying one. A satisfying story fits the evidence we already have; a reliable one has survived repeated attempts to break it. I find the second kind more interesting precisely because it is harder to get and easier to lose. That humility — holding conclusions as revisable — is not a weakness in science or in engineering. It is the mechanism by which either one improves.",
  },
];

export const quotations: Quotation[] = [
  {
    text: "The first principle is that you must not fool yourself—and you are the easiest person to fool.",
    author: "Richard Feynman",
    source: "\u201cCargo Cult Science,\u201d Caltech commencement address, 1974",
  },
  {
    text: "Every genuine test of a theory is an attempt to falsify it, or refute it.",
    author: "Karl Popper",
    source: "Conjectures and Refutations, 1963",
  },
];
