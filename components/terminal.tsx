"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

export type TerminalEntry = {
  id: string;
  /** Informational label shown at the prompt. Not a real shell operation. */
  command: string;
  /** Plain-text informational output. */
  lines: string[];
};

type TerminalProps = {
  user: string;
  entries: TerminalEntry[];
};

function subscribeToReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function TerminalOutput({
  text,
  reducedMotion,
}: {
  text: string;
  reducedMotion: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(index + 2, text.length);
      setCount(index);
      if (index >= text.length) window.clearInterval(timer);
    }, 14);

    return () => window.clearInterval(timer);
  }, [text, reducedMotion]);

  return (
    <>
      <pre
        aria-hidden="true"
        className="whitespace-pre-wrap break-words text-foreground/90"
      >
        {reducedMotion ? text : text.slice(0, count)}
        <span className="terminal-cursor" />
      </pre>
      <span className="sr-only">{text}</span>
    </>
  );
}

/**
 * A quiet, read-only terminal display. It presents personal reference
 * information as a small set of labelled entries — it does not execute
 * anything, and it makes no claim to be a real shell.
 */
export function Terminal({ user, entries }: TerminalProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = usePrefersReducedMotion();

  const current = entries[active];
  const full = useMemo(() => current?.lines.join("\n") ?? "", [current]);

  function focusTab(next: number) {
    const wrapped = (next + entries.length) % entries.length;
    setActive(wrapped);
    tabRefs.current[wrapped]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(active + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(active - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(entries.length - 1);
        break;
    }
  }

  if (!current) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-surface/70 glow backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="size-2.5 rounded-full bg-yellow-400" />
          <span className="size-2.5 rounded-full bg-green-500" />
        </span>
        <span className="mx-auto font-mono text-xs text-faint">
          {user}@portfolio — reference
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Reference topics"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 border-b border-line px-4 py-3"
      >
        {entries.map((entry, index) => {
          const selected = index === active;
          return (
            <button
              key={entry.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`terminal-tab-${entry.id}`}
              aria-selected={selected}
              aria-controls="terminal-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`rounded border px-2.5 py-1 font-mono text-xs transition-colors ${selected
                ? "border-accent-dim/60 bg-accent/10 text-accent"
                : "border-line text-muted hover:border-line-strong hover:text-foreground"
                }`}
            >
              {entry.command}
            </button>
          );
        })}
      </div>

      <div
        id="terminal-panel"
        role="tabpanel"
        aria-labelledby={`terminal-tab-${current.id}`}
        className="px-4 py-5 font-mono text-sm leading-relaxed"
      >
        <p className="mb-3 text-muted">
          <span className="text-accent">{user}@portfolio</span>
          <span className="text-faint">:~$</span>{" "}
          <span className="text-foreground">{current.command}</span>
        </p>
        <TerminalOutput key={current.id} text={full} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}
