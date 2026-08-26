"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
          <Sparkles count={70} scale={[9, 6, 4]} size={3.5} speed={0.35} color="#6f5cf0" opacity={0.7} />
        </Float>
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
          <Sparkles count={40} scale={[7, 5, 3]} size={2.5} speed={0.25} color="#a78bfa" opacity={0.5} />
        </Float>
      </Canvas>
    </div>
  );
}
