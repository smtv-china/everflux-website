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

function isEvidenceItem(item: ContentItem) {
  return item.type === "case" || item.type === "image" || item.type === "video";
}

export default function ProjectEvidence() {
  const { items, isLoading } = useContentData();
  const { language, text } = useLanguage();

  const evidenceItems = useMemo(() => {
    const source = items.length ? items : fallbackContentItems;
    const filtered = source.filter(isEvidenceItem);
    return sortByNewest(filtered.length ? filtered : fallbackContentItems).slice(0, 5);
  }, [items]);

  const featured = evidenceItems[0];
  const supportingItems = evidenceItems.slice(1, 5);
  const realAssetCount = items.filter((item) => isImageMedia(item) || isVideoMedia(item)).length;
  const realCaseCount = items.filter((item) => item.type === "case").length;

  if (!featured) {
    return null;
  }

  return (
    <section id="cases" className="border-b border-white/10 bg-[#091612]">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="eyebrow">{text("Project Evidence", "项目实证中心")}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-5xl">
              {text("Real assets first, uploaded content drives the page", "真实资料优先，后台内容驱动前台展示")}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/58 lg:justify-self-end">
            {text(
              "Upload project photos, operation videos, case links, and news references in the admin console. The website will surface them here as proof of capability instead of static placeholders.",
              "在后台上传项目图片、运行视频、案例链接和新闻资料后，网站会优先在这里呈现真实内容，用资料证明能力，而不是只展示占位图。",
            )}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.16fr_0.84fr]">
          <article className="overflow-hidden border border-white/10 bg-white/[0.035]">
            <MediaFrame item={featured} language={language} />
            <div className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.14em]">
                  <span className="bg-[#92e6d1] px-2.5 py-1 text-[#07110f]">
                    {typeLabel(featured.type, language)}
                  </span>
                  <time className="text-white/38">
                    {formatContentDate(featured.createdAt, language)}
                  </time>
                  {!items.length || isLoading ? (
                    <span className="border border-white/10 px-2.5 py-1 text-white/42">
                      {text("Demo structure", "演示结构")}
                    </span>
                  ) : (
                    <span className="border border-[#ff9d1c]/35 px-2.5 py-1 text-[#ff9d1c]">
                      {text("Admin content", "后台内容")}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-2xl font-black leading-tight text-white md:text-3xl">
                  {localizeTitle(featured.title, language)}
                </h3>
                {featured.description ? (
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56">
                    {featured.description}
                  </p>
                ) : null}
              </div>
              <a
                href={featured.url}
                target={featured.url.startsWith("/") ? "_self" : "_blank"}
                rel="noreferrer"
                className="inline-flex justify-center border border-[#ff9d1c]/55 px-5 py-3 text-sm font-bold text-[#ff9d1c] transition hover:bg-[#ff9d1c] hover:text-[#07110f]"
              >
                {text("Open Evidence", "查看资料")}
              </a>
            </div>
          </article>

          <aside className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/38">
                  {text("Media assets", "媒体资料")}
                </p>
                <p className="mt-3 text-3xl font-black text-white">
                  {items.length ? realAssetCount : "Ready"}
                </p>
              </div>
              <div className="border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/38">
                  {text("Project cases", "项目案例")}
                </p>
                <p className="mt-3 text-3xl font-black text-white">
                  {items.length ? realCaseCount : "Upload"}
                </p>
              </div>
              <div className="border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/38">
                  {text("Content source", "内容来源")}
                </p>
                <p className="mt-3 text-2xl font-black text-[#ff9d1c]">
                  {items.length ? text("Admin", "后台") : text("Demo", "演示")}
                </p>
              </div>
            </div>

            <div className="divide-y divide-white/10 border border-white/10 bg-white/[0.035]">
              {supportingItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.url.startsWith("/") ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="grid grid-cols-[74px_1fr] gap-4 p-4 transition hover:bg-white/[0.045]"
                >
                  <MediaFrame item={item} language={language} className="aspect-square" />
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#92e6d1]">
                      {typeLabel(item.type, language)}
                    </span>
                    <span className="mt-2 line-clamp-2 block text-sm font-bold leading-5 text-white">
                      {localizeTitle(item.title, language)}
                    </span>
                    <span className="mt-2 block text-xs text-white/35">
                      {formatContentDate(item.createdAt, language)}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
