export type ContentItem = {
  id: string;
  title: string;
  type: "image" | "video" | "link" | "case" | "news";
  url: string;
  description?: string;
  createdAt: string;
};

export const fallbackContentItems: ContentItem[] = [
  {
    id: "fallback-video-micro-hydro",
    title: "Rural Micro-hydropower Project / 农村微水力发电项目",
    type: "video",
    url: "https://www.youtube.com/watch?v=L_wcLjoJMPc",
    description:
      "Field video reference for distributed generation, local power supply, and rural energy infrastructure.",
    createdAt: "2026-06-12T15:52:00.000Z",
  },
  {
    id: "fallback-video-ai-dispatch",
    title: "AI Energy Dispatch Demo / AI能源调度演示",
    type: "video",
    url: "/uploads/demo-ai-dispatch.mp4",
    description:
      "Demo video for AI dispatching, energy scheduling, and media library playback behavior.",
    createdAt: "2026-06-12T15:30:00.000Z",
  },
  {
    id: "fallback-case-bess-site",
    title: "Grid Battery Storage Site / 电网级储能电站",
    type: "case",
    url: "/uploads/demo-bess-site.jpg",
    description:
      "Utility-scale battery storage reference for project evidence and visual case presentation.",
    createdAt: "2026-06-12T15:29:00.000Z",
  },
  {
    id: "fallback-image-solar-rooftop",
    title: "Solar Rooftop Generation / 屋顶光伏发电",
    type: "image",
    url: "/uploads/demo-solar-rooftop.jpg",
    description:
      "Distributed rooftop generation asset used to demonstrate renewable energy project content.",
    createdAt: "2026-06-12T15:28:00.000Z",
  },
  {
    id: "fallback-image-storage-racks",
    title: "Battery Rack Interior / 储能电池柜内部",
    type: "image",
    url: "/uploads/demo-storage-racks.jpg",
    description:
      "Technical image reference for storage equipment, project documentation, and solution pages.",
    createdAt: "2026-06-12T15:27:00.000Z",
  },
  {
    id: "fallback-news-bess-reference",
    title: "Battery Energy Storage System Reference / 储能系统资料",
    type: "news",
    url: "https://en.wikipedia.org/wiki/Battery_energy_storage_system",
    description:
      "Reference link for battery energy storage terminology and market background.",
    createdAt: "2026-06-12T15:25:00.000Z",
  },
];

export function sortByNewest(items: ContentItem[]) {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function localizeTitle(title: string, language: "en" | "zh") {
  const parts = title.split(" / ");

  if (parts.length < 2) {
    return title;
  }

  return language === "zh" ? parts.slice(1).join(" / ") : parts[0];
}

export function typeLabel(type: ContentItem["type"], language: "en" | "zh") {
  const labels: Record<ContentItem["type"], { en: string; zh: string }> = {
    image: { en: "Image", zh: "图片" },
    video: { en: "Video", zh: "视频" },
    link: { en: "Link", zh: "链接" },
    case: { en: "Case", zh: "案例" },
    news: { en: "News", zh: "新闻" },
  };

  return labels[type][language];
}

export function formatContentDate(value: string, language: "en" | "zh") {
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export function isLocalMedia(url: string) {
  return url.startsWith("/uploads/");
}

export function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/").filter(Boolean)[1] || null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/").filter(Boolean)[1] || null;
      }

      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

export function isVideoMedia(item: ContentItem) {
  return item.type === "video" || /\.(mp4|webm|mov)(\?.*)?$/i.test(item.url) || Boolean(getYouTubeId(item.url));
}

export function isImageMedia(item: ContentItem) {
  return item.type === "image" || /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(item.url);
}
