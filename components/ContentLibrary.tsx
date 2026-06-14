"use client";

import { useMemo } from "react";
import { useContentData } from "./ContentDataProvider";
import { useLanguage } from "./LanguageProvider";
import MediaFrame from "./MediaFrame";
import {
  fallbackContentItems,
  formatContentDate,
  isLocalMedia,
  localizeTitle,
  typeLabel,
} from "./contentMedia";

export default function ContentLibrary() {
  const { items, isLoading } = useContentData();
  const { language, text } = useLanguage();

  const visibleItems = useMemo(
    () => (items.length ? items : fallbackContentItems).slice(0, 6),
    [items],
  );

  if (!visibleItems.length && !isLoading) {
    return null;
  }

  return (
    <section id="library" className="section-shell">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{text("Media Library", "媒体与案例库")}</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {text("Uploaded Content", "后台上传内容")}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/52">
          {text(
            "Images, videos, project cases, and external links published from the website admin.",
            "这里展示后台上传的图片、视频、项目案例和外部链接。",
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {visibleItems.map((item) => (
          <article key={item.id} className="overflow-hidden border border-white/10 bg-white/[0.035]">
            <MediaFrame item={item} language={language} />
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em]">
                <span className="text-[#92e6d1]">{typeLabel(item.type, language)}</span>
                <span className="text-white/35">{formatContentDate(item.createdAt, language)}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {localizeTitle(item.title, language)}
              </h3>
              {item.description ? (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
                  {item.description}
                </p>
              ) : null}
              <a
                href={item.url}
                target={isLocalMedia(item.url) ? "_self" : "_blank"}
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-bold text-[#ff9d1c] transition hover:text-white"
              >
                {text("Open source link", "打开原始链接")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
