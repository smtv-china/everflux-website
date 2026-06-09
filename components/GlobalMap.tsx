// components/GlobalMap.tsx
export default function GlobalMap() {
  const locations = ["🇨🇳 中国", "🇺🇸 美国", "🇩🇪 德国", "🇸🇬 新加坡", "🇹🇼 台湾"];
  return (
    <section id="global" className="py-24 px-10">
      <h2 className="text-5xl font-bold mb-10">全球布局</h2>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
        <div className="text-center text-8xl">🌍</div>
        <div className="grid md:grid-cols-5 gap-4 mt-10">
          {locations.map((item, index) => (
            <div key={index} className="bg-white/5 rounded-2xl p-5 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}