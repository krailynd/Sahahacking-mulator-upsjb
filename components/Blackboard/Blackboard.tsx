"use client";

import { useEffect, useRef, useState } from "react";
import { PDFExportButton } from "@/components/PDFExportButton";

type BlackboardProps = {
  title?: string;
};

export function Blackboard({ title = "Pizarra" }: BlackboardProps) {
  const mathfieldRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [notes, setNotes] = useState("");
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (mathfieldRef.current) return;
      const { MathfieldElement } = await import("mathlive");
      if (!active) return;
      const field = new MathfieldElement();
      field.className = "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-lg";
      field.value = "\\int F\,dx";
      mathfieldRef.current = field;
      const host = document.getElementById("math-blackboard-host");
      if (host) {
        host.innerHTML = "";
        host.appendChild(field);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.8)";
    ctx.lineWidth = 2;
    let drawingPath = false;

    const startDraw = (event: MouseEvent) => {
      drawingPath = true;
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
      setDrawing(true);
    };

    const move = (event: MouseEvent) => {
      if (!drawingPath) return;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    };

    const stop = () => {
      drawingPath = false;
      setDrawing(false);
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };
  }, []);

  const math = (mathfieldRef.current as any)?.getValue?.("latex") ?? "";

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <PDFExportButton title={title} math={math} markdown={notes} />
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm text-indigo-200">Expresiones matemáticas</p>
          <div id="math-blackboard-host" className="rounded-lg border border-white/10 bg-black/30 p-3" />
        </div>
        <div className="space-y-3">
          <label className="text-sm text-indigo-200" htmlFor="blackboard-notes">
            Notas
          </label>
          <textarea
            id="blackboard-notes"
            rows={6}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none"
            placeholder="Describe tu experimento..."
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-indigo-200">Dibujo libre</p>
        <canvas
          ref={canvasRef}
          width={720}
          height={360}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60"
        />
        <p className="text-xs text-slate-400">
          {drawing ? "Dibujando..." : "Haz clic y arrastra para dibujar diagramas"}
        </p>
      </div>
    </section>
  );
}
