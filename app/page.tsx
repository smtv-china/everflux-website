"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EnergyStats from "../components/EnergyStats";
import GlobalMap from "../components/GlobalMap";
import Team from "../components/Team";
import NewsCenter from "../components/NewsCenter";
import VideoCenter from "../components/VideoCenter";
import Investment from "../components/Investment";
import Partners from "../components/Partners";
import DownloadCenter from "../components/DownloadCenter";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* 导航栏 */}
      <Navbar />

      {/* 页面主体 */}
      <main className="flex-grow">
        {/* 首页 Hero 区 */}
        <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <Hero />
        </section>

        {/* 企业能源数据统计 */}
        <section className="py-16 px-6 md:px-20 bg-gray-850">
          <EnergyStats />
        </section>

        {/* 全球分布/3D 地球 */}
        <section className="py-16 px-6 md:px-20 bg-gray-900">
          <GlobalMap />
        </section>

        {/* 团队介绍 */}
        <section className="py-16 px-6 md:px-20 bg-gray-850">
          <Team />
        </section>

        {/* 新闻中心 */}
        <section className="py-16 px-6 md:px-20 bg-gray-900">
          <NewsCenter />
        </section>

        {/* 视频中心 */}
        <section className="py-16 px-6 md:px-20 bg-gray-850">
          <VideoCenter />
        </section>

        {/* 招商合作 */}
        <section className="py-16 px-6 md:px-20 bg-gray-900">
          <Investment />
        </section>

        {/* 合作伙伴 LOGO 墙 */}
        <section className="py-16 px-6 md:px-20 bg-gray-850">
          <Partners />
        </section>

        {/* 下载中心 / 企业资料 */}
        <section className="py-16 px-6 md:px-20 bg-gray-900">
          <DownloadCenter />
        </section>

        {/* 联系我们 */}
        <section className="py-16 px-6 md:px-20 bg-gray-850">
          <Contact />
        </section>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}