"use client";

import { useEffect, useRef, useState } from "react";
import { exportNotesAsPdf } from "@/lib/pdf/exportBlackboard";
import { saveNoteEntry, useNotebookEntries } from "@/lib/storage/idb";

type NotesPanelProps = {
  onClose?: () => void;
};

export function NotesPanel({ onClose }: NotesPanelProps) {
  const mathfieldRef = useRef<HTMLElement | null>(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const entries = useNotebookEntries();

  useEffect(() => {
    let active = true;
    (async () => {
      if (mathfieldRef.current) return;
      const { MathfieldElement } = await import("mathlive");
      if (!active) return;
      const field = new MathfieldElement();
      field.className = "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-lg";
      field.setOptions({
        virtualKeyboardMode: "manual",
        smartFence: true
      });
      field.value = "\\text{Notas matemáticas}\\n";
      mathfieldRef.current = field;
      const host = document.getElementById("math-notes-host");
      if (host) {
        host.innerHTML = "";
        host.appendChild(field);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    const mathContent =
      (mathfieldRef.current as any)?.getValue?.("latex") ?? "";
    const entry = await saveNoteEntry({
      title: title || "Nota sin título",
      markdown: notes,
      math: mathContent,
      createdAt: Date.now()
    });
    if (entry && onClose) onClose();
  };

  const handleExport = async () => {
    const mathContent =
      (mathfieldRef.current as any)?.getValue?.("latex") ?? "";
    await exportNotesAsPdf({
      title: title || "Notas",
      markdown: notes,
      math: mathContent
    });
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="space-y-2">
        <label className="text-sm text-indigo-200" htmlFor="notes-title">
          Título
        </label>
        <input
          id="notes-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Experimento con proyectiles"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-indigo-200" htmlFor="notes-markdown">
          Notas en Markdown
        </label>
        <textarea
          id="notes-markdown"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={6}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-indigo-400 focus:outline-none"
          placeholder="- Ajustar coeficiente de arrastre\n- Comparar ángulos de lanzamiento"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-indigo-200">Editor MathLive</p>
        <div id="math-notes-host" className="rounded-lg border border-white/10 bg-black/30 p-3" />
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          className="rounded-full border border-indigo-400/60 bg-indigo-500/40 px-5 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-500/60"
        >
          Guardar
        </button>
        <button
          onClick={handleExport}
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/80 transition hover:bg-white/20"
        >
          Exportar PDF
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-indigo-200/70">Historial</p>
        <ul className="max-h-48 space-y-2 overflow-y-auto pr-2 text-sm text-slate-300">
          {entries.length === 0 && <li>No hay notas guardadas aún.</li>}
          {entries.map((entry) => (
            <li key={entry.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="font-medium text-white">{entry.title}</p>
              <p className="text-xs text-slate-400">
                {new Date(entry.createdAt).toLocaleString("es-ES")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
