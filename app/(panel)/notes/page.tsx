import { NotesPanel } from "@/components/NotesPanel";

export const metadata = {
  title: "Bloc de notas • Interstellar Physics Lab"
};

export default function NotesPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-12">
      <h1 className="text-3xl font-semibold text-white">Bloc de notas interestelar</h1>
      <p className="text-slate-300">
        Crea apuntes en Markdown, fórmulas con MathLive y exporta a PDF mientras sincronizas con
        tus módulos favoritos.
      </p>
      <NotesPanel />
    </main>
  );
}
