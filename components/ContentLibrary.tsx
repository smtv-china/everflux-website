"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type ContentItem = {
  id: string;
  title: string;
  type: "image" | "video" | "link" | "case" | "news";
  url: string;
  description?: string;
  createdAt: string;
};

function isLocalMedia(url: string) {
  return url.startsWith("/uploads/");
}

function isVideo(item: ContentItem) {
  return item.type === "video" || /\.(mp4|webm|mov)(\?.*)?$/i.test(item.url);
}

function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

function isImage(item: ContentItem) {
  return item.type === "image" || /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(item.url);
}

export default function ContentLibrary() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const { text } = useLanguage();

  useEffect(() => {
    async function loadItems() {
      const response = await fetch("/api/content", { cache: "no-store" });
      const data = await response.json();
      setItems(data.items || []);
    }

    void loadItems();
  }, []);

  const visibleItems = useMemo(() => items.slice(0, 6), [items]);

  if (!visibleItems.length) {
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
        {visibleItems.map((item) => {
          const youtubeId = getYouTubeId(item.url);

          return (
            <article key={item.id} className="overflow-hidden border border-white/10 bg-white/[0.035]">
              <div className="relative aspect-video bg-[linear-gradient(135deg,#10231e,#20362f_46%,#0b1517)]">
                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                    title={item.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : isVideo(item) ? (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    controls
                  />
                ) : isImage(item) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center px-8 text-center">
                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#ff9d1c]">
                      {item.type}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em]">
                  <span className="text-[#92e6d1]">{item.type}</span>
                  <span className="text-white/35">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
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
          );
        })}
      </div>
    </section>
  );
}
