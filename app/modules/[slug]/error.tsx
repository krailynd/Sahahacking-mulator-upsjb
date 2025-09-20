"use client";

export default function ModuleError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-red-500/40 bg-red-500/10 p-10 text-center text-red-200">
      <h1 className="text-2xl font-semibold">Ha ocurrido un error</h1>
      <p className="mt-2 text-sm text-red-100/80">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white"
      >
        Reintentar
      </button>
    </div>
  );
}
