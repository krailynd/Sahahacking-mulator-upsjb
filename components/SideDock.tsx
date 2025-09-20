"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { NotebookPen } from "lucide-react";
import { NotesPanel } from "@/components/NotesPanel";

export function SideDock() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="fixed right-6 top-1/2 z-30 flex -translate-y-1/2 items-center gap-2 rounded-l-full border border-indigo-400/40 bg-indigo-500/40 px-4 py-3 text-sm font-medium text-indigo-100 shadow-lg shadow-indigo-500/20 backdrop-blur transition hover:bg-indigo-500/60"
          aria-label="Abrir bloc de notas"
        >
          <NotebookPen size={20} />
          <span className="hidden sm:inline">Bloc de notas</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-indigo-500/30">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-white">
              Bloc de notas interestelar
            </Dialog.Title>
            <Dialog.Close className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 hover:bg-white/10">
              Cerrar
            </Dialog.Close>
          </div>
          <NotesPanel onClose={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
