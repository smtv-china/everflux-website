const groups = [
  {
    title: "Strategic Partners",
    cn: "战略合作伙伴",
    partners: ["TESLA", "HUAWEI", "CATL"],
  },
  {
    title: "Technology Partners",
    cn: "技术合作伙伴",
    partners: ["SIEMENS", "ABB", "SCHNEIDER"],
  },
  {
    title: "Supply Chain Partners",
    cn: "供应链合作伙伴",
    partners: ["BYD", "SUNGROW", "LONGi"],
  },
];

export default function Partners() {
  return (
    <section className="section-shell border-t border-white/10">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Ecosystem</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">合作生态</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/52">
          Building an energy ecosystem across technology, equipment, project delivery, and
          international market channels.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="border border-white/10 bg-white/[0.035] p-6">
            <p className="text-sm font-semibold text-[#92e6d1]">{group.title}</p>
            <h3 className="mt-1 text-xl font-bold text-white">{group.cn}</h3>
            <div className="mt-6 grid gap-3">
              {group.partners.map((partner) => (
                <div
                  key={partner}
                  className="flex min-h-20 items-center justify-center border border-white/10 bg-black/20 text-2xl font-black tracking-[0.08em] text-white/82"
                >
                  {partner}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
