import { PDFExportButton } from "@/components/PDFExportButton";

export const metadata = {
  title: "Centro de exportación • Interstellar Physics Lab"
};

export default function ExportPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-16">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold text-white">Exportación a PDF</h1>
        <p className="text-slate-300">
          Genera reportes instantáneos desde tus notas, Blackboard y resúmenes de simulación.
        </p>
      </header>
      <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-200">
        <p className="text-sm text-indigo-200">Generador rápido</p>
        <p className="text-sm text-slate-300">
          Exporta un PDF vacío para comenzar o utiliza el panel lateral para capturar tus apuntes.
        </p>
        <PDFExportButton title="Reporte interestelar" math="" markdown="" />
      </section>
    </main>
  );
}
