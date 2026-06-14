"use client";

import { useMemo } from "react";
import { useContentData } from "./ContentDataProvider";
import { fallbackContentItems, isVideoMedia, localizeTitle, sortByNewest } from "./contentMedia";
import { useLanguage } from "./LanguageProvider";
import MediaFrame from "./MediaFrame";

const schedule = [
  {
    time: "09:00",
    category: { en: "Project Case", zh: "项目案例" },
    title: {
      en: "Micro-hydropower for rural channels",
      zh: "农村渠道微水力发电项目",
    },
    duration: "18:42",
  },
  {
    time: "11:30",
    category: { en: "Storage Lab", zh: "储能实验室" },
    title: {
      en: "Containerized BESS safety briefing",
      zh: "集装箱储能安全简报",
    },
    duration: "12:20",
  },
  {
    time: "14:00",
    category: { en: "AI Dispatch", zh: "AI调度" },
    title: {
      en: "Peak shaving and grid response demo",
      zh: "削峰填谷与电网响应演示",
    },
    duration: "16:08",
  },
  {
    time: "17:30",
    category: { en: "Partner Talk", zh: "合作访谈" },
    title: {
      en: "Industrial park distributed energy model",
      zh: "工业园区分布式能源模型",
    },
    duration: "21:15",
  },
];

const programs = [
  {
    tag: { en: "Micro Hydro", zh: "微水力" },
    title: {
      en: "Small-flow generation for off-grid villages",
      zh: "离网村镇小流量发电方案",
    },
    meta: "18:42",
  },
  {
    tag: { en: "Storage", zh: "储能" },
    title: {
      en: "Utility-scale battery storage delivery checklist",
      zh: "大型储能项目交付清单",
    },
    meta: "12:20",
  },
  {
    tag: { en: "Platform", zh: "平台" },
    title: {
      en: "AI energy operating center walkthrough",
      zh: "AI能源运营中心演示",
    },
    meta: "16:08",
  },
  {
    tag: { en: "Carbon", zh: "碳管理" },
    title: {
      en: "Carbon reduction reporting for project owners",
      zh: "项目业主碳减排报告方法",
    },
    meta: "09:35",
  },
  {
    tag: { en: "Partner", zh: "合作" },
    title: {
      en: "Regional agent onboarding briefing",
      zh: "区域代理合作说明",
    },
    meta: "13:46",
  },
  {
    tag: { en: "Finance", zh: "投资" },
    title: {
      en: "Energy asset investment return model",
      zh: "能源资产投资收益模型",
    },
    meta: "15:28",
  },
];

const topics = [
  { en: "Power Generation", zh: "发电" },
  { en: "Energy Storage", zh: "储能" },
  { en: "AI Dispatching", zh: "AI调度" },
  { en: "Carbon Management", zh: "碳管理" },
  { en: "Project Cases", zh: "项目案例" },
  { en: "Partner Network", zh: "合作网络" },
];

const channels = [
  {
    name: { en: "Project Channel", zh: "项目频道" },
    value: "69",
    label: { en: "Global cases", zh: "全球案例" },
  },
  {
    name: { en: "Technology Channel", zh: "技术频道" },
    value: "1.28 GW",
    label: { en: "Operating model", zh: "运行模型" },
  },
  {
    name: { en: "Investor Channel", zh: "投资频道" },
    value: "99.97%",
    label: { en: "Online rate", zh: "在线率" },
  },
  {
    name: { en: "Carbon Channel", zh: "碳管理频道" },
    value: "286k tCO2",
    label: { en: "Annual reduction", zh: "年减排" },
  },
];

function pick(value: { en: string; zh: string }, language: "en" | "zh") {
  return language === "en" ? value.en : value.zh;
}

export default function EnergyBroadcast() {
  const { language, text } = useLanguage();
  const { items } = useContentData();
  const featuredVideo = useMemo(() => {
    const uploadedVideo = sortByNewest(items.filter(isVideoMedia))[0];
    return uploadedVideo || fallbackContentItems.find((item) => item.id === "fallback-video-micro-hydro") || fallbackContentItems[0];
  }, [items]);
  const today = new Intl.DateTimeFormat(language === "en" ? "en-US" : "zh-CN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return (
    <section id="tv" className="border-y border-white/10 bg-[#081511]">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        <div className="mb-7 flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">{text("Everflux Energy TV", "永流能源视频台")}</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
              {text("Live energy intelligence, project cases, and partner briefings", "能源直播、项目案例与合作简报")}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.08em]">
            <span className="border border-[#ff9d1c]/45 bg-[#ff9d1c] px-3 py-2 text-[#07110f]">
              {text("Live", "直播")}
            </span>
            <span
              className="border border-white/10 bg-white/[0.04] px-3 py-2 text-white/65"
              suppressHydrationWarning
            >
              {today}
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <article className="border border-white/10 bg-black/28">
            <MediaFrame item={featuredVideo} language={language} className="border-b border-white/10 bg-black" />
            <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-end md:p-6">
              <div>
                <div className="mb-3 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
                  <span className="bg-[#92e6d1] px-2.5 py-1 text-[#07110f]">
                    {text("Now Playing", "正在播放")}
                  </span>
                  <span className="border border-white/10 px-2.5 py-1 text-white/48">
                    {text("Micro Hydro", "微水力")}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white md:text-3xl">
                  {localizeTitle(featuredVideo.title, language)}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
                  {featuredVideo.description ||
                    text(
                      "A practical field case for distributed generation, storage integration, and resilient local power supply.",
                      "展示分布式发电、储能接入和本地韧性供电的真实项目场景。",
                    )}
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex justify-center border border-[#ff9d1c]/55 px-5 py-3 text-sm font-bold text-[#ff9d1c] transition hover:bg-[#ff9d1c] hover:text-[#07110f]"
              >
                {text("Discuss Partnership", "洽谈合作")}
              </a>
            </div>
          </article>

          <aside className="border border-white/10 bg-white/[0.035]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h3 className="text-lg font-black text-white">{text("Up Next", "接下来")}</h3>
              <a href="#library" className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff9d1c]">
                {text("Latest", "最新")}
              </a>
            </div>
            <div className="divide-y divide-white/10">
              {schedule.map((item) => (
                <a
                  key={`${item.time}-${item.duration}`}
                  href="#library"
                  className="grid grid-cols-[58px_1fr_auto] gap-3 px-5 py-4 transition hover:bg-white/[0.045]"
                >
                  <span className="text-sm font-black text-[#ff9d1c]">{item.time}</span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#92e6d1]">
                      {pick(item.category, language)}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-5 text-white/82">
                      {pick(item.title, language)}
                    </span>
                  </span>
                  <span className="text-xs text-white/35">{item.duration}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {topics.map((topic) => (
            <a
              href="#library"
              key={topic.en}
              className="shrink-0 border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-white/62 transition hover:border-[#ff9d1c]/60 hover:text-[#ff9d1c]"
            >
              {pick(topic, language)}
            </a>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((channel) => (
              <article key={channel.name.en} className="border border-white/10 bg-[#0c1b17] p-5">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-white/42">
                  {pick(channel.name, language)}
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <strong className="text-3xl font-black text-white">{channel.value}</strong>
                  <span className="text-right text-sm text-white/52">{pick(channel.label, language)}</span>
                </div>
              </article>
            ))}
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-black text-white">{text("Latest Energy Programs", "最新能源节目")}</h3>
              <a href="#video" className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff9d1c]">
                {text("Watch More", "观看更多")}
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {programs.map((program, index) => (
                <a
                  key={program.title.en}
                  href={index === 0 ? "#video" : "#library"}
                  className="group grid grid-cols-[110px_1fr] overflow-hidden border border-white/10 bg-white/[0.03] transition hover:border-[#ff9d1c]/45"
                >
                  <span className="relative min-h-[112px] bg-[linear-gradient(135deg,#12251f,#1b382e_48%,#07110f)]">
                    <span className="absolute left-3 top-3 bg-black/45 px-2 py-1 text-[11px] font-bold text-[#ff9d1c]">
                      {program.meta}
                    </span>
                    <span className="absolute bottom-3 right-3 text-2xl font-black text-white/18">
                      0{index + 1}
                    </span>
                  </span>
                  <span className="p-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#92e6d1]">
                      {pick(program.tag, language)}
                    </span>
                    <span className="mt-2 block text-base font-bold leading-5 text-white/84 transition group-hover:text-white">
                      {pick(program.title, language)}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
