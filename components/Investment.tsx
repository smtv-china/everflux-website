export default function Investment() {

  const items = [
    "城市运营中心",
    "区域运营中心",
    "能源项目合作",
    "资本战略合作"
  ];

  return (
    <section className="py-24 px-10">

      <h2 className="text-5xl font-bold mb-10">
        招商合作
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {items.map((item,index)=>(
          <div
            key={index}
            className="
            bg-gradient-to-br
            from-yellow-500/20
            to-cyan-500/20
            rounded-3xl
            p-10
            text-center
            "
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  );
}