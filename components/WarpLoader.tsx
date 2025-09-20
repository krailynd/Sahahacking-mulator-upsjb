"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export function WarpLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    timeline.fromTo(
      "#warp-loader",
      { opacity: 1 },
      {
        opacity: 0,
        duration: 1.2,
        delay: 0.6,
        onComplete: () => setVisible(false)
      }
    );
    return () => {
      timeline.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="warp-loader"
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
    >
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-400" />
        <div className="absolute inset-6 animate-pulse rounded-full bg-indigo-500/30 blur-xl" />
        <p className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.4em] text-indigo-200">
          warp
        </p>
      </div>
    </div>
  );
}
