"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [authMode, setAuthMode] = useState<"loading" | "protected" | "open-demo">("loading");

  useEffect(() => {
    async function loadStatus() {
      const response = await fetch(`/api/admin/status?t=${Date.now()}`, { cache: "no-store" });
      const data = await response.json();
      setAuthMode(data.enabled ? "protected" : "open-demo");

      if (!data.enabled || data.authenticated) {
        router.replace(searchParams.get("next") || "/admin");
      }
    }

    void loadStatus();
  }, [router, searchParams]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in / 正在登录...");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setStatus(data?.error || "Login failed / 登录失败");
      return;
    }

    router.replace(searchParams.get("next") || "/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#07110f] px-5 text-white">
      <section className="w-full max-w-md border border-white/10 bg-white/[0.035] p-6 shadow-2xl">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff9d1c]">
          EVERFLUX
        </Link>
        <h1 className="mt-6 text-3xl font-black">Admin Login / 后台登录</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">
          Enter the administrator password to manage website content and customer inquiries.
          输入管理员密码后可管理网站内容与客户咨询。
        </p>

        {authMode === "open-demo" ? (
          <div className="mt-5 border border-[#ff9d1c]/30 bg-[#ff9d1c]/10 p-4 text-sm leading-6 text-[#ffcf8a]">
            Admin authentication is not enabled yet. 后台登录保护尚未启用，正在返回后台。
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Admin password / 管理员密码"
              className="min-h-12 border border-white/10 bg-black/25 px-4 outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
              autoFocus
              required
            />
            <button className="min-h-12 bg-[#ff9d1c] px-6 font-bold text-[#07110f]">
              Sign in / 登录
            </button>
          </form>
        )}

        {status ? <p className="mt-4 text-sm font-semibold text-[#92e6d1]">{status}</p> : null}
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#07110f] px-5 text-white">
          <p className="text-sm text-white/55">Loading admin login / 正在加载后台登录...</p>
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
