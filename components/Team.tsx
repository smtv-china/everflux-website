export default function Team() {
  const teams = [
    {
      title: "AI能源算法中心",
      desc: "能源预测、负荷预测、AI调度算法研发"
    },
    {
      title: "能源系统研究院",
      desc: "储能系统、微电网、综合能源解决方案"
    },
    {
      title: "半导体技术中心",
      desc: "功率半导体、SiC、IGBT技术研发"
    },
    {
      title: "工业互联网研发中心",
      desc: "数字孪生、能源管理平台开发"
    }
  ];

  return (
    <section id="team" className="py-24 px-10">
      <h2 className="text-5xl font-bold mb-10">
        技术团队
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {teams.map((item,index)=>(
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
          >
            <h3 className="text-2xl mb-4">
              {item.title}
            </h3>

            <p className="text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}