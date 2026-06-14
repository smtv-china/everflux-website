"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const platformPoints = [
  {
    title: ["Semiconductor Energy Supply", "半导体能源供应"],
    detail: [
      "Power continuity, backup capacity, and power quality for high-value production loads.",
      "面向高价值生产负荷的连续供电、备用容量与电能质量管理。",
    ],
  },
  {
    title: ["AI Operating Layer", "AI能源运营层"],
    detail: [
      "Forecast load, dispatch storage, coordinate backup power, and optimize cost in real time.",
      "实时预测负荷、调度储能、协同备电并优化用能成本。",
    ],
  },
  {
    title: ["Global Cooperation Model", "全球合作模式"],
    detail: [
      "Partner with industrial parks, EPC companies, investors, and regional operators.",
      "面向园区、EPC公司、投资方与区域运营商开展合作。",
    ],
  },
];

const companyFacts = [
  ["Platform", "平台定位", "Semiconductor AI Energy", "半导体AI能源"],
  ["Focus", "核心聚焦", "Fabs / Data Centers / Parks", "半导体 / 数据中心 / 园区"],
  ["Capabilities", "核心能力", "Storage + AI + Carbon", "储能 + AI + 碳管理"],
  ["Cooperation", "合作方向", "Projects / Agency / EPC", "项目 / 代理 / EPC"],
];

export default function AboutUs() {
  const { text } = useLanguage();

  return (
    <section id="about" className="border-b border-white/10 bg-[#091612]">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{text("About Everflux", "关于永流")}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              {text(
                "A platform company for semiconductor-grade energy supply",
                "面向半导体级能源供应的平台型企业",
              )}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/62">
              {text(
                "Everflux focuses on AI-enabled energy supply for high-load industries. The platform connects storage power systems, distributed generation, AI dispatching, carbon management, and project cooperation into one operating framework.",
                "Everflux 永流聚焦高载能产业的AI智慧能源供应，将储能发电系统、分布式能源、AI调度、碳管理与项目合作整合为一个可运营的平台体系。",
              )}
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/52">
              {text(
                "The company serves semiconductor fabs, AI data centers, industrial parks, and overseas energy projects where stable power, energy efficiency, and bankable operating data are essential.",
                "永流服务半导体工厂、AI数据中心、工业园区和海外能源项目，重点解决稳定供电、能源效率和项目运营数据可信化问题。",
              )}
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.035] p-5 md:p-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="relative size-16 overflow-hidden border border-[#ff9d1c]/40 bg-black md:size-20">
                <Image
                  src="/brand/everflux-logo.jpg"
                  alt="Everflux logo"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-2xl font-black text-[#ff9d1c]">Everflux</p>
                <p className="mt-1 text-sm text-white/50">永流智慧能源科技（山东）有限公司</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {companyFacts.map(([enLabel, zhLabel, enValue, zhValue]) => (
                <div key={enLabel} className="border border-white/10 bg-black/18 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/38">
                    {text(enLabel, zhLabel)}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-5 text-white">
                    {text(enValue, zhValue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {platformPoints.map((point) => (
            <article key={point.title[0]} className="border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xl font-black text-white">
                {text(point.title[0], point.title[1])}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/55">
                {text(point.detail[0], point.detail[1])}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
