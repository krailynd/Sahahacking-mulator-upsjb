"use client";

import { useState } from "react";
import { exportNotesAsPdf } from "@/lib/pdf/exportBlackboard";
import { FileDown } from "lucide-react";

type Props = {
  math: string;
  markdown: string;
  title: string;
};

export function PDFExportButton({ math, markdown, title }: Props) {
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    setBusy(true);
    try {
      await exportNotesAsPdf({ math, markdown, title });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full border border-indigo-400/60 bg-indigo-500/40 px-5 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <FileDown size={18} />
      {busy ? "Exportando..." : "Exportar PDF"}
    </button>
  );
}
