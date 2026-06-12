"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const resources = [
  ["Company Profile PPT", "公司介绍PPT"],
  ["Product Brochure PDF", "产品手册PDF"],
  ["Project Casebook", "项目案例集"],
  ["Investment Brief", "投资说明书"],
];

export default function DownloadCenter() {
  const [email, setEmail] = useState("");
  const { text } = useLanguage();

  const submit = () => {

    if (!email) {
      alert(text("Please enter your email.", "请输入邮箱"));
      return;
    }

    alert(text(`Download link has been sent to ${email}`, `下载链接已发送到 ${email}`));
  };

  return (
    <section id="download" className="section-shell">
      <div className="grid gap-8 border border-white/10 bg-white/[0.035] p-6 md:grid-cols-[0.95fr_1.05fr] md:p-10">
        <div>
          <p className="eyebrow">{text("Resource Center", "资料中心")}</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {text("Download Center", "下载中心")}
          </h2>
          <p className="mt-5 leading-7 text-white/58">
            {text(
              "Request the company profile, platform architecture overview, and partnership deck.",
              "获取公司介绍、平台架构说明、项目案例和合作资料。",
            )}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {resources.map(([en, zh]) => (
              <div key={en} className="border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                {text(en, zh)}
              </div>
            ))}
          </div>
        </div>

        <div className="self-end">
          <label htmlFor="download-email" className="text-sm font-semibold text-white/70">
            {text("Business email", "商务邮箱")}
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="download-email"
              type="email"
              placeholder={text("name@company.com", "请输入邮箱")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-12 flex-1 border border-white/10 bg-black/25 px-4 text-white outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
            />

            <button
              onClick={submit}
              className="min-h-12 bg-[#ff9d1c] px-6 text-sm font-bold text-[#07110f] transition hover:bg-white"
            >
              {text("Get download link", "获取下载链接")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
