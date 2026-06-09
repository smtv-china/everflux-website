export default function VideoCenter() {

  const videos = [
    "全球新能源趋势",
    "储能行业分析",
    "AI能源系统"
  ];

  return (
    <section id="video" className="py-24 px-10">

      <h2 className="text-5xl font-bold mb-10">
        视频中心
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {videos.map((item,index)=>(
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          >

            <div className="h-56 bg-slate-800 flex items-center justify-center text-7xl">
              ▶️
            </div>

            <div className="p-6">

              <h3 className="text-2xl">
                {item}
              </h3>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}