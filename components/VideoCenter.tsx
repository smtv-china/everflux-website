"use client";

import { useMemo } from "react";
import { useContentData } from "./ContentDataProvider";
import {
  ContentItem,
  fallbackContentItems,
  formatContentDate,
  isVideoMedia,
  localizeTitle,
  sortByNewest,
} from "./contentMedia";
import MediaFrame from "./MediaFrame";
import { useLanguage } from "./LanguageProvider";

const fallbackVideos: ContentItem[] = fallbackContentItems.filter((item) => isVideoMedia(item));

export default function VideoCenter() {
  const { items } = useContentData();
  const { language, text } = useLanguage();

  const videos = useMemo(() => {
    const uploadedVideos = sortByNewest(items.filter(isVideoMedia)).slice(0, 3);
    return uploadedVideos.length ? uploadedVideos : fallbackVideos.slice(0, 3);
  }, [items]);

  return (
    <section id="video" className="section-shell">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">{text("Video Center", "视频中心")}</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
          {text("Project Video & Platform Demonstrations", "项目视频与平台演示")}
        </h2>
        <p className="mt-4 leading-7 text-white/58">
          {text(
            "Uploaded project videos, YouTube links, operating assets, AI dispatching demonstrations, and customer case stories.",
            "这里展示后台上传的视频、YouTube链接、项目运行画面、AI调度演示和客户案例。",
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((item, index) => (
          <article key={item.id} className="overflow-hidden border border-white/10 bg-white/[0.035]">
            <MediaFrame item={item} language={language} />
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em]">
                <span className="text-[#92e6d1]">
                  {text(index === 0 ? "Featured" : "Video", index === 0 ? "重点视频" : "视频")}
                </span>
                <time className="text-white/35">{formatContentDate(item.createdAt, language)}</time>
              </div>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                {localizeTitle(item.title, language)}
              </h3>
              {item.description ? (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/52">
                  {item.description}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
