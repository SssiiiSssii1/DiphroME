"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Segment = {
  from: Point;
  to: Point;
  createdAt: number;
};

type DragCandidate = {
  pointerId: number;
  start: Point;
  last: Point;
  drawing: boolean;
};

const DRAG_THRESHOLD = 5;
const STROKE_LIFETIME = 2600;
const STROKE_COLOR = "#7fe0a6";

function getPoint(x: number, y: number): Point {
  return { x, y };
}

function isDrawingControl(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    Boolean(target.closest("input, select, textarea, .sticker-position"))
  );
}

export function ScreenDrawingMode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let segments: Segment[] = [];
    let pointerCandidate: DragCandidate | null = null;
    let touchCandidate: DragCandidate | null = null;
    let animationFrame: number | null = null;
    let suppressClick = false;
    let clickResetTimer: number | null = null;

    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (
        canvas.width !== Math.round(width * ratio) ||
        canvas.height !== Math.round(height * ratio)
      ) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      scheduleRender();
    }

    function scheduleRender() {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(render);
    }

    function render() {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      animationFrame = null;
      const ratio = Math.min(window.devicePixelRatio || 1, 2.5);
      const now = performance.now();

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 3.5;
      context.strokeStyle = STROKE_COLOR;
      context.shadowColor = STROKE_COLOR;
      context.shadowBlur = 5;

      segments = segments.filter((segment) => now - segment.createdAt < STROKE_LIFETIME);
      for (const segment of segments) {
        const opacity = 1 - (now - segment.createdAt) / STROKE_LIFETIME;
        context.globalAlpha = opacity;
        context.beginPath();
        context.moveTo(segment.from.x, segment.from.y);
        context.lineTo(segment.to.x, segment.to.y);
        context.stroke();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (segments.length > 0) scheduleRender();
    }

    function beginDrawing(candidate: DragCandidate, point: Point) {
      candidate.drawing = true;
      candidate.last = point;
      document.body.classList.add("drawing-gesture-active");
    }

    function addPoint(candidate: DragCandidate, point: Point) {
      segments.push({
        from: candidate.last,
        to: point,
        createdAt: performance.now(),
      });
      candidate.last = point;
      scheduleRender();
    }

    function finishCandidate(candidate: DragCandidate | null) {
      if (!candidate) return;
      if (candidate.drawing) {
        document.body.classList.remove("drawing-gesture-active");
        suppressClick = true;
        if (clickResetTimer !== null) window.clearTimeout(clickResetTimer);
        clickResetTimer = window.setTimeout(() => {
          suppressClick = false;
          clickResetTimer = null;
        }, 0);
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (
        event.pointerType === "touch" ||
        !event.isPrimary ||
        event.button !== 0 ||
        isDrawingControl(event.target)
      ) {
        return;
      }

      const point = getPoint(event.clientX, event.clientY);
      pointerCandidate = {
        pointerId: event.pointerId,
        start: point,
        last: point,
        drawing: false,
      };
    }

    function onPointerMove(event: PointerEvent) {
      const candidate = pointerCandidate;
      if (!candidate || candidate.pointerId !== event.pointerId) return;

      const point = getPoint(event.clientX, event.clientY);
      if (!candidate.drawing) {
        const distance = Math.hypot(
          point.x - candidate.start.x,
          point.y - candidate.start.y,
        );
        if (distance < DRAG_THRESHOLD) return;
        beginDrawing(candidate, candidate.start);
      }

      addPoint(candidate, point);
    }

    function onPointerUp(event: PointerEvent) {
      if (!pointerCandidate || pointerCandidate.pointerId !== event.pointerId) return;
      finishCandidate(pointerCandidate);
      pointerCandidate = null;
    }

    function onPointerCancel(event: PointerEvent) {
      if (!pointerCandidate || pointerCandidate.pointerId !== event.pointerId) return;
      finishCandidate(pointerCandidate);
      pointerCandidate = null;
    }

    function onTouchStart(event: TouchEvent) {
      if (event.touches.length !== 1 || isDrawingControl(event.target)) {
        touchCandidate = null;
        return;
      }
      const touch = event.touches[0];
      const point = getPoint(touch.clientX, touch.clientY);
      touchCandidate = {
        pointerId: touch.identifier,
        start: point,
        last: point,
        drawing: false,
      };
    }

    function onTouchMove(event: TouchEvent) {
      const candidate = touchCandidate;
      const touch = candidate
        ? Array.from(event.touches).find((item) => item.identifier === candidate.pointerId)
        : undefined;
      if (!candidate || !touch) return;

      const point = getPoint(touch.clientX, touch.clientY);
      if (!candidate.drawing) {
        const deltaX = point.x - candidate.start.x;
        const deltaY = point.y - candidate.start.y;
        const distance = Math.hypot(deltaX, deltaY);
        if (distance < DRAG_THRESHOLD) return;
        if (Math.abs(deltaY) > Math.abs(deltaX) * 1.15) {
          touchCandidate = null;
          return;
        }
        beginDrawing(candidate, candidate.start);
      }

      if (event.cancelable) event.preventDefault();
      addPoint(candidate, point);
    }

    function onTouchEnd(event: TouchEvent) {
      if (!touchCandidate) return;
      const ended = Array.from(event.changedTouches).some(
        (touch) => touch.identifier === touchCandidate?.pointerId,
      );
      if (!ended) return;
      finishCandidate(touchCandidate);
      touchCandidate = null;
    }

    function onClick(event: MouseEvent) {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressClick = false;
      if (clickResetTimer !== null) {
        window.clearTimeout(clickResetTimer);
        clickResetTimer = null;
      }
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.visualViewport?.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("pointermove", onPointerMove, { capture: true, passive: true });
    window.addEventListener("pointerup", onPointerUp, true);
    window.addEventListener("pointercancel", onPointerCancel, true);
    window.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });
    window.addEventListener("touchend", onTouchEnd, true);
    window.addEventListener("touchcancel", onTouchEnd, true);
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.visualViewport?.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("pointermove", onPointerMove, true);
      window.removeEventListener("pointerup", onPointerUp, true);
      window.removeEventListener("pointercancel", onPointerCancel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd, true);
      window.removeEventListener("touchcancel", onTouchEnd, true);
      window.removeEventListener("click", onClick, true);
      document.body.classList.remove("drawing-gesture-active");
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (clickResetTimer !== null) window.clearTimeout(clickResetTimer);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="screen-drawing-canvas" />;
}
