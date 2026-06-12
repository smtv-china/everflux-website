"use client";

import { useLanguage } from "./LanguageProvider";

const models = [
  {
    title: "Regional Agency",
    cn: "区域代理",
    desc: "Build local sales, service, and project development channels with EVERFLUX platform support.",
    descCn: "借助 Everflux 平台支持，建设本地销售、服务和项目开发渠道。",
  },
  {
    title: "Project Investment",
    cn: "项目投资",
    desc: "Co-invest in distributed generation, storage, and industrial energy infrastructure assets.",
    descCn: "共同投资分布式发电、储能和工业能源基础设施资产。",
  },
  {
    title: "EPC Partnership",
    cn: "EPC合作",
    desc: "Deliver renewable, storage, and microgrid projects through integrated design and execution.",
    descCn: "通过设计、建设和交付协同完成新能源、储能和微电网项目。",
  },
  {
    title: "Technology Licensing",
    cn: "技术授权",
    desc: "Deploy AI dispatching, carbon accounting, and energy management modules under license.",
    descCn: "授权部署 AI 调度、碳核算和能源管理模块。",
  },
  {
    title: "Equipment Procurement",
    cn: "设备采购",
    desc: "Source generators, storage systems, controllers, and power electronics through vetted supply chains.",
    descCn: "通过合格供应链采购发电机、储能系统、控制器和电力电子设备。",
  },
];

export default function Investment() {
  const { text } = useLanguage();

  return (
    <section id="investment" className="border-y border-white/10 bg-[#0b1714]">
      <div className="section-shell">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="eyebrow">{text("Partnership", "招商合作")}</p>
            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
              {text("Business Cooperation", "招商合作")}
            </h2>
          </div>
          <p className="leading-7 text-white/58">
            {text(
              "For investors, EPC companies, industrial parks, and regional operators seeking bankable distributed energy opportunities.",
              "面向投资方、EPC 企业、工业园区和区域运营商，提供可落地的分布式能源合作机会。",
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {models.map((model, index) => (
            <article
              key={model.title}
              className="border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#ff9d1c]/60 hover:bg-white/[0.06]"
            >
              <p className="text-sm font-bold text-[#ff9d1c]">0{index + 1}</p>
              <h3 className="mt-5 text-xl font-bold text-white">{text(model.title, model.cn)}</h3>
              <p className="mt-1 text-sm text-[#92e6d1]">{text(model.cn, model.title)}</p>
              <p className="mt-5 text-sm leading-6 text-white/55">{text(model.desc, model.descCn)}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border border-[#ff9d1c]/30 bg-[#ff9d1c]/10 p-6 md:flex-row md:items-center">
          <div>
            <p className="font-bold text-white">
              {text("Ready to evaluate a project?", "准备评估一个项目？")}
            </p>
            <p className="mt-1 text-sm text-white/58">
              {text(
                "Send your region, load profile, or project stage. EVERFLUX will respond with a cooperation path.",
                "发送所在区域、负荷情况或项目阶段，Everflux 将给出合作路径建议。",
              )}
            </p>
          </div>
          <a
            href="#contact"
            className="bg-[#ff9d1c] px-6 py-3 text-center text-sm font-bold text-[#07110f] transition hover:bg-white"
          >
            {text("Contact Partnership Team", "联系合作团队")}
          </a>
        </div>
      </div>
    </section>
  );
}
