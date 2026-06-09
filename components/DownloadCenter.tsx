"use client";

import { useState } from "react";

export default function DownloadCenter() {

  const [email,setEmail] = useState("");

  const submit = () => {

    if(!email){
      alert("请输入邮箱");
      return;
    }

    alert(`下载链接已发送到 ${email}`);
  };

  return (
    <section className="py-20 px-10">

      <h2 className="text-5xl font-bold mb-10">
        下载中心
      </h2>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <input
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-4 rounded-xl text-black"
        />

        <button
          onClick={submit}
          className="mt-5 bg-yellow-400 text-black px-8 py-3 rounded-xl"
        >
          获取下载链接
        </button>

      </div>

    </section>
  );
}