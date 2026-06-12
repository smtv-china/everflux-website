
"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const navItems = [
  { label: "Home", cn: "首页", href: "#home" },
  { label: "Data", cn: "能源数据", href: "#energy" },
  { label: "Network", cn: "全球布局", href: "#global" },
  { label: "Team", cn: "技术团队", href: "#team" },
  { label: "News", cn: "新闻中心", href: "#news" },
  { label: "Contact", cn: "联系我们", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, text } = useLanguage();

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto max-w-[1228px] px-4 pt-4">
        <div className="border border-white/10 bg-[#07110f]/82 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-6">
          <div className="flex items-center justify-between gap-4">
            <a href="#home" className="flex items-center gap-3" aria-label="EVERFLUX home">
              <span className="relative size-11 overflow-hidden border border-[#f59d22]/50 bg-black">
                <Image
                  src="/brand/everflux-logo.jpg"
                  alt="Everflux logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </span>
              <span>
                <span className="block text-base font-bold text-[#ff9d1c]">Everflux</span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {text("Storage Power Systems", "永流储能发电机")}
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-5 text-sm text-white/70 lg:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-[#ff9d1c]">
                  {text(item.label, item.cn)}
                </a>
              ))}
              <a
                href="#download"
                className="border border-[#ff9d1c]/40 px-4 py-2 font-semibold text-[#ff9d1c] transition hover:bg-[#ff9d1c] hover:text-[#07110f]"
              >
                {text("Deck", "资料")}
              </a>
            </nav>

            <div className="flex border border-white/10 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-2 ${language === "en" ? "bg-[#ff9d1c] text-[#07110f]" : "text-white/55"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("zh")}
                className={`px-3 py-2 ${language === "zh" ? "bg-[#ff9d1c] text-[#07110f]" : "text-white/55"}`}
              >
                CN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="border border-white/15 px-3 py-2 text-sm font-semibold text-white/80 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {text("Menu", "菜单")}
            </button>
          </div>

          {open ? (
            <nav id="mobile-nav" className="mt-4 grid gap-2 border-t border-white/10 pt-4 lg:hidden">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-1 py-2 text-sm text-white/75"
                >
                  <span>{text(item.label, item.cn)}</span>
                  <span className="text-white/35">{text(item.cn, item.label)}</span>
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 border border-white/10 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-2 ${language === "en" ? "bg-[#ff9d1c] text-[#07110f]" : "text-white/55"}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("zh")}
                  className={`px-3 py-2 ${language === "zh" ? "bg-[#ff9d1c] text-[#07110f]" : "text-white/55"}`}
                >
                  中文
                </button>
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
