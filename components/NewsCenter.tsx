export default function NewsCenter() {

  const news = [
    {
      title:"全球储能市场持续增长",
      image:"https://picsum.photos/600/400?1"
    },
    {
      title:"欧洲光伏项目创新高",
      image:"https://picsum.photos/600/400?2"
    },
    {
      title:"AI能源管理成为趋势",
      image:"https://picsum.photos/600/400?3"
    }
  ];

  return (
    <section id="news" className="py-24 px-10">

      <h2 className="text-5xl font-bold mb-10">
        新闻中心
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {news.map((item,index)=>(
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          >

            <img
              src={item.image}
              alt=""
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl">
                {item.title}
              </h3>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}