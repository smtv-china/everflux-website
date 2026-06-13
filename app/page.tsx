"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EnergyBroadcast from "../components/EnergyBroadcast";
import EnergyStats from "../components/EnergyStats";
import GlobalMap from "../components/GlobalMap";
import Team from "../components/Team";
import NewsCenter from "../components/NewsCenter";
import VideoCenter from "../components/VideoCenter";
import ContentLibrary from "../components/ContentLibrary";
import Investment from "../components/Investment";
import Partners from "../components/Partners";
import DownloadCenter from "../components/DownloadCenter";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col bg-[#07110f] text-[#eef6f1]">
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <EnergyBroadcast />
          <EnergyStats />
          <GlobalMap />
          <Team />
          <NewsCenter />
          <VideoCenter />
          <ContentLibrary />
          <Investment />
          <Partners />
          <DownloadCenter />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
