"use client";

type ToolbarProps = {
  onClear?: () => void;
};

export function BlackboardToolbar({ onClear }: ToolbarProps) {
  return (
    <div className="flex items-center justify-end gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-indigo-100">
      <button
        className="rounded-full border border-indigo-300/40 bg-indigo-500/40 px-3 py-1 transition hover:bg-indigo-500/60"
        onClick={onClear}
      >
        Limpiar trazos
      </button>
    </div>
  );
}
