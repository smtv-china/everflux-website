"use client";

import { useLanguage } from "./LanguageProvider";

const markets = [
  { country: "China", cn: "中国", projects: 38, capacity: "820 MW", partners: 16, generation: "1.9 TWh" },
  { country: "United States", cn: "美国", projects: 12, capacity: "210 MW", partners: 7, generation: "420 GWh" },
  { country: "Germany", cn: "德国", projects: 8, capacity: "96 MW", partners: 5, generation: "180 GWh" },
  { country: "United Arab Emirates", cn: "阿联酋", projects: 5, capacity: "88 MW", partners: 4, generation: "160 GWh" },
  { country: "Singapore", cn: "新加坡", projects: 6, capacity: "66 MW", partners: 6, generation: "92 GWh" },
];

export default function GlobalMap() {
  const { text } = useLanguage();

  return (
    <section id="global" className="section-shell border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{text("Global Footprint", "全球布局")}</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {text("Global Energy Network", "全球能源网络")}
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/58">
            {text(
              "EVERFLUX is building a distributed energy network across high-growth industrial and renewable markets.",
              "Everflux 正在高增长工业市场和新能源市场建设分布式能源网络。",
            )}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ["69", text("Projects", "项目数量")],
              ["1.28 GW", text("Installed Capacity", "装机容量")],
              ["38", text("Partners", "合作伙伴")],
              ["2.75 TWh", text("Annual Generation", "年发电量")],
            ].map(([value, label]) => (
              <div key={label} className="border border-white/10 bg-white/[0.035] p-5">
                <p className="text-3xl font-black text-[#ff9d1c]">{value}</p>
                <p className="mt-2 text-sm text-white/48">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden border border-white/10 bg-white/[0.035]">
          <div className="grid grid-cols-[1.1fr_0.7fr_0.8fr_0.8fr] border-b border-white/10 px-5 py-4 text-xs uppercase tracking-[0.12em] text-white/42">
            <span>{text("Market", "市场")}</span>
            <span>{text("Projects", "项目")}</span>
            <span>{text("Capacity", "容量")}</span>
            <span>{text("Generation", "发电量")}</span>
          </div>
          {markets.map((market) => (
            <div
              key={market.country}
              className="grid grid-cols-[1.1fr_0.7fr_0.8fr_0.8fr] items-center border-b border-white/10 px-5 py-5 last:border-b-0"
            >
              <div>
                <p className="font-semibold text-white">{text(market.country, market.cn)}</p>
                <p className="mt-1 text-sm text-white/40">{text(market.cn, market.country)}</p>
              </div>
              <p className="text-lg font-bold text-[#ff9d1c]">{market.projects}</p>
              <p className="text-sm text-white/68">{market.capacity}</p>
              <p className="text-sm text-white/68">{market.generation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
