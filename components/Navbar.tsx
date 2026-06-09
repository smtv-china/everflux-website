
// components/Navbar.tsx
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-6 mt-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-yellow-400">EVERFLUX</div>
          <nav className="flex gap-8 text-gray-300">
            <a href="#home">首页</a>
            <a href="#energy">能源数据</a>
            <a href="#team">技术团队</a>
            <a href="#news">新闻中心</a>
            <a href="#video">视频中心</a>
            <a href="#download">下载中心</a>
            <a href="#contact">联系我们</a>
          </nav>
        </div>
      </div>
    </header>
  );
}