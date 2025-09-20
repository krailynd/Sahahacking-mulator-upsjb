"use client";

import { useEffect, useRef } from "react";

export type GraphSeries = {
  color: string;
  values: { x: number; y: number }[];
  label: string;
};

type Graph2DProps = {
  series: GraphSeries[];
  title?: string;
};

export function Graph2D({ series, title }: Graph2DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (series.length === 0) return;
    const allPoints = series.flatMap((serie) => serie.values);
    const minX = Math.min(...allPoints.map((p) => p.x));
    const maxX = Math.max(...allPoints.map((p) => p.x));
    const minY = Math.min(...allPoints.map((p) => p.y));
    const maxY = Math.max(...allPoints.map((p) => p.y));
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;

    ctx.save();
    ctx.translate(40, height - 30);
    ctx.scale(1, -1);

    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width - 60, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height - 60);
    ctx.stroke();

    series.forEach((serie) => {
      ctx.strokeStyle = serie.color;
      ctx.beginPath();
      serie.values.forEach((point, index) => {
        const x = ((point.x - minX) / rangeX) * (width - 60);
        const y = ((point.y - minY) / rangeY) * (height - 60);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    });

    ctx.restore();
  }, [series]);

  return (
    <div className="space-y-3">
      {title && <p className="text-sm text-indigo-200">{title}</p>}
      <canvas ref={canvasRef} width={480} height={280} className="w-full rounded-2xl bg-slate-900/60" />
    </div>
  );
}
