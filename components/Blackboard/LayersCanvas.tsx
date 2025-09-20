"use client";

import { useEffect, useRef } from "react";

type LayersCanvasProps = {
  width?: number;
  height?: number;
  onClear?: (ctx: CanvasRenderingContext2D) => void;
};

export function LayersCanvas({ width = 720, height = 360, onClear }: LayersCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (onClear) onClear(ctx);
  }, [onClear]);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className="w-full rounded-2xl border border-white/10 bg-slate-950/60"
    />
  );
}
