"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  createdAt: string;
};

type ContentType = "all" | "image" | "video" | "link" | "case" | "news";

type ContentItem = {
  id: string;
  title: string;
  type: Exclude<ContentType, "all">;
  url: string;
  description?: string;
  createdAt: string;
};

type ActiveView = "overview" | "content" | "inquiries" | "publish" | "operations";

type AdminSecurityStatus = {
  enabled: boolean;
  authenticated: boolean;
  mode: "protected" | "open-demo";
};

type HealthStatus = {
  ok: boolean;
  service?: string;
  domain?: string;
  time?: string;
};

const typeLabels: Record<Exclude<ContentType, "all">, string> = {
  image: "Image / 图片",
  video: "Video / 视频",
  link: "Link / 链接",
  case: "Case / 案例",
  news: "News / 新闻",
};

const views: Array<{ id: ActiveView; label: string }> = [
  { id: "overview", label: "Overview / 总览" },
  { id: "content", label: "Content / 内容" },
  { id: "inquiries", label: "Leads / 客户" },
  { id: "publish", label: "Publish / 发布" },
  { id: "operations", label: "Ops / 运维" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(url) || url.startsWith("/uploads/");
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
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

function downloadCsv(fileName: string, rows: Array<Record<string, string>>) {
  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] || "").replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ContentType>("all");
  const [selectedId, setSelectedId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [securityStatus, setSecurityStatus] = useState<AdminSecurityStatus | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);

  const loadData = useCallback(async function loadData() {
    setIsLoading(true);
    const [inquiryRes, contentRes] = await Promise.all([
      fetch("/api/inquiries", { cache: "no-store" }),
      fetch("/api/content", { cache: "no-store" }),
    ]);
    const inquiryData = await inquiryRes.json();
    const contentData = await contentRes.json();
    const nextItems = contentData.items || [];
    setInquiries(inquiryData.inquiries || []);
    setItems(nextItems);
    setSelectedId((current) => current || nextItems[0]?.id || "");
    setIsLoading(false);
  }, []);

  const loadSystemStatus = useCallback(async function loadSystemStatus() {
    const [securityRes, healthRes] = await Promise.all([
      fetch("/api/admin/status", { cache: "no-store" }),
      fetch("/api/health", { cache: "no-store" }),
    ]);
    const securityData = await securityRes.json().catch(() => null);
    const healthData = await healthRes.json().catch(() => null);

    if (securityData) {
      setSecurityStatus(securityData);
    }

    if (healthData) {
      setHealthStatus(healthData);
    }
  }, []);

  const refreshAll = useCallback(async function refreshAll() {
    await Promise.all([loadData(), loadSystemStatus()]);
  }, [loadData, loadSystemStatus]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshAll();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [refreshAll]);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || items[0],
    [items, selectedId],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.description || "", item.url, item.type]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [items, query, typeFilter]);

  const stats = useMemo(() => {
    const videoCount = items.filter((item) => item.type === "video").length;
    const caseCount = items.filter((item) => item.type === "case").length;
    const latestInquiry = inquiries[0]?.createdAt ? formatDate(inquiries[0].createdAt) : "None";

    return [
      { label: "Content items / 内容", value: String(items.length), detail: "Published assets" },
      { label: "Video assets / 视频", value: String(videoCount), detail: "Embedded or uploaded" },
      { label: "Project cases / 案例", value: String(caseCount), detail: "Sales enablement" },
      { label: "Customer leads / 客户", value: String(inquiries.length), detail: latestInquiry },
    ];
  }, [items, inquiries]);

  async function uploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Uploading / 正在上传...");
    const form = event.currentTarget;
    const response = await fetch("/api/upload", {
      method: "POST",
      body: new FormData(form),
    });
    const result = await response.json().catch(() => null);

    setStatus(response.ok ? "Upload saved / 上传已保存" : result?.error || "Upload failed / 上传失败");
    if (response.ok) {
      form.reset();
      await loadData();
    }
  }

  async function saveLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving / 正在保存...");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      title: formData.get("title"),
      type: formData.get("type"),
      url: formData.get("url"),
      description: formData.get("description"),
    };
    const response = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null);

    setStatus(response.ok ? "Content saved / 内容已保存" : result?.error || "Content failed / 内容保存失败");
    if (response.ok) {
      form.reset();
      await loadData();
      setActiveView("content");
      setSelectedId(result.item?.id || "");
    }
  }

  async function updateContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Updating / 正在更新...");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        title: formData.get("title"),
        type: formData.get("type"),
        url: formData.get("url"),
        description: formData.get("description"),
      }),
    });
    const result = await response.json().catch(() => null);

    setStatus(response.ok ? "Updated / 已更新" : result?.error || "Update failed / 更新失败");
    if (response.ok) {
      setEditingId("");
      await loadData();
    }
  }

  async function deleteContent(id: string) {
    setStatus("Deleting / 正在删除...");
    const response = await fetch(`/api/content?id=${id}`, { method: "DELETE" });
    setStatus(response.ok ? "Deleted / 已删除" : "Delete failed / 删除失败");
    if (response.ok) {
      setSelectedId("");
      await loadData();
    }
  }

  async function deleteInquiry(id: string) {
    setStatus("Deleting inquiry / 正在删除客户咨询...");
    const response = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
    setStatus(response.ok ? "Inquiry deleted / 客户咨询已删除" : "Delete failed / 删除失败");
    if (response.ok) {
      await loadData();
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function exportContent() {
    downloadCsv(
      "everflux-content.csv",
      items.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        url: item.url,
        description: item.description || "",
        createdAt: item.createdAt,
      })),
    );
  }

  function exportInquiries() {
    downloadCsv(
      "everflux-inquiries.csv",
      inquiries.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone || "",
        company: item.company || "",
        message: item.message,
        source: item.source || "",
        createdAt: item.createdAt,
      })),
    );
  }

  const editingItem = items.find((item) => item.id === editingId);

  return (
    <main className="min-h-screen bg-[#07110f] text-white">
      <div className="border-b border-white/10 bg-[#050b0a]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff9d1c]">
              Back to website / 返回网站
            </Link>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">Everflux Admin Console / 网站管理后台</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              Manage media, cases, links, videos, and customer inquiries from one operational
              workspace. 管理媒体、案例、链接、视频和客户咨询。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button
              type="button"
              onClick={() => void refreshAll()}
              className="border border-white/10 px-4 py-2 font-bold text-white/70 transition hover:border-[#92e6d1] hover:text-[#92e6d1]"
            >
              Refresh / 刷新
            </button>
            {securityStatus?.enabled ? (
              <button
                type="button"
                onClick={() => void logout()}
                className="border border-white/10 px-4 py-2 font-bold text-white/70 transition hover:border-[#ff9d1c] hover:text-[#ff9d1c]"
              >
                Logout / 退出
              </button>
            ) : null}
            <Link
              href="/#library"
              className="border border-[#ff9d1c]/40 px-4 py-2 font-bold text-[#ff9d1c] transition hover:bg-[#ff9d1c] hover:text-[#07110f]"
            >
              View Media / 查看前台
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit border border-white/10 bg-white/[0.035] p-3">
          <nav className="grid gap-1">
            {views.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`px-4 py-3 text-left text-sm font-bold transition ${
                  activeView === item.id
                    ? "bg-[#ff9d1c] text-[#07110f]"
                    : "text-white/62 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/52">
            <p className="font-bold text-[#92e6d1]">Security / 安全状态</p>
            <p className="mt-2">
              {securityStatus?.enabled
                ? "Protected mode is active. 后台登录保护已启用。"
                : "Open demo mode. Set ADMIN_PASSWORD before promotion. 当前为开放演示模式，推广前请设置 ADMIN_PASSWORD。"}
            </p>
          </div>
          <div className="mt-3 border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/52">
            <p className="font-bold text-[#92e6d1]">Health / 健康检查</p>
            <p className="mt-2">
              {healthStatus?.ok ? "Online / 正常在线" : "Checking / 检查中"}
            </p>
            <p className="break-all text-white/35">{healthStatus?.time || ""}</p>
          </div>
          <div className="mt-3 border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/52">
            <p className="font-bold text-[#92e6d1]">Production note</p>
            <p className="mt-2">
              Netlify live upload storage is temporary. Use Alibaba Cloud OSS before promotion.
              正式推广前请接阿里云 OSS。
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          {status ? (
            <div className="mb-5 border border-[#92e6d1]/30 bg-[#92e6d1]/10 px-4 py-3 text-sm font-semibold text-[#92e6d1]">
              {status}
            </div>
          ) : null}

          {activeView === "overview" ? (
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-4">
                {stats.map((item) => (
                  <article key={item.label} className="border border-white/10 bg-white/[0.035] p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/42">{item.label}</p>
                    <p className="mt-4 text-4xl font-black text-[#ff9d1c]">{item.value}</p>
                    <p className="mt-2 text-sm text-white/52">{item.detail}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <section className="border border-white/10 bg-white/[0.035] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black">Recent content / 最新内容</h2>
                    <button
                      type="button"
                      onClick={() => setActiveView("content")}
                      className="text-sm font-bold text-[#ff9d1c]"
                    >
                      Manage
                    </button>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {items.slice(0, 5).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedId(item.id);
                          setActiveView("content");
                        }}
                        className="flex items-center justify-between gap-4 border border-white/10 bg-black/20 p-4 text-left transition hover:border-[#ff9d1c]/60"
                      >
                        <span>
                          <span className="block font-bold">{item.title}</span>
                          <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-[#92e6d1]">
                            {item.type}
                          </span>
                        </span>
                        <span className="text-xs text-white/38">{formatDate(item.createdAt)}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="border border-white/10 bg-white/[0.035] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-black">Recent leads / 最新客户</h2>
                    <button
                      type="button"
                      onClick={() => setActiveView("inquiries")}
                      className="text-sm font-bold text-[#ff9d1c]"
                    >
                      Review
                    </button>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {inquiries.slice(0, 4).map((item) => (
                      <article key={item.id} className="border border-white/10 bg-black/20 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="mt-1 text-sm text-white/55">{item.company || item.email}</p>
                          </div>
                          <time className="text-xs text-white/35">{formatDate(item.createdAt)}</time>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/58">{item.message}</p>
                      </article>
                    ))}
                    {!inquiries.length ? <p className="text-sm text-white/45">No inquiries yet. 暂无咨询。</p> : null}
                  </div>
                </section>
              </div>
            </div>
          ) : null}

          {activeView === "content" ? (
            <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
              <section className="border border-white/10 bg-white/[0.035] p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-black">Content library / 内容库</h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={exportContent}
                      disabled={!items.length}
                      className="border border-white/10 px-3 py-2 text-xs font-bold text-white/65 transition hover:border-[#92e6d1] hover:text-[#92e6d1] disabled:opacity-40"
                    >
                      Export CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView("publish")}
                      className="bg-[#ff9d1c] px-3 py-2 text-xs font-bold text-[#07110f]"
                    >
                      New content / 新增
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search title, URL, description / 搜索标题、链接、描述"
                    className="min-h-11 border border-white/10 bg-black/25 px-4 text-sm outline-none placeholder:text-white/28 focus:border-[#92e6d1]"
                  />
                  <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value as ContentType)}
                    className="min-h-11 border border-white/10 bg-black/25 px-4 text-sm outline-none focus:border-[#92e6d1]"
                  >
                    <option value="all">All / 全部</option>
                    {Object.entries(typeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 overflow-hidden border border-white/10">
                  <div className="grid grid-cols-[1fr_100px_140px] bg-white/[0.055] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/45">
                    <span>Title</span>
                    <span>Type</span>
                    <span>Updated</span>
                  </div>
                  <div className="divide-y divide-white/10">
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`grid w-full grid-cols-[1fr_100px_140px] items-center gap-3 px-4 py-4 text-left text-sm transition ${
                          selectedItem?.id === item.id
                            ? "bg-[#ff9d1c]/10"
                            : "bg-black/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-bold text-white">{item.title}</span>
                          <span className="mt-1 block truncate text-xs text-white/42">{item.url}</span>
                        </span>
                        <span className="text-xs uppercase tracking-[0.14em] text-[#92e6d1]">{item.type}</span>
                        <span className="text-xs text-white/38">{formatDate(item.createdAt)}</span>
                      </button>
                    ))}
                    {!filteredItems.length ? (
                      <p className="px-4 py-8 text-sm text-white/45">No matching content. 没有匹配内容。</p>
                    ) : null}
                  </div>
                </div>
              </section>

              <aside className="border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-xl font-black">Preview / 预览</h3>
                {selectedItem ? (
                  <div className="mt-5">
                    <MediaPreview item={selectedItem} />
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#92e6d1]">{selectedItem.type}</p>
                      <h4 className="mt-2 text-2xl font-bold">{selectedItem.title}</h4>
                      <a
                        href={selectedItem.url}
                        target={selectedItem.url.startsWith("/") ? "_self" : "_blank"}
                        rel="noreferrer"
                        className="mt-3 block break-all text-sm text-[#ff9d1c]"
                      >
                        {selectedItem.url}
                      </a>
                      <p className="mt-3 text-sm leading-6 text-white/55">{selectedItem.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(selectedItem.id)}
                          className="border border-white/10 px-3 py-2 text-xs font-bold text-white/65 transition hover:border-[#92e6d1] hover:text-[#92e6d1]"
                        >
                          Edit / 编辑
                        </button>
                        <button
                          type="button"
                          onClick={() => void navigator.clipboard.writeText(selectedItem.url)}
                          className="border border-white/10 px-3 py-2 text-xs font-bold text-white/65 transition hover:border-[#92e6d1] hover:text-[#92e6d1]"
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteContent(selectedItem.id)}
                          className="border border-red-400/30 px-3 py-2 text-xs font-bold text-red-200 transition hover:border-red-300"
                        >
                          Delete / 删除
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-white/45">Select a content item. 请选择内容。</p>
                )}
              </aside>
            </div>
          ) : null}

          {activeView === "inquiries" ? (
            <section className="border border-white/10 bg-white/[0.035] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black">Customer inquiries / 客户咨询</h2>
                  <p className="mt-2 text-sm text-white/50">Respond quickly and export leads for follow-up.</p>
                </div>
                <button
                  type="button"
                  onClick={exportInquiries}
                  disabled={!inquiries.length}
                  className="border border-white/10 px-4 py-2 text-sm font-bold text-white/65 transition hover:border-[#92e6d1] hover:text-[#92e6d1] disabled:opacity-40"
                >
                  Export leads CSV / 导出客户
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                {inquiries.map((item) => (
                  <article key={item.id} className="border border-white/10 bg-black/20 p-5">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <span className="border border-white/10 px-2 py-1 text-xs uppercase tracking-[0.14em] text-[#92e6d1]">
                            {item.source || "website"}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-white/55">
                          {item.company || "No company"} · {formatDate(item.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`mailto:${item.email}`}
                          className="border border-[#ff9d1c]/40 px-3 py-2 text-xs font-bold text-[#ff9d1c]"
                        >
                          Email
                        </a>
                        <button
                          type="button"
                          onClick={() => void navigator.clipboard.writeText(item.email)}
                          className="border border-white/10 px-3 py-2 text-xs font-bold text-white/65"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteInquiry(item.id)}
                          className="border border-red-400/30 px-3 py-2 text-xs font-bold text-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-white/62 md:grid-cols-3">
                      <p>Email: {item.email}</p>
                      <p>Phone: {item.phone || "-"}</p>
                      <p>Company: {item.company || "-"}</p>
                    </div>
                    <p className="mt-4 border-l border-[#ff9d1c]/40 pl-4 text-sm leading-7 text-white/72">
                      {item.message}
                    </p>
                  </article>
                ))}
                {!inquiries.length ? <p className="text-sm text-white/45">No inquiries yet. 暂无咨询。</p> : null}
              </div>
            </section>
          ) : null}

          {activeView === "publish" ? (
            <div className="grid gap-6 xl:grid-cols-2">
              <form onSubmit={uploadFile} className="grid gap-4 border border-white/10 bg-white/[0.035] p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#92e6d1]">Upload</p>
                  <h2 className="mt-2 text-2xl font-black">Upload image / video / 上传图片或视频</h2>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Local testing works now. Production should use Alibaba Cloud OSS for persistent storage.
                  </p>
                </div>
                <input
                  name="title"
                  placeholder="Title / 标题"
                  className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
                />
                <textarea
                  name="description"
                  placeholder="Description / 描述"
                  className="min-h-28 border border-white/10 bg-black/25 p-4 outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
                />
                <input
                  name="file"
                  type="file"
                  accept="image/*,video/*"
                  required
                  className="border border-white/10 bg-black/25 p-4 text-sm"
                />
                <button className="min-h-12 bg-[#ff9d1c] px-6 font-bold text-[#07110f]">
                  Upload / 上传
                </button>
              </form>

              <form onSubmit={saveLink} className="grid gap-4 border border-white/10 bg-white/[0.035] p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#92e6d1]">Publish</p>
                  <h2 className="mt-2 text-2xl font-black">Add link / video / case / 添加内容</h2>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    YouTube links will embed automatically on the front-end media library.
                  </p>
                </div>
                <input
                  name="title"
                  required
                  placeholder="Title / 标题"
                  className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
                />
                <select name="type" className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none focus:border-[#92e6d1]">
                  {Object.entries(typeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  name="url"
                  required
                  placeholder="https://..."
                  className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
                />
                <textarea
                  name="description"
                  placeholder="Description / 描述"
                  className="min-h-28 border border-white/10 bg-black/25 p-4 outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
                />
                <button className="min-h-12 bg-[#ff9d1c] px-6 font-bold text-[#07110f]">
                  Save Content / 保存内容
                </button>
              </form>
            </div>
          ) : null}

          {activeView === "operations" ? (
            <section className="grid gap-6">
              <div className="border border-white/10 bg-white/[0.035] p-6">
                <h2 className="text-2xl font-black">Operations checklist / 运维清单</h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {[
                    "Add admin authentication before promotion / 推广前添加后台登录",
                    "Move uploads to Alibaba Cloud OSS / 上传接入阿里云 OSS",
                    "Back up GitHub, Netlify, and Alibaba Cloud recovery codes / 备份恢复码",
                    "Submit sitemap to Google, Bing, and Baidu / 提交站点地图",
                    "Replace demo partner logos with approved assets / 替换授权合作伙伴素材",
                    "Publish real project cases monthly / 每月发布真实案例",
                  ].map((item) => (
                    <div key={item} className="border border-white/10 bg-black/20 p-4 text-sm text-white/62">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="border border-white/10 bg-white/[0.035] p-6">
                  <h3 className="text-xl font-black">System links / 系统链接</h3>
                  <div className="mt-5 grid gap-3 text-sm">
                    {[
                      ["Website", "https://evererpower.com"],
                      ["Admin", "https://evererpower.com/admin"],
                      ["Health", "https://evererpower.com/api/health"],
                      ["Sitemap", "https://evererpower.com/sitemap.xml"],
                      ["Robots", "https://evererpower.com/robots.txt"],
                    ].map(([label, url]) => (
                      <a key={url} href={url} target="_blank" rel="noreferrer" className="break-all text-[#ff9d1c]">
                        {label}: {url}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 bg-white/[0.035] p-6">
                  <h3 className="text-xl font-black">Current environment / 当前环境</h3>
                  <div className="mt-5 grid gap-3 text-sm text-white/62">
                    <p>Frontend: Next.js 16 / React 19</p>
                    <p>Deployment: Netlify</p>
                    <p>Domain: Alibaba Cloud DNS</p>
                    <p>Storage: JSON demo data plus temporary runtime data</p>
                    <p>
                      Admin auth:{" "}
                      {securityStatus?.enabled
                        ? "Protected with ADMIN_PASSWORD"
                        : "Open demo mode, set ADMIN_PASSWORD"}
                    </p>
                    <p>
                      Health: {healthStatus?.ok ? "OK" : "Unknown"} {healthStatus?.time || ""}
                    </p>
                    <p>Recommended next step: Alibaba Cloud OSS + set Netlify env variables</p>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {editingItem ? (
            <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
              <form onSubmit={updateContent} className="w-full max-w-2xl border border-white/10 bg-[#07110f] p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-black">Edit content / 编辑内容</h2>
                  <button type="button" onClick={() => setEditingId("")} className="text-sm font-bold text-white/55">
                    Close
                  </button>
                </div>
                <div className="mt-5 grid gap-4">
                  <input
                    name="title"
                    required
                    defaultValue={editingItem.title}
                    className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none focus:border-[#92e6d1]"
                  />
                  <select
                    name="type"
                    defaultValue={editingItem.type}
                    className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none focus:border-[#92e6d1]"
                  >
                    {Object.entries(typeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="url"
                    required
                    defaultValue={editingItem.url}
                    className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none focus:border-[#92e6d1]"
                  />
                  <textarea
                    name="description"
                    defaultValue={editingItem.description}
                    className="min-h-32 border border-white/10 bg-black/25 p-4 outline-none focus:border-[#92e6d1]"
                  />
                  <button className="min-h-12 bg-[#ff9d1c] px-6 font-bold text-[#07110f]">
                    Save changes / 保存修改
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {isLoading ? <p className="mt-6 text-sm text-white/45">Loading / 正在加载...</p> : null}
        </section>
      </div>
    </main>
  );
}

function MediaPreview({ item }: { item: ContentItem }) {
  const youtubeId = getYouTubeId(item.url);

  if (youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
        title={item.title}
        className="aspect-video w-full border border-white/10"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  if (isVideoUrl(item.url)) {
    return <video src={item.url} controls className="aspect-video w-full bg-black object-cover" />;
  }

  if (item.type === "image" || isImageUrl(item.url)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.url} alt={item.title} className="aspect-video w-full border border-white/10 object-cover" />
    );
  }

  return (
    <div className="grid aspect-video place-items-center border border-white/10 bg-black/25 px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ff9d1c]">
        {typeLabels[item.type]}
      </p>
    </div>
  );
}
