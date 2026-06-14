"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const capabilityChips = [
  ["Semiconductor Fabs", "半导体工厂"],
  ["AI Data Centers", "AI数据中心"],
  ["Industrial Parks", "工业园区"],
  ["Overseas Energy Assets", "海外能源项目"],
];

const metrics = [
  ["99.99%", "Power Reliability", "供电可靠性"],
  ["680 MWh", "Storage Reserve", "储能备用容量"],
  ["24/7", "AI Dispatch", "AI调度"],
];

const layers = [
  {
    title: ["Energy Supply", "能源供应"],
    detail: ["Storage generators, grid power, renewables", "储能发电机、电网电力与新能源"],
  },
  {
    title: ["AI Dispatching", "AI调度"],
    detail: ["Load forecasting, peak shaving, backup response", "负荷预测、削峰填谷与备电响应"],
  },
  {
    title: ["Semiconductor Load", "半导体负荷"],
    detail: ["Cleanroom, process equipment, data systems", "洁净室、工艺设备与数据系统"],
  },
];

export default function Hero() {
  const { text } = useLanguage();

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_72%_18%,rgba(146,230,209,0.17),transparent_34%),linear-gradient(135deg,#07110f_0%,#10231e_48%,#0b1517_100%)]"
    >
      <div className="mx-auto grid min-h-[92vh] max-w-[1180px] items-center gap-10 px-6 pb-14 pt-28 lg:grid-cols-[1.12fr_0.88fr] lg:pt-28">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <div className="relative size-16 overflow-hidden border border-[#ff9d1c]/40 bg-black shadow-[0_0_30px_rgba(255,157,28,0.25)] md:size-20">
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
              <p className="text-xl font-black text-[#ff9d1c] md:text-2xl">Everflux</p>
              <p className="text-sm tracking-[0.18em] text-white/45">
                {text("Semiconductor AI Energy", "半导体AI智慧能源")}
              </p>
            </div>
          </div>

          <p className="eyebrow">
            {text("Platform Overview", "平台总览")}
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,4.2vw,3.5rem)] font-black leading-[1.02] text-[#ff9d1c] xl:whitespace-nowrap">
            {text(
              "Semiconductor AI Smart Energy Supply Platform",
              "半导体AI智慧能源供应平台",
            )}
          </h1>
          <h2 className="mt-5 max-w-3xl text-2xl font-semibold leading-tight text-white md:text-3xl">
            {text(
              "AI storage and distributed energy solutions for semiconductor fabs, data centers, and industrial parks.",
              "面向半导体工厂、数据中心与工业园区的AI储能、稳定供电与分布式能源解决方案。",
            )}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/66 md:text-lg">
            {text(
              "Everflux integrates storage power, AI dispatching, backup supply, energy procurement, and carbon management to improve uptime and energy efficiency for high-load industries.",
              "Everflux 整合储能发电、AI调度、备用电源、能源采购与碳管理，提升高载能产业的供电稳定性与能源效率。",
            )}
          </p>

          <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 text-sm text-white/72">
            {capabilityChips.map(([en, zh]) => (
              <span key={en} className="border border-white/10 bg-white/[0.035] px-3 py-3">
                {text(en, zh)}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="bg-[#ff9d1c] px-6 py-3 text-center text-sm font-bold text-[#07110f] transition hover:bg-white"
            >
              {text("Request Solution", "获取方案")}
            </a>
            <a
              href="#energy"
              className="border border-white/18 px-6 py-3 text-center text-sm font-bold text-white/85 transition hover:border-[#92e6d1] hover:text-[#92e6d1]"
            >
              {text("View Platform", "查看平台能力")}
            </a>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/10 py-5">
            {metrics.map(([value, en, zh]) => (
              <div key={en}>
                <dt className="text-2xl font-black text-white">{value}</dt>
                <dd className="mt-1 text-xs uppercase text-white/45">{text(en, zh)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#92e6d1]">
                {text("Energy Supply OS", "能源供应操作系统")}
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                {text("Semiconductor Load Control", "半导体负荷控制")}
              </h3>
            </div>
            <span className="border border-[#ff9d1c]/45 bg-[#ff9d1c]/12 px-3 py-2 text-xs font-black text-[#ff9d1c]">
              {text("LIVE", "运行中")}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-[0.88fr_1.12fr]">
            <div className="grid gap-3">
              {[
                ["Fab Load", "42.8 MW", "晶圆厂负荷"],
                ["Storage SOC", "86%", "储能电量"],
                ["Backup Window", "6.5 h", "备电时长"],
                ["Peak Reduction", "18.6%", "峰值削减"],
              ].map(([en, value, zh]) => (
                <div key={en} className="border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/38">{text(en, zh)}</p>
                  <p className="mt-2 text-2xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="border border-white/10 bg-[#081511] p-4">
              <div className="grid min-h-[300px] grid-rows-[1fr_auto_1fr] gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#92e6d1]/30 bg-[#92e6d1]/10 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#92e6d1]">
                      {text("Stable Power", "稳定供电")}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {text("Grid + storage + backup generation", "电网 + 储能 + 备电发电")}
                    </p>
                  </div>
                  <div className="border border-[#ff9d1c]/35 bg-[#ff9d1c]/10 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-[#ff9d1c]">
                      {text("AI Control", "AI控制")}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {text("Forecast, dispatch, and protect loads", "预测、调度与负荷保护")}
                    </p>
                  </div>
                </div>

                <div className="relative mx-auto flex size-32 items-center justify-center border border-white/15 bg-black/30 text-center shadow-[0_0_42px_rgba(255,157,28,0.18)]">
                  <div>
                    <p className="text-3xl font-black text-[#ff9d1c]">AI</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/55">
                      Energy OS
                    </p>
                  </div>
                  <span className="absolute -left-16 top-1/2 h-px w-16 bg-[#92e6d1]/50" />
                  <span className="absolute -right-16 top-1/2 h-px w-16 bg-[#ff9d1c]/55" />
                  <span className="absolute left-1/2 -top-10 h-10 w-px bg-white/22" />
                  <span className="absolute bottom-[-40px] left-1/2 h-10 w-px bg-white/22" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-white/42">
                      {text("Carbon", "碳管理")}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {text("Energy and emission accounting", "能耗与排放核算")}
                    </p>
                  </div>
                  <div className="border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-white/42">
                      {text("Procurement", "能源采购")}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {text("Cost-optimized power portfolio", "成本优化电力组合")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {layers.map((layer) => (
              <div key={layer.title[0]} className="border border-white/10 bg-black/16 p-4">
                <p className="text-sm font-bold text-white">{text(layer.title[0], layer.title[1])}</p>
                <p className="mt-2 text-xs leading-5 text-white/48">
                  {text(layer.detail[0], layer.detail[1])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
