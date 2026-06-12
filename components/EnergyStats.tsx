"use client";

// components/EnergyStats.tsx
import { useLanguage } from "./LanguageProvider";

export default function EnergyStats() {
  const { text } = useLanguage();
  const data = [
    { title: "Real-time Generation", cn: "实时发电量", value: "1.28 GW", detail: "renewable assets online", detailCn: "新能源资产在线运行" },
    { title: "Storage Capacity", cn: "储能容量", value: "680 MWh", detail: "dispatchable reserves", detailCn: "可调度储能容量" },
    { title: "Carbon Reduction", cn: "碳减排量", value: "286,000 tCO2", detail: "annualized estimate", detailCn: "年度化估算" },
    { title: "Device Online Rate", cn: "设备在线率", value: "99.97%", detail: "platform availability", detailCn: "平台可用性" },
  ];

  return (
    <section id="energy" className="section-shell">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">{text("Platform Signals", "平台实时指标")}</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
          {text("Live Energy Data", "实时能源数据")}
        </h2>
        <p className="mt-4 text-white/58">
          {text(
            "Clear operational indicators for generation, storage, carbon performance, and connected device availability.",
            "清晰展示发电、储能、碳减排和设备在线率，让客户快速理解平台运行能力。",
          )}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={item.title}
            className="border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#ff9d1c]/60"
          >
            <div className="flex items-center justify-between text-sm text-white/45">
              <span>0{index + 1}</span>
              <span>{item.cn}</span>
            </div>
            <h3 className="mt-8 text-4xl font-black text-[#ff9d1c]">{item.value}</h3>
            <p className="mt-4 font-semibold text-white">{text(item.title, item.cn)}</p>
            <p className="mt-2 text-sm text-white/45">{text(item.detail, item.detailCn)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
