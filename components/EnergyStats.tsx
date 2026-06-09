// components/EnergyStats.tsx
export default function EnergyStats() {
  const data = [
    { title: "风电", value: "78%", icon: "⚡" },
    { title: "光伏", value: "92%", icon: "☀️" },
    { title: "储能", value: "68%", icon: "🔋" },
    { title: "碳减排", value: "268T", icon: "🌱" },
  ];

  return (
    <section id="energy" className="py-24 px-10">
      <h2 className="text-5xl font-bold mb-10">实时能源数据</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-yellow-400 transition">
            <div className="text-4xl">{item.icon}</div>
            <p className="mt-4 text-gray-400">{item.title}</p>
            <h3 className="text-5xl text-yellow-400 mt-3">{item.value}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}