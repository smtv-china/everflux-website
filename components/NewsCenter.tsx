"use client";

import { useMemo } from "react";
import { useContentData } from "./ContentDataProvider";
import {
  ContentItem,
  fallbackContentItems,
  formatContentDate,
  isImageMedia,
  isVideoMedia,
  localizeTitle,
  sortByNewest,
  typeLabel,
} from "./contentMedia";
import MediaFrame from "./MediaFrame";
import { useLanguage } from "./LanguageProvider";

const fallbackNews: ContentItem[] = [
  {
    id: "fallback-news-semiconductor-energy",
    title: "Semiconductor Power Reliability Brief / 半导体供电可靠性简报",
    type: "news",
    url: "https://evererpower.com/#contact",
    description:
      "How fabs, AI data centers, and industrial parks can use storage, dispatching, and backup supply to improve uptime.",
    createdAt: "2026-06-08T08:00:00.000Z",
  },
  {
    id: "fallback-news-storage-market",
    title: "Battery Storage Market Intelligence / 储能市场观察",
    type: "news",
    url: "https://evererpower.com/#energy",
    description:
      "Storage capacity, carbon accounting, and AI operations are becoming core infrastructure for high-load industries.",
    createdAt: "2026-05-28T08:00:00.000Z",
  },
  {
    id: "fallback-news-ai-dispatch",
    title: "AI Energy Dispatching Trends / AI能源调度趋势",
    type: "news",
    url: "https://evererpower.com/#tv",
    description:
      "Energy operating centers are shifting from monitoring dashboards to predictive dispatch and automated response.",
    createdAt: "2026-05-16T08:00:00.000Z",
  },
];

function isNewsLike(item: ContentItem) {
  return item.type === "news" || item.type === "link" || item.type === "case";
}

export default function NewsCenter() {
  const { items } = useContentData();
  const { language, text } = useLanguage();

  const news = useMemo(() => {
    const uploadedNews = sortByNewest(items.filter(isNewsLike)).slice(0, 3);
    return uploadedNews.length ? uploadedNews : fallbackNews;
  }, [items]);

  return (
    <section id="news" className="section-shell">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{text("Insights", "洞察与新闻")}</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {text("News & Market Intelligence", "新闻中心与市场资料")}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/52">
          {text(
            "Published news, market references, project cases, and external links from the admin content library.",
            "这里优先展示后台发布的新闻、市场资料、项目案例和外部链接。",
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {news.map((item, index) => {
          const hasEmbeddableMedia = isImageMedia(item) || isVideoMedia(item);
          const visualItem = hasEmbeddableMedia ? item : fallbackContentItems[index % fallbackContentItems.length];

          return (
            <article key={item.id} className="overflow-hidden border border-white/10 bg-white/[0.035]">
              <MediaFrame item={visualItem} language={language} />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em]">
                  <p className="text-[#92e6d1]">{typeLabel(item.type, language)}</p>
                  <time className="text-white/35">{formatContentDate(item.createdAt, language)}</time>
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
                  {localizeTitle(item.title, language)}
                </h3>
                {item.description ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
                    {item.description}
                  </p>
                ) : null}
                <a
                  href={item.url}
                  target={item.url.startsWith("/") ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-bold text-[#ff9d1c] transition hover:text-white"
                >
                  {text("Read source", "查看来源")}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
