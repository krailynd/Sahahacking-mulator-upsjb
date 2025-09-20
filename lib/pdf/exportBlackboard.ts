"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface ExportNotesPayload {
  title: string;
  markdown: string;
  math: string;
}

export async function exportNotesAsPdf(payload: ExportNotesPayload) {
  const container = document.createElement("div");
  container.className = "math-surface max-w-2xl bg-slate-900 p-6 text-white";
  container.innerHTML = `
    <h2 style="font-size:20px;font-weight:600;margin-bottom:12px;">${payload.title}</h2>
    <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${payload.markdown}</p>
    <hr style="margin:16px 0;border-color:rgba(148,163,184,0.3)" />
    <p style="font-family:'IBM Plex Mono',monospace;font-size:16px;">${payload.math}</p>
  `;
  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    backgroundColor: "#0f172a",
    scale: 2
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${payload.title || "notas"}.pdf`);
  document.body.removeChild(container);
}
