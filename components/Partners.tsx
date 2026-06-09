export default function Partners() {

  const partners = [
    "TESLA",
    "HUAWEI",
    "CATL",
    "BYD",
    "SIEMENS",
    "ABB"
  ];

  return (
    <section className="py-24 px-10">

      <h2 className="text-5xl font-bold mb-10">
        合作生态
      </h2>

      <div className="grid md:grid-cols-6 gap-6">

        {partners.map((item,index)=>(
          <div
            key={index}
            className="
            h-28
            bg-white/5
            border border-white/10
            rounded-2xl
            flex
            items-center
            justify-center
            "
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  );
}