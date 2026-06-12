const teams = [
  {
    name: "Dr. Ethan Zhou",
    role: "Chief Energy Scientist",
    cn: "首席能源科学家",
    background: "Power systems PhD, 18 patents, IEEE senior member",
    focus: "Microgrid optimization and renewable forecasting",
  },
  {
    name: "Dr. Maya Chen",
    role: "Head of AI Dispatching",
    cn: "AI调度负责人",
    background: "Former grid AI architect, 12 published papers",
    focus: "Load prediction, virtual power plant algorithms",
  },
  {
    name: "Alex Wang",
    role: "Storage Systems Director",
    cn: "储能系统总监",
    background: "15 years in battery systems and industrial ESS",
    focus: "BMS, PCS integration, safety control",
  },
  {
    name: "Sophia Liu",
    role: "Global Project Delivery",
    cn: "全球项目交付负责人",
    background: "Delivered 2GW+ renewable and storage projects",
    focus: "EPC coordination and international compliance",
  },
];

export default function Team() {
  return (
    <section id="team" className="section-shell">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">Technical Leadership</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">技术团队</h2>
        <p className="mt-4 leading-7 text-white/58">
          A cross-disciplinary team covering energy science, AI dispatching, storage systems,
          power electronics, and global project delivery.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {teams.map((member) => (
          <article key={member.name} className="border border-white/10 bg-white/[0.035] p-6">
            <div className="flex size-16 items-center justify-center bg-[#ff9d1c] text-xl font-black text-[#07110f]">
              {member.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">{member.name}</h3>
            <p className="mt-2 text-sm font-semibold text-[#92e6d1]">{member.role}</p>
            <p className="mt-1 text-sm text-white/45">{member.cn}</p>
            <p className="mt-5 text-sm leading-6 text-white/60">{member.background}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-white/48">
              {member.focus}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
