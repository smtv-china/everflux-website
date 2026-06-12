// components/Hero.tsx
"use client";

import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLanguage } from "./LanguageProvider";

function Globe() {
  return (
    <group rotation={[0.2, -0.35, 0]}>
      <mesh>
        <sphereGeometry args={[2, 80, 80]} />
        <meshStandardMaterial color="#113f39" roughness={0.45} metalness={0.25} />
      </mesh>
      <mesh scale={1.01}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial color="#92e6d1" wireframe transparent opacity={0.24} />
      </mesh>
      <mesh rotation={[0.8, 0.1, 0.3]} scale={[2.55, 2.55, 0.02]}>
        <torusGeometry args={[1, 0.006, 12, 160]} />
        <meshBasicMaterial color="#ff9d1c" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[1.25, -0.4, -0.2]} scale={[2.85, 2.85, 0.02]}>
        <torusGeometry args={[1, 0.005, 12, 160]} />
        <meshBasicMaterial color="#64b6ff" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function Hero() {
  const { text } = useLanguage();

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_70%_15%,rgba(146,230,209,0.18),transparent_34%),linear-gradient(135deg,#07110f_0%,#10231e_48%,#0b1517_100%)]"
    >
      <div className="mx-auto grid min-h-[92vh] max-w-[1180px] items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:pt-28">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative size-20 overflow-hidden border border-[#ff9d1c]/40 bg-black shadow-[0_0_30px_rgba(255,157,28,0.25)]">
              <Image
                src="/brand/everflux-logo.jpg"
                alt="Everflux 永流储能发电机 LOGO"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-2xl font-black text-[#ff9d1c]">Everflux</p>
              <p className="text-sm tracking-[0.18em] text-white/45">
                {text("Storage Power Systems", "永流储能发电机")}
              </p>
            </div>
          </div>
          <p className="eyebrow">
            {text("Global Distributed Energy Platform", "全球分布式能源平台")}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.96] text-[#ff9d1c] md:text-7xl">
            {text("Powering The Future With Intelligent Energy", "智能能源驱动未来")}
          </h1>
          <h2 className="mt-5 max-w-2xl text-2xl font-semibold text-white md:text-3xl">
            {text("Everflux Storage Generator & AI Energy Platform", "永流储能发电机与AI能源平台")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            {text(
              "EVERFLUX integrates power generation, energy storage, AI dispatching, and carbon management into one operating layer for distributed energy assets.",
              "Everflux 将发电、储能、AI 调度和碳管理整合为一个分布式能源运营平台。",
            )}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/58">
            {text(
              "Built for industrial parks, cities, energy investors, and overseas partners.",
              "服务园区、城市、工业客户、能源投资方与海外合作伙伴。",
            )}
          </p>

          <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 text-sm text-white/72 md:grid-cols-4">
            {[
              ["Power Generation", "发电系统"],
              ["Energy Storage", "储能系统"],
              ["AI Dispatching", "AI调度"],
              ["Carbon Management", "碳管理"],
            ].map(([en, zh]) => (
              <span key={en} className="border border-white/10 bg-white/[0.035] px-3 py-2">
                {text(en, zh)}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="bg-[#ff9d1c] px-6 py-3 text-center text-sm font-bold text-[#07110f] transition hover:bg-white"
            >
              {text("Start Partnership", "立即合作")}
            </a>
            <a
              href="#energy"
              className="border border-white/18 px-6 py-3 text-center text-sm font-bold text-white/85 transition hover:border-[#92e6d1] hover:text-[#92e6d1]"
            >
              {text("Learn More", "了解更多")}
            </a>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/10 py-5">
            <div>
              <dt className="text-2xl font-black text-white">69</dt>
              <dd className="mt-1 text-xs uppercase text-white/45">{text("Projects", "项目")}</dd>
            </div>
            <div>
              <dt className="text-2xl font-black text-white">1.28 GW</dt>
              <dd className="mt-1 text-xs uppercase text-white/45">{text("Capacity", "装机容量")}</dd>
            </div>
            <div>
              <dt className="text-2xl font-black text-white">99.97%</dt>
              <dd className="mt-1 text-xs uppercase text-white/45">{text("Online Rate", "在线率")}</dd>
            </div>
          </dl>
        </div>

        <div className="relative min-h-[420px] border border-white/10 bg-white/[0.03]">
          <div className="absolute left-5 top-5 z-10 text-xs uppercase tracking-[0.16em] text-white/45">
            {text("Live Infrastructure Model", "实时基础设施模型")}
          </div>
          <div className="absolute bottom-5 left-5 z-10 max-w-xs text-sm leading-6 text-white/60">
            {text(
              "Generation, storage, load demand, and carbon performance are operated as one intelligent energy network.",
              "发电、储能、负荷需求和碳表现作为统一智能能源网络运行。",
            )}
          </div>
          <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
            <ambientLight intensity={1.4} />
            <pointLight position={[5, 5, 5]} intensity={2} />
            <pointLight position={[-6, -2, 2]} color="#92e6d1" intensity={2} />
            <Globe />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.65} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
