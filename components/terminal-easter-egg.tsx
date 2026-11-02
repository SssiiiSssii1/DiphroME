"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type CommandResult = {
  id: number;
  command: string;
  output: string[];
};

const helpLines = [
  "help      show available commands",
  "whoami    show portfolio identity",
  "about     read the about section",
  "projects  list selected work",
  "matrix    display a little ASCII",
  "clear     clear this terminal",
];

const matrixArt = [
  "  01010100  01000101  01010010",
  "     .   *      .   +      .",
  "  01001101  01001001  01001110",
];

function getOutput(command: string): string[] {
  switch (command) {
    case "help":
      return helpLines;
    case "whoami":
      return [
        site.name,
        site.role,
        `focus: ${site.focus.join(", ")}`,
      ];
    case "about":
      return [...site.about];
    case "projects":
      return projects.map((project) => `- ${project.name}: ${project.description}`);
    case "matrix":
      return matrixArt;
    default:
      return [`command not found: ${command}`, "Try 'help' to see available commands."];
  }
}

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandResult[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    if (!dialog.open) dialog.showModal();
    inputRef.current?.focus();
  }, [isOpen]);

  function closeTerminal() {
    dialogRef.current?.close();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitted = command.trim();
    if (!submitted) return;

    setCommand("");
    if (submitted.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }

    setHistory((entries) => [
      ...entries,
      {
        id: nextId.current++,
        command: submitted,
        output: getOutput(submitted.toLowerCase()),
      },
    ]);
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeTerminal();
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTerminal();
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open interactive terminal"
        title="Open interactive terminal"
        onClick={() => setIsOpen(true)}
        className="rounded border border-line px-1.5 py-0.5 font-mono text-xs text-accent-dim transition-colors hover:border-line-strong hover:text-accent"
      >
        &gt;_
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="easter-egg-title"
        className="terminal-dialog"
        onClose={() => setIsOpen(false)}
        onClick={onDialogClick}
        onKeyDown={onDialogKeyDown}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
          <p id="easter-egg-title" className="font-mono text-xs text-faint">
            <span className="text-accent">{site.handle}</span>
            <span>@portfolio:~$ interactive mode</span>
          </p>
          <button
            type="button"
            aria-label="Close terminal"
            onClick={closeTerminal}
            className="rounded px-2 py-1 font-mono text-sm text-faint transition-colors hover:text-foreground"
          >
            [x]
          </button>
        </div>

        <div
          aria-live="polite"
          aria-relevant="additions text"
          className="max-h-64 space-y-4 overflow-y-auto px-4 py-4 font-mono text-xs leading-relaxed sm:text-sm"
        >
          {history.length === 0 ? (
            <p className="text-faint">A read-only portfolio terminal. Try &apos;help&apos;.</p>
          ) : null}
          {history.map((entry) => (
            <div key={entry.id}>
              <p className="break-all text-foreground">
                <span className="text-accent">{site.handle}</span>
                <span className="text-faint">:~$ </span>
                {entry.command}
              </p>
              <div className="mt-1 whitespace-pre-wrap break-words text-muted">
                {entry.output.map((line, index) => (
                  <p key={`${entry.id}-${index}`}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-line px-4 py-3 font-mono text-xs sm:text-sm"
        >
          <label htmlFor="easter-egg-command" className="shrink-0 text-accent">
            {site.handle}:~$
          </label>
          <input
            ref={inputRef}
            id="easter-egg-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-faint"
            placeholder="type a command"
          />
        </form>
      </dialog>
    </>
  );
}
