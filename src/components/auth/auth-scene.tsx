"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";

export function AuthScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 3, 4]} intensity={0.5} />

        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
          <mesh scale={2.1}>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              color="#a78bfa"
              distort={0.45}
              speed={1.6}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>

        <Sparkles count={60} scale={[6, 6, 4]} size={2.5} speed={0.3} color="#ffffff" opacity={0.6} />
      </Canvas>
    </div>
  );
}
