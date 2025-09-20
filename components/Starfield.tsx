"use client";

import { useMemo } from "react";

type StarfieldProps = {
  density?: number;
};

export function Starfield({ density = 80 }: StarfieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map((_, index) => ({
        id: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5
      })),
    [density]
  );

  return (
    <div className="starfield">
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
}
