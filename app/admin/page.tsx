"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
};

type ContentItem = {
  id: string;
  title: string;
  type: string;
  url: string;
  description?: string;
  createdAt: string;
};

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [status, setStatus] = useState("");

  async function loadData() {
    const [inquiryRes, contentRes] = await Promise.all([
      fetch("/api/inquiries"),
      fetch("/api/content"),
    ]);
    const inquiryData = await inquiryRes.json();
    const contentData = await contentRes.json();
    setInquiries(inquiryData.inquiries || []);
    setItems(contentData.items || []);
  }

  useEffect(() => {
    async function hydrate() {
      await loadData();
    }

    void hydrate();
  }, []);

  async function uploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Uploading...");
    const form = event.currentTarget;
    const response = await fetch("/api/upload", {
      method: "POST",
      body: new FormData(form),
    });

    setStatus(response.ok ? "Upload saved." : "Upload failed.");
    if (response.ok) {
      form.reset();
      await loadData();
    }
  }

  async function saveLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        type: formData.get("type"),
        url: formData.get("url"),
        description: formData.get("description"),
      }),
    });

    setStatus(response.ok ? "Content saved." : "Content failed.");
    if (response.ok) {
      form.reset();
      await loadData();
    }
  }

  async function deleteContent(id: string) {
    setStatus("Deleting / 正在删除...");
    const response = await fetch(`/api/content?id=${id}`, { method: "DELETE" });
    setStatus(response.ok ? "Deleted / 已删除" : "Delete failed / 删除失败");
    if (response.ok) {
      await loadData();
    }
  }

  return (
    <main className="min-h-screen bg-[#07110f] px-6 py-10 text-white">
      <div className="mx-auto max-w-[1180px]">
        <Link href="/" className="text-sm text-[#ff9d1c]">
          Back to website / 返回网站
        </Link>
        <h1 className="mt-6 text-4xl font-black">Everflux Website Admin / 网站后台</h1>
        <p className="mt-3 max-w-2xl text-white/55">
          Upload images or videos, add external links, and review customer inquiries collected
          from the website. 上传图片/视频、添加链接/新闻/案例，并查看官网收集的客户咨询。
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <form onSubmit={uploadFile} className="grid gap-4 border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-bold">Upload image / video / 上传图片或视频</h2>
            <input
              name="title"
              placeholder="Title / 标题"
              className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none"
            />
            <textarea
              name="description"
              placeholder="Description / 描述"
              className="min-h-24 border border-white/10 bg-black/25 p-4 outline-none"
            />
            <input
              name="file"
              type="file"
              accept="image/*,video/*"
              required
              className="border border-white/10 bg-black/25 p-4"
            />
            <button className="min-h-12 bg-[#ff9d1c] px-6 font-bold text-[#07110f]">
              Upload / 上传
            </button>
          </form>

          <form onSubmit={saveLink} className="grid gap-4 border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-bold">Add link / news / case / 添加链接、新闻、案例</h2>
            <input
              name="title"
              required
              placeholder="Title / 标题"
              className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none"
            />
            <select name="type" className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none">
              <option value="link">Link / 链接</option>
              <option value="video">Video link / 视频链接</option>
              <option value="case">Case / 案例</option>
              <option value="news">News / 新闻</option>
            </select>
            <input
              name="url"
              required
              placeholder="https://..."
              className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none"
            />
            <textarea
              name="description"
              placeholder="Description / 描述"
              className="min-h-24 border border-white/10 bg-black/25 p-4 outline-none"
            />
            <button className="min-h-12 bg-[#ff9d1c] px-6 font-bold text-[#07110f]">
              Save Content / 保存内容
            </button>
          </form>
        </div>

        {status ? <p className="mt-5 text-[#92e6d1]">{status}</p> : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-bold">Customer inquiries / 客户咨询</h2>
            <div className="mt-5 grid gap-4">
              {inquiries.map((item) => (
                <article key={item.id} className="border border-white/10 bg-black/20 p-4">
                  <p className="font-bold">{item.name}</p>
                  <p className="mt-1 text-sm text-white/55">
                    {item.email} {item.phone ? `· ${item.phone}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-white/45">{item.company}</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{item.message}</p>
                </article>
              ))}
              {!inquiries.length ? <p className="text-white/45">No inquiries yet. 暂无咨询。</p> : null}
            </div>
          </section>

          <section className="border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-bold">Content library / 内容库</h2>
            <div className="mt-5 grid gap-4">
              {items.map((item) => (
                <article key={item.id} className="border border-white/10 bg-black/20 p-4">
                  <p className="font-bold">{item.title}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.14em] text-[#92e6d1]">{item.type}</p>
                  <a href={item.url} className="mt-2 block break-all text-sm text-[#ff9d1c]">
                    {item.url}
                  </a>
                  <p className="mt-2 text-sm text-white/55">{item.description}</p>
                  <button
                    type="button"
                    onClick={() => deleteContent(item.id)}
                    className="mt-4 border border-white/10 px-3 py-2 text-xs font-bold text-white/65 transition hover:border-[#ff9d1c] hover:text-[#ff9d1c]"
                  >
                    Delete / 删除
                  </button>
                </article>
              ))}
              {!items.length ? <p className="text-white/45">No content yet. 暂无内容。</p> : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
