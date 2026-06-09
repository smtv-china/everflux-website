// components/Hero.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Globe() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="#00bfff" wireframe />
    </mesh>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-between px-10 pt-32">
      <div className="w-1/2">
        <h1 className="text-7xl font-bold text-yellow-400">EVERFLUX</h1>
        <h2 className="text-3xl mt-4">永流智慧能源科技（山东）有限公司</h2>
        <p className="mt-6 text-xl text-cyan-300">Global AI Energy Infrastructure Platform</p>
        <p className="mt-3 text-gray-300">全球半导体AI智慧能源供应平台</p>
      </div>
      <div className="w-1/2 h-[600px]">
        <Canvas>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          <Globe />
          <OrbitControls />
        </Canvas>
      </div>
    </section>
  );
}