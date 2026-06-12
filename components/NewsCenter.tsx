export default function NewsCenter() {
  const news = [
    {
      title: "全球储能市场持续增长",
      date: "2026.06.08",
      label: "Market Intelligence",
      code: "01",
    },
    {
      title: "欧洲光伏项目创新高",
      date: "2026.05.28",
      label: "Renewable Deployment",
      code: "02",
    },
    {
      title: "AI能源管理成为趋势",
      date: "2026.05.16",
      label: "AI Operations",
      code: "03",
    },
  ];

  return (
    <section id="news" className="section-shell">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Insights</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">新闻中心</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/52">
          Tracking policy, storage, AI operations, and clean power projects across global markets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {news.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden border border-white/10 bg-white/[0.035]"
          >
            <div className="relative aspect-video bg-[linear-gradient(135deg,#14251f,#243c33_48%,#0b1517)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_32%,rgba(255,157,28,0.32),transparent_26%),radial-gradient(circle_at_25%_70%,rgba(146,230,209,0.22),transparent_30%)]" />
              <div className="absolute bottom-5 left-5 text-5xl font-black text-white/12">
                {item.code}
              </div>
              <div className="absolute right-5 top-5 text-xs uppercase tracking-[0.16em] text-white/45">
                Everflux Insight
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em]">
                <p className="text-[#92e6d1]">{item.label}</p>
                <time className="text-white/35">{item.date}</time>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
