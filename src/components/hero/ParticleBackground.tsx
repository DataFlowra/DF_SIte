"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1000;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);
  const { viewport } = useThree();

  // Initialize buffers
  const [positions, velocities, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    const teal = new THREE.Color("#06B6D4");
    const violet = new THREE.Color("#8B5CF6");
    const indigo = new THREE.Color("#4F46E5");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

      const colorChoice = Math.random();
      const color = colorChoice < 0.4 ? teal : colorChoice < 0.7 ? violet : indigo;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = Math.random() * 4 + 0.5;
    }
    return [pos, vel, col, siz];
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Increment local time to avoid THREE.Clock deprecation warning
    timeRef.current += delta;
    const time = timeRef.current;

    const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = mesh.geometry.attributes.color as THREE.BufferAttribute;
    
    // Explicitly check for attribute arrays
    if (!posAttr || !colAttr) return;
    
    const posArray = posAttr.array as Float32Array;
    const colArray = colAttr.array as Float32Array;

    const mouseWorld = new THREE.Vector3(
      mouseRef.current.x * viewport.width * 0.5,
      mouseRef.current.y * viewport.height * 0.5,
      0
    );

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Brownian Motion
      posArray[ix] += velocities[ix] + Math.sin(time * 0.2 + i) * 0.005;
      posArray[iy] += velocities[iy] + Math.cos(time * 0.25 + i) * 0.005;
      posArray[iz] += velocities[iz];

      // Mouse Magnetism
      const dx = mouseWorld.x - posArray[ix];
      const dy = mouseWorld.y - posArray[iy];
      const distSq = dx * dx + dy * dy;

      if (distSq < 16) { // 4 units radius
        const dist = Math.sqrt(distSq);
        const force = (4 - dist) * 0.002 * delta * 60;
        posArray[ix] += dx * force;
        posArray[iy] += dy * force;
        
        // Glow Pulse
        colArray[ix] = Math.min(1, colArray[ix] + 0.05);
        colArray[iy] = Math.min(1, colArray[iy] + 0.05);
        colArray[iz] = Math.min(1, colArray[iz] + 0.05);
      } else {
        // Return to base colors
        colArray[ix] += (colors[ix] - colArray[ix]) * 0.05;
        colArray[iy] += (colors[iy] - colArray[iy]) * 0.05;
        colArray[iz] += (colors[iz] - colArray[iz]) * 0.05;
      }

      // Bound check
      if (Math.abs(posArray[ix]) > 25) posArray[ix] *= -0.9;
      if (Math.abs(posArray[iy]) > 15) posArray[iy] *= -0.9;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
