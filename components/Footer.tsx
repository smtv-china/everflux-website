"use client";

import { useLanguage } from "./LanguageProvider";

const links = [
  ["Platform", "平台能力", "#energy"],
  ["Global Footprint", "全球布局", "#global"],
  ["Partnership", "招商合作", "#investment"],
  ["Resources", "资料中心", "#download"],
  ["Contact", "联系我们", "#contact"],
];

export default function Footer() {
  const { text } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-[#050b0a]">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="text-2xl font-black text-[#ff9d1c]">EVERFLUX ENERGY</h3>
          <p className="mt-4 max-w-lg leading-7 text-white/55">
            {text(
              "Global distributed energy platform integrating power generation, energy storage, AI dispatching, and carbon management.",
              "全球分布式能源平台，整合发电、储能、AI调度和碳管理能力。",
            )}
          </p>
          <p className="mt-4 text-white/40">永流智慧能源科技（山东）有限公司</p>
        </div>

        <nav className="grid gap-3 text-sm text-white/58 sm:grid-cols-2">
          {links.map(([label, cn, href]) => (
            <a key={href} href={href} className="transition hover:text-[#ff9d1c]">
              {text(label, cn)}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/35">
        {text(
          "© 2026 EVERFLUX Energy. Built for global clean energy cooperation.",
          "© 2026 Everflux 永流储能发电机。面向全球清洁能源合作。",
        )}
      </div>
    </footer>
  );
}
