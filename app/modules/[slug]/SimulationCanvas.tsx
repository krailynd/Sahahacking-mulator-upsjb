"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import type { ModuleConfig } from "@/lib/data/module-config";
import type { ModuleSlug } from "@/lib/data/modules";
import type { ModuleSimulationState } from "./useSimulationStore";

interface Props {
  slug: ModuleSlug;
  state: ModuleSimulationState;
  config: ModuleConfig;
}

function ProjectileScene({ state }: { state: ModuleSimulationState }) {
  const trajectory = state.result?.trajectory ?? [];
  const [time, setTime] = useState(0);
  const pathPoints = useMemo(() => trajectory.map((point) => [point.x, point.y, 0]), [trajectory]);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    setTime(0);
    invalidate();
  }, [trajectory, invalidate]);

  useFrame((state3d, delta) => {
    if (trajectory.length === 0) return;
    const speedFactor = state.options.slowMotion ? 0.5 : 1;
    const newTime = Math.min(time + delta * speedFactor, trajectory[trajectory.length - 1].t);
    setTime(newTime);
    const sample = trajectory.find((point) => point.t >= newTime) ?? trajectory[trajectory.length - 1];
    if (cameraRef.current) {
      cameraRef.current.position.x = sample.x + 10;
      cameraRef.current.position.y = Math.max(sample.y + 5, 5);
      cameraRef.current.lookAt(sample.x, Math.max(sample.y, 0), 0);
    }
    state3d.invalidate();
  });

  const projectilePosition = useMemo(() => {
    if (trajectory.length === 0) return [0, 0, 0] as [number, number, number];
    const sample = trajectory.find((point) => point.t >= time) ?? trajectory[trajectory.length - 1];
    return [sample.x, Math.max(sample.y, 0), 0] as [number, number, number];
  }, [trajectory, time]);

  return (
    <group>
      <PerspectiveCamera ref={cameraRef} position={[10, 5, 12]} makeDefault fov={45} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={0.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[1000, 1000, 64, 64]} />
        <meshStandardMaterial color="#0f172a" wireframe />
      </mesh>
      <Stars radius={120} depth={50} count={2000} factor={4} saturation={0} fade />
      {pathPoints.length > 1 && (
        <Line points={pathPoints} color="skyblue" lineWidth={2} dashed dashSize={0.4} gapSize={0.2} />
      )}
      <mesh position={projectilePosition}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={0.5} />
      </mesh>
      {state.options.showVectors && trajectory.length > 1 && (
        <mesh position={projectilePosition}>
          <coneGeometry args={[0.1, 0.6, 16]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
      )}
      <OrbitControls enablePan={false} enableZoom enableRotate />
    </group>
  );
}

function GenericScene({ state }: { state: ModuleSimulationState }) {
  const samples = state.result?.samples ?? [];
  const path = useMemo(() => samples.map((sample) => [sample.x, sample.y, 0]), [samples]);
  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 15, 10]} intensity={0.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40, 32, 32]} />
        <meshStandardMaterial color="#111827" wireframe />
      </mesh>
      {path.length > 1 && <Line points={path} color="#a855f7" lineWidth={2} />}
      <OrbitControls enablePan enableZoom enableRotate />
    </group>
  );
}

export default function SimulationCanvas({ slug, state }: Props) {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
      <Canvas dpr={[1, 2]} frameloop="demand">
        {slug === "proyectiles" ? <ProjectileScene state={state} /> : <GenericScene state={state} />}
      </Canvas>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-indigo-100">
        <p>
          {state.result
            ? `Tiempo: ${state.result.metrics.timeOfFlight?.toFixed?.(2) ?? "-"} s · Alcance: ${state.result.metrics.range?.toFixed?.(2) ?? "-"} m · Altura máxima: ${state.result.metrics.maxHeight?.toFixed?.(2) ?? "-"} m`
            : "Ajusta los controles y ejecuta la simulación para ver los resultados."}
        </p>
      </div>
    </div>
  );
}
