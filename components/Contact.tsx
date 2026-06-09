export default function Contact() {
  return (
    <section id="contact" className="py-24 px-10">

      <h2 className="text-5xl font-bold mb-10">
        联系我们
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white/5 rounded-3xl p-8">

          <h3 className="text-2xl mb-4">
            EVERFLUX ENERGY
          </h3>

          <p>永流智慧能源科技（山东）有限公司</p>

          <p className="mt-3">
            Email：contact@everflux.com
          </p>

          <p>
            Tel：400-888-8888
          </p>

        </div>

        <div className="bg-white/5 rounded-3xl p-8">

          <input
            placeholder="姓名"
            className="w-full p-4 rounded-xl text-black mb-4"
          />

          <input
            placeholder="邮箱"
            className="w-full p-4 rounded-xl text-black mb-4"
          />

          <textarea
            placeholder="留言内容"
            className="w-full p-4 rounded-xl text-black h-40"
          />

        </div>

      </div>

    </section>
  );
}