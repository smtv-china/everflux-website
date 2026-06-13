"use client";

import { useLanguage } from "./LanguageProvider";

const industries = [
  {
    title: ["Semiconductor Fab", "半导体工厂"],
    problem: ["Power stability for cleanrooms and process tools", "保障洁净室与工艺设备稳定供电"],
    solution: ["AI dispatch + storage backup + power quality monitoring", "AI调度 + 储能备电 + 电能质量监测"],
  },
  {
    title: ["AI Data Center", "AI数据中心"],
    problem: ["High-density computing load and peak demand control", "应对高密度算力负荷与峰值电费"],
    solution: ["Storage reserve, demand response, and energy cost optimization", "储能备用、需求响应与能源成本优化"],
  },
  {
    title: ["Industrial Park", "工业园区"],
    problem: ["Multi-tenant power allocation and carbon accounting", "多企业用能分配与碳排核算"],
    solution: ["Distributed energy platform and tenant-level reporting", "分布式能源平台与企业级用能报表"],
  },
  {
    title: ["Overseas Project", "海外能源项目"],
    problem: ["Off-grid, weak-grid, and project financing requirements", "离网、弱电网与项目融资需求"],
    solution: ["Modular storage generation and bankable operating data", "模块化储能发电与可融资运营数据"],
  },
];

export default function IndustrySolutions() {
  const { text } = useLanguage();

  return (
    <section className="border-b border-white/10 bg-[#07110f]">
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow">{text("Where Everflux Fits", "Everflux服务场景")}</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              {text("Built for mission-critical energy supply", "面向关键业务的能源供应")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/58">
              {text(
                "Everflux focuses on high-load industries where uptime, power quality, and energy cost directly affect production and growth.",
                "Everflux 聚焦高载能产业，供电稳定性、电能质量与能源成本直接影响生产连续性和增长效率。",
              )}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {industries.map((industry) => (
              <article key={industry.title[0]} className="border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-black text-white">
                  {text(industry.title[0], industry.title[1])}
                </h3>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#92e6d1]">
                  {text(industry.problem[0], industry.problem[1])}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  {text(industry.solution[0], industry.solution[1])}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
