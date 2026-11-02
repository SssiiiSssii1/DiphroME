"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type StickerRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type ActiveDrag = {
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

const STICKER_GAP = 6;

function overlaps(
  left: number,
  top: number,
  width: number,
  height: number,
  rect: StickerRect,
): boolean {
  return (
    left < rect.right + STICKER_GAP &&
    left + width > rect.left - STICKER_GAP &&
    top < rect.bottom + STICKER_GAP &&
    top + height > rect.top - STICKER_GAP
  );
}

function ComputerSticker() {
  return (
    <svg viewBox="0 0 52 48" fill="none" aria-hidden="true">
      <rect x="7" y="5" width="38" height="29" rx="3" fill="var(--color-surface)" />
      <rect x="10" y="8" width="32" height="22" rx="1.5" fill="var(--color-elevated)" />
      <path d="M22 35v5m8-5v5m-13 2h18" stroke="var(--color-accent-dim)" strokeWidth="2" />
      <path d="M15 14h10m-10 4h6" stroke="var(--color-muted)" strokeWidth="1.5" />
      <path className="sticker-screen-cursor" d="M15 23h3" stroke="var(--color-accent)" strokeWidth="2" />
      <rect x="7" y="5" width="38" height="29" rx="3" stroke="var(--color-accent-dim)" strokeWidth="1.5" />
    </svg>
  );
}

function FloppySticker() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M9 5h22l7 7v27H6V8a3 3 0 0 1 3-3Z" fill="var(--color-surface)" stroke="var(--color-accent-dim)" strokeWidth="1.5" />
      <path d="M14 5h16v13H14z" fill="var(--color-elevated)" stroke="var(--color-line-strong)" />
      <path d="M18 5v8h8V5" stroke="var(--color-muted)" strokeWidth="1.5" />
      <rect x="13" y="24" width="20" height="15" rx="1.5" fill="var(--color-elevated)" stroke="var(--color-accent-dim)" strokeWidth="1.5" />
      <path d="M18 29h10" stroke="var(--color-muted)" strokeWidth="1.5" />
    </svg>
  );
}

function CpuSticker() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path className="sticker-cpu-trace" d="M24 4v7m0 26v7m20-20h-7M11 24H4m34-14-5 5m-18 18-5 5m34 0-5-5M14 14l-5-5" stroke="var(--color-accent-dim)" strokeWidth="1.5" />
      <rect x="13" y="13" width="22" height="22" rx="3" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <path d="M19 19h10v10H19z" stroke="var(--color-muted)" strokeWidth="1.5" />
      <path d="M21 25h2l2-3 2 5h1" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TerminalSticker() {
  return (
    <span className="sticker-terminal-window" aria-hidden="true">
      <span className="sticker-terminal-bar">
        <i />
        <i />
        <i />
      </span>
      <span className="sticker-terminal-line">
        <span>$ </span>
        <span className="sticker-command-first">whoami</span>
        <span className="sticker-command-second">git status</span>
      </span>
      <span className="sticker-terminal-prompt">~/diphro<span>_</span></span>
    </span>
  );
}

function KeyboardSticker() {
  return (
    <span className="sticker-keycaps" aria-hidden="true">
      <span>ESC</span>
      <span>CTRL</span>
      <span>&lt;/&gt;</span>
    </span>
  );
}

function BracketsSticker() {
  return (
    <span className="sticker-brackets" aria-hidden="true">
      {"{ }"}
    </span>
  );
}

const stickerTypes = [
  ["computer", "boot sequence", ComputerSticker],
  ["floppy", "save progress", FloppySticker],
  ["cpu", "thinking...", CpuSticker],
  ["terminal", "a tiny command line", TerminalSticker],
  ["keys", "keyboard shortcuts", KeyboardSticker],
  ["brackets", "well-formed thoughts", BracketsSticker],
] as const;

function placeStickers(layer: HTMLElement | null): boolean {
  const hero = layer?.parentElement;
  if (!layer || !hero) return false;

  const heroRect = hero.getBoundingClientRect();
  const width = hero.clientWidth;
  const height = hero.clientHeight;
  const elements = Array.from(
    layer.querySelectorAll<HTMLDivElement>(".sticker-position"),
  );
  const obstacles = Array.from(
    hero.querySelectorAll<HTMLElement>("[data-sticker-obstacle]"),
  ).map((obstacle) => {
    const rect = obstacle.getBoundingClientRect();
    return {
      left: rect.left - heroRect.left,
      top: rect.top - heroRect.top,
      right: rect.right - heroRect.left,
      bottom: rect.bottom - heroRect.top,
    };
  });
  const placed: StickerRect[] = [];

  const placementOrder = elements
    .map((element, index) => ({ element, index }))
    .sort(
      (a, b) =>
        b.element.offsetHeight - a.element.offsetHeight || a.index - b.index,
    );

  for (const { element, index } of placementOrder) {
    const itemWidth = element.offsetWidth;
    const itemHeight = element.offsetHeight;
    const maxLeft = Math.max(0, width - itemWidth);
    const maxTop = Math.max(0, height - itemHeight);
    const insetX = Math.min(8, maxLeft / 2);
    const insetY = Math.min(8, maxTop / 2);
    const preferredLeft = index % 2 === 0 ? insetX : maxLeft - insetX;
    const preferredTop = (maxTop * (index + 1)) / (elements.length + 1);
    const xCandidates = new Set<number>([insetX, maxLeft - insetX]);
    const yCandidates = new Set<number>([insetY, maxTop - insetY]);

    for (let position = insetX; position <= maxLeft - insetX; position += 8) {
      xCandidates.add(position);
    }
    for (let position = insetY; position <= maxTop - insetY; position += 8) {
      yCandidates.add(position);
    }

    for (const obstacle of obstacles) {
      xCandidates.add(
        Math.max(0, Math.min(maxLeft, obstacle.left - itemWidth - STICKER_GAP)),
      );
      xCandidates.add(
        Math.max(0, Math.min(maxLeft, obstacle.right + STICKER_GAP)),
      );
      yCandidates.add(
        Math.max(0, Math.min(maxTop, obstacle.top - itemHeight - STICKER_GAP)),
      );
      yCandidates.add(
        Math.max(0, Math.min(maxTop, obstacle.bottom + STICKER_GAP)),
      );
    }

    const orderedX = [...xCandidates].sort(
      (a, b) => Math.abs(a - preferredLeft) - Math.abs(b - preferredLeft),
    );
    const orderedY = [...yCandidates].sort(
      (a, b) => Math.abs(a - preferredTop) - Math.abs(b - preferredTop),
    );
    let location: { left: number; top: number } | null = null;

    for (const left of orderedX) {
      for (const top of orderedY) {
        if (
          obstacles.some((rect) =>
            overlaps(left, top, itemWidth, itemHeight, rect),
          ) ||
          placed.some((rect) =>
            overlaps(left, top, itemWidth, itemHeight, rect),
          )
        ) {
          continue;
        }
        location = { left, top };
        break;
      }
      if (location) break;
    }

    if (!location) {
      for (const left of orderedX) {
        for (const top of orderedY) {
          if (
            obstacles.some((rect) =>
              overlaps(left, top, itemWidth, itemHeight, rect),
            )
          ) {
            continue;
          }
          location = { left, top };
          break;
        }
        if (location) break;
      }
    }

    if (!location) {
      console.error(`Unable to position the ${element.dataset.sticker} sticker within the Hero.`);
      continue;
    }

    element.style.left = `${location.left}px`;
    element.style.top = `${location.top}px`;
    element.style.right = "auto";
    element.style.bottom = "auto";
    placed.push({
      left: location.left,
      top: location.top,
      right: location.left + itemWidth,
      bottom: location.top + itemHeight,
    });
  }

  return true;
}

export function Stickers() {
  const layerRef = useRef<HTMLElement>(null);
  const dragRef = useRef<ActiveDrag | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function updatePositions() {
      if (placeStickers(layerRef.current)) setReady(true);
    }

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;

    event.preventDefault();
    const element = event.currentTarget;
    const hero = element.parentElement?.parentElement;
    if (!hero) return;

    const heroRect = hero.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    element.style.left = `${rect.left - heroRect.left}px`;
    element.style.top = `${rect.top - heroRect.top}px`;
    element.style.right = "auto";
    element.style.bottom = "auto";
    element.classList.add("is-dragging");
    element.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const hero = element.parentElement?.parentElement;
    if (!hero) return;

    const heroRect = hero.getBoundingClientRect();
    const left = Math.max(
      0,
      Math.min(
        hero.clientWidth - element.offsetWidth,
        event.clientX - heroRect.left - drag.offsetX,
      ),
    );
    const top = Math.max(
      0,
      Math.min(
        hero.clientHeight - element.offsetHeight,
        event.clientY - heroRect.top - drag.offsetY,
      ),
    );
    const overlapsContent = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-sticker-obstacle]"),
    ).some((obstacle) => {
      const rect = obstacle.getBoundingClientRect();
      return overlaps(left, top, element.offsetWidth, element.offsetHeight, {
        left: rect.left - heroRect.left,
        top: rect.top - heroRect.top,
        right: rect.right - heroRect.left,
        bottom: rect.bottom - heroRect.top,
      });
    });

    if (!overlapsContent) {
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
    }
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    if (dragRef.current?.pointerId !== event.pointerId) return;

    dragRef.current = null;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <aside
      ref={layerRef}
      className="sticker-layer"
      aria-hidden="true"
      data-ready={ready}
    >
      {stickerTypes.map(([name, tip, Sticker]) => (
        <div
          key={name}
          className="sticker-position"
          data-sticker={name}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <span
            className={`sticker sticker-${name}`}
            data-tip={tip}
            aria-hidden="true"
          >
            <Sticker />
          </span>
        </div>
      ))}
    </aside>
  );
}
