"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive blurred "equalizer" background.
 *
 * - A small canvas (1/4 of the layer size) is stretched to 100% and blurred with CSS,
 *   so each canvas pixel becomes ~4 screen pixels.
 * - Nothing is drawn at rest. Moving the pointer charges the bar columns near the cursor
 *   (faster movement = taller bars); they then decay back into the black.
 * - With `fixed`, one layer sits behind the whole page, so bars are never cut off at a
 *   section edge.
 * - Bars are solid low-alpha fills. No gradients.
 */

type Col = {
  x: number;
  w: number;
  hMul: number;
  e: number;
  cy: number;
  color: string;
  a: number;
};

// GitHub Primer dark palette, by region of the screen
const TOP = ["#2f81f7", "#58a6ff", "#a371f7", "#8957e5", "#79c0ff", "#bc8cff"]; // blue / violet
const BOTTOM_RIGHT = ["#db61a2", "#f778ba", "#f85149", "#ff7b72"]; // pink / red
const BOTTOM_LEFT = ["#f0883e", "#d29922", "#ffa657", "#e3b341"]; // orange / amber

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export function Flick({
  fixed = false,
  blur = 13,
  alpha = 0.75,
  radius = 150, // screen px around the cursor that light up
  reach = 0.55, // max bar height as a fraction of layer height
  decay = 0.93, // energy multiplier per frame
  className = "",
}: {
  fixed?: boolean;
  blur?: number;
  alpha?: number;
  radius?: number;
  reach?: number;
  decay?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let W = 0;
    let H = 0;
    let cols: Col[] = [];
    let raf = 0;
    let running = false;
    let last: { x: number; y: number; t: number } | null = null;

    const build = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width / 4));
      H = Math.max(1, Math.round(r.height / 4));
      canvas.width = W;
      canvas.height = H;
      cols = [];
      for (let x = 0; x < W; ) {
        const w = 2 + Math.random() * 3.5;
        cols.push({ x, w, hMul: 0.4 + Math.random() * 0.6, e: 0, cy: H / 2, color: TOP[0], a: 0.5 + Math.random() * 0.5 });
        x += w + 0.6 + Math.random() * 1.8;
      }
      ctx.clearRect(0, 0, W, H);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const c of cols) {
        if (c.e < 0.01) {
          c.e = 0;
          continue;
        }
        alive = true;
        const h = c.e * c.hMul * H * reach;
        ctx.globalAlpha = alpha * c.a * Math.min(1, c.e * 1.6);
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.cy - h / 2, c.w, h);
        c.e *= decay;
      }
      return alive;
    };

    const loop = () => {
      if (draw()) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
        ctx.clearRect(0, 0, W, H);
      }
    };

    const onMove = (ev: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = ev.clientX - r.left;
      const py = ev.clientY - r.top;
      if (px < 0 || py < 0 || px > r.width || py > r.height) {
        last = null;
        return;
      }
      const now = performance.now();
      let speed = 0.6;
      if (last) {
        const dt = Math.max(8, now - last.t);
        speed = Math.hypot(px - last.x, py - last.y) / dt;
      }
      last = { x: px, y: py, t: now };
      const strength = Math.min(1, 0.25 + speed * 0.6);

      const mx = px / 4;
      const my = py / 4;
      const R = radius / 4;
      const palette = my < H * 0.45 ? TOP : mx > W / 2 ? BOTTOM_RIGHT : BOTTOM_LEFT;

      for (const c of cols) {
        const d = Math.abs(c.x + c.w / 2 - mx);
        if (d > R) continue;
        const fall = 1 - d / R;
        const add = fall * fall * strength * (0.5 + Math.random() * 0.5);
        if (c.e < 0.05) {
          c.color = pick(palette);
          c.cy = my + (Math.random() - 0.5) * R * 0.6;
        } else {
          c.cy += (my - c.cy) * 0.15;
        }
        c.e = Math.min(1, c.e + add);
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [alpha, radius, reach, decay]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" style={{ filter: `blur(${blur}px) saturate(1.2)` }} />
    </div>
  );
}
