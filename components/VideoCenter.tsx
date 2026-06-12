const videos = [
  {
    title: "农村微水力发电项目",
    subtitle: "Micro-hydropower generation for rural water channels",
    category: "Micro Hydro",
    youtubeId: "L_wcLjoJMPc",
  },
  {
    title: "100MW储能项目案例",
    subtitle: "Utility-scale Energy Storage Deployment",
    category: "Project Delivery",
  },
  {
    title: "AI能源管理平台演示",
    subtitle: "AI Dispatching Platform Demonstration",
    category: "Platform Demo",
  },
];

export default function VideoCenter() {
  return (
    <section id="video" className="section-shell">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">Video Center</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">视频中心</h2>
        <p className="mt-4 leading-7 text-white/58">
          Project walkthroughs, operating assets, AI dispatching demonstrations, and customer
          case stories.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((item, index) => (
          <article key={item.title} className="overflow-hidden border border-white/10 bg-white/[0.035]">
            <div className="relative aspect-video bg-[linear-gradient(135deg,#10231e,#20362f_46%,#0b1517)]">
              {"youtubeId" in item ? (
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
                  title={item.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,157,28,0.26),transparent_30%)]" />
                  <div className="absolute left-5 top-5 text-xs uppercase tracking-[0.16em] text-white/48">
                    {item.category}
                  </div>
                  <button
                    type="button"
                    aria-label={`Play ${item.title}`}
                    className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-[#ff9d1c] hover:text-[#07110f]"
                  >
                    Play
                  </button>
                  <div className="absolute bottom-5 right-5 text-sm font-bold text-[#ff9d1c]">
                    0{index + 1}
                  </div>
                </>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/52">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
