"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Contact() {
  const [status, setStatus] = useState("");
  const { text } = useLanguage();

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        message: formData.get("message"),
        source: "contact-section",
      }),
    });

    if (!response.ok) {
      setStatus(text("Submission failed. Please check name, email, and message.", "提交失败，请检查姓名、邮箱和留言内容。"));
      return;
    }

    form.reset();
    setStatus(text("Submitted successfully. We will contact you soon.", "提交成功，我们会尽快联系您。"));
  }

  return (
    <section id="contact" className="section-shell">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{text("Contact", "联系我们")}</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {text("Contact Us", "联系我们")}
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/58">
            {text(
              "Speak with EVERFLUX about platform deployment, overseas cooperation, and energy infrastructure investment.",
              "如果您关注平台部署、海外合作、能源投资或项目落地，请留下联系方式。",
            )}
          </p>
          <div className="mt-8 space-y-4 border-l border-[#ff9d1c]/40 pl-5 text-white/70">
            <p className="font-semibold text-white">永流智慧能源科技（山东）有限公司</p>
            <p>Email: contact@everflux.com</p>
            <p>Tel: 400-888-8888</p>
            <p>WhatsApp: +86 188 0000 0000</p>
            <p>LinkedIn: EVERFLUX Energy</p>
          </div>

          <div className="mt-8 border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm font-semibold text-[#92e6d1]">
              {text("Global Operations Hub", "全球运营节点")}
            </p>
            <p className="mt-3 text-sm leading-6 text-white/56">
              Jinan, Shandong, China · Singapore · Dubai · Frankfurt · California
            </p>
            <div className="mt-5 h-36 bg-[linear-gradient(135deg,#10231e,#132b26_55%,#0b1517)] p-4">
              <div className="h-full border border-[#ff9d1c]/30 bg-[radial-gradient(circle_at_62%_38%,rgba(255,157,28,0.35),transparent_18%),radial-gradient(circle_at_34%_62%,rgba(146,230,209,0.22),transparent_20%)]" />
            </div>
          </div>
        </div>

        <form
          onSubmit={submitInquiry}
          className="grid gap-4 border border-white/10 bg-white/[0.035] p-6 md:p-8"
        >
          <input
            name="name"
            required
            placeholder={text("Name", "姓名")}
            className="min-h-12 border border-white/10 bg-black/25 px-4 text-white outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
          />

          <input
            name="email"
            type="email"
            required
            placeholder={text("Email", "邮箱")}
            className="min-h-12 border border-white/10 bg-black/25 px-4 text-white outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="phone"
              placeholder={text("Phone / WhatsApp", "电话 / WhatsApp")}
              className="min-h-12 border border-white/10 bg-black/25 px-4 text-white outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
            />
            <input
              name="company"
              placeholder={text("Company", "公司")}
              className="min-h-12 border border-white/10 bg-black/25 px-4 text-white outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
            />
          </div>

          <textarea
            name="message"
            required
            placeholder={text("Message", "留言内容")}
            className="min-h-40 border border-white/10 bg-black/25 p-4 text-white outline-none placeholder:text-white/30 focus:border-[#92e6d1]"
          />
          <button
            type="submit"
            className="min-h-12 bg-[#ff9d1c] px-6 text-sm font-bold text-[#07110f] transition hover:bg-white"
          >
            {text("Submit Inquiry", "提交咨询")}
          </button>
          {status ? <p className="text-sm text-[#92e6d1]">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
