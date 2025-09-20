import Link from "next/link";
import { useNotebookEntries } from "@/lib/storage/idb";
import { Suspense } from "react";

export const metadata = {
  title: "Historial global • Interstellar Physics Lab"
};

export default function HistoryPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-16">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold text-white">Historial global</h1>
        <p className="text-slate-300">
          Visualiza tus notas sincronizadas y accede a los módulos desde el registro reciente.
        </p>
      </header>
      <Suspense fallback={<p className="text-center text-slate-400">Cargando historial...</p>}>
        <HistoryTable />
      </Suspense>
    </main>
  );
}

function HistoryTable() {
  const entries = useNotebookEntries();
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5">
      <div className="grid grid-cols-4 gap-4 px-6 py-3 text-xs uppercase tracking-widest text-indigo-200/80">
        <span>Fecha</span>
        <span>Título</span>
        <span>Módulo</span>
        <span>Acciones</span>
      </div>
      <div className="divide-y divide-white/10">
        {entries.length === 0 && (
          <p className="px-6 py-8 text-center text-sm text-slate-400">
            Sin registros aún. Crea notas desde cualquier módulo y aparecerán aquí.
          </p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="grid grid-cols-4 items-center gap-4 px-6 py-4 text-sm text-slate-200">
            <span>{new Date(entry.createdAt).toLocaleString("es-ES")}</span>
            <span>{entry.title}</span>
            <span className="text-xs uppercase tracking-widest text-indigo-200">global</span>
            <Link
              href="/modules"
              className="justify-self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white transition hover:bg-white/20"
            >
              Abrir módulos
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
