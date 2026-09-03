"use client";

import { usePrefersReducedMotion } from "@repo/ui/hooks/use-media-query";
import { useEffect, useRef } from "react";

/**
 * A neural network that grows.
 *
 * Seeds at the centre and pushes outward: each new node attaches to an existing
 * one, biased away from centre, so the structure visibly expands rather than
 * just appearing. Generation drives colour — crimson at the core, through
 * purple, to blue at the frontier — so the palette itself reads as depth.
 * Signals fire along edges and chain through nodes once it has grown.
 *
 * ── Performance ───────────────────────────────────────────────────────────
 * A full-viewport canvas behind a hero is the easiest thing on a site to make
 * a cheap phone stutter, so the drawing is built around six decisions:
 *
 *   1. Node and signal glows are pre-rendered sprites blitted with drawImage,
 *      not three stacked arc() fills each — the naive version costs ~720 path
 *      fills per frame at full size.
 *   2. Settled edges are batched into one path per colour bucket, so ~300
 *      stroke() calls collapse to eight. Only edges still drawing in are
 *      stroked individually, and there are rarely more than a handful.
 *   3. The vignette gradient is built once per resize, not once per frame.
 *   4. Node spacing uses a spatial hash, so growth stays O(1) per attempt
 *      instead of scanning every existing node.
 *   5. Device tier (cores, memory, screen size) caps DPR and node count up
 *      front, and a frame-time watchdog degrades quality if it still struggles.
 *   6. rAF stops entirely when the canvas scrolls out of view or the tab is
 *      hidden. This sits in a 100svh hero, so it is off for most of a visit.
 */

const GROUND = "6, 6, 12";

/** Crimson core → purple mid → blue frontier. The three brand accents. */
const RAMP: readonly [number, number, number][] = [
  [232, 41, 74],
  [123, 107, 181],
  [74, 95, 173],
];

const BUCKETS = 8;
const MIN_SEPARATION = 34;
const EDGE_MIN = 46;
const EDGE_MAX = 96;
const NODE_FADE = 34;
const EDGE_FADE = 26;
const MAX_GEN = 9;
const SPRITE = 40;

type Node = { x: number; y: number; gen: number; age: number };
type Edge = { a: number; b: number; age: number; bucket: number };
type Signal = { from: number; to: number; t: number; speed: number; hops: number };

function rampColor(gen: number): [number, number, number] {
  const t = Math.min(Math.max(gen, 0) / MAX_GEN, 1) * (RAMP.length - 1);
  const i = Math.min(Math.floor(t), RAMP.length - 2);
  const f = t - i;
  const a = RAMP[i]!;
  const b = RAMP[i + 1]!;
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

function bucketOf(gen: number) {
  return Math.min(BUCKETS - 1, Math.max(0, Math.round((gen / MAX_GEN) * (BUCKETS - 1))));
}

/** Soft radial disc, drawn once per colour bucket and blitted thereafter. */
function makeSprite(rgb: [number, number, number], falloff: number) {
  const c = document.createElement("canvas");
  c.width = SPRITE;
  c.height = SPRITE;
  const g = c.getContext("2d");
  if (!g) return c;
  const half = SPRITE / 2;
  const grad = g.createRadialGradient(half, half, 0, half, half, half);
  const [r, gr, b] = rgb;
  grad.addColorStop(0, `rgba(${r},${gr},${b},1)`);
  grad.addColorStop(falloff, `rgba(${r},${gr},${b},0.28)`);
  grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE, SPRITE);
  return c;
}

/** Cores, memory and screen area decide how much work we even attempt. */
function deviceTier() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 4 || memory <= 4) return { dprCap: 1.25, density: 12500 };
  if (cores <= 8) return { dprCap: 1.75, density: 10000 };
  return { dprCap: 2, density: 8600 };
}

export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const tier = deviceTier();
    const nodeSprites = Array.from({ length: BUCKETS }, (_, i) =>
      makeSprite(rampColor((i / (BUCKETS - 1)) * MAX_GEN), 0.22),
    );
    const signalSprites = Array.from({ length: BUCKETS }, (_, i) =>
      makeSprite(rampColor((i / (BUCKETS - 1)) * MAX_GEN), 0.4),
    );

    let width = 0;
    let height = 0;
    let frameId = 0;
    let tick = 0;
    let running = false;
    let visible = true;
    let onScreen = true;
    /** 2 = full glow, 1 = tighter glow, 0 = cores only. */
    let quality = 2;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let signals: Signal[] = [];
    let links: number[][] = [];
    /** Spatial hash for the separation test — cell size is one separation. */
    let grid = new Map<number, number[]>();
    let cols = 0;

    let vignetteFill: CanvasGradient | null = null;
    let frameAccum = 0;
    let frameCount = 0;
    let lastTime = 0;

    const maxNodes = () => Math.max(40, Math.min(240, Math.floor((width * height) / tier.density)));

    function cellKey(x: number, y: number) {
      return Math.floor(y / MIN_SEPARATION) * cols + Math.floor(x / MIN_SEPARATION);
    }

    function addNode(x: number, y: number, gen: number) {
      nodes.push({ x, y, gen, age: 0 });
      links.push([]);
      const key = cellKey(x, y);
      const cell = grid.get(key);
      if (cell) cell.push(nodes.length - 1);
      else grid.set(key, [nodes.length - 1]);
      return nodes.length - 1;
    }

    function connect(a: number, b: number) {
      const ga = nodes[a]!.gen;
      const gb = nodes[b]!.gen;
      edges.push({ a, b, age: 0, bucket: bucketOf((ga + gb) / 2) });
      links[a]!.push(b);
      links[b]!.push(a);
    }

    function tooClose(x: number, y: number) {
      const cx = Math.floor(x / MIN_SEPARATION);
      const cy = Math.floor(y / MIN_SEPARATION);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const cell = grid.get((cy + dy) * cols + (cx + dx));
          if (!cell) continue;
          for (const i of cell) {
            const n = nodes[i]!;
            const ddx = n.x - x;
            const ddy = n.y - y;
            if (ddx * ddx + ddy * ddy < MIN_SEPARATION * MIN_SEPARATION) return true;
          }
        }
      }
      return false;
    }

    function reset() {
      nodes = [];
      edges = [];
      signals = [];
      links = [];
      grid = new Map();
      cols = Math.ceil(width / MIN_SEPARATION) + 2;
      // Three seeds, slightly apart, so growth isn't radially perfect.
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        addNode(width / 2 + Math.cos(angle) * 26, height / 2 + Math.sin(angle) * 26, 0);
      }
    }

    function grow() {
      for (let attempt = 0; attempt < 10; attempt++) {
        // Bias toward recent nodes: the frontier grows, not the core.
        const idx = Math.min(
          nodes.length - 1,
          Math.floor(nodes.length * (1 - Math.random() * Math.random())),
        );
        const parent = nodes[idx]!;
        if (parent.gen >= MAX_GEN) continue;

        const outward = Math.atan2(parent.y - height / 2, parent.x - width / 2);
        const angle = outward + (Math.random() - 0.5) * 2.3;
        const dist = EDGE_MIN + Math.random() * (EDGE_MAX - EDGE_MIN);
        const x = parent.x + Math.cos(angle) * dist;
        const y = parent.y + Math.sin(angle) * dist;

        if (x < 24 || x > width - 24 || y < 24 || y > height - 24) continue;
        if (tooClose(x, y)) continue;

        const child = addNode(x, y, parent.gen + 1);
        connect(idx, child);

        // Occasional cross-link to a neighbour — without these it's a tree,
        // and a tree doesn't read as a network. Uses the grid, not a full scan.
        if (Math.random() < 0.3) {
          const cx = Math.floor(x / MIN_SEPARATION);
          const cy = Math.floor(y / MIN_SEPARATION);
          outer: for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const cell = grid.get((cy + dy) * cols + (cx + dx));
              if (!cell) continue;
              for (const k of cell) {
                if (k === child || k === idx) continue;
                const other = nodes[k]!;
                const ddx = other.x - x;
                const ddy = other.y - y;
                if (ddx * ddx + ddy * ddy < EDGE_MAX * EDGE_MAX) {
                  connect(child, k);
                  break outer;
                }
              }
            }
          }
        }
        return;
      }
    }

    function fireSignal() {
      if (edges.length === 0 || signals.length > 48) return;
      const e = edges[Math.floor(Math.random() * edges.length)]!;
      const forward = Math.random() < 0.5;
      signals.push({
        from: forward ? e.a : e.b,
        to: forward ? e.b : e.a,
        t: 0,
        speed: 0.014 + Math.random() * 0.022,
        hops: 0,
      });
    }

    function resize() {
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === width && h === height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, tier.dprCap);
      width = w;
      height = h;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Built once here rather than every frame.
      const vg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        height * 0.1,
        width * 0.5,
        height * 0.5,
        height * 0.92,
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, `rgba(${GROUND},0.86)`);
      vignetteFill = vg;

      reset();
    }

    function drawEdges() {
      if (!ctx) return;
      // Settled edges: one path per colour bucket.
      const byBucket: Edge[][] = Array.from({ length: BUCKETS }, () => []);
      const growing: Edge[] = [];
      for (const e of edges) {
        if (e.age >= EDGE_FADE) byBucket[e.bucket]!.push(e);
        else growing.push(e);
      }

      ctx.lineWidth = 1;
      for (let b = 0; b < BUCKETS; b++) {
        const list = byBucket[b]!;
        if (list.length === 0) continue;
        const [r, g, bl] = rampColor((b / (BUCKETS - 1)) * MAX_GEN);
        ctx.beginPath();
        for (const e of list) {
          const a = nodes[e.a]!;
          const z = nodes[e.b]!;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(z.x, z.y);
        }
        ctx.strokeStyle = `rgba(${r},${g},${bl},0.2)`;
        ctx.stroke();
      }

      // Edges still drawing themselves in — a handful at most.
      for (const e of growing) {
        const a = nodes[e.a]!;
        const z = nodes[e.b]!;
        const p = e.age / EDGE_FADE;
        const [r, g, bl] = rampColor((a.gen + z.gen) / 2);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (z.x - a.x) * p, a.y + (z.y - a.y) * p);
        ctx.strokeStyle = `rgba(${r},${g},${bl},${0.2 * p})`;
        ctx.stroke();
      }
    }

    function drawNodes() {
      if (!ctx) return;
      const glow = quality === 2 ? 1 : quality === 1 ? 0.72 : 0.48;
      // Settled nodes need no alpha changes; fading ones are drawn after.
      for (const n of nodes) {
        if (n.age < NODE_FADE) continue;
        const sprite = nodeSprites[bucketOf(n.gen)]!;
        const s = (10 + (1 - n.gen / MAX_GEN) * 8) * glow;
        ctx.drawImage(sprite, n.x - s / 2, n.y - s / 2, s, s);
      }
      for (const n of nodes) {
        if (n.age >= NODE_FADE) continue;
        const t = n.age / NODE_FADE;
        const sprite = nodeSprites[bucketOf(n.gen)]!;
        const s = (10 + (1 - n.gen / MAX_GEN) * 8) * glow * t;
        ctx.globalAlpha = t;
        ctx.drawImage(sprite, n.x - s / 2, n.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    }

    function drawSignals() {
      if (!ctx) return;
      const size = quality === 0 ? 9 : 13;
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i]!;
        s.t += s.speed;

        const from = nodes[s.from];
        const to = nodes[s.to];
        if (!from || !to) {
          signals.splice(i, 1);
          continue;
        }

        if (s.t >= 1) {
          // Chain onward through the node it arrived at, up to a few hops.
          const onward = links[s.to];
          if (onward && onward.length > 0 && s.hops < 4 && Math.random() < 0.72) {
            const next = onward[Math.floor(Math.random() * onward.length)]!;
            signals[i] = { from: s.to, to: next, t: 0, speed: s.speed, hops: s.hops + 1 };
          } else {
            signals.splice(i, 1);
          }
          continue;
        }

        const x = from.x + (to.x - from.x) * s.t;
        const y = from.y + (to.y - from.y) * s.t;
        ctx.drawImage(signalSprites[bucketOf(to.gen)]!, x - size / 2, y - size / 2, size, size);
      }
    }

    function paint(animated: boolean) {
      if (!ctx) return;
      if (animated) {
        // Partial-alpha fill rather than clearRect — this is what gives the
        // signals their comet trails.
        ctx.fillStyle = `rgba(${GROUND},0.16)`;
      } else {
        ctx.fillStyle = `rgb(${GROUND})`;
      }
      ctx.fillRect(0, 0, width, height);

      drawEdges();
      // Additive blending so overlapping glows brighten instead of flattening.
      ctx.globalCompositeOperation = "lighter";
      drawNodes();
      if (animated) drawSignals();
      ctx.globalCompositeOperation = "source-over";

      if (vignetteFill) {
        ctx.fillStyle = vignetteFill;
        ctx.fillRect(0, 0, width, height);
      }
    }

    function frame(now: number) {
      if (!ctx) return;

      // Watchdog: sustained slow frames drop glow quality one step. It never
      // climbs back, so it can't oscillate.
      if (lastTime) {
        frameAccum += now - lastTime;
        frameCount++;
        if (frameCount >= 60) {
          if (frameAccum / frameCount > 21 && quality > 0) quality--;
          frameAccum = 0;
          frameCount = 0;
        }
      }
      lastTime = now;

      const cap = maxNodes();
      // Fast while it fills, then a slow churn so it stays alive.
      if (nodes.length < cap) {
        if (tick % 2 === 0) grow();
      } else if (tick % 90 === 0) {
        grow();
      }
      if (tick % 7 === 0) fireSignal();

      for (const n of nodes) n.age++;
      for (const e of edges) e.age++;

      paint(true);

      tick++;
      frameId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reducedMotion) return;
      running = true;
      lastTime = 0;
      frameId = requestAnimationFrame(frame);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    }

    function sync() {
      if (visible && onScreen) start();
      else stop();
    }

    resize();

    if (reducedMotion) {
      // Grow the whole thing instantly and draw one settled frame.
      const target = maxNodes();
      while (nodes.length < target) grow();
      for (const n of nodes) n.age = NODE_FADE;
      for (const e of edges) e.age = EDGE_FADE;
      paint(false);
      return;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // The hero is 100svh — once it's scrolled past, this stops entirely.
    const intersection = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    intersection.observe(canvas);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    sync();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
